import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'healthMF',
      filename: 'remoteEntry.js',
      exposes: {
        './HealthRecords': './src/features/health-records/components/HealthRecords.jsx',
        './VaccinationSchedule': './src/features/vaccination/components/VaccinationSchedule.jsx',
        './TreatmentHistory': './src/features/treatment/components/TreatmentHistory.jsx',
        './HealthStore': './src/shared/store/healthStore.js'
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'zustand', 'axios']
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5004,
    cors: true
  }
})