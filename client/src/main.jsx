import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from "sonner"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
    <Toaster
				toastOptions={{
					className: "py-3",
				}}
				expand={true}
				position="top-right"
				richColors
				closeButton
			/>
    <App />
    </div>
  </React.StrictMode>,
)
