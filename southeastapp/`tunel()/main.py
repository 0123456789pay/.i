"""
Tunel System Main Entry Point
Mengintegrasikan AI Unlimited, Terminal, RAG Batch, dan Pipeline.
"""
import asyncio
from ai.core import ai_system
from terminal.executor import terminal_system
from rag.batch_processor import rag_system, Document
from containers.pipeline_config import main_pipeline

async def run_demo():
    print("=== Memulai Sistem Tunel() ===\n")
    
    # 1. Demo Unlimited AI
    print("[1] Testing Unlimited AI Stream...")
    async for chunk in ai_system.generate_stream("Jelaskan arsitektur sistem ini", "session_001"):
        print(f"AI: {chunk}")
        
    # 2. Demo Terminal Function
    print("\n[2] Testing Terminal Executor...")
    async for output in terminal_system.execute("ls -la"):
        print(f"TERM: {output}")
        
    # 3. Demo RAG Batch
    print("\n[3] Testing RAG Batch Processing...")
    docs = [
        Document(doc_id=f"doc_{i}", content=f"Konten dokumen nomor {i} untuk diindex.", metadata={})
        for i in range(5)
    ]
    results = await rag_system.process_batch(docs)
    print(f"RAG Result: {results}")
    
    # 4. Demo Pipeline
    print("\n[4] Running Full Pipeline...")
    final_state = await main_pipeline.execute({"source": "user_upload", "items": docs})
    print(f"Pipeline Final State: {final_state}")
    
    print("\n=== Sistem Tunel() Siap Digunakan ===")

if __name__ == "__main__":
    asyncio.run(run_demo())
