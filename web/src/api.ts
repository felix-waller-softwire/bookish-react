import { BookResponse, BooksResponse, CopiesResponse, CopyResponse } from "./types";

const URI = "http://localhost:3000";

export async function fetchBooks() {
	const res = await fetch(`${URI}/books`)
		.then((res) => res.json());
	return BooksResponse.parse(res);
}

export async function fetchBook(id: number) {
	const res = await fetch(`${URI}/books/${id}`)
		.then((res) => res.json());
	return BookResponse.parse(res);
}

export async function deleteBook(id: number) {
	return await fetch(`${URI}/books/${id}`, { method: "DELETE" });
}

export async function createBook(title: string, author: string, isbn: number) {
	return await fetch(`${URI}/books`, {
		method: "POST",
		body: JSON.stringify({ book: { title, author, isbn } }),
		headers: { "Content-Type": "application/json" },
	});
}

export async function updateBook(id: number, title: string, author: string, isbn: number) {
	return await fetch(`${URI}/books/${id}`, {
		method: "PATCH",
		body: JSON.stringify({ book: { title, author, isbn } }),
		headers: { "Content-Type": "application/json" },
	});
}

export async function fetchCopies(book_id: number) {
	const res = await fetch(`${URI}/books/${book_id}/copies`)
		.then((res) => res.json());
	return CopiesResponse.parse(res);
}

export async function fetchCopy(id: number) {
	const res = await fetch(`${URI}/copies/${id}`)
		.then((res) => res.json());
	return CopyResponse.parse(res);
}

export async function deleteCopy(id: number) {
	return await fetch(`${URI}/copies/${id}`, { method: "DELETE" });
}

export async function createCopy(book_id: number, borrower: string, due_date: string) {
	return await fetch(`${URI}/books/${book_id}/copies`, {
		method: "POST",
		body: JSON.stringify({ copy: { borrower, due_date } }),
		headers: { "Content-Type": "application/json" },
	});
}

export async function updateCopy(id: number, borrower: string, due_date: string) {
	return await fetch(`${URI}/copies/${id}`, {
		method: "PATCH",
		body: JSON.stringify({ copy: { borrower, due_date } }),
		headers: { "Content-Type": "application/json" },
	});
}
