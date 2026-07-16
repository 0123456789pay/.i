/**
 * TagDB - Sistem Database Otomatis
 * Mengelola struktur data dan query dari komponen yang terdeteksi
 */

class TagDB {
  constructor() {
    this.schemas = new Map();
    this.tables = new Map();
    this.records = new Map();
    this.queries = new Map();
  }

  /**
   * Register schema/database
   */
  register(name, content, type = 'json') {
    const dbInfo = {
      name,
      content,
      type,
      registeredAt: Date.now()
    };

    this.schemas.set(name, dbInfo);

    // Parse berdasarkan tipe
    if (type === 'json') {
      dbInfo.parsed = this.parseJSON(content);
    } else if (type === 'sql') {
      dbInfo.parsed = this.parseSQL(content);
    } else if (type === 'db') {
      dbInfo.parsed = this.parseDB(content);
    }

    return dbInfo;
  }

  /**
   * Parse JSON content
   */
  parseJSON(content) {
    try {
      const data = JSON.parse(content);
      return {
        type: 'json',
        valid: true,
        keys: Object.keys(data),
        size: Object.keys(data).length,
        structure: this.analyzeStructure(data),
        rawData: data
      };
    } catch (e) {
      return {
        type: 'json',
        valid: false,
        error: e.message
      };
    }
  }

  /**
   * Parse SQL content
   */
  parseSQL(content) {
    const tables = [];
    const inserts = [];
    const selects = [];
    const updates = [];
    const deletes = [];

    // Extract CREATE TABLE
    const createRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([^;]+)\)/gi;
    let match;

    while ((match = createRegex.exec(content)) !== null) {
      tables.push({
        name: match[1],
        columns: this.parseColumns(match[2])
      });
    }

    // Extract INSERT
    const insertRegex = /INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/gi;

    while ((match = insertRegex.exec(content)) !== null) {
      inserts.push({
        table: match[1],
        columns: match[2].split(',').map(c => c.trim()),
        values: match[3].split(',').map(v => v.trim())
      });
    }

    // Extract SELECT
    const selectRegex = /SELECT\s+([^ ]+)\s+FROM\s+(\w+)/gi;

    while ((match = selectRegex.exec(content)) !== null) {
      selects.push({
        fields: match[1],
        table: match[2]
      });
    }

