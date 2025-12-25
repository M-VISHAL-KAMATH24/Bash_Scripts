import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Dashboard from './component/Dashboard'; // Create next

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
