import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Inbox from "./pages/Inbox/Inbox";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import PerfilPage from "./pages/PerfilPage/PerfilPage";
import RequestPage from "./pages/RequestPage/RequestPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/user/:id" element={<PerfilPage />} />
          <Route path="/friend-request" element={<RequestPage />} />
          <Route path="/friends" element={<FriendsPage />} />
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
