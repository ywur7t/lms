import "./App.css";

import { Routes, Route } from "react-router-dom";
import Main from "./Main/Main";
import Table from "./Table/Table";
import Graphics from "./Graphics/Graphics";
import Testing from "./Testing/Testing";
import GalleryPage from "./Main/Components/GalleryPage";
import ContentPage from "./Main/Components/ContentPage";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/tables" element={<Table />} />
      <Route path="/graphics" element={<Graphics />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/gallery/:id" element={<GalleryPage />} />
      <Route path="/content/:id" element={<ContentPage />} />
    </Routes>
  );
} export default App;
