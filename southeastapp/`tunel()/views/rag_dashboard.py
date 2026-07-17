"""
View: RAG Batch Dashboard
Antarmuka untuk memonitor proses indexing dokumen.
"""

def render_batch_status(results: dict) -> str:
    """
    Merender status pemrosesan batch dalam format teks/JSON sederhana.
    """
    output = [
        "=== RAG Batch Processing Status ===",
        f"Processed: {results.get('processed_count', 0)}",
        f"Failed: {results.get('failed_count', 0)}",
        f"Embeddings Generated: {results.get('embeddings_generated', 0)}",
        "==================================="
    ]
    return "\n".join(output)

def render_document_list(documents: list) -> str:
    """
    Merender daftar dokumen yang siap diproses.
    """
    output = ["--- Document Queue ---"]
    for i, doc in enumerate(documents):
        output.append(f"{i+1}. ID: {doc.doc_id} | Len: {len(doc.content)}")
    return "\n".join(output)

# Komponen View bisa dikembangkan menjadi React/Vue component jika diintegrasikan ke frontend
