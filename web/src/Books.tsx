import { useEffect, useState } from "react";

export default function Books() {
  const [books, setBooks] = useState();

  console.log(books)
  
  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then(setBooks)
  }, [])

  return books?.map(({ id, title, author }) => <p key={id}>{title} by {author}</p>);
}
