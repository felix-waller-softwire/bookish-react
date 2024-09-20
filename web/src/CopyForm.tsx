import { FormEvent, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createCopy, updateCopy } from "./api.ts";
import { CopyResponse } from "./types.ts";

export default function CopyForm() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const copy = useLoaderData() as CopyResponse | undefined;

  const isUpdate = Boolean(copy?.id);

  const [borrower, setBorrower] = useState(copy?.borrower ?? "");
  const [dueDate, setDueDate] = useState(copy?.due_date ?? "");
  const [errors, setErrors] = useState<Record<string, string>>();

  const errorStyle = { color: "red"};

  return (
    <form onSubmit={isUpdate ? onUpdate : onCreate}>
      <div>
        { errors?.borrower && <p style={errorStyle}>Borrower {errors.borrower}</p>}
        <label htmlFor="borrower">Borrower</label>
        <input type="text" id="borrower" required value={borrower} onChange={(e) => setBorrower(e.target.value)} />
      </div>

      <div>
        { errors?.due_date && <p style={errorStyle}>Due date {errors.due_date}</p>}
        <label htmlFor="due-date">Due date</label>
        <input type="date" id="due-date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>

      <button type="submit">{isUpdate ? "Update" : "Check out"}</button>
    </form>
  );

  async function onUpdate(e: FormEvent<HTMLFormElement>) {
    if (!copy) return onCreate(e);
    e.preventDefault();
    const res = await updateCopy(copy.id, { borrower, due_date: dueDate });

    if (!res.ok) {
      const body = await res.json();
      setErrors(body?.errors);
      return toast.error("Failed to update copy.");
    }

    toast.success("Updated copy.");
    navigate(`/${bookId}`);
  }

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await createCopy(Number(bookId), { borrower, due_date: dueDate });

    if (!res.ok) {
      const body = await res.json();
      setErrors(body?.errors);
      return toast.error("Failed to check out book.");
    }

    toast.success("Checked out book.");
    navigate(`/${bookId}`);
  }
}
