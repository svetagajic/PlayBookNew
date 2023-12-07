import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import PlaybookList from './pages/PlaybookList'; // Assuming you have a component for listing playbooks
import AddPlaybook from './pages/AddPlaybook'; // Component for submitting playbooks

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">List Playbooks</Link>
        </li>
        <li>
          <Link to="/add">Submit Playbook</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/add" element={<AddPlaybook />} />
          <Route path="/" element={<PlaybookList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
