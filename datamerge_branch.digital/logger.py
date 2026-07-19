#!/usr/bin/env python3
"""
DataMerge Branch Digital - Activity Logger
Mencatat semua aktivitas: chat AI, respon, merge, pull, commit, dan aktivitas lainnya
Terintegrasi dengan GitHub, Qwen AI, Coder Qwen AI
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

def get_timestamp():
    """Mengembalikan timestamp ISO format"""
    return datetime.now().isoformat()

def generate_log_id(activity_type):
    """Generate unique log ID based on timestamp and activity type"""
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    random_part = hashlib.md5(f"{timestamp}{activity_type}".encode()).hexdigest()[:8]
    return f"{activity_type}_{timestamp}_{random_part}"

def calculate_hash(content):
    """Calculate SHA256 hash of content"""
    if isinstance(content, str):
        content = content.encode('utf-8')
    return hashlib.sha256(content).hexdigest()

def count_lines(content):
    """Count lines in content"""
    if isinstance(content, str):
        return len(content.splitlines())
    return 0

def save_log(activity_type, content, source="manual", metadata=None, folder="datainput"):
    """
    Save activity log to appropriate folder
    
    Args:
        activity_type: Type of activity (chat_ai_request, git_commit, etc.)
        content: Content/data of the activity
        source: Source of activity (qwen_ai, coder_qwen_ai, chat_ai, github, manual, etc.)
        metadata: Additional metadata dict
        folder: Target folder (datainput or dataoutput)
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
    
    # Determine target directory
    if folder == "datainput":
        target_dir = DATAINPUT_DIR
    elif folder == "dataoutput":
        target_dir = DATAOUTPUT_DIR
    elif folder == "barisinput":
        target_dir = BARISINPUT_DIR
    elif folder == "barisoutput":
        target_dir = BARISOUTPUT_DIR
    elif folder == "sub_commit":
        target_dir = SUB_COMMIT_DIR
    elif folder == "pull":
        target_dir = PULL_DIR
    elif folder == "merge":
        target_dir = MERGE_DIR
    else:
        target_dir = DATAINPUT_DIR
    
    # Create filename
    filename = f"{log_entry['log_id']}.log"
    filepath = target_dir / filename
    
    # Save log file
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(log_entry, f, indent=2, ensure_ascii=False)
    
    # Also append to master system.log
    append_to_master_log(log_entry)
    
    print(f"✓ Log saved: {filepath}")
    print(f"  Activity: {activity_type}")
    print(f"  Source: {source}")
    print(f"  Timestamp: {log_entry['timestamp']}")
    print(f"  Content Hash: {log_entry['content_hash'][:16]}...")
    print(f"  Lines: {log_entry['line_count']}")
    
    return log_entry

def append_to_master_log(log_entry):
    """Append log entry to master system.log"""
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

# Activity type constants
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

# Source constants
class Source:
    QWEN_AI = "qwen_ai"
    CODER_QWEN_AI = "coder_qwen_ai"
    CHAT_AI = "chat_ai"
    GITHUB = "github"
    MANUAL = "manual"
    SYSTEM = "system"
    TERMINAL = "terminal"

def log_chat_ai_request(prompt, metadata=None):
    """Log Chat AI request"""
    return save_log(
        activity_type=ActivityType.CHAT_AI_REQUEST,
        content=prompt,
        source=Source.CHAT_AI,
        metadata=metadata or {},
        folder="datainput"
    )

def log_chat_ai_response(response, request_id=None, metadata=None):
    """Log Chat AI response"""
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
    """Log Qwen AI action"""
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
    """Log Coder Qwen AI action"""
    meta = metadata or {}
    meta["code_action"] = code_action
    return save_log(
        activity_type=ActivityType.CODER_QWEN_AI_ACTION,
        content=code_content,
        source=Source.CODER_QWEN_AI,
        metadata=meta,
        folder="datainput"
    )

def log_git_commit(commit_message, commit_hash=None, files_changed=None, metadata=None):
    """Log Git commit"""
    meta = metadata or {}
    if commit_hash:
        meta["commit_hash"] = commit_hash
    if files_changed:
        meta["files_changed"] = files_changed
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

def log_data_input(data, data_type="generic", metadata=None):
    """Log generic data input"""
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
    """Log generic data output"""
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
    """Log user prompt"""
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
    """Log generic AI action"""
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
    """Log system event"""
    meta = metadata or {}
    meta["event_name"] = event_name
    return save_log(
        activity_type=ActivityType.SYSTEM_EVENT,
        content=details,
        source=Source.SYSTEM,
        metadata=meta,
        folder="datainput"
    )

if __name__ == "__main__":
    print("=" * 60)
    print("DataMerge Branch Digital - Activity Logger")
    print("=" * 60)
    print(f"Base Directory: {BASE_DIR}")
    print(f"Timestamp: {get_timestamp()}")
    print()
    
    # Demo: Log current activity (system initialization)
    print("Logging system initialization...")
    log_system_event(
        "system_start",
        "DataMerge Branch Digital monitoring system started",
        {"version": "1.0.0", "python_version": "3.x"}
    )
    
    # Log current user request
    print("\nLogging current user request...")
    log_user_prompt(
        "lakukan mulai menyimpan file .log atau pencatatan sejak sekarang. ' chat ai + respon atau tindakan , merge , pull , commit , serta jenis jenis aktifitas yang dilakukan ' simpan file log di folder datainput dan dataoutput . sertakan waktu di dalam file yang beisi catatan atau aktifitas yang dilakukan . aktifitad yang terintegrasi dengan github atau aktifitas yang terintegrasi dengan qwen ai atau coder qwen ai .",
        context="initialization_request",
        metadata={"request_type": "system_configuration"}
    )
    
    # Log AI response/action
    print("\nLogging AI response...")
    log_ai_action(
        "system_configuration",
        "System configured to log all activities: chat AI requests/responses, git operations (merge, pull, commit), Qwen AI actions, Coder Qwen AI actions. All logs saved with timestamps in datainput/dataoutput folders.",
        metadata={"configured_by": "coder_qwen_ai", "timestamp": get_timestamp()}
    )
    
    print("\n" + "=" * 60)
    print("✓ System ready! All activities will be logged automatically.")
    print("=" * 60)
    print("\nUsage examples:")
    print("  from logger import log_chat_ai_request, log_git_commit, log_qwen_ai_action")
    print("  log_chat_ai_request('Your prompt here')")
    print("  log_git_commit('Commit message', 'abc123', ['file1.py', 'file2.py'])")
    print("  log_qwen_ai_action('analyze', 'Analysis details...')")
