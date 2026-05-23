from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from database import engine
from schemas.customer_schema import CustomerCreate

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.post("/")
def add_customer(customer: CustomerCreate):
    try:
        with engine.begin() as conn:
            conn.execute(
                text("""
                    INSERT INTO customers 
                    (customer_id, company_name, contact_name, city, country, phone)
                    VALUES 
                    (:customer_id, :company_name, :contact_name, :city, :country, :phone)
                """),
                {
                    "customer_id": customer.customer_id,
                    "company_name": customer.company_name,
                    "contact_name": customer.contact_name,
                    "city": customer.city,
                    "country": customer.country,
                    "phone": customer.phone,
                }
            )

        return {
            "message": "Customer added successfully",
            "customer": customer
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))