import { Link, useLoaderData } from "react-router-dom";
import { BooksResponse } from "./types";

export default function Books() {
  const books = useLoaderData() as BooksResponse;
  return (
    <ul>
      {books?.map(({ id, title, author }) =>
        <li key={id}><Link to={`/${id}`}>{title}</Link> by {author}</li>)}
    </ul>
  );
}
