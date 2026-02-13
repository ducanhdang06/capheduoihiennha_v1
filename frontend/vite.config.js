import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { SiTrueup } from "react-icons/si";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
  },
});
