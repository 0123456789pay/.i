"""
Terminal Function Executor
Menjalankan perintah sistem secara aman dengan output streaming.
"""
import asyncio
import subprocess
from typing import AsyncGenerator, List

class TerminalExecutor:
    def __init__(self, sandbox: bool = True):
        self.sandbox = sandbox
        self.allowed_commands = ['ls', 'cat', 'grep', 'echo', 'pwd', 'git', 'python3', 'npm']
        
    async def execute(self, command: str) -> AsyncGenerator[str, None]:
        """
        Menjalankan perintah terminal dan men-stream output baris demi baris.
        """
        if self.sandbox:
            # Validasi sederhana untuk keamanan
            cmd_parts = command.split()
            if not cmd_parts or cmd_parts[0] not in self.allowed_commands:
                yield f"Error: Command '{command}' not allowed in sandbox mode."
                return

        try:
            process = await asyncio.create_subprocess_shell(
                command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                shell=True
            )
            
            # Baca stdout secara streaming
            while True:
                line = await process.stdout.readline()
                if not line:
                    break
                yield line.decode().strip()
            
            # Tunggu proses selesai
            await process.wait()
            
        except Exception as e:
            yield f"Execution Error: {str(e)}"

# Instance global
terminal_system = TerminalExecutor()
