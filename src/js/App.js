import { HashRouter, Routes, Route } from "react-router-dom";

import Blog from "./Blog";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import NoPage from "./NoPage";
import Galleries from "./Galleries";
import Layout from "./Layout";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/galleries" element={<Galleries />} />
          <Route path="/blog" element={<Blog />} />
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
