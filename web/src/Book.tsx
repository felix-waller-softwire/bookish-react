import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { deleteBook } from "./api.ts";

export default function Book() {
  const { id, title, author, isbn }= useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <h1>{title}</h1>
      <p>by {author}</p>
      <p>ISBN: {isbn}</p>
      <Link to="/">All books</Link>
      {" "}
      <button onClick={onDelete}>Delete</button>
      <Toaster />
    </>
  );

  async function onDelete() {
    const res = await deleteBook(id);
    if (res.ok) return navigate("/");
    toast.error(`Failed to delete "${title}".`);
  }
}
