import api from "./axios"

export const getDrinks = () => api.get("/drinks")