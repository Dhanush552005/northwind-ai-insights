from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from database import engine
from routes.dashboard_routes import router as dashboard_router
from routes.ai_routes import router as ai_router

app = FastAPI(title="Northwind AI Insights API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router)
app.include_router(ai_router)

@app.get("/")
def home():
    return {"message": "Northwind AI Insights Backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/test-db")
def test_db():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT NOW();"))
        current_time = result.fetchone()[0]

    return {
        "database": "connected",
        "time": str(current_time)
    }