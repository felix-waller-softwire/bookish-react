import { z } from "zod";

export const CopyResponse = z.object({
  id: z.number(),
  book_id: z.number(),
  borrower: z.string(),
  due_date: z.string().date(),
});
export const CopiesResponse = CopyResponse.array();

export const BookResponse = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  isbn: z.number(),
  copies: CopyResponse.array().optional(),
});
export const BooksResponse = BookResponse.array();

export type BookResponse = z.infer<typeof BookResponse>;
export type BooksResponse = z.infer<typeof BooksResponse>;
export type CopyResponse = z.infer<typeof CopyResponse>;
export type CopiesResponse = z.infer<typeof CopiesResponse>;
