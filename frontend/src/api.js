const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getDashboardData() {
  const response = await fetch(`${API_BASE_URL}/dashboard/`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return response.json();
}

export async function askAI(question) {
  const response = await fetch(`${API_BASE_URL}/ai/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  return response.json();
}

export async function addCustomer(customer) {
  const response = await fetch(`${API_BASE_URL}/customers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Failed to add customer");
  }

  return response.json();
}