    return {
      type: 'sql',
      tables,
      inserts,
      selects,
      updates,
      deletes
    };
  }

  /**
   * Parse DB binary-like content
   */
  parseDB(content) {
    return {
      type: 'db',
      raw: content.substring(0, 1000) + '...',
      size: content.length,
      lines: content.split('\n').length
    };
  }

  /**
   * Analyze JSON structure
   */
  analyzeStructure(data, depth = 0) {
    const structure = {
      depth,
      type: Array.isArray(data) ? 'array' : typeof data,
      keys: [],
      children: []
    };

    if (typeof data === 'object' && data !== null) {
      structure.keys = Object.keys(data);
      
      for (const key of Object.keys(data).slice(0, 10)) {
        if (typeof data[key] === 'object' && data[key] !== null) {
          structure.children.push({
            key,
            structure: this.analyzeStructure(data[key], depth + 1)
          });
        }
      }
    }

    return structure;
  }

  /**
   * Parse column definitions
   */
  parseColumns(columnString) {
    const columns = [];
    const lines = columnString.split(',');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('PRIMARY') || trimmed.startsWith('FOREIGN') || 
          trimmed.startsWith('UNIQUE') || trimmed.startsWith('INDEX')) {
        columns.push({
          type: 'constraint',
          definition: trimmed
        });
      } else {
        const parts = trimmed.split(/\s+/);
        if (parts.length >= 2) {
          columns.push({
            type: 'column',
            name: parts[0],
            dataType: parts[1],
            constraints: parts.slice(2)
          });
        }
      }
    }

    return columns;
  }

  /**
   * Create table in memory
   */
  createTable(tableName, schema) {
    const table = {
      name: tableName,
      schema,
      records: [],
      createdAt: Date.now()
    };

    this.tables.set(tableName, table);
    return table;
  }

  /**
   * Insert record
   */
  insert(tableName, record) {
    const table = this.tables.get(tableName);
    
    if (!table) {
      return { error: `Table '${tableName}' not found` };
    }

    record.id = record.id || Date.now();
    record.createdAt = Date.now();
    table.records.push(record);

    return { success: true, id: record.id };
  }

  /**
   * Select records
   */
  select(tableName, conditions = {}) {
    const table = this.tables.get(tableName);
    
    if (!table) {
      return { error: `Table '${tableName}' not found` };
    }

    let results = table.records;

    // Apply conditions
    if (Object.keys(conditions).length > 0) {
      results = results.filter(record => {
        return Object.entries(conditions).every(([key, value]) => {
          return record[key] === value;
        });
      });
    }

    return results;
  }

  /**
   * Update record
   */
  update(tableName, id, updates) {
    const table = this.tables.get(tableName);
    
    if (!table) {
      return { error: `Table '${tableName}' not found` };
    }

    const record = table.records.find(r => r.id === id);
    
    if (!record) {
      return { error: `Record with id '${id}' not found` };
    }

    Object.assign(record, updates, { updatedAt: Date.now() });
    return { success: true, record };
  }

  /**
   * Delete record
   */
  delete(tableName, id) {
    const table = this.tables.get(tableName);
    
    if (!table) {
      return { error: `Table '${tableName}' not found` };
    }

    const index = table.records.findIndex(r => r.id === id);
    
    if (index === -1) {
      return { error: `Record with id '${id}' not found` };
    }

    table.records.splice(index, 1);
    return { success: true };
  }

  /**
   * Execute query
   */
  query(sql, params = {}) {
    const queryInfo = {
      sql,
      params,
      executedAt: Date.now()
    };

    // Simple query parser
    const upperSQL = sql.toUpperCase().trim();
    
    if (upperSQL.startsWith('SELECT')) {
      return this.executeSelect(sql, params);
    } else if (upperSQL.startsWith('INSERT')) {
      return this.executeInsert(sql, params);
    } else if (upperSQL.startsWith('UPDATE')) {
      return this.executeUpdate(sql, params);
    } else if (upperSQL.startsWith('DELETE')) {
      return this.executeDelete(sql, params);
    }

    return { error: 'Unsupported query type' };
  }

  /**
   * Execute SELECT query
   */
  executeSelect(sql, params) {
    // Simplified SELECT execution
    const tableMatch = sql.match(/FROM\s+(\w+)/i);
    
    if (!tableMatch) {
      return { error: 'Invalid SELECT query' };
    }

    const tableName = tableMatch[1];
    return this.select(tableName, params);
  }

  /**
   * Execute INSERT query
   */
  executeInsert(sql, params) {
    // Simplified INSERT execution
    const tableMatch = sql.match(/INTO\s+(\w+)/i);
    
    if (!tableMatch) {
      return { error: 'Invalid INSERT query' };
    }

    const tableName = tableMatch[1];
    return this.insert(tableName, params);
  }

  /**
   * Execute UPDATE query
   */
  executeUpdate(sql, params) {
    // Simplified UPDATE execution
    const tableMatch = sql.match(/UPDATE\s+(\w+)/i);
    const whereMatch = sql.match(/WHERE\s+id\s*=\s*(\d+)/i);
    
    if (!tableMatch || !whereMatch) {
      return { error: 'Invalid UPDATE query' };
    }

    const tableName = tableMatch[1];
    const id = parseInt(whereMatch[1]);
    
    return this.update(tableName, id, params);
  }

  /**
   * Execute DELETE query
   */
  executeDelete(sql, params) {
    // Simplified DELETE execution
    const tableMatch = sql.match(/FROM\s+(\w+)/i);
    const whereMatch = sql.match(/WHERE\s+id\s*=\s*(\d+)/i);
    
    if (!tableMatch || !whereMatch) {
      return { error: 'Invalid DELETE query' };
    }

    const tableName = tableMatch[1];
    const id = parseInt(whereMatch[1]);
    
    return this.delete(tableName, id);
  }

  /**
   * Get all schemas
   */
  list() {
    return Array.from(this.schemas.entries()).map(([name, data]) => ({
      name,
      type: data.type,
      parsed: data.parsed,
      registeredAt: data.registeredAt
    }));
  }

  /**
   * Get statistics
   */
  getStats() {
    let totalRecords = 0;
    
    for (const [_, table] of this.tables.entries()) {
      totalRecords += table.records.length;
    }

    return {
      totalSchemas: this.schemas.size,
      totalTables: this.tables.size,
      totalRecords,
      schemas: Array.from(this.schemas.keys()),
      tables: Array.from(this.tables.keys())
    };
  }

  /**
   * Export database
   */
  export(format = 'json') {
    const exportData = {
      schemas: this.list(),
      tables: Array.from(this.tables.entries()).map(([name, table]) => ({
        name,
        recordCount: table.records.length,
        records: table.records
      }))
    };

    if (format === 'json') {
      return JSON.stringify(exportData, null, 2);
    }

    return exportData;
  }

  /**
   * Clear all data
   */
  clear() {
    this.schemas.clear();
    this.tables.clear();
    this.records.clear();
    this.queries.clear();
  }
}

export default TagDB;
export { TagDB };
