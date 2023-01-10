import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { TodosPage, TodoPage, LoginPage } from "./App";
import ProtectedRoute from "./components/protected";
import "./index.css";

//Our list of todos
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

//Creates our Single Page App router
const router = createBrowserRouter([
  {
    //Everytime we enter the index route, it will show the component below
    path: "/", //The index route
    element: (
      <div className="auth-choice">
        {/* Link component that allows us to go between pages */}
        <Link to="/login">Login</Link>
      </div>
    ),
  },
  {
    //Everytime we enter the login route, it will show the component below
    //The component below is a page that we are importing
    path: "/login",
    element: <LoginPage />,
  },
  {
    //Our actual todos route. This page will act as a layout and show all the todos available
    //We are also creating a protected route component so only authed users can access the todos
    path: "/todos",
    element: (
      <ProtectedRoute>
        <TodosPage />
      </ProtectedRoute>
    ),
    //Does the initial load of our todos to the todos page
    loader: () => todos,
    //Action is for when we submit a new todo. The new todo gets added to our current array of todos
    action: ({ request }) => {
      let data = request.formData();
      todos.push(data);
      return todos;
    },
    //Children are the subroutes of the todos page. It includes a parameter so we can see individual todos
    children: [
      {
        //http://localhost:5173/todos/new
        path: "new",
        element: <div>This is a page for a new todo to be made</div>,
      },
      {
        path: ":todoId",
        element: <TodoPage />,
        //Initial load of a single todo. In this case we are finding a todo based on the param that is being used in the url
        //Example: http://localhost:5173/todos/2 loads the second todo in our todo list
        //Example: http://localhost:5173/todos/10 would load the 10th todo in our todo list (if it existed)
        loader: ({ params }) => {
          console.log(params); //Prints out the param from the URL
          return todos.find((todo) => todo.id === parseInt(params.todoId));
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
