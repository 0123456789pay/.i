# Terminal I/O Tunnel - Southeast App

## Deskripsi
Sistem terminal I/O tunnel untuk Southeast App yang memungkinkan akses remote terminal melalui WebSocket.

## Struktur Folder
```
tunel/
├── config.ini          # Konfigurasi mesin & sistem
├── server.py           # Server terminal tunnel (Python)
├── client.js           # Client library (JavaScript)
├── requirements.txt    # Dependencies Python
└── README.md          # Dokumentasi ini
```

## Instalasi

### Prasyarat
- Python 3.7+
- Node.js (opsional, untuk testing client)
- xterm.js (untuk frontend)

### Install Dependencies Python
```bash
pip install -r requirements.txt
```

## Cara Menggunakan

### Menjalankan Server
```bash
python server.py
```

Server akan berjalan di `ws://0.0.0.0:8080` (default)

### Konfigurasi
Edit file `config.ini` untuk menyesuaikan:
- Port dan host server
- Buffer size I/O
- Shell default
- Security settings
- Logging configuration

### Menggunakan Client JavaScript

```html
<!DOCTYPE html>
<html>
<head>
    <title>Terminal Tunnel</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterm@5.1.0/css/xterm.css" />
</head>
<body>
    <div id="terminal" style="width: 800px; height: 600px;"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/xterm@5.1.0/lib/xterm.min.js"></script>
    <script src="client.js"></script>
    <script>
        const client = new TerminalTunnelClient({
            url: 'ws://localhost:8080',
            terminalElement: document.getElementById('terminal')
        });
        
        client.connect().catch(console.error);
    </script>
</body>
</html>
```

## Protokol Komunikasi

### Input (Client → Server)
```json
{
    "type": "input",
    "data": "ls -la\n"
}
```

### Resize Terminal (Client → Server)
```json
{
    "type": "resize",
    "cols": 80,
    "rows": 24
}
```

### Output (Server → Client)
```json
{
    "type": "output",
    "data": "total 0\ndrwxr-xr-x ..."
}
```

## Fitur
- ✅ Pseudo-terminal (PTY) support
- ✅ WebSocket communication
- ✅ Terminal resize handling
- ✅ Auto-reconnect pada client
- ✅ Konfigurasi fleksibel via INI file
- ✅ Logging terstruktur
- ✅ Session management
- ✅ Security settings (auth, encryption, timeout)

## Keamanan
- Authentication required (configurable)
- Encryption enabled (gunakan wss:// untuk production)
- Max connections limit
- Session timeout

## Development

### Testing Server
```bash
python server.py
```

Kemudian connect menggunakan:
- Web browser dengan HTML example di atas
- WebSocket client seperti `wscat`: `wscat -c ws://localhost:8080`

## License
Southeast App - All Rights Reserved
