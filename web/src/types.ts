import { z } from "zod";

export const CopyForm = z.object({
  borrower: z.string(),
  due_date: z.string().date(),
});
export const CopyResponse = CopyForm.extend({
  id: z.number(),
  book_id: z.number(),
});
export const CopiesResponse = CopyResponse.array();

export const BookForm = z.object({
  title: z.string(),
  author: z.string(),
  isbn: z.number(),
  total_copies: z.number(),
});
export const BookResponse = BookForm.extend({
  id: z.number(),
  copies: CopyResponse.array().optional(),
});
export const BooksResponse = BookResponse.array();

export type BookForm = z.infer<typeof BookForm>;
export type BookResponse = z.infer<typeof BookResponse>;
export type BooksResponse = z.infer<typeof BooksResponse>;

export type CopyForm = z.infer<typeof CopyForm>;
export type CopyResponse = z.infer<typeof CopyResponse>;
export type CopiesResponse = z.infer<typeof CopiesResponse>;
