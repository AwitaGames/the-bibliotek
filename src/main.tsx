import { ThemeProvider } from '@/components/theme-provider'
import { PocketbaseProvider } from '@/pocketbase/PocketbaseContext.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css" />
            <PocketbaseProvider>
                <App />
            </PocketbaseProvider>
        </ThemeProvider>
    </StrictMode>
)
