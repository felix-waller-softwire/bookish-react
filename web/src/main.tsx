import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import Books from './Books.tsx'
import Book from './Book.tsx'
import BookForm from "./BookForm.tsx";
import { fetchBooks, fetchBook } from "./api.ts";
import './base.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
    loader: fetchBooks,
  },
  {
    path: "/:id",
    element: <Book />,
    loader: async ({ params }) => fetchBook(params.id),
  },
  {
    path: "/create",
    element: <BookForm />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
