#!/usr/bin/env python3
"""
Terminal I/O Tunnel Server
Mesin & Sistem Terminal IO untuk Southeast App
"""

import asyncio
import websockets
import json
import os
import pty
import select
import struct
import fcntl
import termios
import signal
from pathlib import Path
from typing import Optional, Dict, Any
import logging

# Load configuration
CONFIG_PATH = Path(__file__).parent / "config.ini"

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("terminal-tunnel")


class TerminalTunnel:
    """Handler for terminal I/O tunnel connections"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.fd: Optional[int] = None
        self.pid: Optional[int] = None
        self.process: Optional[Any] = None
        
    def setup_pty(self, shell: str = "/bin/bash", 
                  rows: int = 24, cols: int = 80) -> bool:
        """Setup pseudo-terminal for the session"""
        try:
            self.pid, self.fd = pty.fork()
            
            if self.pid == 0:
                # Child process
                os.execvp(shell, [shell])
            else:
                # Parent process
                self.set_pty_size(rows, cols)
                return True
                
        except Exception as e:
            logger.error(f"Failed to setup PTY: {e}")
            return False
    
    def set_pty_size(self, rows: int, cols: int):
        """Set the size of the pseudo-terminal"""
        if self.fd is None:
            return
            
        winsize = struct.pack('HHHH', rows, cols, 0, 0)
        fcntl.ioctl(self.fd, termios.TIOCSWINSZ, winsize)
    
    def read_from_pty(self) -> Optional[bytes]:
        """Read data from the pseudo-terminal"""
        if self.fd is None:
            return None
            
        try:
            if select.select([self.fd], [], [], 0)[0]:
                return os.read(self.fd, 1024)
        except Exception as e:
            logger.error(f"Error reading from PTY: {e}")
        
        return None
    
    def write_to_pty(self, data: bytes):
        """Write data to the pseudo-terminal"""
        if self.fd is None:
            return
            
        try:
            os.write(self.fd, data)
        except Exception as e:
            logger.error(f"Error writing to PTY: {e}")
    
    def cleanup(self):
        """Cleanup resources"""
        if self.fd is not None:
            try:
                os.close(self.fd)
            except:
                pass
        
        if self.pid is not None:
            try:
                os.kill(self.pid, signal.SIGTERM)
            except:
                pass


async def handle_client(websocket, path):
    """Handle incoming WebSocket connection"""
    logger.info(f"New client connected from {websocket.remote_address}")
    
    tunnel = TerminalTunnel({})
    
    # Default shell configuration
    shell = os.environ.get('SHELL', '/bin/bash')
    if not tunnel.setup_pty(shell=shell):
        await websocket.close(1011, "Failed to setup terminal")
        return
    
    try:
        async for message in websocket:
            try:
                data = json.loads(message)
                
                if data.get('type') == 'input':
                    # Handle terminal input
                    input_data = data.get('data', '')
                    tunnel.write_to_pty(input_data.encode('utf-8'))
                    
                elif data.get('type') == 'resize':
                    # Handle terminal resize
                    rows = data.get('rows', 24)
                    cols = data.get('cols', 80)
                    tunnel.set_pty_size(rows, cols)
                    
            except json.JSONDecodeError:
                # Raw input
                tunnel.write_to_pty(message.encode('utf-8') if isinstance(message, str) else message)
            
            # Read output from PTY and send to client
            output = tunnel.read_from_pty()
            if output:
                response = {
                    'type': 'output',
                    'data': output.decode('utf-8', errors='replace')
                }
                await websocket.send(json.dumps(response))
                
    except websockets.exceptions.ConnectionClosed:
        logger.info("Client disconnected")
    finally:
        tunnel.cleanup()
        logger.info("Terminal session cleaned up")


def load_config() -> Dict[str, Any]:
    """Load configuration from INI file"""
    import configparser
    
    config = configparser.ConfigParser()
    config.read(CONFIG_PATH)
    
    return {section: dict(config.items(section)) for section in config.sections()}


async def main():
    """Main entry point"""
    config = load_config()
    
    host = config.get('tunnel', {}).get('host', '0.0.0.0')
    port = int(config.get('tunnel', {}).get('port', 8080))
    
    logger.info(f"Starting Terminal I/O Tunnel Server on {host}:{port}")
    
    async with websockets.serve(handle_client, host, port):
        await asyncio.Future()  # Run forever


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
