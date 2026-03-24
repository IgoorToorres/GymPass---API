import { defineConfig } from 'vitest/config'
import tsconfigpPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigpPaths()],
})
