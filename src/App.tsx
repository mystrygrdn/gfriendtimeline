import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TimelinePage from "./pages/TimelinePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import AchievementsPage from "./pages/AchievementsPage";
import VarietyPage from "./pages/VarietyPage";

/**
 * ============================================================
 *  MODUL BELAJAR: routing dengan react-router-dom
 * ============================================================
 * Setiap "menu" yang kamu sebutkan (Timeline, Activities,
 * Achievements, Variety Shows) adalah SATU halaman/route.
 * `<Routes>` membaca URL saat ini dan menampilkan `<Route>`
 * yang cocok. `<Navbar>` diletakkan DI LUAR `<Routes>` supaya
 * dia tetap tampil terus di semua halaman.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TimelinePage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/variety" element={<VarietyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
