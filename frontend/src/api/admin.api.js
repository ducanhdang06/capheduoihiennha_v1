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
export async function getDetailDrink(id) {
  const res = await api.get(`/admin/drinks/${id}`);
  return res.data;
}

export const updateDrink = async (id, drink) => {
  const response = await api.put(`/admin/drinks/${id}`, {
    name: drink.name,
    description: drink.description,
    price: drink.price,
    categoryId: drink.categoryId, // temporary
    imageUrl: drink.imageUrl,
    active: drink.active,
  });
  return response.data;
};