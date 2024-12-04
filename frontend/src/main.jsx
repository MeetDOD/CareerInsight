import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from './components/ui/themeprovider.jsx'

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </RecoilRoot>
)
