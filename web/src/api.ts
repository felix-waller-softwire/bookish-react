import { BookForm, BookResponse, BooksResponse, CopiesResponse, CopyForm, CopyResponse } from "./types";

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

export async function createBook(book: BookForm) {
	return await fetch(`${URI}/books`, {
		method: "POST",
		body: JSON.stringify({ book }),
		headers: { "Content-Type": "application/json" },
	});
}

export async function updateBook(id: number, book: BookForm) {
	return await fetch(`${URI}/books/${id}`, {
		method: "PATCH",
		body: JSON.stringify({ book }),
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

export async function createCopy(book_id: number, copy: CopyForm) {
	return await fetch(`${URI}/books/${book_id}/copies`, {
		method: "POST",
		body: JSON.stringify({ copy }),
		headers: { "Content-Type": "application/json" },
	});
}

export async function updateCopy(id: number, copy: CopyForm) {
	return await fetch(`${URI}/copies/${id}`, {
		method: "PATCH",
		body: JSON.stringify({ copy }),
		headers: { "Content-Type": "application/json" },
	});
}
