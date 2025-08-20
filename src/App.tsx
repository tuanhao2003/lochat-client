import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConversationsPage from '@/pages/ConversationsPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/conversations" element={<ConversationsPage />} />
      </Routes>
    </Router>
  )
}

export default App
