from fastapi import APIRouter
from sqlalchemy import text
from database import engine

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def dashboard():
    with engine.connect() as conn:
        total_customers = conn.execute(text("SELECT COUNT(*) FROM customers")).scalar()
        total_orders = conn.execute(text("SELECT COUNT(*) FROM orders")).scalar()
        total_products = conn.execute(text("SELECT COUNT(*) FROM products")).scalar()

    return {
        "total_customers": total_customers,
        "total_orders": total_orders,
        "total_products": total_products
    }