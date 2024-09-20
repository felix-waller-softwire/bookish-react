import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteBook, fetchCopies } from "./api.ts";
import Copies from "./Copies.tsx";
import { BookResponse } from "./types.ts";

export default function Book() {
  const { id, title, author, isbn, total_copies, copies: fetchedCopies } = useLoaderData() as BookResponse;
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
      <p>{total_copies - (copies?.length ?? 0)} / {total_copies} available</p>
      {(copies?.length ?? 0) >= total_copies
        ? <button onClick={onNoCopiesClicked}>Check out</button>
        : <Link to="./check-out">Check out</Link>}
      {copies && <Copies copies={copies} onChange={onCopiesChange} />}
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

  function onNoCopiesClicked() {
    toast.error("No copies available.");
  }
}
