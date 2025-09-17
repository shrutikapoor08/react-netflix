import { StrictMode } from 'react'
import ReactDOM, { hydrateRoot } from 'react-dom/client'
// Import the generated route tree
import { createRouter } from './router'
import { RouterClient } from '@tanstack/react-router/ssr/client'

const router = createRouter()

import reportWebVitals from './reportWebVitals.ts'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

// // Create a new router instance
// const router = createRouter({
//   routeTree,
//   context: {},
//   defaultPreload: 'intent',
//   scrollRestoration: true,
//   defaultStructuralSharing: true,
//   defaultPreloadStaleTime: 0,
// })

// // Register the router instance for type safety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router
//   }
// }

// Render the app
hydrateRoot(document, <RouterClient router={router} />)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
