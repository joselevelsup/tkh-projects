//Hooks and components from React Router
//useLoaderData: is a hook that takes the data that was returned from the loader function in our routes and can use that data in this page.
//useSubmit: A hook used to submit data to that route we are submitting to. In this case, it would be submitting to http://localhost:5173/todos.
//Link is a component that enables us to move between pages without having to do manual refreshes. a tags would reload the whole app while Link only transitions us between the routes.
//Outlet is what helps display the routes that are listed in the children array when we defined our routes.

import { useLoaderData, Link, useSubmit, Outlet } from "react-router-dom";
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
  return <div>Login page</div>;
}
export { TodosPage, TodoPage, LoginPage };
