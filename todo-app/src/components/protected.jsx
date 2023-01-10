import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// This component will protect routes that we have from being accessed when not logged in.
export default function ProtectedRoute(props) {
  //State for setting us logged in or not
  const [isLoggedIn, setLoggedIn] = useState(true);
  //Use effect running on mount to check if that local storage item exists
  useEffect(() => {
    const loggedIn = localStorage.getItem("authed");

    if (!loggedIn) {
      //Setting state to true if the value of the local storage item is there
      setLoggedIn(false);
    }
  }, [isLoggedIn]);
  //Conditionally rendering.
  // If false, we get sent back to our login page
  if (isLoggedIn) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}
