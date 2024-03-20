import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = `${env.VITE_PORT ?? "5173"}`;  

  return {
    server: {
      port: PORT      
    },
    plugins: [react()],
  };
});