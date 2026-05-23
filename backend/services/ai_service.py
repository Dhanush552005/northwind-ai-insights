from groq import Groq
from dotenv import load_dotenv
import os
import re

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SCHEMA_CONTEXT = """
You are working with the Northwind PostgreSQL database.

Important tables and columns:

customers:
- customer_id
- company_name
- contact_name
- country
- city

orders:
- order_id
- customer_id
- employee_id
- order_date
- shipped_date
- ship_country
- freight

order_details:
- order_id
- product_id
- unit_price
- quantity
- discount

products:
- product_id
- product_name
- supplier_id
- category_id
- unit_price
- units_in_stock

categories:
- category_id
- category_name

employees:
- employee_id
- first_name
- last_name
- title

suppliers:
- supplier_id
- company_name
- country
"""

def clean_sql(sql: str):
    sql = sql.strip()
    sql = re.sub(r"```sql", "", sql, flags=re.IGNORECASE)
    sql = re.sub(r"```", "", sql)
    sql = sql.strip()
    return sql

def generate_sql(question: str):
    prompt = f"""
{SCHEMA_CONTEXT}

Convert the user question into a PostgreSQL SELECT query.

Rules:
- Return only SQL query.
- Only generate SELECT queries.
- Do not use INSERT, UPDATE, DELETE, DROP, ALTER, CREATE.
- Use LIMIT 10 unless user asks for a specific number.
- Use snake_case table and column names.

User question:
{question}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are an expert PostgreSQL query generator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    return clean_sql(response.choices[0].message.content)

def summarize_result(question: str, sql: str, rows: list):
    prompt = f"""
User question:
{question}

SQL used:
{sql}

Query result:
{rows}

Explain the result in simple business language.
Keep it short.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a helpful business data analyst."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content