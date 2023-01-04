import { useLoaderData, Link, useSubmit } from "react-router-dom";
import "./App.css";

function TodosPage() {
  let submit = useSubmit();
  const todos = useLoaderData();

  const addTodo = () => {
    todos.push();
  };

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
    </div>
  );
}

function TodoPage() {
  const todo = useLoaderData();

  return <div>{todo.name}</div>;
}

export { TodosPage, TodoPage };
