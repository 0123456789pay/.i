<?php
/**
 * Konfigurasi Sistem Otomatisasi Konten
 * Aireber.digital - Auto Content Generator
 * Setiap 15 menit: 5 konten per jenis (code & text)
 */

return [
    'scheduler' => [
        'interval_minutes' => 15,
        'contents_per_type' => 5,
        'content_types' => ['code', 'text'],
        'auto_post' => true,
        'reconstruct_enabled' => true
    ],
    
    'storage' => [
        'base_path' => __DIR__ . '/auto_content',
        'code_dir' => 'code',
        'text_dir' => 'text',
        'config_dir' => 'config',
        'logs_dir' => 'logs',
        'scheduler_dir' => 'scheduler'
    ],
    
    'content_categories' => [
        'code' => [
            'html_components',
            'css_styles',
            'js_functions',
            'php_scripts',
            'ai_prompts'
        ],
        'text' => [
            'product_descriptions',
            'social_media_posts',
            'blog_articles',
            'documentation',
            'marketing_copy'
        ]
    ],
    
    'themes' => [
        'primary_color' => '#2563eb',
        'secondary_color' => '#3b82f6',
        'accent_color' => '#dbeafe',
        'dark_color' => '#1e40af',
        'white' => '#ffffff',
        'light_gray' => '#f8fafc'
    ],
    
    'automation' => [
        'enabled' => true,
        'post_to_sections' => [
            'dashboard',
            'products',
            'social_media',
            'content',
            'ai_automation'
        ],
        'reconstruction_rules' => [
            'merge_similar' => true,
            'version_control' => true,
            'backup_before_merge' => true
        ]
    ],
    
    'database' => [
        'driver' => 'sqlite',
        'path' => __DIR__ . '/db/auto_content.db',
        'tables' => [
            'generated_contents',
            'scheduled_tasks',
            'posted_contents',
            'reconstruction_logs'
        ]
    ],
    
    'api' => [
        'endpoint_generate' => '/api/generate-content',
        'endpoint_schedule' => '/api/schedule-task',
        'endpoint_reconstruct' => '/api/reconstruct-content',
        'endpoint_list' => '/api/list-contents'
    ]
];
