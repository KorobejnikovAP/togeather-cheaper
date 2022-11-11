import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './login-page/login-page';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
