import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TodosPage, TodoPage } from "./App";
import "./index.css";

let todos = [
  {
    id: 1,
    name: "Feed the Dog",
  },
  {
    id: 2,
    name: "Clean the dishes",
  },
  {
    id: 3,
    name: "Change oil for car",
  },
];
const router = createBrowserRouter([
  {
    path: "/todos",
    element: <TodosPage />,
    loader: () => todos,
    action: ({ request }) => {
      let data = request.formData();
      todos.push(data);
      return todos;
    },
  },
  {
    path: "/todos/:todoId",
    element: <TodoPage />,
    loader: ({ params }) => {
      console.log(params);
      return todos.find((todo) => todo.id === parseInt(params.todoId));
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
