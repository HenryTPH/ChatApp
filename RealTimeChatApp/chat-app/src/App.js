import './App.css';
import Login from './components/login';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import chatRoom from './components/chatRoom';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route component={Login} path="/login" />
      <Route component={chatRoom} path="/" />
    </Routes>
  </BrowserRouter>
}

export default App;
