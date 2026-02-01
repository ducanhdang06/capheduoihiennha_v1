import { useEffect } from "react";
import { getDrinks } from "../api/drink.api";

export default function TestApi() {
  useEffect(() => {
    getDrinks()
      .then(res => console.log("BACKEND DATA:", res.data))
      .catch(err => console.error("API ERROR:", err));
  }, []);

  return <h1>Check console</h1>;
}
