import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { BlogList } from "./pages/BlogList";
import { BlogPost } from "./pages/BlogPost";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<BlogList notFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
