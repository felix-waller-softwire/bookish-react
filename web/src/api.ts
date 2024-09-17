const URI = "http://localhost:3000";

export async function fetchBooks() {
	return (await fetch(`${URI}/books`)).json();
}

export async function fetchBook(id) {
	return (await fetch(`${URI}/books/${id}`)).json();
}

export async function deleteBook(id) {
	return await fetch(`${URI}/books/${id}`, { method: "DELETE" });
}

export async function createBook(title, author, isbn) {
	return await fetch(`${URI}/books`, {
		method: "POST",
		body: JSON.stringify({ book: { title, author, isbn } }),
		headers: { "Content-Type": "application/json" },
	});
}
