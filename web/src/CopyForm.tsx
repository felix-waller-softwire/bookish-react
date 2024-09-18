import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createCopy, updateCopy } from "./api.ts";

export default function CopyForm() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const copy = useLoaderData();

  const isUpdate = Boolean(copy?.id);

  const [borrower, setBorrower] = useState(copy?.borrower ?? "");
  const [dueDate, setDueDate] = useState(copy?.due_date ?? "");
  
  return (
    <form onSubmit={isUpdate ? onUpdate : onCreate}>
      <label htmlFor="borrower">Borrower</label>
      <input type="text" id="borrower" required value={borrower} onChange={(e) => setBorrower(e.target.value)} />
      <label htmlFor="due-date">Due date</label>
      <input type="date" id="due-date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button type="submit">{isUpdate ? "Update" : "Check out"}</button>
    </form>
  );

  async function onUpdate(e) {
    e.preventDefault();
    const res = await updateCopy(copy.id, borrower, dueDate);
    if (!res.ok) return toast.error("Failed to update copy.");
    toast.success("Updated copy.");
    navigate(`/${bookId}`);
  }

  async function onCreate(e) {
    e.preventDefault();
    const res = await createCopy(bookId, borrower, dueDate);
    if (!res.ok) return toast.error("Failed to check out book.");
    toast.success("Checked out book.");
    navigate(`/${bookId}`);
  }
}
