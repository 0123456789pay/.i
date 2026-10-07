/**
 * ALLUNIVERS ICONER - Data Storage System
 * Centralized data management for all system data types
 */

class AlluniversDataStorage {
    constructor() {
        this.storagePath = './data.storage/';
        this.dataTypes = {
            USER_REGISTER: 'user_register',
            ICON_DESIGNS: 'icon_designs_backup',
            SALES: 'sales_data',
            FINANCIAL: 'financial_data',
            TRAFFIC: 'traffic_data'
        };
        this.initialized = false;
    }

    async initialize() {
        console.log('Initializing ALLUNIVERS ICONER Data Storage System...');
        this.initialized = true;
        console.log('✅ Data Storage System Ready');
    }

    // User Register Data
    async saveUser(userData) {
        const timestamp = Date.now();
        const userId = `user_${timestamp}`;
        userData.id = userId;
        userData.createdAt = new Date().toISOString();
        
        console.log('[USER REGISTER] Saving user:', userData);
        this._storeData(this.dataTypes.USER_REGISTER, userId, userData);
        return userId;
    }

    async getUser(userId) {
        console.log('[USER REGISTER] Getting user:', userId);
        return this._retrieveData(this.dataTypes.USER_REGISTER, userId);
    }

    async getAllUsers() {
        console.log('[USER REGISTER] Getting all users');
        return this._retrieveAllData(this.dataTypes.USER_REGISTER);
    }

    // Icon Designs Data
    async saveIconDesign(designData) {
        const timestamp = Date.now();
        const designId = `design_${timestamp}`;
        designData.id = designId;
        designData.createdAt = new Date().toISOString();
        
        console.log('[ICON DESIGNS] Saving design:', designData);
        this._storeData(this.dataTypes.ICON_DESIGNS, designId, designData);
        return designId;
    }

    async getIconDesign(designId) {
        console.log('[ICON DESIGNS] Getting design:', designId);
        return this._retrieveData(this.dataTypes.ICON_DESIGNS, designId);
    }

    async backupAllDesigns() {
        console.log('[ICON DESIGNS] Creating backup of all designs');
        return this._retrieveAllData(this.dataTypes.ICON_DESIGNS);
    }

    // Sales Data
    async recordSale(saleData) {
        const timestamp = Date.now();
        const saleId = `sale_${timestamp}`;
        saleData.id = saleId;
        saleData.timestamp = new Date().toISOString();
        
        console.log('[SALES] Recording sale:', saleData);
        this._storeData(this.dataTypes.SALES, saleId, saleData);
        return saleId;
    }

    async getSalesReport(startDate, endDate) {
        console.log('[SALES] Getting report from', startDate, 'to', endDate);
        return this._retrieveAllData(this.dataTypes.SALES);
    }

    // Financial Data
    async recordTransaction(transactionData) {
        const timestamp = Date.now();
        const transactionId = `txn_${timestamp}`;
        transactionData.id = transactionId;
        transactionData.timestamp = new Date().toISOString();
        
        console.log('[FINANCIAL] Recording transaction:', transactionData);
        this._storeData(this.dataTypes.FINANCIAL, transactionId, transactionData);
        return transactionId;
    }

    async getFinancialReport(period) {
        console.log('[FINANCIAL] Getting report for period:', period);
        return this._retrieveAllData(this.dataTypes.FINANCIAL);
    }

    // Traffic Data
    async recordVisit(visitData) {
        const timestamp = Date.now();
        const visitId = `visit_${timestamp}`;
        visitData.id = visitId;
        visitData.timestamp = new Date().toISOString();
        
        this._storeData(this.dataTypes.TRAFFIC, visitId, visitData);
    }

    async getTrafficAnalytics(timeRange) {
        console.log('[TRAFFIC] Getting analytics for:', timeRange);
        return this._retrieveAllData(this.dataTypes.TRAFFIC);
    }

    // Internal storage methods (simulated for browser environment)
    _storeData(type, id, data) {
        const storageKey = `allunivers_${type}_${id}`;
        try {
            localStorage.setItem(storageKey, JSON.stringify(data));
            console.log(`✅ Data stored: ${storageKey}`);
        } catch (e) {
            console.error('Storage error:', e);
        }
    }

    _retrieveData(type, id) {
        const storageKey = `allunivers_${type}_${id}`;
        try {
            const data = localStorage.getItem(storageKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Retrieve error:', e);
            return null;
        }
    }

    _retrieveAllData(type) {
        const results = [];
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(`allunivers_${type}_`)) {
                    const data = localStorage.getItem(key);
                    if (data) {
                        results.push(JSON.parse(data));
                    }
                }
            }
        } catch (e) {
            console.error('Retrieve all error:', e);
        }
        return results;
    }

    // Admin commands
    async adminCommand(command, params) {
        console.log('[ADMIN COMMAND] Executing:', command, params);
        
        switch(command) {
            case 'list_users':
                return await this.getAllUsers();
            case 'list_sales':
                return await this.getSalesReport(params.startDate, params.endDate);
            case 'list_financial':
                return await this.getFinancialReport(params.period);
            case 'backup_designs':
                return await this.backupAllDesigns();
            case 'clear_data':
                this._clearData(params.type);
                return { success: true, message: 'Data cleared' };
            default:
                return { error: 'Unknown command' };
        }
    }

    _clearData(type) {
        try {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(`allunivers_${type}_`)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
            console.log(`✅ Cleared ${keysToRemove.length} items from ${type}`);
        } catch (e) {
            console.error('Clear error:', e);
        }
    }
}

// Auto-initialize
if (typeof window !== 'undefined') {
    window.AlluniversDataStorage = new AlluniversDataStorage();
    window.AlluniversDataStorage.initialize();
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlluniversDataStorage;
}
