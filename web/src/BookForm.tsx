import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createBook } from "./api.ts";

export default function BookForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="author">Author</label>
      <input type="text" id="author" required value={author} onChange={(e) => setAuthor(e.target.value)} />
      <label htmlFor="isbn">ISBN</label>
      <input type="text" id="isbn" inputMode="numeric" required value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <button type="submit">Create</button>
      <Toaster />
    </form>
  );

  async function onSubmit(e) {
    e.preventDefault();

    const res = await createBook(title, author, isbn)
    if (!res.ok) return toast.error(`Failed to create book.`);

    const { id } = await res.json();
    navigate(`/${id}`);
  }
}
