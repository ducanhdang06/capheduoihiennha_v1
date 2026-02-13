import { useState } from "react";

export default function ProtectedApp({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input === import.meta.env.VITE_WEBSITE_PASSWORD) {
      setAuthorized(true);
    }
  };

  if (!authorized) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>Private Preview</h2>
        <input
          type="password"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>Enter</button>
      </div>
    );
  }

  return children;
}