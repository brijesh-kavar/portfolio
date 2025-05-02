
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollToTop from "@/components/ScrollToTop";
import PersonalProjects from "@/components/PersonalProjects";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {isLoading ? (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <ThemeToggle />
          <Navigation />
          <main className="overflow-x-hidden">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <PersonalProjects />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}
