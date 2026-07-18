/``
 ` Unlimited Storage System for SoutheastApp
 ` Sistem penyimpanan tanpa batas dengan komponen yang ada
 `/

import { southeastConfig } from '../config/index.js';

class UnlimitedStorage {
  constructor() {
    this.storagePath = southeastConfig.storage.localPath;
    this.chunks = new Map();
    this.metadata = new Map();
    this.compressionEnabled = southeastConfig.storage.compression === 'adaptive';
    this.deduplicationEnabled = southeastConfig.storage.deduplication;
    this.chunkHashes = new Set();
  }

  // Generate unique chunk ID
  generateChunkId(data) {
    const hash = this.simpleHash(typeof data === 'string' ? data : JSON.stringify(data));
    return `chunk_${hash}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Simple hash function for deduplication
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  // Store data with unlimited size support
  async store(key, data, options = {}) {
    const chunks = [];
    const stringData = typeof data === 'string' ? data : JSON.stringify(data);
    const dataSize = stringData.length;
    const chunkSize = southeastConfig.storage.chunkSize;

    // Split data into chunks for unlimited storage
    let offset = 0;
    let chunkIndex = 0;

    while (offset < dataSize) {
      const chunkData = stringData.slice(offset, offset + chunkSize);
      const chunkId = this.generateChunkId(chunkData);

      // Check for duplicates if enabled
      const chunkHash = this.simpleHash(chunkData);
      if (this.deduplicationEnabled && this.chunkHashes.has(chunkHash)) {
        chunks.push({ id: chunkId, hash: chunkHash, duplicate: true });
      } else {
        this.chunks.set(chunkId, {
          data: chunkData,
          index: chunkIndex,
          hash: chunkHash,
          timestamp: Date.now(),
          compressed: this.compressionEnabled
        });
        this.chunkHashes.add(chunkHash);
        chunks.push({ id: chunkId, hash: chunkHash, duplicate: false });
      }

      offset += chunkSize;
      chunkIndex++;
    }

    // Store metadata
    this.metadata.set(key, {
      key,
      chunks,
      totalChunks: chunks.length,
      totalSize: dataSize,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      options,
      dataType: typeof data
    });

    return {
      success: true,
      key,
      chunks: chunks.length,
      size: dataSize,
      message: 'Data stored successfully with unlimited storage system'
    };
  }

  // Retrieve data by key
  async retrieve(key) {
    const meta = this.metadata.get(key);
    if (!meta) {
      return { success: false, error: 'Key not found' };
    }

    let data = '';
    for (const chunk of meta.chunks) {
      const chunkData = this.chunks.get(chunk.id);
      if (chunkData && !chunk.duplicate) {
        data += chunkData.data;
      }
    }

    // Parse back to original type if needed
    if (meta.dataType !== 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // Keep as string if parse fails
      }
    }

    return {
      success: true,
      key,
      data,
      size: meta.totalSize,
      chunks: meta.totalChunks
    };
  }

  // List all stored items
  list() {
    const items = [];
    for (const [key, meta] of this.metadata.entries()) {
      items.push({
        key,
        size: meta.totalSize,
        chunks: meta.totalChunks,
        createdAt: meta.createdAt,
        updatedAt: meta.updatedAt
      });
    }
    return items;
  }

  // Delete item by key
  delete(key) {
    const meta = this.metadata.get(key);
    if (!meta) {
      return { success: false, error: 'Key not found' };
    }

    for (const chunk of meta.chunks) {
      if (!chunk.duplicate) {
        this.chunkHashes.delete(chunk.hash);
        this.chunks.delete(chunk.id);
      }
    }
    this.metadata.delete(key);

    return { success: true, message: 'Item deleted successfully' };
  }

  // Get storage statistics
  getStats() {
    const totalChunks = this.chunks.size;
    const totalItems = this.metadata.size;
    const totalSize = Array.from(this.metadata.values())
      .reduce((sum, meta) => sum + meta.totalSize, 0);
    const uniqueHashes = this.chunkHashes.size;

    return {
      totalItems,
      totalChunks,
      totalSize,
      uniqueHashes,
      deduplicationRatio: totalChunks > 0 ? (uniqueHashes / totalChunks ` 100).toFixed(2) + '%' : '0%',
      compressionEnabled: this.compressionEnabled,
      deduplicationEnabled: this.deduplicationEnabled,
      unlimitedStorage: true
    };
  }
}

export default UnlimitedStorage;
export { UnlimitedStorage };
