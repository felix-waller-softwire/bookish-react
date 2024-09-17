import { Link, useLoaderData } from "react-router-dom";

export default function Books() {
  const books = useLoaderData();
  return (
    <ul>
      {books?.map(({ id, title, author }) =>
        <li key={id}><Link to={`/${id}`}>{title}</Link> by {author}</li>)}
    </ul>
  );
}
