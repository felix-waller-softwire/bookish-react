import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import Books from './Books.tsx'
import { fetchBooks } from "./api.ts";
import './base.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
    loader: fetchBooks,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
