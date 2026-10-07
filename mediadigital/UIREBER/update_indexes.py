#!/usr/bin/env python3
"""
Script untuk menambahkan index.html dengan navigasi 5 menu utama 
dan puluhan sub-menu yang relevan dengan nama folder .digital
"""

import os
import re
from pathlib import Path

# pemetaan kata kunci ke kategori dan sub-menu spesifik
KEYWORD_MAPPINGS = {
    # E-commerce & Shopping
    'shop': {
        'category': 'E-Commerce',
        'menus': [
            ('Produk', ['Katalog Produk', 'Manajemen Stok', 'Harga & Diskon', 'Review Produk', 'Rekomendasi AI', 'Bundle Deals', 'Flash Sale', 'Pre-Order', 'Product Comparison', 'Wishlist']),
            ('Pesanan', ['Daftar Pesanan', 'Tracking Order', 'Riwayat Pembelian', 'Pengembalian', 'Refund', 'Invoice', 'Konfirmasi Pembayaran', 'Estimasi Pengiriman', 'Multiple Addresses', 'Subscription Order'])
            ('Pembayaran', ['Metode Pembayaran', 'E-Wallet', 'Transfer Bank', 'Kartu Kredit', 'Cicilan', 'COD', 'Crypto Payment', 'Auto Debit', 'Payment Gateway', 'Refund Processin'])
            ('Pengiriman', ['Opsi Kurir', 'Biaya Kirim', 'Tracking Realtime', 'Pickup Point', 'Same Day Delivery', 'International Shipping', 'Insurance', 'Packaging Options', 'Delivery Schedule', 'Return Picku'])
            ('Pelanggan', ['Profil Akun', 'Loyalty Points', 'Voucher Saya', 'Notifikasi', 'Live Chat', 'FAQ', 'Komplain', 'Testimoni', 'Refer-a-Friend', 'VIP Membership']),
        ]
    },
    'boost': {
        'category': 'Marketing & Growth',
        'menus': [
            ('SEO Tools', ['Keyword Research', 'On-Page SEO', 'Backlink Analyzer', 'Site Audit', 'Rank Tracking', 'Competitor Analysis', 'Schema Generator', 'Sitemap Builder', 'Meta Tag Optimizer', 'Speed Tes'])
            ('Social Media', ['Post Scheduler', 'Analytics Dashboard', 'Hashtag Generator', 'Content Calendar', 'Engagement Tracker', 'Influencer Finder', 'Ad Campaign Manager', 'Story Creator', 'Reel Maker', 'Cross-Platform Pos'])
            ('Email Marketing', ['Template Builder', 'List Management', 'Automation Flow', 'A/B Testing', 'Deliverability Check', 'Open Rate Analytics', 'Click Tracking', 'Segmentation', 'Drip Campaign', 'Unsubscribe Manage'])
            ('Ads Manager', ['Google Ads', 'Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'Budget Optimizer', 'ROI Calculator', 'Ad Copy Generator', 'Audience Targeting', 'Retargeting Setup', 'Conversion Pixe'])
            ('Analytics', ['Traffic Analysis', 'User Behavior', 'Funnel Visualization', 'Heatmap', 'Session Recording', 'Goal Tracking', 'Custom Reports', 'Real-time Stats', 'Export Data', 'API Integration'])],
        ]
    },
    
    # media & isi
    'media': {
        'category': 'Media & Broadcasting',
        'menus': [
            ('Content Library', ['Video Files', 'Audio Files', 'Images', 'Documents', 'Live Streams', 'Podcasts', 'Webinars', 'Archives', 'Playlists', 'Collection'])
            ('Publishing', ['Schedule Post', 'Auto Publish', 'Multi-platform', 'Draft Manager', 'Content Calendar', 'Version Control', 'Collaboration', 'Approval Workflow', 'SEO Optimization', 'Analytics Previe'])
            ('Streaming', ['Live Broadcast', 'RTMP Setup', 'CDN Configuration', 'Quality Selector', 'Chat Integration', 'Viewer Analytics', 'Monetization', 'Recording', 'Highlights', 'Embed Playe'])
            ('Editing', ['Video Editor', 'Audio Editor', 'Image Editor', 'Subtitle Tool', 'Thumbnail Maker', 'Effects Library', 'Templates', 'Batch Processing', 'AI Enhancement', 'Export Format'])
            ('Distribution', ['Syndication', 'RSS Feed', 'API Access', 'Embed Codes', 'Social Sharing', 'Email Newsletter', 'Push Notifications', 'Mobile App', 'Smart TV', 'Podcast Directorie')],
        ]
    },
    'news': {
        'category': 'News & Journalism',
        'menus': [
            ('Berita', ['Nasional', 'Internasional', 'Politik', 'Ekonomi', 'Olahraga', 'Hiburan', 'Teknologi', 'Kesehatan', 'Pendidikan', 'Lingkunga'])
            ('Multimedia', ['Foto Galeri', 'Video News', 'Infografis', 'Podcast News', 'Live Report', 'Interactive Story', 'Data Visualization', 'Documentary', 'Interview', 'Behind The Scene'])
            ('Opini', ['Editorial', 'Kolom', 'Surat Pembaca', 'Analisis Ahli', 'Polling', 'Debat', 'Fact Check', 'Investigasi', 'Feature Story', 'Long-for'])
            ('Lokal', ['Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali', 'Papua', 'Maluk'])
            ('Layanan', ['Breaking News', 'Newsletter', 'RSS Feed', 'Mobile App', 'Offline Mode', 'Personalization', 'Bookmark', 'Share Article', 'Print Version', 'Accessibilit')],
        ]
    },
    
    # Technology & Development
    'php': {
        'category': 'PHP Development',
        'menus': [
            ('Framework', ['Laravel', 'Symfony', 'CodeIgniter', 'Yii', 'CakePHP', 'Slim', 'Phalcon', 'Zend', 'FuelPHP', 'Kohan'])
            ('Database', ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'MariaDB', 'SQLite', 'Oracle', 'MSSQL', 'Cassandr'])
            ('API', ['RESTful API', 'GraphQL', 'SOAP', 'JSON-RPC', 'OAuth2', 'JWT Auth', 'API Documentation', 'Rate Limiting', 'Versioning', 'Testin'])
            ('Security', ['XSS Protection', 'SQL Injection', 'CSRF Token', 'Input Validation', 'Encryption', 'Hashing', 'Session Management', 'File Upload Security', 'Rate Limiting', 'Audit Lo'])
            ('Performance', ['Caching', 'Query Optimization', 'Lazy Loading', 'CDN Integration', 'Minification', 'Gzip Compression', 'Database Indexing', 'Connection Pooling', 'Async Processing', 'Profilin')],
        ]
    },
    'cache': {
        'category': 'Caching Solutions',
        'menus': [
            ('Cache Types', ['Memory Cache', 'Disk Cache', 'Browser Cache', 'CDN Cache', 'Object Cache', 'Query Cache', 'Full Page Cache', 'Fragment Cache', 'Edge Cache', 'Distributed Cach'])
            ('Strategies', ['LRU', 'LFU', 'FIFO', 'TTL Based', 'Write-through', 'Write-back', 'Cache-aside', 'Read-through', 'Invalidation', 'Warm-u'])
            ('Monitoring', ['Hit Rate', 'Miss Rate', 'Eviction Rate', 'Memory Usage', 'Latency Stats', 'Throughput', 'Error Rate', 'Size Distribution', 'Age Distribution', 'Real-time Graph'])
            ('Configuration', ['Cache Size', 'Expiration Time', 'Compression', 'Serialization', 'Partitioning', 'Replication', 'Persistence', 'Backup', 'Restore', 'Migratio'])
            ('Integration', ['Redis', 'Memcached', 'Varnish', 'Nginx', 'Apache', 'HAProxy', 'CloudFlare', 'AWS ElastiCache', 'Azure Cache', 'Google Memorystor')],
        ]
    },
    'api': {
        'category': 'API Management',
        'menus': [
            ('Endpoints', ['GET Resources', 'POST Create', 'PUT Update', 'DELETE Remove', 'PATCH Partial', 'Bulk Operations', 'Batch Requests', 'Async Jobs', 'Webhooks', 'Callback'])
            ('Authentication', ['API Key', 'OAuth 2.0', 'JWT Token', 'Basic Auth', 'Bearer Token', 'HMAC', 'mTLS', 'SAML', 'OpenID Connect', 'Service Accoun'])
            ('Documentation', ['Swagger UI', 'OpenAPI Spec', 'Code Examples', 'SDK Downloads', 'Postman Collection', 'Changelog', 'Migration Guide', 'FAQ', 'Tutorials', 'Video Guide'])
            ('Testing', ['Unit Tests', 'Integration Tests', 'Load Tests', 'Stress Tests', 'Mock Server', 'Contract Testing', 'Fuzz Testing', 'Security Scanning', 'Performance Benchmark', 'Regression Test'])
            ('Monitoring', ['Request Logs', 'Error Tracking', 'Latency Metrics', 'Usage Statistics', 'Rate Limits', 'Quota Management', 'Alerting', 'Dashboard', 'Custom Events', 'Export Report')],
        ]
    },
    
    # keamanan
    'security': {
        'category': 'Cybersecurity',
        'menus': [
            ('Protection', ['Firewall', 'Antivirus', 'Anti-malware', 'IDS/IPS', 'DDoS Protection', 'WAF', 'Endpoint Security', 'Network Security', 'Cloud Security', 'Zero Trus'])
            ('Authentication', ['2FA/MFA', 'Biometric', 'Password Manager', 'SSO', 'Hardware Key', 'OTP', 'Certificate Auth', 'Risk-based Auth', 'Behavioral Analysis', 'Device Fingerprin'])
            ('Encryption', ['AES-256', 'RSA', 'ECC', 'TLS/SSL', 'End-to-End', 'Field-level', 'Database Encryption', 'File Encryption', 'Key Management', 'HSM Integratio'])
            ('Compliance', ['GDPR', 'HIPAA', 'PCI-DSS', 'SOC2', 'ISO 27001', 'NIST', 'CCPA', 'PIPEDA', 'LGPD', 'APP'])
            ('Incident Response', ['Threat Detection', 'Forensics', 'Malware Analysis', 'Vulnerability Scan', 'Penetration Test', 'Security Audit', 'Patch Management', 'Backup Recovery', 'DR Plan', 'Tabletop Exercis')],
        ]
    },
    'csrf': {
        'category': 'CSRF Protection',
        'menus': [
            ('Token Management', ['Generate Token', 'Validate Token', 'Rotate Tokens', 'Token Storage', 'Session Binding', 'Double Submit', 'Custom Header', 'Form Hidden Field', 'Cookie-based', 'JWT CSRF', 'Stateless CSR'])
            ('Middleware', ['Express.js', 'Django', 'Flask', 'Laravel', 'Spring', 'ASP.NET', 'Ruby on Rails', 'Symfony', 'CodeIgniter', 'Custom Implementatio'])
            ('Testing', ['Vulnerability Scan', 'Penetration Test', 'Automated Testing', 'Manual Testing', 'False Positive Check', 'Coverage Report', 'Regression Test', 'Performance Impact', 'Compatibility Test', 'Security Audi'])
            ('Best Practices', ['SameSite Cookie', 'Origin Check', 'Referer Check', 'Custom Headers', 'State-changing Only', 'Short Expiration', 'Secure Flag', 'HttpOnly Flag', 'Domain Scope', 'Subdomain Handlin'])
            ('Integration', ['Frontend Framework', 'Backend Framework', 'API Protection', 'Microservices', 'Mobile Apps', 'SPA Applications', 'Server-side Rendering', 'Progressive Web Apps', 'WebSocket Security', 'GraphQL Protection', 'REST API Securit')],
        ]
    },
    
    # Business & Finance
    'bisnis': {
        'category': 'Business Management',
        'menus': [
            ('Planning', ['Business Plan', 'Market Analysis', 'Competitor Analysis', 'SWOT Analysis', 'Financial Projection', 'Risk Assessment', 'Strategy Map', 'OKR Setting', 'KPI Dashboard', 'Scenario Plannin'])
            ('Finance', ['Accounting', 'Invoicing', 'Expense Tracking', 'Budgeting', 'Cash Flow', 'Tax Calculation', 'Payroll', 'Financial Report', 'Audit Trail', 'Multi-currenc'])
            ('HR', ['Recruitment', 'Employee Database', 'Attendance', 'Leave Management', 'Performance Review', 'Training', 'Compensation', 'Benefits', 'Org Chart', 'Succession Plannin'])
            ('Sales', ['CRM', 'Lead Management', 'Pipeline', 'Quote Generation', 'Contract Management', 'Commission Tracking', 'Sales Forecast', 'Territory Management', 'Customer Segmentation', 'Retention Analysi'])
            ('Operations', ['Project Management', 'Task Tracking', 'Resource Allocation', 'Time Tracking', 'Inventory', 'Supply Chain', 'Quality Control', 'Workflow Automation', 'Vendor Management', 'SLA Monitorin')],
        ]
    },
    'finance': {
        'category': 'Financial Services',
        'menus': [
            ('Banking', ['Account Opening', 'Deposits', 'Withdrawals', 'Transfers', 'Bill Payment', 'Standing Orders', 'Direct Debits', 'Foreign Exchange', 'Letters of Credit', 'Trade Financ'])
            ('Investment', ['Stock Trading', 'Mutual Funds', 'Bonds', 'ETFs', 'Derivatives', 'Portfolio Management', 'Robo Advisor', 'Research Reports', 'Market Data', 'Risk Profilin'])
            ('Loans', ['Personal Loan', 'Home Loan', 'Car Loan', 'Business Loan', 'Line of Credit', 'Loan Calculator', 'Application Process', 'Credit Check', 'Approval Workflow', 'Repayment Schedul'])
            ('Insurance', ['Life Insurance', 'Health Insurance', 'Property Insurance', 'Auto Insurance', 'Travel Insurance', 'Claims Processing', 'Policy Management', 'Premium Calculation', 'Underwriting', 'Actuarial Analysis', 'Reinsuranc'])
            ('Compliance', ['KYC Verification', 'AML Screening', 'Fraud Detection', 'Transaction Monitoring', 'Regulatory Reporting', 'Risk Management', 'Internal Audit', 'External Audit', 'Policy Documentation', 'Training Program')],
        ]
    },
    
    # awan & Infrastructure
    'cloud': {
        'category': 'Cloud Computing',
        'menus': [
            ('Compute', ['Virtual Machines', 'Containers', 'Serverless', 'Kubernetes', 'Auto Scaling', ['Load Balancing', 'GPU Instances', 'Spot Instances', 'Reserved Instances', 'Bare Metal', 'Edge Computing', 'Batch Processing', 'High Performance Computing', 'Container Registry', 'Service Mes'])
            ('Storage', ['Object Storage', 'Block Storage', 'File Storage', 'Archive Storage', ['Data Lake', 'Backup Service', 'Disaster Recovery', 'Snapshot', 'Versioning', 'Lifecycle Policy', 'Cross-region Replication', 'Encryption at Rest', 'CDN Integration', 'Hybrid Cloud Storag'])
            ('Networking', ['VPC', 'Subnets', 'Route Tables', ['NAT Gateway', 'VPN Connection', 'Direct Connect', 'DNS Service', 'Private Link', 'Traffic Manager', 'Firewall Rules', 'DDoS Protection', 'Network Monitoring', 'Bandwidth Management', 'Peering', 'Transit Gatewa'])
            ('Database', ['Managed SQL', ['NoSQL Database', 'Data Warehouse', 'Cache Service', 'Graph Database', 'Time Series DB', 'Search Engine', 'Migration Service', 'Backup Automation', 'Read Replicas', 'Multi-AZ Deployment', 'Point-in-time Recovery', 'Query Optimization', 'Connection Pooling', 'Shardin'])
            ('Management', ['Monitoring', ['Logging Service', 'Alerting', 'Dashboard', 'Cost Management', 'Resource Tags', 'Access Control', 'Compliance Checker', 'Configuration Management', 'Infrastructure as Code', 'CI/CD Pipeline', 'Secrets Manager', 'Service Catalog', 'Support Center', 'Health Chec')],
        ]
    },
    'server': {
        'category': 'Server Management',
        'menus': [
            ('Configuration', ['OS Installation', 'Package Management', ['Service Configuration', 'User Management', 'Permission Settings', 'Network Setup', 'Firewall Rules', 'SSH Hardening', 'Kernel Tuning', 'System Updates', 'Cron Jobs', 'Log Rotation', 'Backup Scripts', 'Monitoring Agent'])
            ('Performance', ['CPU Monitoring', 'Memory Usage', 'Disk I/O', 'Network Throughput', ['Process Management', 'Resource Limits', 'Load Balancing', 'Caching Layer', 'Database Optimization', 'Web Server Tuning', 'Application Profiling', 'Bottleneck Analysis', 'Capacity Planning', 'Scaling Strateg'])
            ('Security', ['Patch Management', ['Vulnerability Scanning', 'Intrusion Detection', 'Log Analysis', 'Access Control', 'Certificate Management', 'Encryption Setup', 'Audit Logging', 'Incident Response', 'Disaster Recovery', 'Compliance Checking', 'Security Hardening', 'Penetration Testing', 'Threat Intelligenc'])
            ('Automation', ['Configuration Management', ['Infrastructure as Code', 'Deployment Scripts', 'Orchestration Tools', 'Container Management', 'Service Discovery', 'Health Checks', 'Auto Remediation', 'Scheduled Tasks', 'Event-driven Actions', 'API Integration', 'Webhook Handlers', 'Notification Systems', 'Reporting Automatio'])
            ('Troubleshooting', ['Log Analysis', ['Performance Debugging', 'Network Diagnostics', 'System Recovery', 'Data Recovery', 'Service Restart', 'Rollback Procedures', 'Root Cause Analysis', 'Documentation', 'Knowledge Base', 'Escalation Process', 'Vendor Support', 'Community Forums', 'Training Material')],
        ]
    },
    
    # data & Analytics
    'data': {
        'category': 'Data Management',
        'menus': [
            ('Collection', ['Web Scraping', ['API Integration', 'IoT Sensors', 'Log Collection', 'Survey Tools', 'Form Submissions', 'Event Tracking', 'Data Import', 'Real-time Streaming', 'Batch Processing', 'CDC Captur'])
            ('Processing', ['ETL Pipeline', ['Data Cleaning', 'Transformation Rules', 'Validation Checks', 'Enrichment', 'Aggregation', 'Normalization', 'Deduplication', 'Error Handling', 'Quality Metrics', 'Lineage Trackin'])
            ('Storage', ['Data Warehouse', ['Data Lake', 'Data Mart', 'Operational Store', 'Archive Storage', 'Time-series DB', 'Graph Database', 'Document Store', 'Columnar Storage', 'Distributed File System', 'Hybrid Architectur'])
            ('Analysis', ['Descriptive Analytics', ['Diagnostic Analytics', 'Predictive Analytics', 'Prescriptive Analytics', 'Statistical Analysis', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Anomaly Detection', 'Forecastin'])
            ('Visualization', ['Dashboards', ['Reports', 'Charts', 'Graphs', 'Maps', 'KPI Widgets', 'Interactive Filters', 'Drill-down', 'Real-time Updates', 'Export Options', 'Sharing Features', 'Mobile Views', 'Embedded Analytics', 'White-labelin')],
        ]
    },
    'analytics': {
        'category': 'Analytics Platform',
        'menus': [
            ('Web Analytics', ['Page Views', ['Session Tracking', 'User Journey', 'Bounce Rate', 'Conversion Funnel', 'Exit Pages', 'Entry Pages', 'Time on Site', 'Pages per Session', 'Geographic Data', 'Device Breakdown', 'Browser Stats', 'Traffic Sources', 'Campaign Trackin'])
            ('Product Analytics', ['Feature Usage', ['User Cohorts', 'Retention Analysis', 'Churn Prediction', 'A/B Testing', 'Experiment Results', 'User Segments', 'Behavioral Patterns', 'Path Analysis', 'Stickiness Metrics', 'Activation Rate', 'Engagement Score', 'Lifetime Value', 'Revenue Attributio'])
            ('Marketing Analytics', ['Channel Performance', ['Attribution Modeling', 'ROAS Calculation', 'Customer Acquisition Cost', 'Marketing Mix Modeling', 'Brand Lift Studies', 'Ad Effectiveness', 'Email Metrics', 'Social Media Analytics', 'Influencer ROI', 'Content Performance', 'SEO Rankings', 'Organic Traffic', 'Paid Search Performanc'])
            ('Customer Analytics', ['Segmentation', ['Persona Development', 'Journey Mapping', 'Sentiment Analysis', 'NPS Tracking', 'CSAT Scores', 'CES Measurement', 'Feedback Analysis', 'Complaint Tracking', 'Support Tickets', 'Churn Analysis', 'Upsell Opportunities', 'Cross-sell Recommendations', 'Loyalty Program'])
            ('Reporting', ['Standard Reports', ['Custom Reports', 'Scheduled Reports', 'Ad-hoc Analysis', 'Data Export', 'API Access', 'Alerts & Notifications', 'Benchmarking', 'Trend Analysis', 'Forecasting', 'What-if Analysis', 'Scenario Planning', 'Executive Dashboards', 'Board Presentation')],
        ]
    },
    
    # Healthcare & Medical
    'health': {
        'category': 'Healthcare Services',
        'menus': [
            ('Patient Care', ['Appointment Booking', ['Medical Records', 'Prescription Management', 'Lab Results', 'Imaging Reports', 'Treatment Plans', 'Care Coordination', 'Remote Monitoring', 'Telemedicine', 'Second Opinion', 'Health Education', 'Medication Reminders', 'Symptom Checker', 'Emergency Contact'])
            ('Clinical', ['Diagnosis Support', ['Clinical Guidelines', 'Drug Interactions', 'Allergy Alerts', 'Vital Signs Tracking', 'Growth Charts', 'Immunization Records', 'Screening Programs', 'Care Protocols', 'Evidence-based Medicine', 'Research Integration', 'Case Studies', 'Grand Rounds', 'Morbidity Review'])
            ('Administrative', ['Registration', ['Insurance Verification', 'Billing & Coding', ['Claims Processing', 'Payment Collection', 'Referral Management', 'Prior Authorization', 'Utilization Review', 'Quality Reporting', 'Regulatory Compliance', 'Accreditation', 'Risk Adjustment', 'Population Health', 'Contract Managemen'])
            ('Pharmacy', ['Medication Dispensing', ['Drug Utilization Review', 'Compounding Services', 'Specialty Medications', 'Mail Order Pharmacy', 'Medication Therapy Management', 'Adherence Programs', 'Side Effect Monitoring', 'Generic Alternatives', 'Prior Authorization', 'Formulary Management', 'Inventory Control', 'Cold Chain Management', 'Controlled Substance'])
            ('Wellness', ['Health Screening', ['Preventive Care', 'Fitness Programs', 'Nutrition Counseling', ['Mental Health Support', 'Stress Management', 'Smoking Cessation', 'Weight Management', 'Chronic Disease Management', 'Senior Care', 'Pediatric Care', 'Women\'s Health', 'Men\'s Health', 'Occupational Healt')],
        ]
    },
    
    # Education & Learning
    'education': {
        'category': 'Education Platform',
        'menus': [
            ('Courses', ['Course Catalog', ['Curriculum Design', 'Lesson Plans', 'Video Lectures', 'Reading Materials', 'Assignments', 'Quizzes', 'Exams', 'Grading Rubrics', 'Certificates', 'Continuing Education', 'Professional Development', 'Micro-credentials', 'Degree Program'])
            ('Students', ['Student Profiles', ['Enrollment Management', 'Attendance Tracking', 'Progress Monitoring', ['Grade Reports', 'Transcripts', 'Learning Paths', 'Personalized Learning', 'Adaptive Learning', 'Peer Collaboration', 'Discussion Forums', 'Study Groups', 'Tutoring Services', 'Career Counselin'])
            ('Teachers', ['Teacher Dashboard', ['Class Management', 'Content Creation', 'Assessment Tools', ['Student Analytics', 'Communication Tools', 'Parent Portal', 'Professional Learning Communities', 'Resource Sharing', 'Best Practices', 'Instructional Strategies', 'Differentiated Instruction', 'Classroom Management', 'Behavior Trackin'])
            ('Administration', ['School Management', ['Timetable Scheduling', ['Resource Allocation', 'Budget Management', 'Staff Directory', 'Policy Documents', 'Compliance Tracking', 'Accreditation', 'Reporting', 'Data Analytics', 'Strategic Planning', 'Stakeholder Communication', 'Crisis Management', 'Facility Managemen'])
            ('Technology', ['LMS Platform', ['Video Conferencing', 'Collaboration Tools', ['Assessment Platform', 'Plagiarism Detection', 'Library System', 'Research Databases', 'Digital Repository', 'Accessibility Tools', 'Mobile Learning', 'Gamification', 'VR/AR Learning', 'AI Tutoring', 'Learning Analytics', 'Integration API')],
        ]
    },
    
    # Transportation & Logistics
    'transport': {
        'category': 'Transportation Services',
        'menus': [
            ('Vehicle Management', ['Fleet Tracking', ['Maintenance Schedule', 'Fuel Management', ['Driver Assignment', 'Route Optimization', 'Vehicle Inspection', 'Registration & Licensing', 'Insurance Management', 'Depreciation Tracking', 'Replacement Planning', 'Telematics', 'ELD Compliance', 'Safety Rating'])
            ('Dispatch', ['Order Management', ['Load Planning', ['Carrier Selection', 'Rate Negotiation', ['Shipment Tracking', 'Proof of Delivery', 'Exception Handling', 'Customer Communication', 'Billing & Invoicing', ['Claims Management', 'Performance Metrics', 'Carrier Scorecards', 'Capacity Planning', 'Network Optimizatio'])
            ('Logistics', ['Warehouse Management', ['Inventory Control', ['Order Fulfillment', ['Pick & Pack', ['Shipping Integration', ['Returns Processing', ['Cross-docking', ['Consolidation', ['Deconsolidation', ['Last Mile Delivery', ['Reverse Logistics', ['Third-party Logistics', ['Fourth-party Logistics', ['Supply Chain Visibilit'])
            ('Compliance', ['DOT Regulations', ['Hours of Service', ['Vehicle Safety', ['Driver Qualifications', ['Hazmat Handling', ['Customs Clearance', ['Trade Compliance', ['Security Programs', ['Environmental Regulations', ['Labor Laws', ['Insurance Requirements', ['Permit Management', ['Audit Preparation', ['Incident Reportin')],
        ]
    },
    
    # Real Estate & Property
    'property': {
        'category': 'Real Estate Platform',
        'menus': [
            ('Listings', ['Property Search', ['Advanced Filters', ['Map View', ['Virtual Tours', ['Photo Galleries', ['Floor Plans', ['Price History', ['Market Comparables', ['Neighborhood Info', ['School Districts', ['Commute Times', ['Crime Statistics', ['Future Developments', ['Investment Analysi'])
            ('Transactions', ['Buy Property', ['Sell Property', ['Rent Property', ['Lease Property', ['Mortgage Calculator', ['Pre-approval', ['Offer Management', ['Negotiation Tools', ['Contract Generation', ['Closing Process', ['Title Search', ['Escrow Services', ['Transfer Taxes', ['Recording Fee'])
            ('Management', ['Tenant Screening', ['Lease Administration', ['Rent Collection', ['Maintenance Requests', ['Property Inspections', ['Financial Reporting', ['Owner Statements', ['Vendor Management', ['Budget Planning', ['Reserve Funds', ['Capital Improvements', ['Insurance Claims', ['Tax Appeals', ['Compliance Audit'])
            ('Marketing', ['Listing Promotion', ['Social Media Campaigns', ['Email Marketing', ['Open House Events', ['Print Advertising', ['Digital Advertising', ['SEO Optimization', ['Content Marketing', ['Lead Generation', ['CRM Integration', ['Analytics Dashboard', ['A/B Testing', ['Brand Management', ['Public Relation')],
        ]
    },
    
    # Energy & Environment
    'energy': {
        'category': 'Energy Management',
        'menus': [
            ('Generation', ['Solar Power', ['Wind Power', ['Hydroelectric', ['Nuclear Power', ['Natural Gas', ['Coal Power', ['Biomass', ['Geothermal', ['Tidal Power', ['Wave Power', ['Hydrogen Fuel Cells', ['Battery Storage', ['Grid Integration', ['Power Purchase Agreement'])
            ('Distribution', ['Transmission Lines', ['Substations', ['Transformers', ['Switchgear', ['Protective Relays', ['SCADA Systems', ['Demand Response', ['Load Forecasting', ['Grid Balancing', ['Frequency Regulation', ['Voltage Control', ['Outage Management', ['Smart Meters', ['Distribution Automatio'])
            ('Consumption', ['Energy Audits', ['Efficiency Programs', ['Demand Side Management', ['Time-of-Use Pricing', ['Real-time Monitoring', ['Appliance Control', ['Building Automation', ['HVAC Optimization', ['Lighting Control', ['Motor Efficiency', ['Power Factor Correction', ['Renewable Integration', ['Net Metering', ['Carbon Offset'])
            ('Sustainability', ['Carbon Footprint', ['Emissions Tracking', ['Renewable Certificates', ['Green Tariffs', ['Climate Action Plans', ['Sustainability Reporting', ['ESG Metrics', ['Circular Economy', ['Water Conservation', ['Waste Reduction', ['Biodiversity Protection', ['Environmental Impact Assessment', ['Life Cycle Analysis', ['Sustainable Procuremen')],
        ]
    },
    
    # Agriculture & Farming
    'tanaman': {
        'category': 'Agriculture Technology',
        'menus': [
            ('Crop Management', ['Planting Schedule', ['Irrigation Planning', ['Fertilizer Application', ['Pest Control', ['Disease Management', ['Weed Control', ['Harvest Planning', ['Yield Estimation', ['Soil Testing', ['Nutrient Management', ['Cover Crops', ['Crop Rotation', ['Precision Agriculture', ['Variable Rate Technolog'])
            ('Monitoring', ['Satellite Imagery', ['Drone Surveys', ['Weather Stations', ['Soil Moisture Sensors', ['Plant Health Sensors', ['Growth Tracking', ['Stress Detection', ['Nutrient Deficiency', ['Pest Identification', ['Disease Diagnosis', ['Yield Mapping', ['Field Scouting', ['Remote Sensing', ['Data Analytic'])
            ('Equipment', ['Tractor Management', ['Implement Tracking', ['Maintenance Schedule', ['Fuel Monitoring', ['GPS Guidance', ['Auto-steering', ['Section Control', ['Rate Control', ['Telematics', ['Fleet Management', ['Operator Training', ['Safety Systems', ['Efficiency Metrics', ['Utilization Rate'])
            ('Market', ['Commodity Prices', ['Market Analysis', ['Forward Contracts', ['Futures Trading', ['Options Trading', ['Crop Insurance', ['Government Programs', ['Certification Programs', ['Organic Standards', ['Fair Trade', ['Direct Sales', ['Export Markets', ['Supply Chain Traceability', ['Blockchain Trackin')],
        ]
    },
    
    # Manufacturing & Industry
    'manufacturing': {
        'category': 'Manufacturing Operations',
        'menus': [
            ('Production', ['Production Planning', ['Scheduling', ['Work Orders', ['Bill of Materials', ['Routing', ['Quality Control', ['Inspection Plans', ['Statistical Process Control', ['Six Sigma', ['Lean Manufacturing', ['Continuous Improvement', ['Kaizen Events', ['Value Stream Mapping', ['Overall Equipment Effectivenes'])
            ('Maintenance', ['Preventive Maintenance', ['Predictive Maintenance', ['Condition Monitoring', ['Vibration Analysis', ['Thermography', ['Oil Analysis', ['Ultrasound Testing', ['Reliability Centered Maintenance', ['Total Productive Maintenance', ['Spare Parts Management', ['Work Order Management', ['Asset Management', ['Downtime Tracking', ['Mean Time Between Failure'])
            ('Supply Chain', ['Supplier Management', ['Procurement', ['Inventory Management', ['Warehousing', ['Material Handling', ['Logistics', ['Distribution', ['Demand Planning', ['Supply Planning', ['Production Control', ['Shop Floor Control', ['Warehouse Management System', ['Enterprise Resource Planning', ['Manufacturing Execution Syste'])
            ('Quality', ['Quality Assurance', ['Quality Control', ['Testing', ['Calibration', ['Metrology', ['Non-conformance Management', ['Corrective Actions', ['Preventive Actions', ['Root Cause Analysis', ['Failure Mode Effects Analysis', ['Statistical Analysis', ['Process Capability', ['Measurement Systems Analysis', ['Quality Audit')],
        ]
    },
    
    # Travel & Tourism
    'travel': {
        'category': 'Travel Services',
        'menus': [
            ('Booking', ['Flight Booking', ['Hotel Booking', ['Car Rental', ['Vacation Packages', ['Cruise Booking', ['Train Tickets', ['Bus Tickets', ['Activity Booking', ['Tour Booking', ['Travel Insurance', ['Visa Services', ['Airport Transfers', ['Multi-city Trips', ['Group Booking'])
            ('Planning', ['Destination Guides', ['Itinerary Planning', ['Budget Planning', ['Packing Lists', ['Weather Forecasts', ['Currency Exchange', ['Travel Advisories', ['Health Requirements', ['Cultural Information', ['Language Guides', ['Local Customs', ['Photography Tips', ['Safety Tips', ['Emergency Contact'])
            ('Experience', ['Local Tours', ['Adventure Activities', ['Cultural Experiences', ['Food Tours', ['Nightlife', ['Shopping', ['Spa & Wellness', ['Sports & Recreation', ['Wildlife Encounters', ['Historical Sites', ['Museums', ['Entertainment', ['Events & Festivals', ['Hidden Gem'])
            ('Support', ['24/7 Assistance', ['Trip Changes', ['Cancellations', ['Refunds', ['Complaints', ['Lost & Found', ['Medical Assistance', ['Legal Assistance', ['Evacuation Services', ['Translation Services', ['Concierge Services', ['VIP Services', ['Loyalty Programs', ['Travel Reward')],
        ]
    },
    'penerbangan': {
        'category': 'Aviation Services',
        'menus': [
            ('Flights', ['Flight Search', ['Flight Status', ['Flight Tracking', ['Seat Selection', ['Meal Preferences', ['Special Assistance', ['Check-in', ['Boarding Pass', ['Baggage Allowance', ['Extra Baggage', ['Flight Changes', ['Upgrades', ['Lounge Access', ['Fast Track Securit'])
            ('Aircraft', ['Fleet Information', ['Aircraft Specifications', ['Seat Maps', ['In-flight Entertainment', ['Wi-Fi Availability', ['Power Outlets', ['Cabin Classes', ['Amenities', ['Safety Features', ['Accessibility Features', ['Pet Policies', ['Cargo Services', ['Charter Flights', ['Private Jet'])
            ('Airports', ['Airport Maps', ['Terminal Information', ['Gate Information', ['Parking', ['Ground Transportation', ['Lounges', ['Restaurants', ['Shopping', ['Hotels Nearby', ['Car Rental', ['Meet & Greet', ['VIP Services', ['Conference Facilities', ['Observation Deck'])
            ('Services', ['Frequent Flyer Program', ['Status Matching', ['Mileage Run', ['Award Travel', ['Upgrade Certificates', ['Companion Passes', ['Corporate Programs', ['Group Travel', ['Military Discounts', ['Student Discounts', ['Senior Discounts', ['Error Fares', ['Last-minute Deals', ['Package Deal')],
        ]
    },
    
    # Food & Beverage
    'resep': {
        'category': 'Recipe Platform',
        'menus': [
            ('Recipes', ['Browse Recipes', ['Search Recipes', ['Recipe Categories', ['Cuisine Types', ['Dietary Restrictions', ['Difficulty Levels', ['Cooking Times', ['Serving Sizes', ['Ingredient Lists', ['Step-by-step Instructions', ['Nutritional Information', ['User Ratings', ['Chef Recommendations', ['Seasonal Recipe'])
            ('Ingredients', ['Ingredient Database', ['Substitution Guide', ['Shopping Lists', ['Meal Planning', ['Pantry Management', ['Freshness Tracking', ['Local Sourcing', ['Organic Options', ['Specialty Ingredients', ['International Ingredients', ['Allergen Information', ['Seasonal Availability', ['Price Comparison', ['Delivery Option'])
            ('Techniques', ['Cooking Methods', ['Knife Skills', ['Baking Techniques', ['Grilling Tips', ['Sous Vide', ['Fermentation', ['Preservation', ['Plating', ['Food Styling', ['Kitchen Hacks', ['Equipment Reviews', ['Safety Tips', ['Troubleshooting', ['Video Tutorial'])
            ('Community', ['User Submissions', ['Recipe Collections', ['Cooking Challenges', ['Photo Sharing', ['Reviews & Comments', ['Q&A Forum', ['Cook-alongs', ['Virtual Classes', ['Chef Interviews', ['Food Bloggers', ['Restaurant Reviews', ['Food Events', ['Cookbook Club', ['Recipe Contest')],
        ]
    },
    
    # Sports & Fitness
    'olahraga': {
        'category': 'Sports & Fitness',
        'menus': [
            ('Workouts', ['Workout Plans', ['Exercise Library', ['Video Demonstrations', ['Custom Workouts', ['HIIT Workouts', ['Strength Training', ['Cardio Workouts', ['Flexibility Training', ['Balance Training', ['Core Workouts', ['Sport-specific Training', ['Recovery Workouts', ['Beginner Programs', ['Advanced Program'])
            ('Tracking', ['Activity Tracking', ['Heart Rate Monitoring', ['GPS Tracking', ['Calorie Tracking', ['Distance Tracking', ['Pace Tracking', ['Elevation Tracking', ['Sleep Tracking', ['Recovery Tracking', ['Progress Photos', ['Body Measurements', ['Performance Metrics', ['Goal Setting', ['Achievement Badge'])
            ('Nutrition', ['Meal Plans', ['Macro Tracking', ['Calorie Counting', ['Hydration Tracking', ['Supplement Guide', ['Pre-workout Nutrition', ['Post-workout Nutrition', ['Weight Loss Plans', ['Muscle Gain Plans', ['Special Diets', ['Recipe Database', ['Grocery Lists', ['Meal Prep Tips', ['Nutrition Coachin'])
            ('Community', ['Social Feed', ['Groups & Clubs', ['Challenges', ['Leaderboards', ['Virtual Races', ['Live Classes', ['Personal Trainers', ['Coaching Services', ['Success Stories', ['Tips & Advice', ['Equipment Reviews', ['Gym Finder', ['Event Calendar', ['Partner Matchin')],
        ]
    },
    
    # Entertainment & Gaming
    'game': {
        'category': 'Gaming Platform',
        'menus': [
            ('Games', ['Game Library', ['New Releases', ['Popular Games', ['Upcoming Games', ['Free Games', ['Indie Games', ['AAA Titles', ['Multiplayer Games', ['Single Player Games', ['VR Games', ['Mobile Games', ['Browser Games', ['Classic Games', ['Game Bundle'])
            ('Features', ['Achievements', ['Leaderboards', ['Cloud Saves', ['Cross-platform Play', ['Voice Chat', ['Text Chat', ['Friends List', ['Party System', ['Matchmaking', ['Spectator Mode', ['Replay System', ['Mod Support', ['DLC Marketplace', ['In-game Purchase'])
            ('Community', ['Forums', ['Guides & Walkthroughs', ['Reviews', ['Screenshots', ['Videos', ['Streams', ['Clans & Guilds', ['Tournaments', ['Events', ['Beta Testing', ['Feedback', ['Bug Reports', ['Fan Art', ['Cospla'])
            ('Support', ['Technical Support', ['Account Management', ['Parental Controls', ['Refund Policy', ['Terms of Service', ['Privacy Policy', ['Community Guidelines', ['Cheating Prevention', ['Report Players', ['Accessibility Options', ['Language Support', ['System Requirements', ['Troubleshooting', ['FA')],
        ]
    },
    
    # Legal & Compliance
    'legal': {
        'category': 'Legal Services',
        'menus': [
            ('Documents', ['Contract Templates', ['Legal Forms', ['Agreements', ['Terms of Service', ['Privacy Policies', ['NDAs', ['Employment Contracts', ['Lease Agreements', ['Wills & Trusts', ['Power of Attorney', ['Incorporation Documents', ['Patent Applications', ['Trademark Applications', ['Copyright Registratio'])
            ('Services', ['Legal Advice', ['Contract Review', ['Due Diligence', ['Litigation Support', ['Dispute Resolution', ['Mediation', ['Arbitration', ['Legal Research', ['Case Law Search', ['Statute Search', ['Regulatory Compliance', ['Risk Assessment', ['Legal Opinions', ['Expert Witnesse'])
            ('Compliance', ['Regulatory Tracking', ['Policy Management', ['Training Programs', ['Audits', ['Reporting', ['Certifications', ['Licenses', ['Permits', ['Inspections', ['Violations', ['Remediation', ['Monitoring', ['Updates', ['Best Practice'])
            ('Resources', ['Legal Dictionary', ['Glossary', ['FAQs', ['Guides', ['Checklists', ['Calculators', ['Timelines', ['Flowcharts', ['Videos', ['Webinars', ['Podcasts', ['Newsletters', ['Blog', ['Case Studie')],
        ]
    },
    
    # bawaan fallback untuk unrecognized folders
    'default': {
        'category': 'General Services',
        'menus': [
            ('Overview', ['Dashboard', ['Statistics', ['Recent Activity', ['Quick Actions', ['Notifications', ['Announcements', ['Help & Support', ['Documentation', ['Tutorials', ['FAQs', ['Contact Us', ['Feedback', ['Settings', ['Abou'])
            ('Features', ['Feature List', ['Feature Details', ['Use Cases', ['Benefits', ['Integration', ['API Access', ['Customization', ['Extensions', ['Plugins', ['Themes', ['Templates', ['Workflows', ['Automation', ['Report'])
            ('Management', ['User Management', ['Role Management', ['Permission Management', ['Group Management', ['Resource Management', ['Asset Management', ['Configuration', ['Preferences', ['Profiles', ['Accounts', ['Billing', ['Subscription', ['Plans', ['Usag'])
            ('Support', ['Help Center', ['Knowledge Base', ['Community Forum', ['Live Chat', ['Ticket System', ['Phone Support', ['Email Support', ['Video Tutorials', ['Webinars', ['Training', ['Certification', ['Consulting', ['Implementation', ['Migratio')],
        ]
    }
}

def get_folder_category(folder_name):
    """Determine category based on folder name keywords"""
    folder_lower = folder_name.lower()
    
    for keyword, data in KEYWORD_MAPPINGS.items():
        if keyword != 'default' and keyword in folder_lower:
            return keyword, data
    
    return 'default', KEYWORD_MAPPINGS['default']

def generate_submenu_html(menu_name, submenu_items):
    """Generate HTML for submenu items"""
    html = f'<li class="nav-item has-dropdown">\n'
    html += f'    <a href="#" class="nav-link">{menu_name} <span class="arrow">▼</span></a>\n'
    html += f'    <ul class="dropdown-menu">\n'
    
    for item in submenu_items[:15]:  # Limit to 15 butiran per menu
        if isinstance(item, str):
            slug = item.lower().replace(' ', '-').replace('&', 'and')
            html += f'        <li><a href="#{slug}">{item}</a></li>\n'
        elif isinstance(item, tuple) and len(item) == 2:
            # Nested submenu
            parent, children = item
            html += f'        <li class="has-submenu">\n'
            html += f'            <a href="#">{parent} <span class="sub-arrow">▶</span></a>\n'
            html += f'            <ul class="submenu">\n'
            for child in children[:10]:
                child_slug = child.lower().replace(' ', '-').replace('&', 'and')
                html += f'                <li><a href="#{child_slug}">{child}</a></li>\n'
            html += f'            </ul>\n'
            html += f'        </li>\n'
    
    html += f'        <li class="separator"></li>\n'
    html += f'        <li><a href="#view-all-{menu_name.lower().replace(" ", "-")}">View All ({len(submenu_items)}+)</a></li>\n'
    html += f'    </ul>\n'
    html += f'</li>\n'
    return html

def generate_index_html(folder_name, folder_path):
    """Generate complete index.html with context-aware menus"""
    keyword, data = get_folder_category(folder_name)
    category = data['category']
    menus = data['menus']
    
    # hasilkan navigation menus
    nav_html = '<!-- START: Dynamic Navigation Component for media.digital -->\n'
    nav_html += '<nav class="digital-nav">\n'
    nav_html += '    <div class="nav-container">\n'
    nav_html += f'        <div class="nav-brand"><a href="/">media<span class="highlight">.digital</span></a></div>\n'
    nav_html += '        <ul class="digital-nav-menu">\n'
    
    for i, (menu_name, submenu_items) in enumerate(menus[:5], 1):
        nav_html += f'            <!-- Menu {i}: {menu_name} -->\n'
        nav_html += generate_submenu_html(menu_name, submenu_items)
        nav_html += '\n'
    
    nav_html += '        </ul>\n'
    nav_html += '        <div class="nav-actions">\n'
    nav_html += '            <button class="search-btn" aria-label="Search">🔍</button>\n'
    nav_html += '            <button class="user-btn" aria-label="User Account">👤</button>\n'
    nav_html += '        </div>\n'
    nav_html += '    </div>\n'
    nav_html += '</nav>\n'
    nav_html += '<!-- END: Global Navigation Component -->\n'
    
    # hasilkan utama isi
    content_html = f'''
    <main class="main-content">
        <section class="hero-section">
            <div class="container">
                <h1>{folder_name.replace('.digital', '').replace('-', ' ').title()}</h1>
                <p class="subtitle">{category} - Part of media.digital ecosystem</p>
                <div class="cta-buttons">
                    <button class="btn btn-primary">Get Started</button>
                    <button class="btn btn-secondary">Learn More</button>
                </div>
            </div>
        </section>

        <section class="features-section">
            <div class="container">
                <h2>Key Features</h2>
                <div class="features-grid">
'''
    
    # Add feature cards based on menus
    for menu_name, submenu_items in menus[:5]:
        feature_count = len(submenu_items)
        content_html += f'''
                    <div class="feature-card">
                        <div class="feature-icon">📦</div>
                        <h3>{menu_name}</h3>
                        <p>Access {feature_count}+ specialized tools and services for comprehensive {menu_name.lower()} management.</p>
                        <a href="#{menu_name.lower().replace(' ', '-')}">Explore →</a>
                    </div>
'''
    
    content_html += '''
                </div>
            </div>
        </section>

        <section class="stats-section">
            <div class="container">
                <h2>Platform Statistics</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number">250+</span>
                        <span class="stat-label">Digital Services</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">10,000+</span>
                        <span class="stat-label">Features Available</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">99.9%</span>
                        <span class="stat-label">Uptime Guarantee</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">24/7</span>
                        <span class="stat-label">Support Available</span>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h3>media<span class="highlight">.digital</span></h3>
                    <p>Empowering digital transformation across industries</p>
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Products</h4>
                        <ul>
                            <li><a href="#all-services">All Services</a></li>
                            <li><a href="#new-releases">New Releases</a></li>
                            <li><a href="#popular">Popular</a></li>
                            <li><a href="#upcoming">Upcoming</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#help-center">Help Center</a></li>
                            <li><a href="#documentation">Documentation</a></li>
                            <li><a href="#community">Community</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#press">Press</a></li>
                            <li><a href="#legal">Legal</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 media.digital. All rights reserved.</p>
                <div class="footer-social">
                    <a href="#twitter" aria-label="Twitter">🐦</a>
                    <a href="#linkedin" aria-label="LinkedIn">💼</a>
                    <a href="#github" aria-label="GitHub">🐙</a>
                    <a href="#youtube" aria-label="YouTube">📺</a>
                </div>
            </div>
        </div>
    </footer>
'''
    
    # Complete HTML dokumen
    full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{folder_name.replace('.digital', '').replace('-', ' ').title()} | media.digital</title>
    <meta name="description" content="{category} platform - {folder_name} on media.digital">
    <style>
        /* CSS Styles */
        :root {{
            --primary-color: #2563eb;
            --secondary-color: #1e40af;
            --accent-color: #3b82f6;
            --text-dark: #1f2937;
            --text-light: #6b7280;
            --bg-light: #f9fafb;
            --white: #ffffff;
            --border-color: #e5e7eb;
        }}
        
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: var(--text-dark);
            background: var(--bg-light);
        }}
        
        /* Navigation Styles */
        .digital-nav {{
            background: var(--white);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }}
        
        .nav-container {{
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
        }}
        
        .nav-brand {{
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }}
        
        .nav-brand .highlight {{
            color: var(--accent-color);
        }}
        
        .digital-nav-menu {{
            display: flex;
            list-style: none;
            gap: 0.5rem;
        }}
        
        .nav-item {{
            position: relative;
        }}
        
        .nav-link {{
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            text-decoration: none;
            color: var(--text-dark);
            font-weight: 500;
            border-radius: 0.5rem;
            transition: all 0.2s;
        }}
        
        .nav-link:hover {{
            background: var(--bg-light);
            color: var(--primary-color);
        }}
        
        .arrow {{
            font-size: 0.7rem;
            transition: transform 0.2s;
        }}
        
        .nav-item:hover .arrow {{
            transform: rotate(180deg);
        }}
        
        .dropdown-menu {{
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--white);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            min-width: 280px;
            padding: 0.5rem 0;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s;
            list-style: none;
            z-index: 1001;
        }}
        
        .nav-item:hover .dropdown-menu {{
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }}
        
        .dropdown-menu li a {{
            display: block;
            padding: 0.75rem 1.5rem;
            text-decoration: none;
            color: var(--text-dark);
            transition: all 0.2s;
        }}
        
        .dropdown-menu li a:hover {{
            background: var(--bg-light);
            color: var(--primary-color);
            padding-left: 1.75rem;
        }}
        
        .dropdown-menu .separator {{
            height: 1px;
            background: var(--border-color);
            margin: 0.5rem 0;
        }}
        
        .has-submenu .submenu {{
            position: absolute;
            left: 100%;
            top: 0;
            background: var(--white);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            min-width: 250px;
            padding: 0.5rem 0;
            opacity: 0;
            visibility: hidden;
            transform: translateX(-10px);
            transition: all 0.2s;
            list-style: none;
        }}
        
        .has-submenu:hover .submenu {{
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
        }}
        
        .sub-arrow {{
            font-size: 0.6rem;
            float: right;
        }}
        
        .nav-actions {{
            display: flex;
            gap: 1rem;
        }}
        
        .search-btn, .user-btn {{
            background: none;
            border: none;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background 0.2s;
        }}
        
        .search-btn:hover, .user-btn:hover {{
            background: var(--bg-light);
        }}
        
        /* Main Content */
        .main-content {{
            min-height: calc(100vh - 70px);
        }}
        
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }}
        
        .hero-section {{
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: var(--white);
            padding: 5rem 0;
            text-align: center;
        }}
        
        .hero-section h1 {{
            font-size: 3rem;
            margin-bottom: 1rem;
        }}
        
        .subtitle {{
            font-size: 1.25rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }}
        
        .cta-buttons {{
            display: flex;
            gap: 1rem;
            justify-content: center;
        }}
        
        .btn {{
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
        }}
        
        .btn-primary {{
            background: var(--white);
            color: var(--primary-color);
        }}
        
        .btn-primary:hover {{
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }}
        
        .btn-secondary {{
            background: transparent;
            color: var(--white);
            border: 2px solid var(--white);
        }}
        
        .btn-secondary:hover {{
            background: var(--white);
            color: var(--primary-color);
        }}
        
        .features-section {{
            padding: 4rem 0;
            background: var(--white);
        }}
        
        .features-section h2 {{
            text-align: center;
            font-size: 2rem;
            margin-bottom: 3rem;
        }}
        
        .features-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }}
        
        .feature-card {{
            background: var(--bg-light);
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            transition: all 0.2s;
        }}
        
        .feature-card:hover {{
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }}
        
        .feature-icon {{
            font-size: 3rem;
            margin-bottom: 1rem;
        }}
        
        .feature-card h3 {{
            margin-bottom: 0.5rem;
            color: var(--primary-color);
        }}
        
        .feature-card p {{
            color: var(--text-light);
            margin-bottom: 1rem;
        }}
        
        .feature-card a {{
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
        }}
        
        .stats-section {{
            padding: 4rem 0;
        }}
        
        .stats-section h2 {{
            text-align: center;
            font-size: 2rem;
            margin-bottom: 3rem;
        }}
        
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }}
        
        .stat-item {{
            text-align: center;
            padding: 2rem;
            background: var(--white);
            border-radius: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        
        .stat-number {{
            display: block;
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }}
        
        .stat-label {{
            color: var(--text-light);
            font-size: 1rem;
        }}
        
        /* Footer */
        .site-footer {{
            background: var(--text-dark);
            color: var(--white);
            padding: 3rem 0 1rem;
        }}
        
        .footer-content {{
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 3rem;
            margin-bottom: 2rem;
        }}
        
        .footer-brand h3 {{
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }}
        
        .footer-brand .highlight {{
            color: var(--accent-color);
        }}
        
        .footer-links {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }}
        
        .footer-column h4 {{
            margin-bottom: 1rem;
            color: var(--accent-color);
        }}
        
        .footer-column ul {{
            list-style: none;
        }}
        
        .footer-column li {{
            margin-bottom: 0.5rem;
        }}
        
        .footer-column a {{
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            transition: color 0.2s;
        }}
        
        .footer-column a:hover {{
            color: var(--white);
        }}
        
        .footer-bottom {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
        }}
        
        .footer-social {{
            display: flex;
            gap: 1rem;
        }}
        
        .footer-social a {{
            font-size: 1.5rem;
            text-decoration: none;
        }}
        
        /* Responsive */
        @media (max-width: 768px) {{
            .nav-container {{
                padding: 0 1rem;
            }}
            
            .digital-nav-menu {{
                display: none;
            }}
            
            .hero-section h1 {{
                font-size: 2rem;
            }}
            
            .footer-content {{
                grid-template-columns: 1fr;
            }}
            
            .footer-links {{
                grid-template-columns: repeat(2, 1fr);
            }}
        }}
    </style>
</head>
<body>
{nav_html}
{content_html}
</body>
</html>
'''
    
    return full_html

def main():
    workspace = Path('/workspace')
    digital_folders = [d for d in workspace.iterdir() if d.is_dir() and d.name.endswith('.digital')],
    
    print(f"Found {len(digital_folders)} .digital folders")
    
    updated_count = 0
    created_count = 0
    
    for folder in digital_folders:
        folder_name = folder.name
        index_file = folder / 'index.html'
        
        try:
            # hasilkan baru indeks.html
            html_content = generate_index_html(folder_name, folder)
            
            if index_file.exists():
                # perbarui existing berkas
                with open(index_file, 'w', encoding='utf-8') as f:
                    f.write(html_content)
                updated_count += 1
                print(f"✓ Updated: {folder_name}")
            else:
                # buat baru berkas
                with open(index_file, 'w', encoding='utf-8') as f:
                    f.write(html_content)
                created_count += 1
                print(f"✓ Created: {folder_name}")
                
        except Exception as e:
            print(f"✗ Error processing {folder_name}: {str(e)}")
    
    print(f"\n=== Summary ===")
    print(f"Updated: {updated_count} files")
    print(f"Created: {created_count} files")
    print(f"Total processed: {updated_count + created_count}/{len(digital_folders)}")

if __name__ == '__main__':
    main()
