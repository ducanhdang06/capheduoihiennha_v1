import api from "./axios"

// Get the menu by cateogries for display
export async function getMenu () {
    const res = await api.get("/drinks");
    return res.data;
}

