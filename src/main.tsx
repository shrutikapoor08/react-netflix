import { hydrateRoot } from 'react-dom/client'
// Import the generated route tree
import { createRouter } from './router'
import { RouterClient } from '@tanstack/react-router/ssr/client'

const router = createRouter()

import reportWebVitals from './reportWebVitals.ts'



// Render the app
hydrateRoot(document, <RouterClient router={router} />)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
