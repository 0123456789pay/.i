        // Aplikasi dengan puluhan menu masing-masing
        const apps = [
            {
                id: 'terminal',
                name: 'Terminal',
                icon: '💻',
                color: '#e94560',
                type: 'terminal'
            },
            {
                id: 'filemanager',
                name: 'File Manager',
                icon: '📁',
                color: '#0f3460',
                type: 'filemanager'
            },
            {
                id: 'browser',
                name: 'Web Browser',
                icon: '🌐',
                color: '#4ecca3',
                type: 'menu',
                menus: [
                    { name: 'Google', desc: 'Search engine', url: 'https://google.com' },
                    { name: 'GitHub', desc: 'Code repository', url: 'https://github.com' },
                    { name: 'Stack Overflow', desc: 'Q&A for developers', url: 'https://stackoverflow.com' },
                    { name: 'MDN Web Docs', desc: 'Web documentation', url: 'https://developer.mozilla.org' },
                    { name: 'W3Schools', desc: 'Web tutorials', url: 'https://w3schools.com' },
                    { name: 'CodePen', desc: 'Online code editor', url: 'https://codepen.io' },
                    { name: 'JSFiddle', desc: 'Code playground', url: 'https://jsfiddle.net' },
                    { name: 'Replit', desc: 'Online IDE', url: 'https://replit.com' },
                    { name: 'Glitch', desc: 'Web app creator', url: 'https://glitch.com' },
                    { name: 'Netlify', desc: 'Web hosting', url: 'https://netlify.com' },
                    { name: 'Vercel', desc: 'Deployment platform', url: 'https://vercel.com' },
                    { name: 'Heroku', desc: 'Cloud platform', url: 'https://heroku.com' },
                    { name: 'AWS', desc: 'Cloud services', url: 'https://aws.amazon.com' },
                    { name: 'Azure', desc: 'Microsoft cloud', url: 'https://azure.microsoft.com' },
                    { name: 'Google Cloud', desc: 'Google cloud', url: 'https://cloud.google.com' }
                ]
            },
            {
                id: 'editor',
                name: 'Code Editor',
                icon: '📝',
                color: '#ffd700',
                type: 'menu',
                menus: [
                    { name: 'New File', desc: 'Create new file' },
                    { name: 'Open File', desc: 'Open existing file' },
                    { name: 'Save', desc: 'Save current file' },
                    { name: 'Save As', desc: 'Save with new name' },
                    { name: 'HTML Template', desc: 'HTML boilerplate' },
                    { name: 'CSS Template', desc: 'CSS starter' },
                    { name: 'JS Template', desc: 'JavaScript starter' },
                    { name: 'Python Template', desc: 'Python starter' },
                    { name: 'JSON Format', desc: 'Format JSON' },
                    { name: 'Minify CSS', desc: 'Compress CSS' },
                    { name: 'Minify JS', desc: 'Compress JavaScript' },
                    { name: 'Beautify Code', desc: 'Format code' },
                    { name: 'Find & Replace', desc: 'Search and replace' },
                    { name: 'Go to Line', desc: 'Navigate to line' },
                    { name: 'Word Count', desc: 'Count words' }
                ]
            },
            {
                id: 'settings',
                name: 'Settings',
                icon: '⚙️',
                color: '#95a5a6',
                type: 'menu',
                menus: [
                    { name: 'Display', desc: 'Screen settings' },
                    { name: 'Sound', desc: 'Audio settings' },
                    { name: 'Notifications', desc: 'Alert settings' },
                    { name: 'Privacy', desc: 'Privacy controls' },
                    { name: 'Security', desc: 'Security options' },
                    { name: 'Updates', desc: 'System updates' },
                    { name: 'Backup', desc: 'Data backup' },
                    { name: 'Restore', desc: 'Restore data' },
                    { name: 'Language', desc: 'System language' },
                    { name: 'Time Zone', desc: 'Time settings' },
                    { name: 'Keyboard', desc: 'Input settings' },
                    { name: 'Mouse', desc: 'Pointer settings' },
                    { name: 'ToucTechHPad', desc: 'Touch settings' },
                    { name: 'Network', desc: 'ConDisplayCorption settings' },
                    { name: 'Remote Origin', desc: 'Git repository config' }
                ]
            },
            {
                id: 'calculator',
                name: 'Calculator',
                icon: '🔢',
                color: '#9b59b6',
                type: 'menu',
                menus: [
                    { name: 'Standard', desc: 'Basic calculations' },
                    { name: 'Scientific', desc: 'Advanced math' },
                    { name: 'Programmer', desc: 'Binary, hex' },
                    { name: 'Date Calc', desc: 'Date calculations' },
                    { name: 'Currency', desc: 'Currency converter' },
                    { name: 'Unit Converter', desc: 'Convert units' },
                    { name: 'Tip Calculator', desc: 'Calculate tips' },
                    { name: 'Loan Calculator', desc: 'Loan payments' },
                    { name: 'Mortgage', desc: 'Mortgage calc' },
                    { name: 'BMI Calculator', desc: 'Body mass index' },
                    { name: 'Percentage', desc: 'Percent calculations' },
                    { name: 'Fraction', desc: 'Fraction math' },
                    { name: 'History', desc: 'Calculation history' },
                    { name: 'Memory', desc: 'Store values' },
                    { name: 'Constants', desc: 'Math constants' }
                ]
            },
            {
                id: 'music',
                name: 'Music Player',
                icon: '🎵',
                color: '#e74c3c',
                type: 'menu',
                menus: [
                    { name: 'Play Library', desc: 'Local music' },
                    { name: 'Playlists', desc: 'Your playlists' },
                    { name: 'Artists', desc: 'Browse artists' },
                    { name: 'Albums', desc: 'Browse albums' },
                    { name: 'Genres', desc: 'By genre' },
                    { name: 'Radio', desc: 'Online radio' },
                    { name: 'Podcasts', desc: 'Podcast library' },
                    { name: 'Equalizer', desc: 'Audio EQ' },
                    { name: 'Lyrics', desc: 'Song lyrics' },
                    { name: 'Download', desc: 'Offline music' },
                    { name: 'Share', desc: 'Share songs' },
                    { name: 'Queue', desc: 'Play queue' },
                    { name: 'Repeat', desc: 'Repeat modes' },
                    { name: 'Shuffle', desc: 'Shuffle play' },
                    { name: 'Sleep Timer', desc: 'Auto stop' }
                ]
            },
            {
                id: 'video',
                name: 'Video Player',
                icon: '🎬',
                color: '#3498db',
                type: 'menu',
                menus: [
                    { name: 'Play Video', desc: 'Open video' },
                    { name: 'Playlist', desc: 'Video list' },
                    { name: 'Subtitles', desc: 'Add subtitles' },
                    { name: 'Audio Track', desc: 'Change audio' },
                    { name: 'Speed', desc: 'Playback speed' },
                    { name: 'Brightness', desc: 'Adjust brightness' },
                    { name: 'Contrast', desc: 'Adjust contrast' },
                    { name: 'Saturation', desc: 'Color saturation' },
                    { name: 'Crop', desc: 'Crop video' },
                    { name: 'Rotate', desc: 'Rotate video' },
                    { name: 'Snapshot', desc: 'Take screenshot' },
                    { name: 'Record', desc: 'Record screen' },
                    { name: 'Stream', desc: 'Stream online' },
                    { name: 'Cast', desc: 'Cast to device' },
                    { name: 'History', desc: 'Watch history' }
                ]
            },
            {
                id: 'image',
                name: 'Image Viewer',
                icon: '🖼️',
                color: '#f39c12',
                type: 'menu',
                menus: [
                    { name: 'Open Image', desc: 'View image' },
                    { name: 'Gallery', desc: 'Image gallery' },
                    { name: 'Slideshow', desc: 'Auto play' },
                    { name: 'Zoom In', desc: 'Enlarge' },
                    { name: 'Zoom Out', desc: 'Shrink' },
                    { name: 'Rotate Left', desc: 'Rotate CCW' },
                    { name: 'Rotate Right', desc: 'Rotate CW' },
                    { name: 'Flip H', desc: 'Flip horizontal' },
                    { name: 'Flip V', desc: 'Flip vertical' },
                    { name: 'Crop', desc: 'Crop image' },
                    { name: 'Resize', desc: 'Change size' },
                    { name: 'Filter', desc: 'Apply filters' },
                    { name: 'Effects', desc: 'Special effects' },
                    { name: 'Convert', desc: 'Format convert' },
                    { name: 'Compress', desc: 'Reduce size' }
                ]
            },
            {
                id: 'notes',
                name: 'Notes',
                icon: '📓',
                color: '#2ecc71',
                type: 'menu',
                menus: [
                    { name: 'New Note', desc: 'Create note' },
                    { name: 'All Notes', desc: 'View all' },
                    { name: 'Folders', desc: 'Organize' },
                    { name: 'Tags', desc: 'Tag notes' },
                    { name: 'Search', desc: 'Find notes' },
                    { name: 'Pin', desc: 'Pin note' },
                    { name: 'Archive', desc: 'Archive notes' },
                    { name: 'Trash', desc: 'Deleted notes' },
                    { name: 'Export', desc: 'Export notes' },
                    { name: 'Import', desc: 'Import notes' },
                    { name: 'Share', desc: 'Share note' },
                    { name: 'Print', desc: 'Print note' },
                    { name: 'Lock', desc: 'Password protect' },
                    { name: 'Backup', desc: 'Cloud backup' },
                    { name: 'Sync', desc: 'Sync devices' }
                ]
            },
            {
                id: 'calendar',
                name: 'Calendar',
                icon: '📅',
                color: '#e67e22',
                type: 'menu',
                menus: [
                    { name: 'Today', desc: "Today's view" },
                    { name: 'Month View', desc: 'Monthly calendar' },
                    { name: 'Week View', desc: 'Weekly calendar' },
                    { name: 'Day View', desc: 'Daily calendar' },
                    { name: 'Add Event', desc: 'Create event' },
                    { name: 'Reminders', desc: 'Set reminders' },
                    { name: 'Tasks', desc: 'Task list' },
                    { name: 'Birthdays', desc: 'Birthday tracker' },
                    { name: 'Holidays', desc: 'Public holidays' },
                    { name: 'Share Calendar', desc: 'Share with others' },
                    { name: 'Import ICS', desc: 'Import calendar' },
                    { name: 'Export ICS', desc: 'Export calendar' },
                    { name: 'Time Zones', desc: 'Multiple zones' },
                    { name: 'Weather', desc: 'Weather forecast' },
                    { name: 'Settings', desc: 'Calendar settings' }
                ]
            },
            {
                id: 'email',
                name: 'Email Client',
                icon: '📧',
                color: '#c0392b',
                type: 'menu',
                menus: [
                    { name: 'Inbox', desc: 'Received emails' },
                    { name: 'Sent', desc: 'Sent emails' },
                    { name: 'Drafts', desc: 'Draft messages' },
                    { name: 'Spam', desc: 'Junk folder' },
                    { name: 'Trash', desc: 'Deleted emails' },
                    { name: 'Compose', desc: 'New email' },
                    { name: 'Reply', desc: 'Reply to email' },
                    { name: 'Forward', desc: 'Forward email' },
                    { name: 'Attach', desc: 'Add attachment' },
                    { name: 'Search', desc: 'Find emails' },
                    { name: 'Filters', desc: 'Email rules' },
                    { name: 'Labels', desc: 'Organize emails' },
                    { name: 'Archive', desc: 'Archive emails' },
                    { name: 'Mark Read', desc: 'Mark as read' },
                    { name: 'Settings', desc: 'Email settings' }
                ]
            },
            {
                id: 'chat',
                name: 'Chat App',
                icon: '💬',
                color: '#1abc9c',
                type: 'menu',
                menus: [
                    { name: 'Messages', desc: 'All chats' },
                    { name: 'Contacts', desc: 'Contact list' },
                    { name: 'Groups', desc: 'Group chats' },
                    { name: 'Channels', desc: 'Channels' },
                    { name: 'Calls', desc: 'Call history' },
                    { name: 'Video Call', desc: 'Video chat' },
                    { name: 'Voice Call', desc: 'Voice chat' },
                    { name: 'Send File', desc: 'Share files' },
                    { name: 'Send Photo', desc: 'Share photos' },
                    { name: 'Emojis', desc: 'Emoji picker' },
                    { name: 'Stickers', desc: 'Sticker pack' },
                    { name: 'GIFs', desc: 'GIF search' },
                    { name: 'Status', desc: 'Status update' },
                    { name: 'Stories', desc: 'View stories' },
                    { name: 'Settings', desc: 'Chat settings' }
                ]
            },
            {
                id: 'games',
                name: 'Games',
                icon: '🎮',
                color: '#8e44ad',
                type: 'menu',
                menus: [
                    { name: 'Chess', desc: 'Classic chess' },
                    { name: 'Checkers', desc: 'Draughts game' },
                    { name: 'Tic Tac Toe', desc: 'X and O' },
                    { name: 'Snake', desc: 'Classic snake' },
                    { name: 'Tetris', desc: 'Block puzzle' },
                    { name: 'Pac-Man', desc: 'Maze game' },
                    { name: 'Space Invaders', desc: 'Shooter game' },
                    { name: 'Breakout', desc: 'Brick breaker' },
                    { name: 'Pong', desc: 'Table tennis' },
                    { name: 'Memory', desc: 'Memory game' },
                    { name: 'Sudoku', desc: 'Number puzzle' },
                    { name: '2048', desc: 'Number game' },
                    { name: 'Minesweeper', desc: 'Mine detector' },
                    { name: 'Solitaire', desc: 'Card game' },
                    { name: 'Blackjack', desc: 'Card game' }
                ]
            },
            {
                id: 'weather',
                name: 'Weather',
                icon: '🌤️',
                color: '#34495e',
                type: 'menu',
                menus: [
                    { name: 'Current Weather', desc: 'Now' },
                    { name: 'Hourly Forecast', desc: 'Next 24 hours' },
                    { name: '7-Day Forecast', desc: 'Week ahead' },
                    { name: 'Radar', desc: 'Weather map' },
                    { name: 'Satellite', desc: 'Cloud images' },
                    { name: 'Temperature', desc: 'Temp details' },
                    { name: 'Humidity', desc: 'Moisture level' },
                    { name: 'Wind', desc: 'Wind speed' },
                    { name: 'Pressure', desc: 'Air pressure' },
                    { name: 'UV Index', desc: 'UV level' },
                    { name: 'Visibility', desc: 'Clear distance' },
                    { name: 'Sunrise', desc: 'Sun times' },
                    { name: 'Moon Phase', desc: 'Lunar cycle' },
                    { name: 'Alerts', desc: 'Weather warnings' },
                    { name: 'Locations', desc: 'Saved places' }
                ]
            }
        ];

        let activeModals = [];
        let currentApp = null;

        // Initialize desktop
        function initDesktop() {
            const desktop = document.getElementById('desktop');
            apps.forEach(app => {
                const icon = document.createElement('div');
                icon.className = 'app-icon';
                icon.innerHTML = `
                    <div class="icon" style="background: ${app.color}">${app.icon}</div>
                    <div class="label">${app.name}</div>
                `;
                icon.onclick = () => openApp(app);
                desktop.appendChild(icon);
            });
        }

        // Update clock
        function updateClock() {
            const now = new Date();
            document.getElementById('clock').textContent = now.toLocaleString('id-ID', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Open application
        function openApp(app) {
            currentApp = app;
            const overlay = document.getElementById('modalOverlay');
            const titleText = document.getElementById('modalTitleText');
            const modalIcon = document.getElementById('modalIcon');
            const modalBody = document.getElementById('modalBody');

            titleText.textContent = app.name;
            modalIcon.textContent = app.icon;

            if (app.type === 'terminal') {
                modalBody.innerHTML = `
                    <div class="terminal-output" id="terminalOutput">
                        <div>SoutheastApp Terminal v1.0</div>
                        <div>Type 'help' for available commands</div>
                        <br>
                        <div id="terminalHistory"></div>
                        <div class="terminal-input-line">
                            <span class="terminal-prompt">user@southeastapp:~$</span>
                            <input type="text" class="terminal-input" id="terminalInput" autofocus>
                        </div>
                    </div>
                `;
                setupTerminal();
            } else if (app.type === 'filemanager') {
                modalBody.innerHTML = `
                    <div style="margin-bottom: 15px;">
                        <button onclick="navigateUp()" style="padding: 8px 15px; background: #e94560; border: none; color: white; border-radius: 5px; cursor: pointer;">⬆️ Up</button>
                        <span id="currentPath" style="margin-left: 10px; color: #aaa;">/southeastapp/.io</span>
                    </div>
                    <div class="file-grid" id="fileGrid"></div>
                `;
                loadFiles('/southeastapp/.io');
            } else if (app.type === 'menu') {
                let menuHTML = '<div class="menu-grid">';
                app.menus.forEach((menu, index) => {
                    menuHTML += `
                        <div class="menu-item" onclick="handleMenuClick('${app.id}', ${index})">
                            <h4>${menu.name}</h4>
                            <p>${menu.desc}</p>
                        </div>
                    `;
                });
                menuHTML += '</div>';
                modalBody.innerHTML = menuHTML;
            }

            overlay.style.display = 'flex';
            
            // Add to taskbar
            addToTaskbar(app);
        }

        // Close modal
        function closeModal() {
            document.getElementById('modalOverlay').style.display = 'none';
            if (currentApp) {
                removeFromTaskbar(currentApp.id);
            }
            currentApp = null;
        }

        // Setup terminal
        function setupTerminal() {
            const input = document.getElementById('terminalInput');
            const output = document.getElementById('terminalHistory');
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const command = input.value.trim();
                    if (command) {
                        processCommand(command, output);
                    }
                    input.value = '';
                }
            });
        }

        // Process terminal commands
        async function processCommand(cmd, output) {
            const cmdLine = document.createElement('div');
            cmdLine.innerHTML = `<span style="color: #e94560;">user@southeastapp:~$</span> ${cmd}`;
            output.appendChild(cmdLine);

            const response = document.createElement('div');
            response.style.marginBottom = '10px';

            if (cmd === 'help') {
                response.innerHTML = `
Available commands:
  help          - Show this help
  ls            - List files
  cat [file]    - Read file
  write [file] [content] - Write file
  rm [file]     - Remove file
  clear         - Clear screen
  pwd           - Print working directory
  mkdir [dir]   - Create directory
`;
            } else if (cmd === 'clear') {
                output.innerHTML = '';
                return;
            } else if (cmd === 'pwd') {
                response.textContent = '/southeastapp/.io';
            } else if (cmd.startsWith('ls')) {
                try {
                    const files = await listFiles('/southeastapp/.io');
                    response.textContent = files.join('\n') || 'Directory empty';
                } catch (e) {
                    response.textContent = 'Error: ' + e.message;
                }
            } else if (cmd.startsWith('cat ')) {
                const filename = cmd.substring(4).trim();
                try {
                    const content = await readFile(filename);
                    response.textContent = content;
                } catch (e) {
                    response.textContent = 'Error: ' + e.message;
                }
            } else if (cmd.startsWith('write ')) {
                const parts = cmd.substring(6).split(' ');
                const filename = parts[0];
                const content = parts.slice(1).join(' ');
                try {
                    await writeFile(filename, content);
                    response.textContent = `File '${filename}' written successfully`;
                } catch (e) {
                    response.textContent = 'Error: ' + e.message;
                }
            } else if (cmd.startsWith('rm ')) {
                const filename = cmd.substring(3).trim();
                try {
                    await deleteFile(filename);
                    response.textContent = `File '${filename}' deleted`;
                } catch (e) {
                    response.textContent = 'Error: ' + e.message;
                }
            } else if (cmd.startsWith('mkdir ')) {
                const dirname = cmd.substring(6).trim();
                try {
                    await createDirectory(dirname);
                    response.textContent = `Directory '${dirname}' created`;
                } catch (e) {
                    response.textContent = 'Error: ' + e.message;
                }
            } else {
                response.textContent = `Command not found: ${cmd}. Type 'help' for available commands.`;
            }

            output.appendChild(response);
            document.getElementById('terminalOutput').scrollTop = document.getElementById('terminalOutput').scrollHeight;
        }

        // File system operations using IndexedDB
        const DB_NAME = 'SoutheastAppFS';
        const DB_VERSION = 1;

        function openDB() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(DB_NAME, DB_VERSION);
                request.onupgradeneeded = (e) => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains('files')) {
                        db.createObjectStore('files', { keyPath: 'path' });
                    }
                };
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }

        async function listFiles(dir) {
            const db = await openDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction('files', 'readonly');
                const store = tx.objectStore('files');
                const request = store.getAll();
                request.onsuccess = () => {
                    const files = request.result.filter(f => f.path.startsWith(dir));
                    resolve(files.map(f => f.path.replace(dir + '/', '')));
                };
                request.onerror = () => reject(request.error);
            });
        }

        async function readFile(filename) {
            const db = await openDB();
            const path = `/southeastapp/.io/${filename}`;
            return new Promise((resolve, reject) => {
                const tx = db.transaction('files', 'readonly');
                const store = tx.objectStore('files');
                const request = store.get(path);
                request.onsuccess = () => {
                    if (request.result) {
                        resolve(request.result.content);
                    } else {
                        reject(new Error('File not found'));
                    }
                };
                request.onerror = () => reject(request.error);
            });
        }

        async function writeFile(filename, content) {
            const db = await openDB();
            const path = `/southeastapp/.io/${filename}`;
            return new Promise((resolve, reject) => {
                const tx = db.transaction('files', 'readwrite');
                const store = tx.objectStore('files');
                const request = store.put({ path, content, type: 'file', modified: new Date() });
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        }

        async function deleteFile(filename) {
            const db = await openDB();
            const path = `/southeastapp/.io/${filename}`;
            return new Promise((resolve, reject) => {
                const tx = db.transaction('files', 'readwrite');
                const store = tx.objectStore('files');
                const request = store.delete(path);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        }

        async function createDirectory(dirname) {
            const db = await openDB();
            const path = `/southeastapp/.io/${dirname}`;
            return new Promise((resolve, reject) => {
                const tx = db.transaction('files', 'readwrite');
                const store = tx.objectStore('files');
                const request = store.put({ path, type: 'directory', modified: new Date() });
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        }

        // File Manager functions
        let currentPath = '/southeastapp/.io';

        async function loadFiles(path) {
            currentPath = path;
            document.getElementById('currentPath').textContent = path;
            const grid = document.getElementById('fileGrid');
            grid.innerHTML = '';

            try {
                const files = await listFiles(path);
                
                // Add parent directory if not root
                if (path !== '/southeastapp/.io') {
                    const parentItem = document.createElement('div');
                    parentItem.className = 'file-item';
                    parentItem.innerHTML = `
                        <div class="file-icon">📁</div>
                        <div class="file-name">..</div>
                    `;
                    parentItem.onclick = navigateUp;
                    grid.appendChild(parentItem);
                }

                files.forEach(file => {
                    const item = document.createElement('div');
                    item.className = 'file-item';
                    item.innerHTML = `
                        <div class="file-icon">📄</div>
                        <div class="file-name">${file}</div>
                    `;
                    item.onclick = () => openFile(file);
                    grid.appendChild(item);
                });
            } catch (e) {
                grid.innerHTML = '<div style="color: #e94560;">Error loading files: ' + e.message + '</div>';
            }
        }

        function navigateUp() {
            const parts = currentPath.split('/').filter(p => p);
            parts.pop();
            const newPath = '/' + parts.join('/');
            if (newPath.startsWith('/southeastapp')) {
                loadFiles(newPath);
            }
        }

        function openFile(filename) {
            alert(`Opening file: ${filename}\n(In full implementation, this would show file content or open in appropriate app)`);
        }

        // Taskbar functions
        function addToTaskbar(app) {
            const taskbar = document.getElementById('taskbarApps');
            const existing = document.getElementById(`taskbar-${app.id}`);
            
            if (!existing) {
                const item = document.createElement('div');
                item.className = 'taskbar-item active';
                item.id = `taskbar-${app.id}`;
                item.innerHTML = `<span>${app.icon}</span><span>${app.name}</span>`;
                item.onclick = () => {
                    if (currentApp && currentApp.id === app.id) {
                        closeModal();
                    } else {
                        openApp(app);
                    }
                };
                taskbar.appendChild(item);
            }
        }

        function removeFromTaskbar(appId) {
            const item = document.getElementById(`taskbar-${appId}`);
            if (item) {
                item.remove();
            }
        }

        // Menu click handler
        function handleMenuClick(appId, menuIndex) {
            const app = apps.find(a => a.id === appId);
            if (app && app.menus[menuIndex]) {
                const menu = app.menus[menuIndex];
                
                // Handle Remote Origin special case
                if (appId === 'settings' && menu.name === 'Remote Origin') {
                    openRemoteOriginManager();
                    return;
                }
                
                if (menu.url) {
                    window.open(menu.url, '_blank');
                } else {
                    alert(`${app.name} - ${menu.name}\n${menu.desc}\n\n(Full functionality would be implemented here)`);
                }
            }
        }

        // Remote Origin Manager
        function openRemoteOriginManager() {
            const modalBody = document.getElementById('modalBody');
            const savedOrigin = localStorage.getItem('gitRemoteOrigin') || '';
            const savedBranch = localStorage.getItem('gitBranch') || 'main';
            
            modalBody.innerHTML = `
                <div style="max-width: 600px; margin: 0 auto;">
                    <h3 style="color: #e94560; margin-bottom: 20px;">🔗 Remote Repository Configuration</h3>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #aaa;">Remote Origin URL:</label>
                        <input type="text" id="remoteOriginInput" value="${savedOrigin}" 
                            placeholder="https://github.com/southeastapp/.io.git"
                            style="width: 100%; padding: 12px; background: #0f3460; border: 2px solid #e94560; color: white; border-radius: 8px; font-family: monospace;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #aaa;">Default Branch:</label>
                        <input type="text" id="branchInput" value="${savedBranch}" 
                            placeholder="main"
                            style="width: 100%; padding: 12px; background: #0f3460; border: 2px solid #e94560; color: white; border-radius: 8px; font-family: monospace;">
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                        <button onclick="saveRemoteConfig()" 
                            style="flex: 1; padding: 12px; background: #e94560; border: none; color: white; border-radius: 8px; cursor: pointer; font-weight: bold;">
                            💾 Save Configuration
                        </button>
                        <button onclick="simulateGitPush()" 
                            style="flex: 1; padding: 12px; background: #4ecca3; border: none; color: #1a1a2e; border-radius: 8px; cursor: pointer; font-weight: bold;">
                            🚀 Simulate Push
                        </button>
                    </div>
                    
                    <div style="background: #0a0a1a; padding: 15px; border-radius: 8px; border: 1px solid #333;">
                        <h4 style="color: #4ecca3; margin-bottom: 10px;">📋 Git Status</h4>
                        <div id="gitStatus" style="font-family: monospace; font-size: 12px; color: #aaa;">
                            ${savedOrigin ? `✅ Remote configured: ${savedOrigin}<br>📍 Branch: ${savedBranch}` : '⚠️ No remote configured'}
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 15px; background: rgba(233, 69, 96, 0.1); border-radius: 8px; border-left: 4px solid #e94560;">
                        <h4 style="color: #e94560; margin-bottom: 10px;">ℹ️ How to Publish</h4>
                        <ol style="color: #aaa; font-size: 13px; line-height: 1.8;">
                            <li>Save your remote origin URL above</li>
                            <li>Click "Simulate Push" to test conDisplayCorption</li>
                            <li>Run in terminal:<br><code style="background: #0a0a1a; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: 5px;">git remote add origin ${savedOrigin || '<your-repo-url>'}</code></li>
                            <li>Push to GitHub:<br><code style="background: #0a0a1a; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: 5px;">git push -u origin ${savedBranch || 'main'}</code></li>
                            <li>Create Pull Request on GitHub</li>
                            <li>Enable GitHub Pages in repository settings</li>
                        </ol>
                    </div>
                </div>
            `;
        }

        function saveRemoteConfig() {
            const origin = document.getElementById('remoteOriginInput').value.trim();
            const branch = document.getElementById('branchInput').value.trim();
            
            if (!origin) {
                alert('Please enter a valid remote origin URL');
                return;
            }
            
            localStorage.setItem('gitRemoteOrigin', origin);
            localStorage.setItem('gitBranch', branch || 'main');
            
            document.getElementById('gitStatus').innerHTML = `✅ Remote configured: ${origin}<br>📍 Branch: ${branch || 'main'}`;
            
            // Log to terminal if open
            logToTerminal(`[GIT] Remote origin saved: ${origin}`);
            
            alert(`✅ Configuration saved!\nRemote: ${origin}\nBranch: ${branch || 'main'}`);
        }

        function simulateGitPush() {
            const origin = localStorage.getItem('gitRemoteOrigin');
            const branch = localStorage.getItem('gitBranch') || 'main';
            
            if (!origin) {
                alert('⚠️ Please configure remote origin first!');
                return;
            }
            
            const output = document.getElementById('gitStatus');
            output.innerHTML += `<br><br>🔄 Simulating push...`;
            
            setTimeout(() => {
                output.innerHTML += `<br>📦 Counting objects...`;
            }, 500);
            
            setTimeout(() => {
                output.innerHTML += `<br>✏️  Writing objects...`;
            }, 1000);
            
            setTimeout(() => {
                output.innerHTML += `<br>📤 Pushing to ${origin}...`;
            }, 1500);
            
            setTimeout(() => {
                output.innerHTML += `<br><br>✅ <strong style="color: #4ecca3;">Push simulated successfully!</strong>`;
                output.innerHTML += `<br>📍 Branch: ${branch}`;
                output.innerHTML += `<br>🔗 Ready for Pull Request`;
                
                logToTerminal(`[GIT] Push simulated to ${origin} (${branch})`);
                
                alert(`✅ Push simulation complete!\n\nIn a real environment, this would:\n1. Push changes to ${origin}\n2. Create/update branch ${branch}\n3. Be ready for merge via Pull Request`);
            }, 2500);
        }

        function logToTerminal(message) {
            console.log(message);
            // If terminal is open, we could append to it
            // This is a simplified version
        }

        // Toggle start menu (for future expansion)
        function toggleStartMenu() {
            alert('Start Menu\n\nAll applications are already visible on the desktop.\nClick any app icon to open it.');
        }

        // Initialize
        initDesktop();
        updateClock();
        setInterval(updateClock, 1000);

        // Close modal when clicking overlay
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'modalOverlay') {
                closeModal();
            }
        });
    </script>
