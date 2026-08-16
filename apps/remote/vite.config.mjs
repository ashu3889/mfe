import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget.jsx'
      },
      shared: {
        react: { 
          singleton: true,
          // strictVersion: true,
          // requiredVersion: '^19.3.0',
        },
        'react-dom': {
          singleton: true,
          // strictVersion: true,
          // requiredVersion: '^19.3.0',
        }
      }
    })
  ],
  server: {
    port: 3001,
    cors: true
  },
  preview: {
    port: 3001,
    cors: true
  },
  build: {
    target: 'esnext'
  }
});