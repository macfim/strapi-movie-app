import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:id" element={<Movie />} />
      </Routes>
    </div>
  );
};

export default App;
