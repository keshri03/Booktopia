import  {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookFinder from './Components/BookFinder';
import Home from './Components/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookFinder />} />
      </Routes>
    </>
  );
}

export default App
