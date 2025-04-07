import { BrowserRouter } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import { useState } from "react";
import Footer from './component/Navbar/pages/Footer'

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
