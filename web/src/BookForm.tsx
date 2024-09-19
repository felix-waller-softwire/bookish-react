import { FormEvent, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createBook, updateBook } from "./api.ts";
import { BookResponse } from "./types.ts";

export default function BookForm() {
  const navigate = useNavigate();
  const book = useLoaderData() as BookResponse | undefined;

  const isUpdate = Boolean(book?.title);

  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [isbn, setIsbn] = useState(book?.isbn ?? "");
  const [totalCopies, setTotalCopies] = useState(book?.total_copies ?? "");

  return (
    <form onSubmit={isUpdate ? onUpdate : onCreate}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="author">Author</label>
      <input type="text" id="author" required value={author} onChange={(e) => setAuthor(e.target.value)} />
      <label htmlFor="isbn">ISBN</label>
      <input type="text" id="isbn" inputMode="numeric" required value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <label htmlFor="total-copies">Total copies</label>
      <input type="text" id="total-copies" inputMode="numeric" required value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} />
      <button type="submit">{isUpdate ? "Update" : "Create"}</button>
    </form>
  );

  async function onUpdate(e: FormEvent<HTMLFormElement>) {
    if (!book) return onCreate(e);
    e.preventDefault();
    const res = await updateBook(book.id, {
      title,
      author,
      isbn: Number(isbn),
      total_copies: Number(totalCopies),
    });
    if (!res.ok) return toast.error("Failed to update book.");

    toast.success(`Updated "${title}".`)
    navigate(`/${book.id}`);
  }

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await createBook({
      title,
      author,
      isbn: Number(isbn),
      total_copies: Number(totalCopies),
    });

    if (!res.ok) return toast.error("Failed to create book.");

    const { id } = await res.json();
    toast.success(`Created "${title}".`)
    navigate(`/${id}`);
  }
}
