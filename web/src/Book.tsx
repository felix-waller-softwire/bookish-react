import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
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
    </>
  );
}
