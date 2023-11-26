// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlaybookList from './pages/PlaybookList';
import AddPlaybook from './pages/AddPlaybook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaybookList />} />
        <Route path="/add" element={<AddPlaybook />} />
      </Routes>
    </Router>
  );
}

export default App;
