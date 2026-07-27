import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import PageTransition from "./components/ui/page-transition";
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
 *
 * `AnimatedRoutes` dipisah jadi komponen sendiri karena
 * `useLocation()` butuh berada DI DALAM `<BrowserRouter>` untuk
 * bisa baca URL saat ini. `location.pathname` dipakai sebagai
 * `key` di `<Routes>` — ini yang bikin AnimatePresence sadar
 * "oh, halaman ganti" dan menjalankan animasi exit/enter.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><TimelinePage /></PageTransition>} />
        <Route path="/activities" element={<PageTransition><ActivitiesPage /></PageTransition>} />
        <Route path="/achievements" element={<PageTransition><AchievementsPage /></PageTransition>} />
        <Route path="/variety" element={<PageTransition><VarietyPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}