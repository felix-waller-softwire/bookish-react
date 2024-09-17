import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createBook, updateBook } from "./api.ts";

export default function BookForm() {
  const navigate = useNavigate();
  const book = useLoaderData();

  const isUpdate = Boolean(book?.title);

  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [isbn, setIsbn] = useState(book?.isbn ?? "");

  return (
    <form onSubmit={isUpdate ? onUpdate : onCreate}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="author">Author</label>
      <input type="text" id="author" required value={author} onChange={(e) => setAuthor(e.target.value)} />
      <label htmlFor="isbn">ISBN</label>
      <input type="text" id="isbn" inputMode="numeric" required value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <button type="submit">{isUpdate ? "Update" : "Create"}</button>
      <Toaster />
    </form>
  );

  async function onUpdate(e) {
    e.preventDefault();

    const res = await updateBook(book.id, title, author, isbn);
    if (!res.ok) return toast.error("Failed to update book.");
    navigate(`/${book.id}`);
  }

  async function onCreate(e) {
    e.preventDefault();

    const res = await createBook(title, author, isbn)
    if (!res.ok) return toast.error("Failed to create book.");

    const { id } = await res.json();
    navigate(`/${id}`);
  }
}
