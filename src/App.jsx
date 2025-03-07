import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ContentEditor from "./Components/ContentEditor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:id" element={<ContentEditor />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  const newRoom = () => {
    const id = uuidv4();
    window.location.href = `/editor/${id}`;
  };

  return (
    <div>
      <h1>Real-Time Content Sharing</h1>
      <button onClick={newRoom}>Create New Document</button>
    </div>
  );
};

export default App;
