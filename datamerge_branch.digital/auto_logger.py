#!/usr/bin/env python3
"""
DataMerge Branch Digital - Auto Logger Module
Modul untuk logging otomatis semua aktivitas sistem
Dapat diimport dan digunakan di berbagai script
"""

import json
import os
import hashlib
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).parent
DATAINPUT_DIR = BASE_DIR / "datainput"
DATAOUTPUT_DIR = BASE_DIR / "dataoutput"
BARISINPUT_DIR = BASE_DIR / "barisinput"
BARISOUTPUT_DIR = BASE_DIR / "barisoutput"
SUB_COMMIT_DIR = BASE_DIR / "sub_commit"
PULL_DIR = BASE_DIR / "pull"
MERGE_DIR = BASE_DIR / "merge"

# Pastikan semua folder ada
for folder in [DATAINPUT_DIR, DATAOUTPUT_DIR, BARISINPUT_DIR, BARISOUTPUT_DIR, SUB_COMMIT_DIR, PULL_DIR, MERGE_DIR]:
    folder.mkdir(parents=True, exist_ok=True)

def get_timestamp():
    """Mengembalikan timestamp ISO format dengan zona waktu"""
    return datetime.now().isoformat()

def generate_log_id(activity_type):
    """Generate unique log ID berdasarkan timestamp dan activity type"""
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    random_part = hashlib.md5(f"{timestamp}{activity_type}".encode()).hexdigest()[:8]
    return f"{activity_type}_{timestamp}_{random_part}"

def calculate_hash(content):
    """Calculate SHA256 hash dari content"""
    if isinstance(content, str):
        content = content.encode('utf-8')
    return hashlib.sha256(content).hexdigest()

def count_lines(content):
    """Count jumlah baris dalam content"""
    if isinstance(content, str):
        return len(content.splitlines())
    return 0

def save_log(activity_type, content, source="manual", metadata=None, folder="datainput"):
    """
    Save activity log ke folder yang sesuai
    
    Args:
        activity_type: Tipe aktivitas (chat_ai_request, git_commit, dll)
        content: Content/data dari aktivitas
        source: Sumber aktivitas (qwen_ai, coder_qwen_ai, chat_ai, github, manual, dll)
        metadata: Metadata tambahan dalam bentuk dict
        folder: Folder tujuan (datainput, dataoutput, sub_commit, pull, merge, barisinput, barisoutput)
    
    Returns:
        dict: Log entry yang telah disimpan
    """
    if metadata is None:
        metadata = {}
    
    log_entry = {
        "log_id": generate_log_id(activity_type),
        "timestamp": get_timestamp(),
        "activity_type": activity_type,
        "source": source,
        "content": content,
        "content_hash": calculate_hash(str(content)),
        "line_count": count_lines(str(content)),
        "metadata": metadata,
        "system": "DataMerge Branch Digital",
        "version": "1.0.0"
    }
    
    # Tentukan direktori tujuan
    folder_map = {
        "datainput": DATAINPUT_DIR,
        "dataoutput": DATAOUTPUT_DIR,
        "barisinput": BARISINPUT_DIR,
        "barisoutput": BARISOUTPUT_DIR,
        "sub_commit": SUB_COMMIT_DIR,
        "pull": PULL_DIR,
        "merge": MERGE_DIR
    }
    
    target_dir = folder_map.get(folder, DATAINPUT_DIR)
    
    # Buat filename
    filename = f"{log_entry['log_id']}.log"
    filepath = target_dir / filename
    
    # Simpan file log
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(log_entry, f, indent=2, ensure_ascii=False)
    
    # Append ke master system.log
    append_to_master_log(log_entry)
    
    return log_entry

def append_to_master_log(log_entry):
    """Append log entry ke master system.log"""
    system_log_path = BASE_DIR / "system.log"
    
    master_entry = {
        "timestamp": log_entry["timestamp"],
        "activity_type": log_entry["activity_type"],
        "source": log_entry["source"],
        "log_id": log_entry["log_id"],
        "content_preview": str(log_entry["content"])[:200] if len(str(log_entry["content"])) > 200 else str(log_entry["content"]),
        "content_hash": log_entry["content_hash"],
        "line_count": log_entry["line_count"]
    }
    
    with open(system_log_path, 'a', encoding='utf-8') as f:
        f.write(json.dumps(master_entry, ensure_ascii=False) + "\n")

