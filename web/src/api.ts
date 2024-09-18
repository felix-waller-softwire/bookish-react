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

export async function updateBook(id, title, author, isbn) {
	return await fetch(`${URI}/books/${id}`, {
		method: "PATCH",
		body: JSON.stringify({ book: { title, author, isbn } }),
		headers: { "Content-Type": "application/json" },
	});
}

export async function fetchCopies(book_id) {
	return (await fetch(`${URI}/books/${book_id}/copies`)).json();
}

export async function fetchCopy(id) {
	return (await fetch(`${URI}/copies/${id}`)).json();
}

export async function deleteCopy(id) {
	return await fetch(`${URI}/copies/${id}`, { method: "DELETE" });
}

export async function createCopy(book_id, borrower, due_date) {
	return await fetch(`${URI}/books/${book_id}/copies`, {
		method: "POST",
		body: JSON.stringify({ copy: { borrower, due_date }}),
		headers: { "Content-Type": "application/json" },
	});
}

export async function updateCopy(id, borrower, due_date) {
	return await fetch(`${URI}/copies/${id}`, {
		method: "PATCH",
		body: JSON.stringify({ copy: { borrower, due_date }}),
		headers: { "Content-Type": "application/json" },
	});
}
