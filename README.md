# Northwind AI Insights

A modern, AI-powered business analytics dashboard built with React, FastAPI, and Groq API. Explore real-time insights from the Northwind database using natural language queries powered by AI.

## ✨ Features

- **Interactive Dashboard** - Real-time statistics and metrics from Northwind database
- **AI Assistant** - Ask natural language questions about your business data
- **Smart SQL Generation** - AI generates optimized SQL queries from plain English
- **Professional UI** - Modern SaaS-style interface with dark theme
- **Mobile Responsive** - Fully optimized for both desktop and mobile devices
- **Real-time Results** - Instant data fetching with loading states and error handling
- **Clean Code** - Well-structured, maintainable codebase

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Professional icons

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** (Neon) - Database with Northwind sample data
- **Groq API** - AI model for natural language processing

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/northwind-ai-insights.git
cd northwind-ai-insights
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
# Create a .env file with:
# DATABASE_URL=your_neon_postgresql_url
# GROQ_API_KEY=your_groq_api_key

# Run the server
uvicorn main:app --reload
```

The backend will run on `http://127.0.0.1:8000`

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Install lucide-react for icons
npm install lucide-react

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or another available port)

## 📂 Project Structure

```
northwind-ai-insights/
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── database.py             # Database configuration
│   ├── routes/
│   │   ├── dashboard_routes.py # Dashboard endpoints
│   │   └── ai_routes.py        # AI assistant endpoints
│   ├── services/
│   │   └── ai_service.py       # AI query processing
│   ├── schemas/
│   │   └── ai_schema.py        # Request/response schemas
│   └── requirements.txt        # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main app component
│   │   ├── api.js              # API client
│   │   ├── main.jsx            # React entry point
│   │   ├── index.css           # Global styles
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation component
│   │   │   └── StatCard.jsx    # Dashboard card component
│   │   └── pages/
│   │       ├── Dashboard.jsx   # Dashboard page
│   │       └── AiAssistant.jsx # AI assistant page
│   ├── package.json            # Node dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS config
│   └── index.html              # HTML entry point
│
└── README.md                   # This file
```

## 🔌 API Endpoints

### Dashboard Endpoint
```
GET /dashboard/
```
Returns dashboard statistics:
```json
{
  "total_customers": 91,
  "total_orders": 830,
  "total_products": 77
}
```

### AI Assistant Endpoint
```
POST /ai/ask
Content-Type: application/json

{
  "question": "Show top 5 products by sales"
}
```

Response:
```json
{
  "question": "Show top 5 products by sales",
  "sql": "SELECT product_name, SUM(quantity) as total_sales FROM order_details GROUP BY product_name ORDER BY total_sales DESC LIMIT 5",
  "rows": [
    {"product_name": "Product A", "total_sales": 1500},
    ...
  ],
  "summary": "The top 5 products by sales are..."
}
```

## 🎯 Usage

### Dashboard Page
1. Navigate to `http://localhost:5173`
2. View real-time statistics:
   - Total Customers
   - Total Orders
   - Total Products
3. Click the **Refresh** button to reload data

### AI Assistant Page
1. Click **AI Assistant** in the navigation
2. **Option A:** Select a quick query button
3. **Option B:** Ask your own question in the text area
4. Click **Ask AI** or press `Ctrl+Enter`
5. View:
   - AI Summary
   - Generated SQL Query (copy with button)
   - Query Results in table format

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:port/northwind
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend
API base URL is configured in `src/api.js`:
```javascript
const API_BASE_URL = "http://127.0.0.1:8000";
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile** (320px - 767px)
- **Tablet** (768px - 1024px)
- **Desktop** (1025px+)

All components adapt seamlessly across breakpoints using Tailwind CSS media queries.

## 🧪 Testing the API

You can test the API endpoints using:
- **cURL**
- **Postman**
- **VS Code REST Client**
- **Thunder Client**

Example using cURL:
```bash
# Dashboard endpoint
curl http://127.0.0.1:8000/dashboard/

# AI Assistant endpoint
curl -X POST http://127.0.0.1:8000/ai/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Show top 5 products by sales"}'
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure PostgreSQL/Neon database is accessible
- Check `DATABASE_URL` in `.env`
- Verify `GROQ_API_KEY` is set
- Check port 8000 is not in use

### Frontend won't connect to backend
- Ensure backend is running on `http://127.0.0.1:8000`
- Check CORS settings in backend
- Clear browser cache and restart dev server

### Database import issues
- Ensure Northwind sample database is imported to your PostgreSQL instance
- Verify database credentials are correct

## 📦 Dependencies

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x.x",
  "lucide-react": "^latest"
}
```

### Backend
```
fastapi
uvicorn
sqlalchemy
psycopg2-binary
python-dotenv
groq
```

## 🎨 Customization

### Colors
Modify Tailwind CSS classes in component files. Dark theme colors are defined using `slate-*` and `blue-*` classes.

### API Timeout
Adjust timeout in `src/api.js`:
```javascript
const timeout = 30000; // milliseconds
```

### Sample Questions
Edit sample questions in `src/pages/AiAssistant.jsx`:
```javascript
const sampleQuestions = [
  {
    title: "Your Question",
    description: "Your question here",
    icon: "🎯"
  },
  // ...
];
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

Created as a modern AI-powered analytics dashboard demonstration.

## 📧 Support

For support, please open an issue on GitHub or contact the development team.

---

**Happy exploring! 🚀**

*Last Updated: May 2026*
