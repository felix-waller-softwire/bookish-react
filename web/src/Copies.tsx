import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteCopy } from "./api.ts";

export default function Copies({ copies, onChange }) {
  return (  
    <ul>
      {copies.map(({ id, borrower, due_date }) => (
        <li key={id}>
          <Link to={`./copy/${id}/update`}>{borrower} due {due_date}</Link>
          {" "} <button onClick={() => onReturn(id)}>Return</button>
        </li>
      ))}
    </ul>
  )

  async function onReturn(id) {
    const res = await deleteCopy(id);
    if (!res.ok) return toast.error("Failed to return copy.");
    toast.success("Returned copy.");
    onChange();
  }
}
