#!/usr/bin/env python3
"""
DataMerge Branch Digital - Demo Logging Activity
Mendemonstrasikan cara logging berbagai aktivitas:
- Chat AI + Respon
- Merge, Pull, Commit Git
- Qwen AI & Coder Qwen AI actions
- Dan jenis aktivitas lainnya
"""

from auto_logger import (
    log_chat_ai_request,
    log_chat_ai_response,
    log_qwen_ai_action,
    log_coder_qwen_ai_action,
    log_git_commit,
    log_git_pull,
    log_git_merge,
    log_pull_request,
    log_data_input,
    log_data_output,
    log_user_prompt,
    log_ai_action,
    log_system_event,
    log_code_generation,
    log_code_modification,
    log_merge_conflict,
    log_baris_input,
    log_baris_output,
    get_timestamp
)

def main():
    print("=" * 70)
    print("DataMerge Branch Digital - Demo Logging System")
    print("=" * 70)
    print(f"Started at: {get_timestamp()}")
    print()
    
    # 1. Log aktivitas Chat AI Request
    print("1. Logging Chat AI Request...")
    log_chat_ai_request(
        "Buatkan fungsi Python untuk menghitung fibonacci",
        metadata={"user_id": "user_001", "session": "demo_session"}
    )
    
    # 2. Log respons Chat AI
    print("2. Logging Chat AI Response...")
    fibonacci_code = '''
def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    else:
        fib = [0, 1]
        for i in range(2, n):
            fib.append(fib[i-1] + fib[i-2])
        return fib
'''
    log_chat_ai_response(
        fibonacci_code,
        metadata={"model": "qwen-ai", "tokens_used": 150}
    )
    
    # 3. Log aksi Qwen AI
    print("3. Logging Qwen AI Action...")
    log_qwen_ai_action(
        "analyze",
        "Menganalisis struktur kode dan memberikan rekomendasi optimasi",
        metadata={"analysis_type": "code_review", "confidence": 0.95}
    )
    
    # 4. Log aksi Coder Qwen AI
    print("4. Logging Coder Qwen AI Action...")
    log_coder_qwen_ai_action(
        "refactor",
        "Refactoring code untuk meningkatkan readability dan performance",
        metadata={"files_affected": ["utils.py", "helpers.py"], "lines_changed": 45}
    )
    
    # 5. Log Git Commit
    print("5. Logging Git Commit...")
    log_git_commit(
        "Add new fibonacci function and optimize existing code",
        commit_hash="abc123def456",
        files_changed=["fibonacci.py", "test_fibonacci.py", "README.md"],
        branch="main",
        metadata={"author": "developer@example.com", "reviewer": "senior@example.com"}
    )
    
    # 6. Log Git Pull
    print("6. Logging Git Pull...")
    log_git_pull(
        "main",
        commits=["abc123", "def456", "ghi789"],
        metadata={"remote": "origin", "changes": "+150 -30"}
    )
    
    # 7. Log Git Merge
    print("7. Logging Git Merge...")
    log_git_merge(
        "feature/fibonacci",
        "main",
        "successful",
        metadata={"merge_strategy": "squash", "conflicts_resolved": 0}
    )
    
    # 8. Log Pull Request
    print("8. Logging Pull Request...")
    log_pull_request(
        pr_number=42,
        title="Add Fibonacci Implementation",
        description="Implementasi fungsi fibonacci dengan unit tests lengkap",
        branch_from="feature/fibonacci",
        branch_to="main",
        metadata={"assignee": "developer", "labels": ["enhancement", "tested"]}
    )
    
    # 9. Log Data Input
    print("9. Logging Data Input...")
    sample_data = {"name": "John Doe", "email": "john@example.com", "action": "create"}
    log_data_input(
        sample_data,
        data_type="user_registration",
        metadata={"source": "web_form", "ip_address": "192.168.1.1"}
    )
    
    # 10. Log Data Output
    print("10. Logging Data Output...")
    output_data = {"status": "success", "user_id": "usr_12345", "created_at": get_timestamp()}
    log_data_output(
        output_data,
        data_type="api_response",
        metadata={"endpoint": "/api/users", "method": "POST"}
    )
    
    # 11. Log User Prompt
    print("11. Logging User Prompt...")
    log_user_prompt(
        "Tampilkan dashboard monitoring untuk hari ini",
        context="dashboard_access",
        metadata={"user_role": "admin", "device": "desktop"}
    )
    
    # 12. Log AI Action
    print("12. Logging AI Action...")
    log_ai_action(
        "data_processing",
        "Processing 1000 records from database and generating report",
        metadata={"records_processed": 1000, "duration_seconds": 5.2}
    )
    
    # 13. Log System Event
    print("13. Logging System Event...")
    log_system_event(
        "system_startup",
        "DataMerge Branch Digital monitoring system initialized successfully",
        metadata={"version": "1.0.0", "environment": "production"}
    )
    
    # 14. Log Code Generation
    print("14. Logging Code Generation...")
    generated_code = '''
class DataProcessor:
    def __init__(self, data):
        self.data = data
    
    def process(self):
        return [item * 2 for item in self.data]
'''
    log_code_generation(
        generated_code,
        language="python",
        purpose="Data processing utility class",
        metadata={"complexity": "low", "test_coverage": "pending"}
    )
    
    # 15. Log Code Modification
    print("15. Logging Code Modification...")
    log_code_modification(
        "datamerge_branch.digital/monitor.py",
        "Updated monitoring interval from 10s to 5s for better real-time tracking",
        metadata={"change_type": "configuration", "impact": "performance"}
    )
    
    # 16. Log Merge Conflict Resolution
    print("16. Logging Merge Conflict Resolution...")
    log_merge_conflict(
        files=["config.json", "settings.yaml"],
        resolution="Manual resolution: kept both configurations with merged values",
        metadata={"resolved_by": "senior_developer", "time_taken_minutes": 15}
    )
    
    # 17. Log Baris Input (Line Count Tracking)
    print("17. Logging Baris Input...")
    log_baris_input(
        line_count=250,
        content_summary="Input file contains 250 lines of user data",
        metadata={"file_name": "users.csv", "format": "CSV"}
    )
    
    # 18. Log Baris Output (Line Count Tracking)
    print("18. Logging Baris Output...")
    log_baris_output(
        line_count=180,
        content_summary="Output report generated with 180 lines",
        metadata={"report_type": "summary", "format": "TXT"}
    )
    
    print()
    print("=" * 70)
    print("✓ Demo completed! All activities logged successfully.")
    print("=" * 70)
    print()
    print("Check the following folders for log files:")
    print("  - datainput/     : Chat requests, user prompts, system events")
    print("  - dataoutput/    : AI responses, generated code, processed data")
    print("  - sub_commit/    : Git commit logs")
    print("  - pull/          : Git pull and PR logs")
    print("  - merge/         : Git merge and conflict resolution logs")
    print("  - barisinput/    : Line count tracking for inputs")
    print("  - barisoutput/   : Line count tracking for outputs")
    print()
    print("Master log available at: system.log")
    print(f"Completed at: {get_timestamp()}")

if __name__ == "__main__":
    main()
