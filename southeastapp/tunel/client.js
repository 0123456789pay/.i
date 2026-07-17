/**
 * Terminal I/O Tunnel Client
 * Frontend client untuk terminal tunnel Southeast App
 */

class TerminalTunnelClient {
    constructor(options = {}) {
        this.url = options.url || 'ws://localhost:8080';
        this.terminalElement = options.terminalElement;
        this.socket = null;
        this.term = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
        this.reconnectDelay = options.reconnectDelay || 3000;
    }

    /**
     * Initialize the terminal and connect to tunnel server
     */
    async connect() {
        return new Promise((resolve, reject) => {
            try {
                // Initialize xterm.js if available
                if (typeof Terminal !== 'undefined' && this.terminalElement) {
                    this.term = new Terminal({
                        cursorBlink: true,
                        fontSize: 14,
                        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                        theme: {
                            background: '#1e1e1e',
                            foreground: '#ffffff'
                        }
                    });
                    this.term.open(this.terminalElement);
                }

                // Create WebSocket connection
                this.socket = new WebSocket(this.url);

                this.socket.onopen = () => {
                    console.log('Connected to terminal tunnel');
                    this.reconnectAttempts = 0;
                    
                    if (this.term) {
                        this.term.onData((data) => {
                            this.sendInput(data);
                        });
                        
                        this.term.onResize((size) => {
                            this.sendResize(size.cols, size.rows);
                        });
                        
                        // Send initial resize
                        const dims = this.term.cols && this.term.rows;
                        if (dims) {
                            this.sendResize(this.term.cols, this.term.rows);
                        }
                    }
                    
                    resolve();
                };

                this.socket.onmessage = (event) => {
                    const message = JSON.parse(event.data);
                    
                    if (message.type === 'output' && this.term) {
                        this.term.write(message.data);
                    }
                };

                this.socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    reject(error);
                };

                this.socket.onclose = (event) => {
                    console.log('Connection closed:', event.code, event.reason);
                    
                    // Attempt to reconnect
                    if (this.reconnectAttempts < this.maxReconnectAttempts) {
                        this.reconnectAttempts++;
                        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
                        setTimeout(() => this.connect(), this.reconnectDelay);
                    } else {
                        if (this.term) {
                            this.term.write('\r\n\r\n\x1b[31mConnection lost. Max reconnection attempts reached.\x1b[0m\r\n');
                        }
                    }
                };
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Send input data to the terminal tunnel
     */
    sendInput(data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'input',
                data: data
            }));
        }
    }

    /**
     * Send terminal resize event
     */
    sendResize(cols, rows) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'resize',
                cols: cols,
                rows: rows
            }));
        }
    }

    /**
     * Disconnect from the tunnel server
     */
    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        
        if (this.term) {
            this.term.dispose();
            this.term = null;
        }
    }

    /**
     * Clear the terminal screen
     */
    clear() {
        if (this.term) {
            this.term.clear();
        }
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerminalTunnelClient;
} else if (typeof window !== 'undefined') {
    window.TerminalTunnelClient = TerminalTunnelClient;
}