# Konstanta tipe aktivitas
class ActivityType:
    CHAT_AI_REQUEST = "chat_ai_request"
    CHAT_AI_RESPONSE = "chat_ai_response"
    QWEN_AI_ACTION = "qwen_ai_action"
    CODER_QWEN_AI_ACTION = "coder_qwen_ai_action"
    GIT_COMMIT = "git_commit"
    GIT_PULL = "git_pull"
    GIT_MERGE = "git_merge"
    DATA_INPUT = "data_input"
    DATA_OUTPUT = "data_output"
    FILE_MODIFICATION = "file_modification"
    SYSTEM_EVENT = "system_event"
    USER_PROMPT = "user_prompt"
    AI_ACTION = "ai_action"
    CODE_GENERATION = "code_generation"
    CODE_MODIFICATION = "code_modification"
    MERGE_CONFLICT = "merge_conflict"
    PULL_REQUEST = "pull_request"

# Konstanta sumber
class Source:
    QWEN_AI = "qwen_ai"
    CODER_QWEN_AI = "coder_qwen_ai"
    CHAT_AI = "chat_ai"
    GITHUB = "github"
    MANUAL = "manual"
    SYSTEM = "system"
    TERMINAL = "terminal"
    API = "api"

# Fungsi-fungsi helper untuk logging spesifik
def log_chat_ai_request(prompt, metadata=None):
    """Log permintaan Chat AI"""
    return save_log(
        activity_type=ActivityType.CHAT_AI_REQUEST,
        content=prompt,
        source=Source.CHAT_AI,
        metadata=metadata or {},
        folder="datainput"
    )

def log_chat_ai_response(response, request_id=None, metadata=None):
    """Log respon Chat AI"""
    meta = metadata or {}
    if request_id:
        meta["request_id"] = request_id
    return save_log(
        activity_type=ActivityType.CHAT_AI_RESPONSE,
        content=response,
        source=Source.CHAT_AI,
        metadata=meta,
        folder="dataoutput"
    )

def log_qwen_ai_action(action, details, metadata=None):
    """Log aksi Qwen AI"""
    meta = metadata or {}
    meta["action"] = action
    return save_log(
        activity_type=ActivityType.QWEN_AI_ACTION,
        content=details,
        source=Source.QWEN_AI,
        metadata=meta,
        folder="datainput"
    )

def log_coder_qwen_ai_action(code_action, code_content, metadata=None):
    """Log aksi Coder Qwen AI"""
    meta = metadata or {}
    meta["code_action"] = code_action
    return save_log(
        activity_type=ActivityType.CODER_QWEN_AI_ACTION,
        content=code_content,
        source=Source.CODER_QWEN_AI,
        metadata=meta,
        folder="datainput"
    )

def log_git_commit(commit_message, commit_hash=None, files_changed=None, branch=None, metadata=None):
    """Log Git commit"""
    meta = metadata or {}
    if commit_hash:
        meta["commit_hash"] = commit_hash
    if files_changed:
        meta["files_changed"] = files_changed
    if branch:
        meta["branch"] = branch
    return save_log(
        activity_type=ActivityType.GIT_COMMIT,
        content=commit_message,
        source=Source.GITHUB,
        metadata=meta,
        folder="sub_commit"
    )

def log_git_pull(branch, commits=None, metadata=None):
    """Log Git pull"""
    meta = metadata or {}
    meta["branch"] = branch
    if commits:
        meta["commits"] = commits
    return save_log(
        activity_type=ActivityType.GIT_PULL,
        content=f"Pulled from {branch}",
        source=Source.GITHUB,
        metadata=meta,
        folder="pull"
    )

def log_git_merge(source_branch, target_branch, merge_result, metadata=None):
    """Log Git merge"""
    meta = metadata or {}
    meta["source_branch"] = source_branch
    meta["target_branch"] = target_branch
    meta["merge_result"] = merge_result
    return save_log(
        activity_type=ActivityType.GIT_MERGE,
        content=f"Merged {source_branch} into {target_branch}: {merge_result}",
        source=Source.GITHUB,
        metadata=meta,
        folder="merge"
    )

def log_pull_request(pr_number, title, description, branch_from, branch_to, metadata=None):
    """Log Pull Request"""
    meta = metadata or {}
    meta["pr_number"] = pr_number
    meta["title"] = title
    meta["branch_from"] = branch_from
    meta["branch_to"] = branch_to
    return save_log(
        activity_type=ActivityType.PULL_REQUEST,
        content=description,
        source=Source.GITHUB,
        metadata=meta,
        folder="pull"
    )

def log_data_input(data, data_type="generic", metadata=None):
    """Log data input generic"""
    meta = metadata or {}
    meta["data_type"] = data_type
    return save_log(
        activity_type=ActivityType.DATA_INPUT,
        content=data,
        source=Source.MANUAL,
        metadata=meta,
        folder="datainput"
    )

