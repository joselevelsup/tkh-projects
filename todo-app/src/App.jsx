//Hooks and components from React Router
//useLoaderData: is a hook that takes the data that was returned from the loader function in our routes and can use that data in this page.
//useSubmit: A hook used to submit data to that route we are submitting to. In this case, it would be submitting to http://localhost:5173/todos.
//Link is a component that enables us to move between pages without having to do manual refreshes. a tags would reload the whole app while Link only transitions us between the routes.
//Outlet is what helps display the routes that are listed in the children array when we defined our routes.
import { useState } from "react";
import {
  useLoaderData,
  Link,
  useSubmit,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "./App.css";

function TodosPage() {
  let submit = useSubmit();
  const todos = useLoaderData();

  return (
    <div>
      <button
        onClick={() =>
          submit(
            { id: 4, name: "Play with the kids" },
            { method: "post", action: "/todos" }
          )
        }
      >
        Add
      </button>
      <ul>
        {todos.map((todo) => (
          <Link to={`/todos/${todo.id}`}>{todo.name}</Link>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

//Only displays a single Todo
function TodoPage() {
  const todo = useLoaderData();

  return <div>{todo.name}</div>;
}

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    if (username === "user123" && password === "pass123") {
      localStorage.setItem("authed", true);

      navigate("/todos");
    } else {
      console.log("Username and Password is wrong");
    }
  };

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          name="username"
        />
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          name="password"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
export { TodosPage, TodoPage, LoginPage };
