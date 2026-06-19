import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#16171d] text-gray-800 dark:text-gray-200">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;