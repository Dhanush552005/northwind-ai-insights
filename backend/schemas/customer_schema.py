from pydantic import BaseModel

class CustomerCreate(BaseModel):
    customer_id: str
    company_name: str
    contact_name: str | None = None
    city: str | None = None
    country: str | None = None
    phone: str | None = None