import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotesPage from './pages/NotesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<NotesPage />} />
      </Routes>
    </Router>
  );
}

export default App;