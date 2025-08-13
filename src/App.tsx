import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConversationsPage from '@/pages/conversationsPage'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/conversations" element={<ConversationsPage />} />
      </Routes>
    </Router>
  )
}

export default App
