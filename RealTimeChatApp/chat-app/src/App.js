import './App.css';
import Login from './components/login';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ChatRoom from './components/chatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';

function App() {
  //In Route: Change component to element
  return (<BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<ChatRoom />} path="/" />
        </Routes>
        <AddRoomModal />
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
