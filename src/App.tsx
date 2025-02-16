import { useState, useEffect } from "react";

import "./App.css";

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL);

  useEffect(() => {
    async function me() {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/me", {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
    me();
  }, []);

  async function login() {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
  }

  async function logout() {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/logout", {
      method: "DELETE",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </>
  );
}

export default App;
