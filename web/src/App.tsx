import { Link, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to={"/"}>Books</Link>{" "}
          <Link to={"/create"}>Create</Link>
        </nav>
      </header>
      <Outlet />
      <Toaster />
    </>
  )
}

export default App
