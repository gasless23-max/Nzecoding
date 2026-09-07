from fastapi import FastAPI

app = FastAPI(title="Build & Code API")

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
