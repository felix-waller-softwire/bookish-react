import { Link, useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteBook } from "./api.ts";

export default function Book() {
  const { id, title, author, isbn }= useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <h1>{title}</h1>
      <p>by {author}</p>
      <p>ISBN: {isbn}</p>
      <Link to="./update">Update</Link>
      {" "}
      <button onClick={onDelete}>Delete</button>
    </>
  );

  async function onDelete() {
    const res = await deleteBook(id);
    if (!res.ok) return toast.error(`Failed to delete "${title}".`);
    toast.success(`Deleted "${title}".`);
    return navigate("/");
  }
}
