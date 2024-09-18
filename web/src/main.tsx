import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import Books from './Books.tsx'
import Book from './Book.tsx'
import BookForm from "./BookForm.tsx";
import CopyForm from "./CopyForm.tsx";
import { fetchBooks, fetchBook, fetchCopy } from "./api.ts";
import './base.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
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
        element: <BookForm key="create" />,
      },
      {
        path: "/:id/update",
        element: <BookForm key="update" />,
        loader: async ({ params }) => fetchBook(params.id),
      },
      {
        path: "/:bookId/check-out",
        element: <CopyForm />,
      },
      {
        path: "/:bookId/copy/:id/update",
        element: <CopyForm />,
        loader: async ({ params }) => fetchCopy(params.id),
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