def log_data_output(data, data_type="generic", metadata=None):
    """Log data output generic"""
    meta = metadata or {}
    meta["data_type"] = data_type
    return save_log(
        activity_type=ActivityType.DATA_OUTPUT,
        content=data,
        source=Source.SYSTEM,
        metadata=meta,
        folder="dataoutput"
    )

def log_user_prompt(prompt, context=None, metadata=None):
    """Log prompt user"""
    meta = metadata or {}
    if context:
        meta["context"] = context
    return save_log(
        activity_type=ActivityType.USER_PROMPT,
        content=prompt,
        source=Source.MANUAL,
        metadata=meta,
        folder="datainput"
    )

def log_ai_action(action_type, result, metadata=None):
    """Log aksi AI generic"""
    meta = metadata or {}
    meta["action_type"] = action_type
    return save_log(
        activity_type=ActivityType.AI_ACTION,
        content=result,
        source=Source.CHAT_AI,
        metadata=meta,
        folder="dataoutput"
    )

def log_system_event(event_name, details, metadata=None):
    """Log event sistem"""
    meta = metadata or {}
    meta["event_name"] = event_name
    return save_log(
        activity_type=ActivityType.SYSTEM_EVENT,
        content=details,
        source=Source.SYSTEM,
        metadata=meta,
        folder="datainput"
    )

def log_code_generation(code, language="python", purpose=None, metadata=None):
    """Log kode yang digenerate oleh AI"""
    meta = metadata or {}
    meta["language"] = language
    if purpose:
        meta["purpose"] = purpose
    return save_log(
        activity_type=ActivityType.CODE_GENERATION,
        content=code,
        source=Source.CODER_QWEN_AI,
        metadata=meta,
        folder="dataoutput"
    )

def log_code_modification(file_path, changes, metadata=None):
    """Log modifikasi kode"""
    meta = metadata or {}
    meta["file_path"] = file_path
    return save_log(
        activity_type=ActivityType.CODE_MODIFICATION,
        content=changes,
        source=Source.CODER_QWEN_AI,
        metadata=meta,
        folder="datainput"
    )

def log_merge_conflict(files, resolution, metadata=None):
    """Log konflik merge"""
    meta = metadata or {}
    meta["conflicted_files"] = files
    meta["resolution"] = resolution
    return save_log(
        activity_type=ActivityType.MERGE_CONFLICT,
        content=f"Resolved conflicts in {len(files)} files",
        source=Source.GITHUB,
        metadata=meta,
        folder="merge"
    )

def log_baris_input(line_count, content_summary, metadata=None):
    """Log tracking jumlah baris input"""
    meta = metadata or {}
    meta["line_count"] = line_count
    return save_log(
        activity_type=ActivityType.DATA_INPUT,
        content=content_summary,
        source=Source.MANUAL,
        metadata=meta,
        folder="barisinput"
    )

def log_baris_output(line_count, content_summary, metadata=None):
    """Log tracking jumlah baris output"""
    meta = metadata or {}
    meta["line_count"] = line_count
    return save_log(
        activity_type=ActivityType.DATA_OUTPUT,
        content=content_summary,
        source=Source.SYSTEM,
        metadata=meta,
        folder="barisoutput"
    )

# Export semua fungsi dan konstanta
__all__ = [
    'save_log',
    'get_timestamp',
    'generate_log_id',
    'calculate_hash',
    'count_lines',
    'ActivityType',
    'Source',
    'log_chat_ai_request',
    'log_chat_ai_response',
    'log_qwen_ai_action',
    'log_coder_qwen_ai_action',
    'log_git_commit',
    'log_git_pull',
    'log_git_merge',
    'log_pull_request',
    'log_data_input',
    'log_data_output',
    'log_user_prompt',
    'log_ai_action',
    'log_system_event',
    'log_code_generation',
    'log_code_modification',
    'log_merge_conflict',
    'log_baris_input',
    'log_baris_output'
]

if __name__ == "__main__":
    print("=" * 70)
    print("DataMerge Branch Digital - Auto Logger Module")
    print("=" * 70)
    print(f"Base Directory: {BASE_DIR}")
    print(f"Timestamp: {get_timestamp()}")
    print("\nModule loaded successfully!")
    print("\nAvailable functions:")
    for func in __all__:
        print(f"  - {func}")
    print("\nUsage example:")
    print("  from auto_logger import log_chat_ai_request, log_git_commit")
    print("  log_chat_ai_request('Your prompt here')")
    print("  log_git_commit('Fix bug', 'abc123', ['file.py'])")
