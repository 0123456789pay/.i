"""
Container & Pipeline Definitions
Mendefinisikan alur kerja (pipeline) dan isolasi kontainer untuk sistem.
"""
import asyncio
from typing import List, Dict

class PipelineStage:
    def __init__(self, name: str, processor_func):
        self.name = name
        self.processor = processor_func
        
    async def run(self, data):
        print(f"[Pipeline] Running stage: {self.name}")
        return await self.processor(data)

class TunelPipeline:
    def __init__(self):
        self.stages: List[PipelineStage] = []
        
    def add_stage(self, name: str, processor_func):
        self.stages.append(PipelineStage(name, processor_func))
        
    async def execute(self, initial_data):
        data = initial_data
        for stage in self.stages:
            data = await stage.run(data)
        return data

# Contoh definisi pipeline lengkap:
# 1. Ingest -> 2. Embed (RAG) -> 3. Store -> 4. Notify
async def ingest_processor(data):
    # Logika ingest
    return {"ingested": True, "data": data}

async def rag_processor(data):
    # Panggil RAG batch logic
    return {"embedded": True, **data}

async def store_processor(data):
    # Simpan ke DB
    return {"stored": True, **data}

# Inisialisasi Pipeline Utama
main_pipeline = TunelPipeline()
main_pipeline.add_stage("Ingestion", ingest_processor)
main_pipeline.add_stage("RAG_Embedding", rag_processor)
main_pipeline.add_stage("Storage", store_processor)

# Container Config (Simulasi konfigurasi Docker/K8s)
CONTAINER_CONFIG = {
    "ai_service": {
        "image": "southeastapp/ai-core:latest",
        "resources": {"gpu": "1", "memory": "16Gi"},
        "env": {"UNLIMITED_CONTEXT": "true"}
    },
    "rag_indexer": {
        "image": "southeastapp/rag-batch:latest",
        "resources": {"cpu": "4", "memory": "8Gi"},
        "scaling": "auto"
    },
    "terminal_sandbox": {
        "image": "southeastapp/term-exec:latest",
        "isolated": True,
        "network": "none"
    }
}
