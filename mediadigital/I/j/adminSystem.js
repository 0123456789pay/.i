/**
 * ALLUNIVERS ICONER - Administrator Command sistem
 * Owner/Administrator command interface untuk sistem pengelolaan
 */

class AlluniversAdminCommand {
    constructor() {
        this.commands = {};
        this.adminUsers = [];
        this.currentAdmin = null;
        this.commandHistory = [];
        this.registerDefaultCommands();
    }

    registerDefaultCommands() {
        // pengguna pengelolaan Commands
        this.registerCommand('user.list', async (params) => {
            console.log('📋 Listing all users...');
            return await window.AlluniversDataStorage.getAllUsers();
        });

        this.registerCommand('user.add', async (params) => {
            console.log('➕ Adding new user:', params);
            return await window.AlluniversDataStorage.saveUser(params);
        });

        this.registerCommand('user.get', async (params) => {
            console.log('🔍 Getting user:', params.userId);
            return await window.AlluniversDataStorage.getUser(params.userId);
        });

        // ikon Design Commands
        this.registerCommand('icon.save', async (params) => {
            console.log('💾 Saving icon design:', params);
            return await window.AlluniversDataStorage.saveIconDesign(params);
        });

        this.registerCommand('icon.backup', async (params) => {
            console.log('🔄 Creating backup of all icon designs...');
            return await window.AlluniversDataStorage.backupAllDesigns();
        });

        this.registerCommand('icon.get', async (params) => {
            console.log('🔍 Getting icon design:', params.designId);
            return await window.AlluniversDataStorage.getIconDesign(params.designId);
        });

        // Sales Commands
        this.registerCommand('sale.record', async (params) => {
            console.log('💰 Recording sale:', params);
            return await window.AlluniversDataStorage.recordSale(params);
        });

        this.registerCommand('sale.report', async (params) => {
            console.log('📊 Generating sales report...');
            return await window.AlluniversDataStorage.getSalesReport(params.startDate, params.endDate);
        });

        // Financial Commands
        this.registerCommand('finance.record', async (params) => {
            console.log('💵 Recording transaction:', params);
            return await window.AlluniversDataStorage.recordTransaction(params);
        });

        this.registerCommand('finance.report', async (params) => {
            console.log('📈 Generating financial report for period:', params.period);
            return await window.AlluniversDataStorage.getFinancialReport(params.period);
        });

        // Traffic Commands
        this.registerCommand('traffic.record', async (params) => {
            console.log('📊 Recording visit:', params);
            return await window.AlluniversDataStorage.recordVisit(params);
        });

        this.registerCommand('traffic.analytics', async (params) => {
            console.log('📊 Getting traffic analytics for:', params.timeRange);
            return await window.AlluniversDataStorage.getTrafficAnalytics(params.timeRange);
        });

        // sistem Commands
        this.registerCommand('system.status', async (params) => {
            console.log('🖥️ System Status Check');
            return {
                status: 'online',
                storageInitialized: window.AlluniversDataStorage.initialized,
                adminLoggedIn: !!this.currentAdmin,
                timestamp: new Date().toISOString()
            };
        });

        this.registerCommand('system.clear', async (params) => {
            console.log('🗑️ Clearing data type:', params.type);
            return await window.AlluniversDataStorage.adminCommand('clear_data', { type: params.type });
        });

        // pengelola Commands
        this.registerCommand('admin.login', async (params) => {
            console.log('🔐 Admin login attempt for:', params.username);
            if (this.adminUsers.includes(params.username)) {
                this.currentAdmin = params.username;
                return { success: true, message: `Welcome, ${params.username}!` };
            }
            return { success: false, message: 'Access denied' };
        });

        this.registerCommand('admin.logout', async (params) => {
            console.log('🚪 Admin logout:', this.currentAdmin);
            this.currentAdmin = null;
            return { success: true, message: 'Logged out successfully' };
        });

        this.registerCommand('admin.history', async (params) => {
            console.log('📜 Showing command history');
            return this.commandHistory.slice(-10); // terakhir 10 commands
        });

        // bantuan Command
        this.registerCommand('help', async (params) => {
            return this.getHelpText();
        });
    }

    registerCommand(name, handler) {
        this.commands[name] = handler;
        console.log(`✅ Command registered: ${name}`);
    }

    async execute(commandString, adminUser = null) {
        const parts = commandString.trim().split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        // Parse arguments
        const params = this.parseArgs(args);

        // Add to history
        this.commandHistory.push({
            command: commandString,
            admin: adminUser || this.currentAdmin,
            timestamp: new Date().toISOString()
        });

        console.log(`\n⚡ Executing command: ${commandString}`);
        console.log('Parameters:', params);

        if (!this.commands[command]) {
            return { error: `Unknown command: ${command}. Type 'help' for available commands.` };
        }

        try {
            const result = await this.commands[command](params);
            console.log('✅ Command executed successfully');
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.error('❌ Command execution failed:', error);
            return { error: error.message };
        }
    }

    parseArgs(args) {
        const params = {};
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (arg.startsWith('--')) {
                const key = arg.substring(2);
                const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
                params[key] = value;
                if (value !== true) i++;
            } else if (arg.includes('=')) {
                const [key, value] = arg.split('=');
                params[key] = value;
            }
        }
        return params;
    }

    getHelpText() {
        return {
            message: 'ALLUNIVERS ICONER - Admin Command Help',
            commands: {
                'User Management': [
                    'user.list - List all registered users',
                    'user.add --username <name> --email <email> - Add new user',
                    'user.get --userId <id> - Get specific user'
                ],
                'Icon Design': [
                    'icon.save --name <name> --data <data> - Save icon design',
                    'icon.backup - Backup all icon designs',
                    'icon.get --designId <id> - Get specific design'
                ],
                'Sales': [
                    'sale.record --amount <amount> --itemId <id> - Record a sale',
                    'sale.report --startDate <date> --endDate <date> - Get sales report'
                ],
                'Financial': [
                    'finance.record --amount <amount> --type <type> - Record transaction',
                    'finance.report --period <period> - Get financial report'
                ],
                'Traffic': [
                    'traffic.record --page <page> --visitor <id> - Record visit',
                    'traffic.analytics --timeRange <range> - Get traffic analytics'
                ],
                'System': [
                    'system.status - Check system status',
                    'system.clear --type <type> - Clear specific data type'
                ],
                'Admin': [
                    'admin.login --username <name> - Login as admin',
                    'admin.logout - Logout from admin',
                    'admin.history - Show command history'
                ]
            }
        };
    }

    addAdminUser(username) {
        if (!this.adminUsers.includes(username)) {
            this.adminUsers.push(username);
            console.log(`✅ Admin user added: ${username}`);
        }
    }
}

// otomatis-mulai
if (typeof window !== 'undefined') {
    window.AlluniversAdminCommand = new AlluniversAdminCommand();
    
    // Add bawaan pengelola
    window.AlluniversAdminCommand.addAdminUser('owner');
    window.AlluniversAdminCommand.addAdminUser('administrator');
}

// Export untuk Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlluniversAdminCommand;
}
