import api from "./axios"

export const getDrinks = () => api.get("/drinks")

export async function getAllDrinks () {
    const res = await api.get("/drinks");
    return res.data;
}

export const getCategoryDrinksMenu = () => {
  return api.get("/menu").then(res => res.data);
};