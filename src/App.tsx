import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConversationsPage from '@/pages/conversationsPage'
import LoginPage from '@/pages/loginPage'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/conversations" element={<ConversationsPage />} />
      </Routes>
    </Router>
  )
}

export default App
