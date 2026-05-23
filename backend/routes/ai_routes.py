from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from database import engine
from schemas.ai_schema import AskRequest
from services.ai_service import generate_sql, summarize_result

router = APIRouter(prefix="/ai", tags=["AI"])

def is_safe_select_query(sql: str):
    blocked_words = ["insert", "update", "delete", "drop", "alter", "create", "truncate"]
    sql_lower = sql.lower().strip()

    if not sql_lower.startswith("select"):
        return False

    for word in blocked_words:
        if word in sql_lower:
            return False

    return True

@router.post("/ask")
def ask_ai(request: AskRequest):
    sql_query = generate_sql(request.question)

    if not is_safe_select_query(sql_query):
        raise HTTPException(
            status_code=400,
            detail="Only safe SELECT queries are allowed"
        )

    try:
        with engine.connect() as conn:
            result = conn.execute(text(sql_query))
            rows = [dict(row._mapping) for row in result.fetchall()]

        summary = summarize_result(request.question, sql_query, rows)

        return {
            "question": request.question,
            "sql": sql_query,
            "rows": rows,
            "summary": summary
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))