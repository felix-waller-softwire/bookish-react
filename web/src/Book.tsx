import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteBook, fetchCopies } from "./api.ts";
import Copies from "./Copies.tsx";

export default function Book() {
  const { id, title, author, isbn, copies: fetchedCopies } = useLoaderData();
  const [ copies, setCopies ] = useState(fetchedCopies);
  const navigate = useNavigate();

  return (
    <>
      <h1>{title}</h1>
      <p>by {author}</p>
      <p>ISBN: {isbn}</p>

      <Link to="./update">Update</Link>
      {" "}
      <button onClick={onDelete}>Delete</button>

      <h2>copies</h2>
      <Link to="./check-out">Check out</Link>
      <Copies copies={copies} onChange={onCopiesChange} />
    </>
  );

  async function onDelete() {
    const res = await deleteBook(id);
    if (!res.ok) return toast.error(`Failed to delete "${title}".`);
    toast.success(`Deleted "${title}".`);
    return navigate("/");
  }

  async function onCopiesChange() {
    setCopies(await fetchCopies(id));
  }
}
