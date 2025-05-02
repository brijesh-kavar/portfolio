
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { handleScrollToSection } from "@/utils/scrollUtils";
import { Home, User, Briefcase, FolderKanban, Mail } from "lucide-react";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 300) {
          current = section.getAttribute("id") || "";
        }
      });

      setActiveSection(current);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:block ${
          isScrolled
            ? "bg-background/80 backdrop-blur shadow-md py-5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <a href="#home" className="text-xl font-bold text-primary">
            Digital<span className="text-foreground">Shelf</span>
          </a>

          <nav className={`${isMobile ? "hidden" : ""}`}>
            <ul className="flex gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`relative px-1 py-2 transition-colors ${
                      activeSection === item.id
                        ? "text-primary font-medium"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                    onClick={(e) => handleScrollToSection(item.id, e)}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border/30 z-50 px-2 py-1 md:hidden">
          <ul className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="flex-1 relative">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollToSection(item.id, e)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                      activeSection === item.id
                        ? "text-primary bg-primary/10"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    <Icon 
                      size={20} 
                      className={`${
                        activeSection === item.id 
                          ? "animate-scale-in" 
                          : ""
                      }`}
                    />
                    <span className="text-xs mt-1 font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 w-full h-1 bg-primary rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}
