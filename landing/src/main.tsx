import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from "@/layout.tsx";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Layout>
            <App/>
            <Toaster  />
        </Layout>
    </StrictMode>,
)
