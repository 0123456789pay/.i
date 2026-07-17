/``
 ` File Manager - Main JavaScript
 ` @version 1.0.0
 `/

(function() {
    'use strict';

    // === CONFIGURATION ===
    const CONFIG = {
        name: 'file-manager',
        version: '1.0.0',
        rootPath: '/workspace/filemanajer'
    };

    // === STATE ===
    let state = {
        currentPath: CONFIG.rootPath + '/Demo folder/Office/Word files',
        selectedFiles: new Set(),
        viewMode: 'grid', // 'grid' or 'list'
        files: [],
        folders: [],
        isInitialized: false
    };

    // === FILE DATA (Simulated) ===
    const fileData = [
        { name: 'DOC sample.doc', type: 'doc', size: '245 KB', date: '2024-01-15', path: 'Word files' },
        { name: 'DOCX sample.docx', type: 'docx', size: '312 KB', date: '2024-01-16', path: 'Word files' },
        { name: 'Document1.docx', type: 'docx', size: '189 KB', date: '2024-01-17', path: 'Word files' },
        { name: 'Report.doc', type: 'doc', size: '567 KB', date: '2024-01-18', path: 'Word files' },
        { name: 'Data.xlsx', type: 'xlsx', size: '423 KB', date: '2024-01-14', path: 'Excel files' },
        { name: 'Budget.xls', type: 'xls', size: '298 KB', date: '2024-01-13', path: 'Excel files' },
        { name: 'photo.jpg', type: 'jpg', size: '2.3 MB', date: '2024-01-12', path: 'Images' },
        { name: 'image.png', type: 'png', size: '1.8 MB', date: '2024-01-11', path: 'Images' },
        { name: 'document.pdf', type: 'pdf', size: '1.2 MB', date: '2024-01-10', path: 'PDFs' }
    ];

    // === DOM ELEMENTS ===
    let elements = {};

    // === INITIALIZATION ===
    function init() {
        console.log('[File Manager] Initializing...');
        
        cacheElements();
        bindEvents();
        renderFiles();
        updateBreadcrumb();
        
        state.isInitialized = true;
        dispatch('init', {});
        
        console.log('[File Manager] Initialized successfully');
    }

    // === CACHE DOM ELEMENTS ===
    function cacheElements() {
        elements = {
            // Header
            searchInput: document.querySelector('.search-input'),
            
            // Toolbar
            breadcrumb: document.querySelector('.breadcrumb'),
            gridViewBtn: document.querySelector('.view-btn[data-view="grid"]'),
            listViewBtn: document.querySelector('.view-btn[data-view="list"]'),
            
            // Content
            fileGrid: document.querySelector('.file-grid'),
            fileList: document.querySelector('.file-list'),
            uploadZone: document.querySelector('.upload-zone'),
            
            // Dropdowns
            newDropdown: document.querySelector('#newDropdown'),
            adminDropdown: document.querySelector('#adminDropdown'),
            viewEditDropdown: document.querySelector('#viewEditDropdown'),
            
            // Context Menu
            contextMenu: document.querySelector('.context-menu'),
            
            // Sidebar
            sidebar: document.querySelector('.sidebar'),
            
            // Modal
            modalOverlay: document.querySelector('.modal-overlay'),
            modalTitle: document.querySelector('.modal-title'),
            modalBody: document.querySelector('.modal-body'),
            modalConfirmBtn: document.querySelector('.modal-confirm'),
            modalCancelBtn: document.querySelector('.modal-cancel')
        };
    }

    // === BIND EVENTS ===
    function bindEvents() {
        // Search
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', handleSearch);
        }

        // View Toggle
        if (elements.gridViewBtn) {
            elements.gridViewBtn.addEventListener('click', () => setViewMode('grid'));
        }
        if (elements.listViewBtn) {
            elements.listViewBtn.addEventListener('click', () => setViewMode('list'));
        }

        // Dropdowns
        setupDropdown('newDropdown');
        setupDropdown('adminDropdown');
        setupDropdown('viewEditDropdown');

        // Upload Zone
        if (elements.uploadZone) {
            setupUploadZone();
        }

        // Context Menu
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', hideContextMenu);

        // Keyboard Shortcuts
        document.addEventListener('keydown', handleKeyboard);

        // Modal
        if (elements.modalOverlay) {
            elements.modalCancelBtn?.addEventListener('click', hideModal);
            elements.modalConfirmBtn?.addEventListener('click', handleModalConfirm);
            elements.modalOverlay.addEventListener('click', (e) => {
                if (e.target === elements.modalOverlay) hideModal();
            });
        }

        // Breadcrumb clicks
        document.addEventListener('click', handleBreadcrumbClick);

        // File selection
        document.addEventListener('click', handleFileSelection);

        // Sidebar menu
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', handleSidebarClick);
        });
    }

    // === DROPDOWN SETUP ===
    function setupDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) return;

        const button = dropdown.closest('.dropdown')?.querySelector('.btn');
        const menu = dropdown;

        if (button && menu) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleDropdown(menu);
            });

            menu.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleDropdownAction(item.dataset.action);
                    hideAllDropdowns();
                });
            });
        }
    }

    function toggleDropdown(menu) {
        const isVisible = menu.classList.contains('show');
        hideAllDropdowns();
        if (!isVisible) {
            menu.classList.add('show');
        }
    }

    function hideAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }

    // === FILE RENDERING ===
    function renderFiles(filter = '') {
        const filteredFiles = fileData.filter(file => 
            file.name.toLowerCase().includes(filter.toLowerCase())
        );

        renderGridView(filteredFiles);
        renderListView(filteredFiles);
    }

    function renderGridView(files) {
        if (!elements.fileGrid) return;

        elements.fileGrid.innerHTML = files.map((file, index) => `
            <div class="file-card" data-file="${index}" data-name="${file.name}">
                <input type="checkbox" class="file-checkbox" data-file="${index}">
                <div class="file-thumbnail">
                    <i class="fas fa-file-${getFileIcon(file.type)} ${file.type}-icon"></i>
                </div>
                <div class="file-name">${file.name}</div>
            </div>
        `).join('');

        // Add click handlers
        elements.fileGrid.querySelectorAll('.file-card').forEach(card => {
            card.addEventListener('click', (e) => handleFileCardClick(e, card));
        });

        elements.fileGrid.querySelectorAll('.file-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => handleCheckboxChange(e, checkbox));
        });
    }

    function renderListView(files) {
        if (!elements.fileList) return;

        const listContent = elements.fileList.querySelector('.file-list-content');
        if (!listContent) return;

        listContent.innerHTML = files.map((file, index) => `
            <div class="file-list-item" data-file="${index}" data-name="${file.name}">
                <input type="checkbox" class="file-checkbox" data-file="${index}">
                <div class="file-list-name">
                    <i class="fas fa-file-${getFileIcon(file.type)} file-list-icon ${file.type}-icon"></i>
                    <span>${file.name}</span>
                </div>
                <div class="file-list-size">${file.size}</div>
                <div class="file-list-date">${file.date}</div>
            </div>
        `).join('');

        // Add click handlers
        listContent.querySelectorAll('.file-list-item').forEach(item => {
            item.addEventListener('click', (e) => handleFileCardClick(e, item));
        });

        listContent.querySelectorAll('.file-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => handleCheckboxChange(e, checkbox));
        });
    }

    function getFileIcon(type) {
        const icons = {
            doc: 'word',
            docx: 'word',
            xls: 'excel',
            xlsx: 'excel',
            pdf: 'pdf',
            jpg: 'image',
            jpeg: 'image',
            png: 'image',
            zip: 'archive',
            txt: 'alt'
        };
        return icons[type] || 'file';
    }

    // === VIEW MODE ===
    function setViewMode(mode) {
        state.viewMode = mode;

        if (elements.gridViewBtn) {
            elements.gridViewBtn.classList.toggle('active', mode === 'grid');
        }
        if (elements.listViewBtn) {
            elements.listViewBtn.classList.toggle('active', mode === 'grid');
        }

        if (elements.fileGrid) {
            elements.fileGrid.style.display = mode === 'grid' ? 'grid' : 'none';
        }
        if (elements.fileList) {
            elements.fileList.classList.toggle('show', mode === 'list');
        }
    }

    // === FILE SELECTION ===
    function handleFileCardClick(e, card) {
        if (e.target.classList.contains('file-checkbox')) return;

        const index = card.dataset.file;
        const checkbox = card.querySelector('.file-checkbox');

        if (e.ctrlKey || e.metaKey) {
            checkbox.checked = !checkbox.checked;
            toggleFileSelection(index, checkbox.checked);
        } else {
            // Clear other selections
            document.querySelectorAll('.file-checkbox').forEach(cb => {
                if (cb !== checkbox) {
                    cb.checked = false;
                    const parent = cb.closest('.file-card, .file-list-item');
                    if (parent) parent.classList.remove('selected');
                }
            });
            
            checkbox.checked = true;
            state.selectedFiles.clear();
            toggleFileSelection(index, true);
        }
    }

    function handleCheckboxChange(e, checkbox) {
        const index = checkbox.dataset.file;
        toggleFileSelection(index, checkbox.checked);
    }

    function toggleFileSelection(index, isSelected) {
        const file = fileData[index];
        if (!file) return;

        const cards = document.querySelectorAll(`[data-file="${index}"]`);
        cards.forEach(card => {
            const parent = card.closest('.file-card, .file-list-item');
            if (parent) {
                parent.classList.toggle('selected', isSelected);
            }
        });

        if (isSelected) {
            state.selectedFiles.add(index);
        } else {
            state.selectedFiles.delete(index);
        }

        updateSelectionUI();
    }

    function updateSelectionUI() {
        const count = state.selectedFiles.size;
        console.log(`[File Manager] ${count} file(s) selected`);
    }

    // === SEARCH ===
    function handleSearch(e) {
        const query = e.target.value.trim();
        renderFiles(query);
    }

    // === CONTEXT MENU ===
    function handleContextMenu(e) {
        e.preventDefault();
        
        if (elements.contextMenu) {
            elements.contextMenu.style.left = `${e.clientX}px`;
            elements.contextMenu.style.top = `${e.clientY}px`;
            elements.contextMenu.classList.add('show');
        }
    }

    function hideContextMenu() {
        if (elements.contextMenu) {
            elements.contextMenu.classList.remove('show');
        }
    }

    // === UPLOAD ZONE ===
    function setupUploadZone() {
        if (!elements.uploadZone) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            elements.uploadZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            elements.uploadZone.addEventListener(eventName, () => {
                elements.uploadZone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            elements.uploadZone.addEventListener(eventName, () => {
                elements.uploadZone.classList.remove('dragover');
            }, false);
        });

        elements.uploadZone.addEventListener('drop', handleDrop, false);
        elements.uploadZone.addEventListener('click', handleUploadClick);
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleUploadClick() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = (e) => handleFiles(e.target.files);
        input.click();
    }

    function handleFiles(files) {
        console.log('[File Manager] Files to upload:', files);
        showModal('Upload Files', `${files.length} file(s) will be uploaded.`, true);
    }

    // === BREADCRUMB ===
    function updateBreadcrumb() {
        if (!elements.breadcrumb) return;

        const pathParts = state.currentPath.replace(CONFIG.rootPath, '').split('/').filter(p => p);
        const basePath = CONFIG.rootPath;

        let html = `<a href="#" class="breadcrumb-item" data-path="${basePath}"><i class="fas fa-home"></i></a>`;
        
        let accumulatedPath = basePath;
        pathParts.forEach((part, index) => {
            accumulatedPath += '/' + part;
            const isLast = index === pathParts.length - 1;
            html += `<span class="breadcrumb-separator">/</span>`;
            html += `<a href="#" class="breadcrumb-item ${isLast ? 'current' : ''}" 
                        data-path="${accumulatedPath}">${part}</a>`;
        });

        elements.breadcrumb.innerHTML = html;
    }

    function handleBreadcrumbClick(e) {
        const link = e.target.closest('.breadcrumb-item');
        if (!link) return;

        e.preventDefault();
        const path = link.dataset.path;
        if (path) {
            state.currentPath = path;
            updateBreadcrumb();
            console.log('[File Manager] Navigated to:', path);
        }
    }

    // === SIDEBAR ===
    function handleSidebarClick(e) {
        const item = e.currentTarget;
        const action = item.dataset.action;
        
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        if (action) {
            handleSidebarAction(action);
        }
    }

    function handleSidebarAction(action) {
        console.log('[File Manager] Sidebar action:', action);
        
        const actions = {
            'share': () => showModal('Share', 'Share selected files with others.'),
            'download': () => downloadSelected(),
            'delete': () => showModal('Delete', 'Are you sure you want to delete selected files?', true),
            'rename': () => showModal('Rename', 'Enter new name:'),
            'copy': () => console.log('Copy to clipboard'),
            'cut': () => console.log('Cut to clipboard'),
            'select-all': () => selectAllFiles()
        };

        if (actions[action]) {
            actions[action]();
        }
    }

    function selectAllFiles() {
        document.querySelectorAll('.file-checkbox').forEach((cb, index) => {
            cb.checked = true;
            toggleFileSelection(index.toString(), true);
        });
    }

    function downloadSelected() {
        const count = state.selectedFiles.size;
        if (count === 0) {
            alert('Please select files to download');
            return;
        }
        console.log(`[File Manager] Downloading ${count} file(s)`);
    }

    // === KEYBOARD SHORTCUTS ===
    function handleKeyboard(e) {
        // Delete key
        if (e.key === 'Delete' && state.selectedFiles.size > 0) {
            e.preventDefault();
            showModal('Delete', 'Are you sure you want to delete selected files?', true);
        }

        // F2 for rename
        if (e.key === 'F2' && state.selectedFiles.size === 1) {
            e.preventDefault();
            showModal('Rename', 'Enter new name:');
        }

        // Ctrl+A for select all
        if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
            e.preventDefault();
            selectAllFiles();
        }

        // Escape to deselect
        if (e.key === 'Escape') {
            state.selectedFiles.clear();
            document.querySelectorAll('.file-checkbox').forEach(cb => cb.checked = false);
            document.querySelectorAll('.file-card, .file-list-item').forEach(card => {
                card.classList.remove('selected');
            });
            hideAllDropdowns();
            hideContextMenu();
        }
    }

    // === MODAL ===
    function showModal(title, body, isConfirm = false) {
        if (!elements.modalOverlay) return;

        elements.modalTitle.textContent = title;
        elements.modalBody.textContent = body;
        
        if (elements.modalConfirmBtn) {
            elements.modalConfirmBtn.style.display = isConfirm ? 'block' : 'none';
        }
        
        elements.modalOverlay.classList.add('show');
    }

    function hideModal() {
        if (elements.modalOverlay) {
            elements.modalOverlay.classList.remove('show');
        }
    }

    function handleModalConfirm() {
        const title = elements.modalTitle?.textContent;
        
        if (title === 'Delete') {
            deleteSelectedFiles();
        } else if (title === 'Upload Files') {
            console.log('[File Manager] Upload confirmed');
        }
        
        hideModal();
    }

    function deleteSelectedFiles() {
        console.log('[File Manager] Deleting selected files:', Array.from(state.selectedFiles));
        state.selectedFiles.clear();
        renderFiles();
    }

    // === DROPDOWN ACTIONS ===
    function handleDropdownAction(action) {
        console.log('[File Manager] Dropdown action:', action);
        
        const actions = {
            'view-browser': () => console.log('View in browser'),
            'download': () => downloadSelected(),
            'edit-ms-office': () => console.log('Edit in MS Office'),
            'edit-ms-office-online': () => console.log('Edit in MS Office Online'),
            'edit-office-365': () => console.log('Edit in Office 365'),
            'edit-openoffice': () => console.log('Edit in OpenOffice/LibreOffice'),
            'view-office-web': () => console.log('View in Office Web Apps'),
            'edit-google-drive': () => console.log('Edit in Google Drive'),
            'view-google-docs': () => console.log('View in Google Docs'),
            'view-box': () => console.log('View in Box'),
            'edit-zoho': () => console.log('Edit in Zoho'),
            'convert-cloudconvert': () => console.log('Convert with CloudConvert'),
            'edit-text': () => console.log('Edit as text file')
        };

        if (actions[action]) {
            actions[action]();
        }
    }

    // === EVENT BUS ===
    const listeners = [];

    function subscribe(event, callback) {
        listeners.push({ event, callback });
        return () => unsubscribe(event, callback);
    }

    function unsubscribe(event, callback) {
        const index = listeners.findIndex(l => l.event === event && l.callback === callback);
        if (index > -1) listeners.splice(index, 1);
    }

    function dispatch(event, payload) {
        listeners
            .filter(l => l.event === event)
            .forEach(l => l.callback(payload));
    }

    // === PUBLIC API ===
    const publicAPI = {
        init,
        subscribe,
        unsubscribe,
        dispatch,
        getConfig: () => ({ ...CONFIG }),
        getState: (key) => key ? state[key] : { ...state },
        isInitialized: () => state.isInitialized
    };

    // Register globally
    if (typeof window !== 'undefined') {
        window.FileManager = publicAPI;
    }

    // Auto-init on DOM ready
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

})();
