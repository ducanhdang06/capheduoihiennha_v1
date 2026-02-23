import api from "./axios"

// Login with admin account
export async function Login (username, password) {
  const res = await api.post("/auth/login", {username, password});
  return res.data;
};

// Get all drinks to display on the menu dashboard
export async function getAdminDrinks () {
  const res = await api.get("/admin/drinks");
  return res.data;
};

// Get the info for one specific drink
export const getDetailDrink = async (id) => {
  const res = await api.get(`/admin/drinks/${id}`);
  return res.data;
}

// Update a drink info
export const updateDrink = async (id, drink) => {
  const response = await api.put(`/admin/drinks/${id}`, {
    name: drink.name,
    description: drink.description,
    price: drink.price,
    categoryId: drink.categoryId, 
    imageUrl: drink.imageUrl,
    active: drink.active,
  });
  return response.data;
}

// Create a new drink
export const createDrink = async (drink) => {
  const response = await api.post("/admin/drinks", {
    name: drink.name,
    description: drink.description,
    price: drink.price,
    categoryId: drink.categoryId, 
    imageUrl: drink.imageUrl,
    active: drink.active,
  });
  return response.data;
}

// Get all the categories
export const getCategories = async () => {
  const response = await api.get("/admin/categories");
  return response.data;
}

// Create a new category
export const createCategory = async(category) => {
  const response = await api.post("/admin/categories", {
    name: category.name,
  });
  return response.data;
}