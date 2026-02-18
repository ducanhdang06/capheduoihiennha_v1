import api from "./axios"

export async function Login (username, password) {
  const res = await api.post("/auth/login", {username, password});
  return res.data;
};


export const getAdminDrinks = async (name, active) => {
  const res = await api.get("/admin/drinks", {
    params: { name, active }
  });
  return res.data;
};

export const updateDrink = async (id, drink) => {
  const response = await api.put(`/admin/drinks/${id}`, {
    name: drink.name,
    description: drink.description || "",
    price: drink.price,
    categoryId: drink.categoryId || 1, // temporary
    tags: drink.tags || [],
    images: drink.images || [],
  });

  return response.data;
};