import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function Books() {
  const books = useLoaderData();
  return books?.map(({ id, title, author }) =>
    <p key={id}><Link to={`/${id}`}>{title}</Link> by {author}</p>);
}
