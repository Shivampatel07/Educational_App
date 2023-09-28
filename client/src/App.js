import "./css/App.css";
import Header from "./Header";
import Home from "./Home";
import { Quizlist, Quiz } from "./Quiz";
import Contact from "./Contact";
import Practice from "./Practice";
import { Login, Register } from "./Login";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Dashboard";
import { AuthProvider, useAuth } from "./AuthContext";

function Appcontent() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Header />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/practice" element={<Practice />} />
        {isLoggedIn ? (
          <>
            <Route path="/quizlist" element={<Quizlist />} />
            <Route path="/quizlist/:id" element={<Quiz />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/quizlist" element={<Navigate to="/login" />} />
            <Route path="/quizlist/:id" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      {" "}
      <AuthProvider>
        <Router>
          <Appcontent />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
