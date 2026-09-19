import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Dev only: use the port the launcher assigns (PORT), falling back to Vite's usual 5173.
  server: { port: Number(process.env.PORT) || 5173 },
})
