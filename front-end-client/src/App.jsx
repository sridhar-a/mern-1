import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [message, setMessage] = useState("");
  const BACK_END_URI = import.meta.env.VITE_BACK_END_URI;  

  // Fetching message from backend on mount
  useEffect(() => {
    fetch(BACK_END_URI, { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>Front End - Client</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;

/*
Access to fetch at 'http://localhost:9000/' from origin 'http://localhost:8000' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:8081/' that is not equal to the supplied origin. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled
*/