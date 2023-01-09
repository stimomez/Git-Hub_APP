import { useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import LoadingScreen from "./components/LoadingScreen";
import UserDetails from "./pages/UserDetails";
import Home from "./pages/Home";
import Repositories from "./components/Repositories";
import Footer from "./components/Footer";

function App() {
  const { isLoading } = useSelector((state) => state.users);
  return (
    <div className="App">
      <HashRouter>
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/org-repos" element={<Repositories />} />
        </Routes>
      </HashRouter>
      <Footer/>
    </div>
  );
}

export default App;
