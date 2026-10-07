#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script untuk mengupdate semua file index.html di folder .digital
dengan navigasi berbahasa Indonesia dan submenu yang relevan
"""

import os
import re
from pathlib import Path

def get_submenu_items(folder_name):
    """Generate submenu items based on folder name"""
    # Hapus ekstensi .digital dan normalisasi nama
    base_name = folder_name.replace('.digital', '').lower()
    
    # pemetaan kategori berdasarkan kata kunci
    menu_mapping = {
        'shop': ['Kelola Produk', 'Pesanan Masuk', 'Statistik Penjualan', 'Promosi & Diskon', 'Pengaturan Toko'],
        'news': ['Berita Terbaru', 'Nasional', 'Internasional', 'Olahraga', 'Hiburan'],
        'video': ['Streaming Langsung', 'Video On Demand', 'Playlist', 'Upload Video', 'Analitik Video'],
        'foto': ['Galeri Foto', 'Album', 'Edit Foto', 'Upload Batch', 'Berbagi Media'],
        'musik': ['Daftar Putar', 'Artis', 'Album', 'Radio Online', 'Download Musik'],
        'blog': ['Tulis Artikel', 'Draft', 'Kategori', 'Komentar', 'SEO Blog'],
        'forum': ['Diskusi Terbaru', 'Topik Populer', 'Anggota', 'Pengumuman', 'Moderasi'],
        'chat': ['Pesan Langsung', 'Grup Chat', 'Riwayat', 'Kontak', 'Status Online'],
        'cloud': ['File Saya', 'Upload', 'Berbagi File', 'Sinkronisasi', 'Backup Otomatis'],
        'security': ['Keamanan Akun', '2FA', 'Log Akses', 'Enkripsi Data', 'Pemulihan Akun'],
        'analytics': ['Dashboard Data', 'Laporan Trafik', 'Konversi', 'Perilaku User', 'Export Data'],
        'seo': ['Audit SEO', 'Kata Kunci', 'Backlink', 'Ranking', 'Optimasi Konten'],
        'api': ['Dokumentasi API', 'API Keys', 'Rate Limits', 'Webhooks', 'Testing Endpoint'],
        'payment': ['Metode Pembayaran', 'Riwayat Transaksi', 'Invoice', 'Refund', 'Subscription'],
        'user': ['Profil Pengguna', 'Edit Profil', 'Privasi', 'Notifikasi', 'Hapus Akun'],
        'admin': ['Panel Admin', 'Manajemen User', 'Konfigurasi Sistem', 'Log Sistem', 'Backup Database'],
        'media': ['Library Media', 'Transcoding', 'CDN Settings', 'Watermark', 'Thumbnail Generator'],
        'event': ['Kalender Event', 'Registrasi', 'Tiket', 'Live Streaming', 'Rekaman Event'],
        'market': ['Produk Digital', 'License Keys', 'Affiliate', 'Review Produk', 'Pencairan Dana'],
        'support': ['Tiket Bantuan', 'FAQ', 'Live Chat Support', 'Knowledge Base', 'Feedback'],
        'setting': ['Konfigurasi Umum', 'Email Settings', 'SMTP', 'Template Email', 'Integrasi'],
        'template': ['Pilih Tema', 'Custom CSS', 'Layout Builder', 'Widget', 'Preview'],
        'plugin': ['Plugin Aktif', 'Tambah Plugin', 'Update Plugin', 'Konfigurasi', 'Developer Mode'],
        'database': ['Query Builder', 'Migration', 'Backup', 'Restore', 'Optimasi DB'],
        'cache': ['Cache Settings', 'Clear Cache', 'Redis Config', 'Memcached', 'Performance'],
        'log': ['System Logs', 'Error Logs', 'Access Logs', 'Audit Trail', 'Export Logs'],
        'backup': ['Jadwal Backup', 'Backup Cloud', 'Restore Point', 'Incremental', 'Verifikasi'],
        'monitor': ['Uptime Monitor', 'Alert System', 'Performance Graph', 'Health Check', 'Notifications'],
        'deploy': ['Deployment', 'CI/CD Pipeline', 'Rollback', 'Staging', 'Production'],
        'domain': ['Manajemen Domain', 'DNS Settings', 'SSL Certificate', 'Subdomain', 'Redirect'],
        'email': ['Inbox', 'Compose', 'Contacts', 'Filters', 'Auto Responder'],
        'calendar': ['Agenda', 'Meeting', 'Reminder', 'Sharing Calendar', 'Import Export'],
        'task': ['Daftar Tugas', 'Prioritas', 'Deadline', 'Team Tasks', 'Progress Tracking'],
        'project': ['Overview Project', 'Milestone', 'Team Member', 'Budget', 'Timeline'],
        'invoice': ['Buat Invoice', 'Template', 'Pengiriman', 'Pembayaran', 'Laporan'],
        'contract': ['Draft Kontrak', 'Tanda Tangan Digital', 'Arsip', 'Renewal', 'Template'],
        'hr': ['Data Karyawan', 'Absensi', 'Payroll', 'Cuti', 'Performance Review'],
        'inventory': ['Stok Barang', 'Supplier', 'Purchase Order', 'Stock Opname', 'Alert Stok'],
        'crm': ['Leads', 'Pipeline', 'Customer Data', 'Follow Up', 'Sales Report'],
        'pos': ['Kasir', 'Transaksi', 'Shift', 'Laporan Harian', 'Integrasi Payment'],
        'restaurant': ['Menu Makanan', 'Order Dine-in', 'Takeaway', 'Kitchen Display', 'Reservation'],
        'hotel': ['Booking', 'Check-in/out', 'Room Status', 'Housekeeping', 'Guest Profile'],
        'school': ['Data Siswa', 'Nilai', 'Jadwal', 'Presensi', 'E-Learning'],
        'library': ['Katalog Buku', 'Peminjaman', 'Pengembalian', 'Member', 'E-Book'],
        'health': ['Rekam Medis', 'Janji Temu', 'Resep', 'Lab Results', 'Telemedicine'],
        'fitness': ['Workout Plan', 'Progress Tracking', 'Nutrition', 'Trainer', 'Class Schedule'],
        'travel': ['Booking Tiket', 'Hotel', 'Paket Wisata', 'Itinerary', 'Review'],
        'realestate': ['Listing Properti', 'Virtual Tour', 'Agent', 'Mortgage', 'Contract'],
        'automotive': ['Inventory Kendaraan', 'Service Booking', 'Spare Parts', 'Test Drive', 'Financing'],
        'fashion': ['Koleksi', 'Size Guide', 'Virtual Try-on', 'Wishlist', 'Style Tips'],
        'food': ['Resep', 'Meal Plan', 'Grocery List', 'Nutrition Info', 'Cooking Videos'],
        'gaming': ['Game Library', 'Achievements', 'Multiplayer', 'Leaderboard', 'Streaming'],
        'crypto': ['Wallet', 'Exchange', 'Portfolio', 'Mining', 'NFT Marketplace'],
        'blockchain': ['Smart Contract', 'Token', 'DeFi', 'Staking', 'Governance'],
        'ai': ['Model AI', 'Training Data', 'Inference', 'Fine Tuning', 'API Access'],
        'ml': ['Dataset', 'Model Training', 'Evaluation', 'Deployment', 'Monitoring'],
        'iot': ['Device Management', 'Sensor Data', 'Automation', 'Alerts', 'Dashboard'],
        'vr': ['VR Experience', '360 Video', 'Avatar', 'World Building', 'Social VR'],
        'ar': ['AR Filter', 'Object Recognition', 'Navigation', 'Education', 'Shopping'],
        'robot': ['Robot Control', 'Path Planning', 'Vision System', 'Task Queue', 'Logs'],
        'drone': ['Flight Plan', 'Live Feed', 'Mission Log', 'Mapping', 'Delivery'],
        'space': ['Satellite Data', 'Launch Schedule', 'Mission Control', 'Telemetry', 'Research'],
        'weather': ['Forecast', 'Radar', 'Warnings', 'Historical Data', 'API'],
        'map': ['Interactive Map', 'Routing', 'Places', 'Geocoding', 'Custom Layers'],
        'translate': ['Text Translation', 'Document', 'Voice', 'Dictionary', 'History'],
        'voice': ['Voice Recognition', 'Text to Speech', 'Voice Command', 'Recording', 'Analysis'],
        'image': ['Image Processing', 'OCR', 'Object Detection', 'Enhancement', 'Compression'],
        'document': ['Word Processor', 'Spreadsheet', 'Presentation', 'PDF Tools', 'Collaboration'],
        'spreadsheet': ['Data Entry', 'Formulas', 'Charts', 'Pivot Table', 'Import Export'],
        'presentation': ['Slide Editor', 'Templates', 'Animation', 'Presenter Mode', 'Share'],
        'pdf': ['View PDF', 'Edit', 'Merge', 'Split', 'Sign'],
        'scanner': ['Scan Document', 'OCR', 'Batch Scan', 'Cloud Save', 'Share'],
        'printer': ['Print Queue', 'Settings', 'Driver', 'Remote Print', 'Scan to Email'],
        'fax': ['Send Fax', 'Receive', 'Cover Sheet', 'Schedule', 'Archive'],
        'sms': ['Compose SMS', 'Bulk SMS', 'Templates', 'Schedule', 'Reports'],
        'whatsapp': ['Chat', 'Broadcast', 'Business API', 'Auto Reply', 'Analytics'],
        'telegram': ['Bot', 'Channel', 'Group', 'Sticker', 'Integration'],
        'social': ['Post Manager', 'Scheduler', 'Analytics', 'Engagement', 'Ads'],
        'facebook': ['Page Manager', 'Ads', 'Insights', 'Messenger', 'Shop'],
        'instagram': ['Post', 'Story', 'Reels', 'Insights', 'Shopping'],
        'twitter': ['Tweet', 'Thread', 'Spaces', 'Analytics', 'Ads'],
        'tiktok': ['Video', 'Live', 'Effects', 'Analytics', 'Creator Fund'],
        'youtube': ['Upload', 'Studio', 'Analytics', 'Monetization', 'Community'],
        'podcast': ['Episode', 'Subscribe', 'Analytics', 'Monetization', 'Distribution'],
        'radio': ['Live Stream', 'Playlist', 'DJ Booth', 'Request', 'Archive'],
        'tv': ['Live TV', 'VOD', 'EPG', 'Recording', 'Parental Control'],
        'streaming': ['Broadcast', 'RTMP', 'HLS', 'DVR', 'Chat'],
        'conference': ['Meeting', 'Screen Share', 'Recording', 'Breakout Rooms', 'Polls'],
        'webinar': ['Registration', 'Presentation', 'Q&A', 'Recording', 'Follow-up'],
        'course': ['Course Builder', 'Lessons', 'Quiz', 'Certificate', 'Student Progress'],
        'exam': ['Question Bank', 'Exam Setup', 'Proctoring', 'Grading', 'Results'],
        'certificate': ['Template', 'Issue', 'Verify', 'Bulk Generate', 'Email'],
        'survey': ['Create Survey', 'Distribution', 'Responses', 'Analysis', 'Report'],
        'form': ['Form Builder', 'Validation', 'Submission', 'Database', 'Integration'],
        'quiz': ['Quiz Maker', 'Question Types', 'Scoring', 'Timer', 'Results'],
        'poll': ['Create Poll', 'Voting', 'Real-time Results', 'Export', 'Embed'],
        'contest': ['Contest Setup', 'Entries', 'Judging', 'Winner Selection', 'Prizes'],
        'lottery': ['Draw Setup', 'Tickets', 'Random Pick', 'Results', 'Claim Prize'],
        'auction': ['Listing', 'Bidding', 'Watch List', 'End Time', 'Payment'],
        'classified': ['Ad Posting', 'Categories', 'Search', 'Contact Seller', 'Premium'],
        'job': ['Job Posting', 'Applications', 'Resume Database', 'Interview', 'Hiring'],
        'resume': ['Builder', 'Templates', 'ATS Check', 'Download', 'Share'],
        'portfolio': ['Project Showcase', 'Skills', 'Testimonials', 'Contact', 'Analytics'],
        'website': ['Site Builder', 'Pages', 'SEO', 'Analytics', 'Publish'],
        'landing': ['Template', 'A/B Test', 'Conversion', 'Lead Capture', 'Thank You Page'],
        'funnel': ['Funnel Builder', 'Steps', 'Tracking', 'Optimization', 'Integration'],
        'automation': ['Workflow', 'Trigger', 'Action', 'Condition', 'Logging'],
        'integration': ['Connect Apps', 'API', 'Webhook', 'Sync', 'Mapping'],
        'workflow': ['Designer', 'Tasks', 'Approval', 'Notification', 'History'],
        'approval': ['Request', 'Reviewer', 'Decision', 'Comment', 'Audit'],
        'notification': ['Push', 'Email', 'SMS', 'In-app', 'Preferences'],
        'alert': ['Rule', 'Threshold', 'Channel', 'Escalation', 'Acknowledgment'],
        'report': ['Builder', 'Schedule', 'Format', 'Distribution', 'Archive'],
        'dashboard': ['Widget', 'Chart', 'KPI', 'Filter', 'Export'],
        'chart': ['Bar', 'Line', 'Pie', 'Scatter', 'Custom'],
        'graph': ['Network', 'Tree', 'Flow', 'Hierarchy', 'Interactive'],
        'table': ['Data Grid', 'Sort', 'Filter', 'Pagination', 'Export'],
        'grid': ['Layout', 'Responsive', 'Drag Drop', 'Resize', 'Save'],
        'list': ['View Options', 'Sort', 'Filter', 'Bulk Action', 'Export'],
        'card': ['Template', 'Content', 'Action', 'Media', 'Share'],
        'modal': ['Trigger', 'Content', 'Action', 'Close', 'Animation'],
        'tooltip': ['Position', 'Content', 'Trigger', 'Style', 'Delay'],
        'toast': ['Message', 'Type', 'Duration', 'Position', 'Action'],
        'breadcrumb': ['Path', 'Separator', 'Link', 'Current', 'Style'],
        'pagination': ['Page', 'Size', 'Total', 'Jump', 'Info'],
        'search': ['Input', 'Filter', 'Suggest', 'Result', 'Highlight'],
        'filter': ['Criteria', 'Range', 'Multi-select', 'Apply', 'Reset'],
        'sort': ['Field', 'Order', 'Custom', 'Multiple', 'Save'],
        'export': ['Format', 'Range', 'Option', 'Schedule', 'Download'],
        'import': ['File', 'Mapping', 'Validation', 'Preview', 'Execute'],
        'upload': ['Drag Drop', 'Progress', 'Chunk', 'Retry', 'Complete'],
        'download': ['Queue', 'Speed', 'Resume', 'Location', 'History'],
        'share': ['Link', 'Social', 'Email', 'Embed', 'Permission'],
        'embed': ['Code', 'Preview', 'Size', 'Option', 'Copy'],
        'copy': ['Text', 'Link', 'Code', 'Success', 'Feedback'],
        'print': ['Preview', 'Setting', 'Range', 'Copies', 'Execute'],
        'save': ['Draft', 'Version', 'Location', 'Format', 'Confirm'],
        'delete': ['Confirm', 'Permanent', 'Trash', 'Recover', 'Empty'],
        'archive': ['Move', 'Extract', 'Compress', 'Browse', 'Delete'],
        'compress': ['Level', 'Format', 'Password', 'Split', 'Execute'],
        'extract': ['Destination', 'Overwrite', 'Password', 'Select', 'Execute'],
        'convert': ['Format', 'Quality', 'Batch', 'Progress', 'Download'],
        'merge': ['Files', 'Order', 'Option', 'Preview', 'Execute'],
        'split': ['Size', 'Count', 'Pattern', 'Preview', 'Execute'],
        'rename': ['Pattern', 'Preview', 'Conflict', 'Execute', 'Undo'],
        'move': ['Destination', 'Overwrite', 'Progress', 'Verify', 'Complete'],
        'clone': ['Target', 'Option', 'Progress', 'Verify', 'Complete'],
        'sync': ['Source', 'Dest', 'Direction', 'Schedule', 'Log'],
        'backup_now': ['Target', 'Type', 'Compression', 'Encrypt', 'Execute'],
        'restore_now': ['Point', 'Target', 'Option', 'Confirm', 'Execute'],
        'schedule_task': ['Time', 'Frequency', 'Task', 'Notify', 'Save'],
        'cron': ['Expression', 'Command', 'Log', 'History', 'Manage'],
        'queue': ['Jobs', 'Priority', 'Worker', 'Monitor', 'Retry'],
        'worker': ['Status', 'Load', 'Log', 'Scale', 'Restart'],
        'process': ['List', 'Detail', 'Kill', 'Priority', 'Resource'],
        'thread': ['List', 'State', 'Stack', 'Debug', 'Control'],
        'memory': ['Usage', 'Leak', 'GC', 'Profile', 'Optimize'],
        'cpu': ['Usage', 'Core', 'Freq', 'Temp', 'Throttle'],
        'disk': ['Usage', 'IO', 'SMART', 'Clean', 'Defrag'],
        'network': ['Traffic', 'Connection', 'Port', 'Firewall', 'Route'],
        'firewall': ['Rule', 'Zone', 'Log', 'Block', 'Allow'],
        'vpn': ['Connect', 'Server', 'Protocol', 'Log', 'Kill Switch'],
        'proxy': ['Config', 'Auth', 'Log', 'Block', 'Bypass'],
        'dns': ['Record', 'Zone', 'Cache', 'Forward', 'Block'],
        'dhcp': ['Pool', 'Lease', 'Reservation', 'Option', 'Log'],
        'ntp': ['Server', 'Sync', 'Offset', 'Log', 'Status'],
        'smtp': ['Config', 'Auth', 'Queue', 'Log', 'Test'],
        'imap': ['Config', 'Folder', 'Fetch', 'Log', 'Test'],
        'pop3': ['Config', 'Fetch', 'Delete', 'Log', 'Test'],
        'ftp': ['Config', 'User', 'Permission', 'Log', 'Transfer'],
        'sftp': ['Config', 'Key', 'Permission', 'Log', 'Transfer'],
        'ssh': ['Config', 'Key', 'Tunnel', 'Log', 'Session'],
        'telnet': ['Config', 'Session', 'Log', 'Script', 'Macro'],
        'rdp': ['Config', 'Session', 'Resolution', 'Resource', 'Log'],
        'vnc': ['Config', 'Session', 'Quality', 'Security', 'Log'],
        'remote': ['Desktop', 'File', 'Shell', 'Support', 'Session'],
        'terminal': ['Shell', 'Tab', 'History', 'Theme', 'Shortcut'],
        'editor': ['File', 'Syntax', 'Plugin', 'Theme', 'Shortcut'],
        'ide': ['Project', 'Debug', 'Build', 'Run', 'Version'],
        'compiler': ['Language', 'Option', 'Error', 'Warning', 'Output'],
        'interpreter': ['Language', 'REPL', 'Script', 'Debug', 'Output'],
        'debugger': ['Breakpoint', 'Step', 'Watch', 'Call Stack', 'Variable'],
        'profiler': ['CPU', 'Memory', 'IO', 'Network', 'Report'],
        'tester': ['Unit', 'Integration', 'E2E', 'Coverage', 'Report'],
        'linter': ['Rule', 'Fix', 'Ignore', 'Report', 'Auto'],
        'formatter': ['Style', 'Indent', 'Wrap', 'Sort', 'Auto'],
        'minifier': ['JS', 'CSS', 'HTML', 'Image', 'Output'],
        'bundler': ['Entry', 'Output', 'Split', 'Minify', 'SourceMap'],
        'transpiler': ['From', 'To', 'Option', 'Error', 'Output'],
        'polyfill': ['Detect', 'Inject', 'Bundle', 'CDN', 'Fallback'],
        'cdn': ['Config', 'Purge', 'Prefetch', 'Analytics', 'Cost'],
        'ssl': ['Cert', 'Key', 'CSR', 'Renew', 'Install'],
        'cert': ['List', 'Detail', 'Renew', 'Revoke', 'Export'],
        'key': ['Generate', 'Import', 'Export', 'Rotate', 'Revoke'],
        'token': ['Generate', 'Validate', 'Refresh', 'Revoke', 'Log'],
        'oauth': ['Provider', 'Client', 'Scope', 'Token', 'Log'],
        'sso': ['Provider', 'Mapping', 'Role', 'Log', 'Test'],
        'ldap': ['Config', 'Search', 'Bind', 'Sync', 'Log'],
        'active_directory': ['OU', 'User', 'Group', 'Policy', 'Log'],
        'rbac': ['Role', 'Permission', 'User', 'Assignment', 'Audit'],
        'abac': ['Attribute', 'Policy', 'Decision', 'Log', 'Audit'],
        'policy': ['Create', 'Edit', 'Assign', 'Enforce', 'Audit'],
        'compliance': ['Standard', 'Assessment', 'Gap', 'Remediation', 'Report'],
        'audit': ['Log', 'Trail', 'Report', 'Alert', 'Retention'],
        'gdpr': ['Consent', 'DSAR', 'Erasure', 'Portability', 'Report'],
        'privacy': ['Policy', 'Notice', 'Preference', 'Cookie', 'Audit'],
        'cookie': ['Banner', 'Preference', 'Block', 'Log', 'Audit'],
        'consent': ['Request', 'Record', 'Withdraw', 'Audit', 'Report'],
        'preference': ['Category', 'Option', 'Save', 'Export', 'Delete'],
        'subscription': ['Plan', 'Billing', 'Usage', 'Upgrade', 'Cancel'],
        'billing': ['Invoice', 'Payment', 'Method', 'History', 'Tax'],
        'payment_gateway': ['Config', 'Transaction', 'Refund', 'Dispute', 'Report'],
        'refund': ['Request', 'Approve', 'Process', 'Notify', 'Log'],
        'dispute': ['Case', 'Evidence', 'Decision', 'Appeal', 'Close'],
        'fraud': ['Detection', 'Rule', 'Alert', 'Block', 'Report'],
        'risk': ['Score', 'Factor', 'Mitigation', 'Monitor', 'Report'],
        'kyc': ['Verification', 'Document', 'Check', 'Approve', 'Reject'],
        'aml': ['Screening', 'Transaction', 'Alert', 'Report', 'Case'],
        'sanction': ['List', 'Screening', 'Match', 'Review', 'Report'],
        'pep': ['Screening', 'Match', 'Review', 'EDD', 'Report'],
        'edd': ['Checklist', 'Document', 'Interview', 'Approval', 'Review'],
        'cdd': ['Profile', 'Risk', 'Monitoring', 'Review', 'Update'],
        'transaction_monitoring': ['Rule', 'Alert', 'Case', 'Decision', 'Report'],
        'case_management': ['Intake', 'Assignment', 'Investigation', 'Resolution', 'Close'],
        'investigation': ['Timeline', 'Evidence', 'Interview', 'Finding', 'Report'],
        'forensic': ['Acquisition', 'Analysis', 'Timeline', 'Report', 'Court'],
        'incident_response': ['Detection', 'Containment', 'Eradication', 'Recovery', 'Lesson'],
        'threat_intel': ['Feed', 'IOC', 'TTP', 'Actor', 'Report'],
        'vulnerability': ['Scan', 'Assess', 'Prioritize', 'Remediate', 'Verify'],
        'patch': ['Inventory', 'Assess', 'Deploy', 'Verify', 'Report'],
        'configuration': ['Baseline', 'Drift', 'Remediate', 'Compliance', 'Report'],
        'hardening': ['Guide', 'Implement', 'Verify', 'Monitor', 'Report'],
        'baseline': ['Define', 'Measure', 'Deviation', 'Remediate', 'Report'],
        'drift': ['Detect', 'Analyze', 'Remediate', 'Prevent', 'Report'],
        'change': ['Request', 'Assess', 'Approve', 'Implement', 'Review'],
        'release': ['Plan', 'Build', 'Test', 'Deploy', 'Monitor'],
        'incident': ['Log', 'Categorize', 'Prioritize', 'Resolve', 'Close'],
        'problem': ['Identify', 'Root Cause', 'Solution', 'Implement', 'Verify'],
        'request': ['Intake', 'Fulfill', 'Track', 'Close', 'Survey'],
        'service_catalog': ['Item', 'Description', 'Price', 'SLA', 'Order'],
        'sla': ['Define', 'Measure', 'Breach', 'Report', 'Improve'],
        'olap': ['Cube', 'Dimension', 'Measure', 'Slice', 'Dice'],
        'etl': ['Extract', 'Transform', 'Load', 'Schedule', 'Monitor'],
        'data_warehouse': ['Schema', 'Load', 'Query', 'Aggregate', 'Archive'],
        'data_lake': ['Ingest', 'Store', 'Catalog', 'Query', 'Govern'],
        'data_mart': ['Subject', 'Source', 'Load', 'Query', 'Report'],
        'bi': ['Dashboard', 'Report', 'OLAP', 'Alert', 'Mobile'],
        'data_science': ['Notebook', 'Experiment', 'Model', 'Deploy', 'Monitor'],
        'machine_learning_ops': ['Pipeline', 'Registry', 'Deploy', 'Monitor', 'Retrain'],
        'feature_store': ['Feature', 'Registry', 'Serve', 'Monitor', 'Version'],
        'model_registry': ['Model', 'Version', 'Stage', 'Deploy', 'Lineage'],
        'experiment_tracking': ['Run', 'Metric', 'Param', 'Artifact', 'Compare'],
        'hyperparameter': ['Search', 'Tune', 'Optimize', 'Track', 'Select'],
        'auto_ml': ['Pipeline', 'Model', 'Tune', 'Explain', 'Deploy'],
        'explainable_ai': ['SHAP', 'LIME', 'Partial', 'Counterfactual', 'Visualize'],
        'fairness': ['Metric', 'Bias', 'Mitigate', 'Monitor', 'Report'],
        'robustness': ['Adversarial', 'Stress', 'Drift', 'Monitor', 'Harden'],
        'privacy_preserving': ['Federated', 'Differential', 'Encrypted', 'Synthetic', 'Audit'],
        'federated_learning': ['Client', 'Server', 'Aggregate', 'Secure', 'Monitor'],
        'differential_privacy': ['Mechanism', 'Epsilon', 'Compose', 'Audit', 'Release'],
        'homomorphic_encryption': ['Key', 'Encrypt', 'Compute', 'Decrypt', 'Performance'],
        'secure_multiparty': ['Protocol', 'Party', 'Compute', 'Verify', 'Audit'],
        'zero_knowledge': ['Proof', 'Verify', 'Circuit', 'Trusted', 'Application'],
        'blockchain_dev': ['Smart Contract', 'Test', 'Deploy', 'Interact', 'Monitor'],
        'defi': ['Pool', 'Swap', 'Yield', 'Governance', 'Risk'],
        'nft': ['Mint', 'Marketplace', 'Collection', 'Royalty', 'Metadata'],
        'dao': ['Proposal', 'Vote', 'Treasury', 'Member', 'Execution'],
        'web3': ['Wallet', 'DApp', 'Identity', 'Storage', 'Oracle'],
        'metaverse': ['Avatar', 'Asset', 'World', 'Social', 'Economy'],
        'digital_twin': ['Model', 'Sync', 'Simulate', 'Predict', 'Optimize'],
        'edge_computing': ['Device', 'Deploy', 'Manage', 'Monitor', 'Update'],
        'fog_computing': ['Node', 'Orchestrate', 'Data', 'Service', 'Security'],
        'quantum': ['Qubit', 'Gate', 'Circuit', 'Algorithm', 'Simulator'],
        'neuromorphic': ['Neuron', 'Synapse', 'Network', 'Train', 'Infer'],
        'optical': ['Photon', 'Circuit', 'Switch', 'Modulate', 'Detect'],
        'bio': ['DNA', 'Protein', 'Cell', 'Sequence', 'Analyze'],
        'nano': ['Material', 'Device', 'Fabricate', 'Characterize', 'Apply'],
        'material': ['Property', 'Simulate', 'Design', 'Synthesize', 'Test'],
        'energy': ['Generation', 'Storage', 'Grid', 'Optimize', 'Monitor'],
        'battery': ['Chemistry', 'Cycle', 'BMS', 'Thermal', 'Recycle'],
        'solar': ['Panel', 'Inverter', 'Mount', 'Monitor', 'Maintain'],
        'wind': ['Turbine', 'Blade', 'Generator', 'Grid', 'Maintain'],
        'hydrogen': ['Production', 'Storage', 'Fuel Cell', 'Transport', 'Safety'],
        'fusion': ['Plasma', 'Confinement', 'Heating', 'Diagnostic', 'Safety'],
        'fission': ['Reactor', 'Fuel', 'Control', 'Coolant', 'Waste'],
        'waste': ['Collection', 'Sorting', 'Recycling', 'Treatment', 'Disposal'],
        'water': ['Treatment', 'Distribution', 'Quality', 'Conservation', 'Reuse'],
        'air': ['Quality', 'Purification', 'Ventilation', 'Monitoring', 'Regulation'],
        'soil': ['Quality', 'Remediation', 'Conservation', 'Fertility', 'Monitoring'],
        'agriculture': ['Crop', 'Livestock', 'Irrigation', 'Harvest', 'Market'],
        'precision_ag': ['Sensor', 'GPS', 'Variable Rate', 'Drone', 'Analytics'],
        'vertical_farming': ['LED', 'Hydroponic', 'Climate', 'Automation', 'Harvest'],
        'aquaculture': ['Species', 'Feed', 'Water Quality', 'Health', 'Harvest'],
        'forestry': ['Inventory', 'Harvest', 'Replant', 'Conservation', 'Certification'],
        'fishery': ['Stock', 'Catch', 'Quota', 'Processing', 'Market'],
        'mining': ['Exploration', 'Extraction', 'Processing', 'Rehabilitation', 'Safety'],
        'oil_gas': ['Exploration', 'Drilling', 'Production', 'Refining', 'Distribution'],
        'manufacturing': ['Design', 'Process', 'Quality', 'Maintenance', 'Supply Chain'],
        'additive': ['Design', 'Material', 'Print', 'Post-process', 'Quality'],
        'subtractive': ['Design', 'Toolpath', 'Machine', 'Inspect', 'Finish'],
        'assembly': ['Part', 'Fixture', 'Robot', 'Inspect', 'Test'],
        'packaging': ['Design', 'Material', 'Fill', 'Seal', 'Label'],
        'logistics': ['Warehouse', 'Transport', 'Route', 'Track', 'Deliver'],
        'supply_chain': ['Plan', 'Source', 'Make', 'Deliver', 'Return'],
        'procurement': ['Requisition', 'PO', 'Supplier', 'Contract', 'Payment'],
        'vendor': ['Onboarding', 'Performance', 'Risk', 'Relationship', 'Offboarding'],
        'contract_management': ['Draft', 'Negotiate', 'Sign', 'Execute', 'Renew'],
        'intellectual_property': ['Patent', 'Trademark', 'Copyright', 'License', 'Enforce'],
        'legal': ['Case', 'Document', 'Research', 'Billing', 'Compliance'],
        'regulatory': ['Requirement', 'Submission', 'Approval', 'Reporting', 'Audit'],
        'standard': ['Develop', 'Publish', 'Implement', 'Certify', 'Revise'],
        'certification': ['Scheme', 'Audit', 'Grant', 'Surveillance', 'Renew'],
        'accreditation': ['Criteria', 'Assess', 'Grant', 'Monitor', 'Renew'],
        'inspection': ['Plan', 'Check', 'Report', 'Non-conformance', 'Corrective'],
        'testing': ['Method', 'Sample', 'Result', 'Uncertainty', 'Report'],
        'calibration': ['Standard', 'Procedure', 'Result', 'Uncertainty', 'Certificate'],
        'metrology': ['Measurement', 'Traceability', 'Uncertainty', 'Standard', 'Research'],
        'quality': ['Plan', 'Control', 'Assurance', 'Improvement', 'System'],
        'six_sigma': ['Define', 'Measure', 'Analyze', 'Improve', 'Control'],
        'lean': ['Value', 'Stream', 'Flow', 'Pull', 'Perfection'],
        'kaizen': ['Event', 'Suggestion', 'Implementation', 'Standard', 'Sustain'],
        '5s': ['Sort', 'Set', 'Shine', 'Standardize', 'Sustain'],
        'tpm': ['Autonomous', 'Planned', 'Quality', 'Training', 'Safety'],
        'oee': ['Availability', 'Performance', 'Quality', 'Loss', 'Improvement'],
        'spc': ['Chart', 'Capability', 'Control', 'Rule', 'Action'],
        'msa': ['Gage R&R', 'Bias', 'Linearity', 'Stability', 'Attribute'],
        'fmea': ['Function', 'Failure', 'Effect', 'Cause', 'Control'],
        'ppap': ['Record', 'Drawing', 'Specification', 'Capability', 'Approval'],
        'apqp': ['Plan', 'Design', 'Process', 'Validate', 'Launch'],
        'ims': ['Quality', 'Environment', 'Safety', 'Audit', 'Review'],
        'hse': ['Hazard', 'Risk', 'Control', 'Incident', 'Performance'],
        'environment': ['Aspect', 'Impact', 'Objective', 'Target', 'Program'],
        'carbon': ['Footprint', 'Reduction', 'Offset', 'Trading', 'Reporting'],
        'esg': ['Environmental', 'Social', 'Governance', 'Rating', 'Reporting'],
        'sustainability': ['Goal', 'Indicator', 'Initiative', 'Performance', 'Report'],
        'csr': ['Strategy', 'Stakeholder', 'Program', 'Impact', 'Report'],
        'philanthropy': ['Cause', 'Grant', 'Volunteer', 'Partnership', 'Impact'],
        'volunteer': ['Opportunity', 'Matching', 'Tracking', 'Recognition', 'Impact'],
        'donation': ['Campaign', 'Donor', 'Payment', 'Receipt', 'Impact'],
        'fundraising': ['Strategy', 'Campaign', 'Donor', 'Event', 'Reporting'],
        'grant': ['Opportunity', 'Proposal', 'Award', 'Reporting', 'Compliance'],
        'scholarship': ['Eligibility', 'Application', 'Selection', 'Award', 'Renewal'],
        'fellowship': ['Program', 'Application', 'Selection', 'Support', 'Alumni'],
        'internship': ['Position', 'Application', 'Placement', 'Supervision', 'Evaluation'],
        'apprenticeship': ['Trade', 'Curriculum', 'Mentor', 'Assessment', 'Certification'],
        'training': ['Need', 'Design', 'Delivery', 'Evaluation', 'Record'],
        'development': ['Plan', 'Activity', 'Feedback', 'Review', 'Career'],
        'coaching': ['Goal', 'Session', 'Action', 'Progress', 'Outcome'],
        'mentoring': ['Matching', 'Relationship', 'Guidance', 'Development', 'Closure'],
        'counseling': ['Assessment', 'Session', 'Plan', 'Intervention', 'Follow-up'],
        'therapy': ['Diagnosis', 'Treatment', 'Session', 'Progress', 'Outcome'],
        'wellness': ['Physical', 'Mental', 'Emotional', 'Social', 'Spiritual'],
        'fitness_program': ['Assessment', 'Plan', 'Exercise', 'Progress', 'Adjustment'],
        'nutrition_program': ['Assessment', 'Plan', 'Meal', 'Progress', 'Adjustment'],
        'sleep': ['Hygiene', 'Tracker', 'Analysis', 'Improvement', 'Disorder'],
        'stress': ['Assessment', 'Technique', 'Practice', 'Progress', 'Management'],
        'mindfulness': ['Practice', 'Session', 'Progress', 'Challenge', 'Benefit'],
        'meditation': ['Technique', 'Session', 'Timer', 'Progress', 'Insight'],
        'yoga': ['Style', 'Pose', 'Sequence', 'Practice', 'Progress'],
        'pilates': ['Exercise', 'Equipment', 'Routine', 'Progress', 'Modification'],
        'martial_art': ['Style', 'Technique', 'Belt', 'Sparring', 'Competition'],
        'dance': ['Style', 'Choreography', 'Practice', 'Performance', 'Competition'],
        'music_lesson': ['Instrument', 'Theory', 'Practice', 'Performance', 'Exam'],
        'art_class': ['Medium', 'Technique', 'Project', 'Critique', 'Exhibition'],
        'language_course': ['Level', 'Skill', 'Lesson', 'Practice', 'Test'],
        'tutoring': ['Subject', 'Level', 'Session', 'Progress', 'Feedback'],
        'homework_help': ['Subject', 'Grade', 'Assignment', 'Solution', 'Explanation'],
        'study_group': ['Subject', 'Member', 'Schedule', 'Resource', 'Outcome'],
        'research': ['Topic', 'Literature', 'Method', 'Data', 'Publication'],
        'thesis': ['Proposal', 'Research', 'Writing', 'Defense', 'Revision'],
        'dissertation': ['Proposal', 'Research', 'Writing', 'Defense', 'Publication'],
        'paper': ['Topic', 'Outline', 'Draft', 'Review', 'Submit'],
        'journal': ['Article', 'Review', 'Edit', 'Publish', 'Index'],
        'conference_paper': ['Abstract', 'Full Paper', 'Review', 'Presentation', 'Proceeding'],
        'poster': ['Design', 'Content', 'Print', 'Present', 'Award'],
        'presentation': ['Slide', 'Speaker Note', 'Rehearse', 'Deliver', 'Feedback'],
        'workshop': ['Topic', 'Activity', 'Material', 'Facilitate', 'Evaluate'],
        'seminar': ['Topic', 'Speaker', 'Audience', 'Discussion', 'Material'],
        'symposium': ['Theme', 'Session', 'Speaker', 'Proceeding', 'Networking'],
        'colloquium': ['Topic', 'Speaker', 'Discussion', 'Minute', 'Archive'],
        'lecture': ['Topic', 'Outline', 'Slide', 'Note', 'Recording'],
        'webinar_series': ['Theme', 'Session', 'Speaker', 'Registration', 'Recording'],
        'podcast_series': ['Theme', 'Episode', 'Guest', 'Recording', 'Distribution'],
        'video_series': ['Theme', 'Episode', 'Script', 'Shoot', 'Edit'],
        'blog_series': ['Theme', 'Post', 'Outline', 'Write', 'Publish'],
        'newsletter': ['Template', 'Content', 'Subscriber', 'Send', 'Analytics'],
        'magazine': ['Issue', 'Article', 'Editorial', 'Layout', 'Publish'],
        'newspaper': ['Edition', 'Article', 'Section', 'Layout', 'Print'],
        'book': ['Manuscript', 'Edit', 'Design', 'Print', 'Distribute'],
        'ebook': ['Format', 'Convert', 'DRM', 'Platform', 'Sell'],
        'audiobook': ['Narrator', 'Record', 'Edit', 'Master', 'Distribute'],
        'comic': ['Script', 'Art', 'Letter', 'Color', 'Publish'],
        'manga': ['Story', 'Art', 'Serialization', 'Volume', 'Publish'],
        'novel': ['Plot', 'Character', 'Draft', 'Edit', 'Publish'],
        'short_story': ['Idea', 'Draft', 'Edit', 'Submit', 'Publish'],
        'poetry': ['Form', 'Draft', 'Edit', 'Submit', 'Publish'],
        'play': ['Script', 'Cast', 'Rehearse', 'Perform', 'Review'],
        'screenplay': ['Logline', 'Treatment', 'Script', 'Pitch', 'Sell'],
        'script': ['Format', 'Draft', 'Edit', 'Submit', 'Produce'],
        'storyboard': ['Scene', 'Shot', 'Sketch', 'Animatic', 'Revision'],
        'animatic': ['Storyboard', 'Timing', 'Sound', 'Edit', 'Review'],
        'animation': ['Style', 'Character', 'Scene', 'Render', 'Composite'],
        'vfx': ['Plate', 'Track', 'CGI', 'Composite', 'Render'],
        'cgi': ['Model', 'Texture', 'Rig', 'Animate', 'Render'],
        '3d_modeling': ['Mesh', 'UV', 'Texture', 'Light', 'Render'],
        'sculpting': ['Base', 'Detail', 'Retopology', 'UV', 'Texture'],
        'texturing': ['UV', 'Paint', 'Shader', 'Bake', 'Export'],
        'rigging': ['Skeleton', 'Control', 'Weight', 'IK/FK', 'Test'],
        'lighting': ['Setup', 'HDRI', 'Shadow', 'Render', 'Composite'],
        'rendering': ['Engine', 'Setting', 'Pass', 'Composite', 'Grade'],
        'compositing': ['Layer', 'Key', 'Track', 'Effect', 'Render'],
        'color_grading': ['Primary', 'Secondary', 'Look', 'Match', 'Export'],
        'sound_design': ['Record', 'Edit', 'Mix', 'Master', 'Export'],
        'foley': ['Record', 'Edit', 'Sync', 'Mix', 'Export'],
        'music_production': ['Compose', 'Arrange', 'Record', 'Mix', 'Master'],
        'mixing': ['Balance', 'EQ', 'Compression', 'Effect', 'Export'],
        'mastering': ['EQ', 'Compression', 'Limiting', 'Dither', 'Export'],
        'recording': ['Setup', 'Mic', 'Gain', 'Take', 'Edit'],
        'editing': ['Cut', 'Trim', 'Transition', 'Effect', 'Export'],
        'post_production': ['Edit', 'VFX', 'Sound', 'Grade', 'Deliver'],
        'distribution': ['Platform', 'Format', 'DRM', 'Marketing', 'Sales'],
        'marketing': ['Strategy', 'Campaign', 'Channel', 'Budget', 'ROI'],
        'advertising': ['Creative', 'Media', 'Buy', 'Track', 'Optimize'],
        'pr': ['Press Release', 'Media', 'Crisis', 'Event', 'Measurement'],
        'branding': ['Identity', 'Guideline', 'Asset', 'Activation', 'Equity'],
        'design': ['Brief', 'Concept', 'Draft', 'Final', 'Asset'],
        'ux': ['Research', 'Persona', 'Wireframe', 'Prototype', 'Test'],
        'ui': ['Style', 'Component', 'Layout', 'Interaction', 'Handoff'],
        'graphic': ['Concept', 'Draft', 'Final', 'Format', 'Deliver'],
        'illustration': ['Sketch', 'Line', 'Color', 'Detail', 'Final'],
        'photography': ['Shoot', 'Select', 'Edit', 'Retouch', 'Deliver'],
        'videography': ['Pre-prod', 'Shoot', 'Edit', 'Grade', 'Deliver'],
        'drone_photography': ['Plan', 'Fly', 'Capture', 'Edit', 'Deliver'],
        '360_photo': ['Capture', 'Stitch', 'Edit', 'Publish', 'View'],
        'vr_content': ['Concept', 'Develop', 'Test', 'Deploy', 'Maintain'],
        'ar_content': ['Concept', 'Develop', 'Test', 'Deploy', 'Maintain'],
        'interactive': ['Concept', 'Develop', 'Test', 'Deploy', 'Maintain'],
        'gamification': ['Mechanic', 'Dynamic', 'Component', 'Implement', 'Measure'],
        'game_design': ['Concept', 'Mechanic', 'Level', 'Balance', 'Test'],
        'level_design': ['Layout', 'Asset', 'Script', 'Test', 'Iterate'],
        'character_design': ['Concept', 'Sheet', 'Model', 'Rig', 'Animate'],
        'environment_design': ['Concept', 'Layout', 'Asset', 'Light', 'Render'],
        'prop_design': ['Concept', 'Model', 'Texture', 'Place', 'Light'],
        'vehicle_design': ['Concept', 'Model', 'Texture', 'Rig', 'Animate'],
        'weapon_design': ['Concept', 'Model', 'Texture', 'Rig', 'Animate'],
        'creature_design': ['Concept', 'Model', 'Texture', 'Rig', 'Animate'],
        'costume_design': ['Concept', 'Pattern', 'Sew', 'Fit', 'Maintain'],
        'makeup': ['Design', 'Apply', 'Touch-up', 'Remove', 'Store'],
        'hair': ['Design', 'Cut', 'Style', 'Color', 'Maintain'],
        'wardrobe': ['Select', 'Fit', 'Maintain', 'Track', 'Return'],
        'set_design': ['Concept', 'Build', 'Dress', 'Light', 'Strike'],
        'location': ['Scout', 'Permit', 'Prepare', 'Shoot', 'Restore'],
        'casting': ['Breakdown', 'Audition', 'Callback', 'Contract', 'Rehearse'],
        'directing': ['Vision', 'Blocking', 'Performance', 'Coverage', 'Edit'],
        'producing': ['Development', 'Pre-prod', 'Prod', 'Post', 'Distribution'],
        'screenwriting': ['Concept', 'Outline', 'Draft', 'Rewrite', 'Polish'],
        'story_editing': ['Structure', 'Character', 'Dialogue', 'Pacing', 'Theme'],
        'script_supervising': ['Continuity', 'Timing', 'Dialogue', 'Action', 'Report'],
        'production_management': ['Schedule', 'Budget', 'Resource', 'Risk', 'Report'],
        'post_supervising': ['Schedule', 'Vendor', 'Quality', 'Delivery', 'Archive'],
        'distribution_strategy': ['Window', 'Platform', 'Territory', 'Marketing', 'Sales'],
        'sales': ['Lead', 'Pitch', 'Negotiate', 'Close', 'Account'],
        'account_management': ['Onboard', 'Grow', 'Retain', 'Renew', 'Upsell'],
        'customer_success': ['Onboard', 'Adopt', 'Value', 'Renew', 'Advocate'],
        'support_ticket': ['Intake', 'Triage', 'Solve', 'Verify', 'Close'],
        'knowledge_base': ['Article', 'Category', 'Search', 'Feedback', 'Update'],
        'community_forum': ['Category', 'Thread', 'Post', 'Moderate', 'Archive'],
        'user_group': ['Charter', 'Member', 'Meeting', 'Resource', 'Archive'],
        'event_management': ['Plan', 'Promote', 'Register', 'Execute', 'Follow-up'],
        'venue': ['Search', 'Book', 'Prepare', 'Host', 'Settle'],
        'catering': ['Menu', 'Quote', 'Book', 'Serve', 'Settle'],
        'transportation': ['Book', 'Track', 'Manage', 'Settle', 'Feedback'],
        'accommodation': ['Book', 'Check-in', 'Stay', 'Check-out', 'Review'],
        'travel_insurance': ['Quote', 'Buy', 'Claim', 'Settle', 'Renew'],
        'visa': ['Requirement', 'Apply', 'Track', 'Receive', 'Renew'],
        'passport': ['Apply', 'Renew', 'Replace', 'Track', 'Receive'],
        'vaccination': ['Requirement', 'Book', 'Get', 'Record', 'Certificate'],
        'health_check': ['Book', 'Test', 'Result', 'Consult', 'Record'],
        'travel_advisory': ['Monitor', 'Alert', 'Advice', 'Update', 'Archive'],
        'emergency_contact': ['List', 'Update', 'Access', 'Notify', 'Archive'],
        'itinerary': ['Plan', 'Book', 'Track', 'Share', 'Archive'],
        'packing_list': ['Create', 'Check', 'Update', 'Share', 'Archive'],
        'budget_tracker': ['Plan', 'Track', 'Adjust', 'Report', 'Archive'],
        'expense_report': ['Collect', 'Categorize', 'Submit', 'Approve', 'Reimburse'],
        'receipt': ['Capture', 'Store', 'Categorize', 'Report', 'Archive'],
        'currency_exchange': ['Rate', 'Convert', 'Book', 'Pickup', 'Deliver'],
        'remittance': ['Quote', 'Send', 'Track', 'Receive', 'Confirm'],
        'wire_transfer': ['Instruction', 'Send', 'Track', 'Receive', 'Confirm'],
        'ach': ['Instruction', 'Send', 'Track', 'Receive', 'Confirm'],
        'check': ['Write', 'Deposit', 'Clear', 'Cancel', 'Stop'],
        'cash': ['Withdraw', 'Deposit', 'Count', 'Store', 'Transport'],
        'credit_card': ['Apply', 'Use', 'Pay', 'Dispute', 'Close'],
        'debit_card': ['Apply', 'Use', 'PIN', 'Block', 'Replace'],
        'prepaid_card': ['Load', 'Use', 'Balance', 'Reload', 'Dispose'],
        'gift_card': ['Buy', 'Activate', 'Use', 'Balance', 'Reload'],
        'loyalty_card': ['Enroll', 'Earn', 'Redeem', 'Tier', 'Status'],
        'membership': ['Join', 'Benefit', 'Renew', 'Upgrade', 'Cancel'],
        'subscription_box': ['Subscribe', 'Customize', 'Ship', 'Receive', 'Review'],
        'rental': ['Search', 'Book', 'Use', 'Return', 'Review'],
        'lease': ['Search', 'Negotiate', 'Sign', 'Occupy', 'Terminate'],
        'mortgage': ['Apply', 'Approve', 'Close', 'Pay', 'Refinance'],
        'loan': ['Apply', 'Approve', 'Disburse', 'Pay', 'Close'],
        'line_of_credit': ['Apply', 'Approve', 'Draw', 'Pay', 'Close'],
        'overdraft': ['Enable', 'Use', 'Fee', 'Repay', 'Disable'],
        'savings': ['Open', 'Deposit', 'Withdraw', 'Interest', 'Close'],
        'checking': ['Open', 'Deposit', 'Withdraw', 'Transfer', 'Close'],
        'investment': ['Account', 'Buy', 'Sell', 'Dividend', 'Tax'],
        'retirement': ['Plan', 'Contribute', 'Invest', 'Withdraw', 'Tax'],
        'college_savings': ['Open', 'Contribute', 'Invest', 'Withdraw', 'Tax'],
        'trust': ['Establish', 'Fund', 'Manage', 'Distribute', 'Terminate'],
        'estate_planning': ['Will', 'Trust', 'POA', 'Healthcare', 'Update'],
        'insurance': ['Quote', 'Buy', 'Claim', 'Renew', 'Cancel'],
        'life_insurance': ['Quote', 'Buy', 'Beneficiary', 'Claim', 'Payout'],
        'health_insurance': ['Plan', 'Enroll', 'Claim', 'EOB', 'Appeal'],
        'auto_insurance': ['Quote', 'Buy', 'Claim', 'Repair', 'Settle'],
        'home_insurance': ['Quote', 'Buy', 'Claim', 'Repair', 'Settle'],
        'renters_insurance': ['Quote', 'Buy', 'Claim', 'Replace', 'Settle'],
        'travel_insurance_claim': ['File', 'Document', 'Review', 'Approve', 'Pay'],
        'disability_insurance': ['Quote', 'Buy', 'Claim', 'Benefit', 'Return'],
        'long_term_care': ['Quote', 'Buy', 'Claim', 'Benefit', 'Care'],
        'annuity': ['Buy', 'Accumulate', 'Annuitize', 'Payout', 'Death'],
        'pension': ['Enroll', 'Contribute', 'Vest', 'Retire', 'Payout'],
        'social_security': ['Earn', 'Credit', 'Apply', 'Benefit', 'COLA'],
        'medicare': ['Enroll', 'Plan', 'Claim', 'EOB', 'Appeal'],
        'medicaid': ['Eligibility', 'Enroll', 'Benefit', 'Claim', 'Renew'],
        'unemployment': ['File', 'Claim', 'Benefit', 'Job Search', 'End'],
        'workers_comp': ['Report', 'Claim', 'Treatment', 'Benefit', 'Return'],
        'disability_claim': ['File', 'Medical', 'Review', 'Decision', 'Appeal'],
        'appeal': ['File', 'Document', 'Hearing', 'Decision', 'Further Appeal'],
        'grievance': ['File', 'Investigate', 'Respond', 'Resolve', 'Close'],
        'complaint': ['File', 'Acknowledge', 'Investigate', 'Resolve', 'Close'],
        'feedback': ['Collect', 'Analyze', 'Act', 'Respond', 'Close'],
        'suggestion': ['Submit', 'Review', 'Implement', 'Reward', 'Close'],
        'compliment': ['Submit', 'Share', 'Recognize', 'Reward', 'Archive'],
        'testimonial': ['Request', 'Collect', 'Approve', 'Publish', 'Share'],
        'review': ['Request', 'Collect', 'Moderate', 'Publish', 'Respond'],
        'rating': ['Collect', 'Aggregate', 'Display', 'Analyze', 'Report'],
        'survey_response': ['Invite', 'Complete', 'Analyze', 'Report', 'Act'],
        'poll_response': ['Invite', 'Vote', 'Result', 'Share', 'Archive'],
        'contest_entry': ['Submit', 'Judge', 'Winner', 'Prize', 'Announce'],
        'sweepstakes': ['Enter', 'Draw', 'Winner', 'Prize', 'Announce'],
        'giveaway': ['Enter', 'Draw', 'Winner', 'Prize', 'Announce'],
        'referral': ['Refer', 'Accept', 'Qualify', 'Reward', 'Track'],
        'affiliate': ['Join', 'Promote', 'Click', 'Sale', 'Commission'],
        'influencer': ['Identify', 'Contract', 'Campaign', 'Content', 'Measure'],
        'ambassador': ['Recruit', 'Train', 'Activate', 'Measure', 'Reward'],
        'partner': ['Identify', 'Onboard', 'Enable', 'Co-sell', 'Measure'],
        'reseller': ['Recruit', 'Train', 'Enable', 'Sell', 'Support'],
        'distributor': ['Recruit', 'Contract', 'Stock', 'Sell', 'Support'],
        'supplier': ['Identify', 'Qualify', 'Contract', 'Order', 'Pay'],
        'manufacturer': ['Identify', 'Qualify', 'Contract', 'Order', 'Pay'],
        'oem': ['Identify', 'Qualify', 'Contract', 'Order', 'Pay'],
        'odm': ['Identify', 'Qualify', 'Contract', 'Order', 'Pay'],
        'jv': ['Partner', 'Agreement', 'Govern', 'Operate', 'Exit'],
        'alliance': ['Partner', 'Agreement', 'Govern', 'Operate', 'Exit'],
        'consortium': ['Member', 'Charter', 'Govern', 'Project', 'Dissolve'],
        'coop': ['Member', 'Bylaw', 'Board', 'Operate', 'Dividend'],
        'nonprofit': ['Incorporate', 'Board', 'Program', 'Fundraise', 'Report'],
        'foundation': ['Establish', 'Board', 'Grant', 'Invest', 'Report'],
        'charity': ['Register', 'Program', 'Fundraise', 'Spend', 'Report'],
        'social_enterprise': ['Plan', 'Launch', 'Operate', 'Measure', 'Scale'],
        'b_corp': ['Assess', 'Certify', 'Report', 'Renew', 'Improve'],
        'benefit_corp': ['Charter', 'Report', 'Measure', 'Improve', 'Renew'],
        'llc': ['Form', 'Operate', 'Tax', 'Report', 'Dissolve'],
        'corporation': ['Incorporate', 'Board', 'Share', 'Report', 'Dissolve'],
        'partnership': ['Agreement', 'Operate', 'Tax', 'Report', 'Dissolve'],
        'sole_proprietorship': ['Register', 'Operate', 'Tax', 'Report', 'Close'],
        'franchise': ['Buy', 'Train', 'Operate', 'Royalty', 'Renew'],
        'license': ['Buy', 'Term', 'Use', 'Royalty', 'Renew'],
        'patent_license': ['Buy', 'Term', 'Use', 'Royalty', 'Renew'],
        'trademark_license': ['Buy', 'Term', 'Use', 'Royalty', 'Renew'],
        'copyright_license': ['Buy', 'Term', 'Use', 'Royalty', 'Renew'],
        'software_license': ['Buy', 'Install', 'Use', 'Renew', 'Audit'],
        'saas': ['Subscribe', 'Configure', 'Use', 'Renew', 'Cancel'],
        'paas': ['Subscribe', 'Develop', 'Deploy', 'Scale', 'Cancel'],
        'iaas': ['Subscribe', 'Provision', 'Use', 'Scale', 'Cancel'],
        'faas': ['Develop', 'Deploy', 'Invoke', 'Scale', 'Pay'],
        'baas': ['Subscribe', 'Integrate', 'Use', 'Scale', 'Cancel'],
        'daas': ['Subscribe', 'Access', 'Analyze', 'Export', 'Cancel'],
        'maas': ['Subscribe', 'Train', 'Deploy', 'Infer', 'Cancel'],
        'caas': ['Subscribe', 'Communicate', 'Integrate', 'Scale', 'Cancel'],
        'uaas': ['Subscribe', 'Automate', 'Monitor', 'Scale', 'Cancel'],
        'raas': ['Subscribe', 'Deploy', 'Control', 'Monitor', 'Cancel'],
        'daas_robot': ['Subscribe', 'Deploy', 'Control', 'Monitor', 'Cancel'],
        'vaas': ['Subscribe', 'Create', 'Host', 'Access', 'Cancel'],
        'aaas': ['Subscribe', 'Create', 'Host', 'Access', 'Cancel'],
        'laas': ['Subscribe', 'Design', 'Simulate', 'Manufacture', 'Cancel'],
        'taas': ['Subscribe', 'Book', 'Ride', 'Pay', 'Rate'],
        'maas_mobility': ['Subscribe', 'Plan', 'Book', 'Ride', 'Pay'],
        'eaas': ['Subscribe', 'Learn', 'Assess', 'Certify', 'Cancel'],
        'haas': ['Subscribe', 'Book', 'Receive', 'Pay', 'Review'],
        'faas_food': ['Subscribe', 'Order', 'Receive', 'Pay', 'Review'],
        'gaas': ['Subscribe', 'Play', 'Achieve', 'Compete', 'Cancel'],
        'maas_media': ['Subscribe', 'Stream', 'Download', 'Share', 'Cancel'],
        'naas': ['Subscribe', 'Connect', 'Monitor', 'Optimize', 'Cancel'],
        'saas_security': ['Subscribe', 'Configure', 'Monitor', 'Respond', 'Cancel'],
        'caas_compliance': ['Subscribe', 'Assess', 'Remediate', 'Audit', 'Cancel'],
        'raas_risk': ['Subscribe', 'Assess', 'Monitor', 'Mitigate', 'Cancel'],
        'iaas_insurance': ['Subscribe', 'Quote', 'Buy', 'Claim', 'Cancel'],
        'laas_legal': ['Subscribe', 'Research', 'Draft', 'File', 'Cancel'],
        'oaas': ['Subscribe', 'Access', 'Use', 'Share', 'Cancel'],
        'xaas': ['Subscribe', 'Configure', 'Use', 'Scale', 'Cancel']
    }
    
    # Cari kecocokan dengan kata kunci
    for keyword, items in menu_mapping.items():
        if keyword in base_name:
            return items
    
    # bawaan butiran jika tidak ada kecocokan
    return [
        'Beranda',
        'Fitur Utama',
        'Pengaturan',
        'Dokumentasi',
        'Bantuan'
    ]

def generate_indonesian_navigation(folder_name):
    """Generate navigasi HTML dalam bahasa Indonesia"""
    
    submenu_items = get_submenu_items(folder_name)
    
    # Buat senarai butir submenu
    submenu_html = ""
    for i, item in enumerate(submenu_items[:15]):  # Ambil maksimal 15 butir
        # Buat slug dari nama butir
        slug = item.lower().replace(' ', '-').replace('.', '')
        submenu_html += f'                <li><a href="#{slug}">{item}</a></li>\n'
    
    if len(submenu_items) > 15:
        submenu_html += f'                <li class="separator">...</li>\n'
        submenu_html += f'                <li><a href="#view-all">Lihat Semua ({len(submenu_items)}+)</a></li>\n'
    
    nav_html = f'''<!-- START: Navigasi Global media.digital -->
<nav class="digital-nav">
    <ul class="digital-nav-menu">
        <!-- Menu 1: Konten & Media -->
        <li class="nav-item has-dropdown">
            <a href="#" class="nav-link">Konten & Media <span class="arrow">▼</span></a>
            <ul class="dropdown-menu">
                <li><a href="#berita">Berita Kilat</a></li>
                <li><a href="#video">Aliran Video</a></li>
                <li><a href="#podcast">Podcast</a></li>
                <li><a href="#langsung">Acara Langsung</a></li>
                <li><a href="#arsip">Arsip Digital</a></li>
                <li class="separator">...</li>
                <li><a href="#lihat-semua-konten">Lihat Semua (50+)</a></li>
            </ul>
        </li>

        <!-- Menu 2: Layanan & Alat -->
        <li class="nav-item has-dropdown">
            <a href="#" class="nav-link">Layanan & Alat <span class="arrow">▼</span></a>
            <ul class="dropdown-menu">
                <li><a href="#analitik">Analitik</a></li>
                <li><a href="#seo">Alat SEO</a></li>
                <li><a href="#keamanan">Gerbang ID Aman</a></li>
                <li><a href="#awan">Penyimpanan Awan</a></li>
                <li><a href="#api">Akses API</a></li>
                <li class="separator">...</li>
                <li><a href="#lihat-semua-layanan">Lihat Semua (40+)</a></li>
            </ul>
        </li>

        <!-- Menu 3: Komunitas & Sosial -->
        <li class="nav-item has-dropdown">
            <a href="#" class="nav-link">Komunitas <span class="arrow">▼</span></a>
            <ul class="dropdown-menu">
                <li><a href="#forum">Forum Diskusi</a></li>
                <li><a href="#grup">Grup Pengguna</a></li>
                <li><a href="#pertemuan">Pertemuan</a></li>
                <li><a href="#profil">Profil Anggota</a></li>
                <li><a href="#obrolan">Obrolan Langsung</a></li>
                <li class="separator">...</li>
                <li><a href="#lihat-semua-komunitas">Lihat Semua (30+)</a></li>
            </ul>
        </li>

        <!-- Menu 4: Pasar -->
        <li class="nav-item has-dropdown">
            <a href="#" class="nav-link">Pasar <span class="arrow">▼</span></a>
            <ul class="dropdown-menu">
                <li><a href="#barang-digital">Barang Digital</a></li>
                <li><a href="#langganan">Langganan</a></li>
                <li><a href="#freelance">Pusat Freelance</a></li>
                <li><a href="#iklan">Jaringan Iklan</a></li>
                <li><a href="#lelang">Lelang</a></li>
                <li class="separator">...</li>
                <li><a href="#lihat-semua-pasar">Lihat Semua (60+)</a></li>
            </ul>
        </li>

        <!-- Menu 5: Akun & Pengaturan -->
        <li class="nav-item has-dropdown">
            <a href="#" class="nav-link">Akun <span class="arrow">▼</span></a>
            <ul class="dropdown-menu">
                <li><a href="#dasbor">Dasbor</a></li>
                <li><a href="#tagihan">Tagihan</a></li>
                <li><a href="#pengaturan">Pengaturan</a></li>
                <li><a href="#dukungan">Pusat Dukungan</a></li>
                <li><a href="#keluar">Keluar</a></li>
                <li class="separator">...</li>
                <li><a href="#lihat-semua-akun">Lihat Semua (20+)</a></li>
            </ul>
        </li>
        
        <!-- Menu 6: Fitur Khusus Folder -->
        <li class="nav-item has-dropdown">
            <a href="#" class="nav-link">Fitur {folder_name.replace('.digital', '').title()} <span class="arrow">▼</span></a>
            <ul class="dropdown-menu">
{submenu_html}
            </ul>
        </li>
    </ul>
</nav>

<style>
/* Gaya Navigasi Digital */
.digital-nav {{
    background: #1a1a1a;
    color: #ffffff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 0 20px;
    position: relative;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}}

.digital-nav-menu {{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between; /* Menu berjajar kesamping */
    align-items: center;
    flex-wrap: wrap;
}}

.nav-item {{
    position: relative;
    padding: 15px 0;
}}

.nav-link {{
    color: #ffffff;
    text-decoration: none;
    padding: 10px 20px;
    display: block;
    transition: background 0.3s ease;
    border-radius: 4px;
    white-space: nowrap;
}}

.nav-link:hover {{
    background: #333;
}}

.arrow {{
    font-size: 0.7em;
    margin-left: 5px;
    transition: transform 0.3s ease;
}}

.has-dropdown:hover .arrow {{
    transform: rotate(180deg);
}}

.dropdown-menu {{
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: #2a2a2a;
    min-width: 250px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    border-radius: 4px;
    padding: 10px 0;
    z-index: 1001;
}}

.has-dropdown:hover .dropdown-menu {{
    display: block;
}}

.dropdown-menu li {{
    list-style: none;
}}

.dropdown-menu a {{
    color: #e0e0e0;
    text-decoration: none;
    padding: 10px 20px;
    display: block;
    transition: all 0.3s ease;
}}

.dropdown-menu a:hover {{
    background: #444;
    color: #fff;
    padding-left: 25px;
}}

.separator {{
    border-top: 1px solid #444;
    margin: 5px 0;
    padding: 0;
}}

/* Responsive */
@media (max-width: 768px) {{
    .digital-nav-menu {{
        flex-direction: column;
        align-items: flex-start;
    }}
    
    .nav-item {{
        width: 100%;
    }}
    
    .nav-link {{
        width: 100%;
    }}
    
    .dropdown-menu {{
        position: static;
        box-shadow: none;
        padding-left: 20px;
    }}
}}
</style>
<!-- END: Navigasi Global media.digital -->

'''
    return nav_html

def update_index_files():
    """Update semua file index.html di folder .digital"""
    
    # Cari semua direktori .digital
    digital_folders = []
    for root, dirs, files in os.walk('/workspace'):
        for dir_name in dirs:
            if dir_name.endswith('.digital'):
                digital_folders.append(os.path.join(root, dir_name))
    
    print(f"Ditemukan {len(digital_folders)} folder .digital")
    
    updated_count = 0
    created_count = 0
    
    for folder_path in digital_folders:
        folder_name = os.path.basename(folder_path)
        index_path = os.path.join(folder_path, 'index.html')
        
        # hasilkan navigasi baru
        new_nav = generate_indonesian_navigation(folder_name)
        
        if os.path.exists(index_path):
            # Baca berkas existing
            with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Cek apakah sudah ada navigasi (berbagai variasi)
            nav_patterns = [
                r'<!-- START:.*?media\.digital.*?-->.*?<!-- END:.*?media\.digital.*?-->',
                r'<nav class="digital-nav">.*?</nav>\s*<style>.*?</style>',
                r'<!-- START: Global Navigation.*?-->.*?<!-- END: Global Navigation.*?-->',
                r'<!-- START: Navigasi Global.*?-->.*?<!-- END: Navigasi Global.*?-->'
            ]
            
            replaced = False
            for pattern in nav_patterns:
                new_content = re.sub(pattern, new_nav.strip(), content, flags=re.DOTALL | re.IGNORECASE)
                if new_content != content:
                    content = new_content
                    replaced = True
                    break
            
            # Jika tidak ada navigasi yang ditemukan, tambahkan di awal body atau head
            if not replaced:
                # Hapus komentar dan navigasi lama jika ada
                content = re.sub(r'<!--\s*Navigation Component.*?-->', '', content, flags=re.DOTALL | re.IGNORECASE)
                content = re.sub(r'<!--\s*START:[^>]*-->.*?<!--\s*END:[^>]*-->', '', content, flags=re.DOTALL | re.IGNORECASE)
                content = re.sub(r'<nav class="digital-nav">.*?</nav>\s*<style>.*?</style>', '', content, flags=re.DOTALL | re.IGNORECASE)
                
                # Coba tambahkan setelah <head> atau <body>
                if '<head>' in content:
                    content = content.replace('<head>', f'<head>\n{new_nav}', 1)
                elif '<body>' in content:
                    content = content.replace('<body>', f'<body>\n{new_nav}', 1)
                else:
                    # Tambahkan di awal berkas
                    content = new_nav + '\n' + content
            
            # Tulis kembali
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            updated_count += 1
            print(f"✓ Diperbarui: {folder_path}")
        else:
            # Buat berkas indeks.html baru dengan navigasi
            html_content = f'''<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{folder_name.replace(".digital", "").title()} - media.digital</title>
    {new_nav}
</head>
<body>
    <div class="container">
        <h1>Selamat Datang di {folder_name.replace(".digital", "").title()}</h1>
        <p>Ini adalah halaman utama untuk fitur {folder_name.replace(".digital", "")}.</p>
    </div>
</body>
</html>
'''
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            created_count += 1
            print(f"✓ Dibuat: {folder_path}")
    
    print(f"\n=== Ringkasan ===")
    print(f"Folder diperbarui: {updated_count}")
    print(f"File dibuat baru: {created_count}")
    print(f"Total: {updated_count + created_count}")

if __name__ == '__main__':
    update_index_files()
