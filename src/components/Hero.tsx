import { useEffect, useRef } from "react";
import SocialLinks from "./SocialLinks";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-section");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("appear");
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      style={{ minHeight: "100svh" }}
      className="min-h-screen flex flex-col justify-center section-padding relative bg-gradient-to-br from-background to-secondary/30"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10 flex justify-center">
        <div ref={headingRef} className="max-w-3xl text-center">
          <p className="text-primary font-medium mb-4 fade-in-section" style={{ animationDelay: "0.2s" }}>
            Hello, I'm
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in-section" style={{ animationDelay: "0.4s" }}>
            Brijesh Kavar
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground/80 mb-6 fade-in-section" style={{ animationDelay: "0.6s" }}>
            A passionate Full Stack Developer
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-xl fade-in-section" style={{ animationDelay: "0.8s" }}>
            I specialize in building scalable, high-performance web applications 
            with modern technologies like Next.js, React, Node.js, and more.
          </p>
          <div className="flex flex-wrap gap-4 fade-in-section justify-center" style={{ animationDelay: "1s" }}>
            <a
              href="https://drive.google.com/file/d/1EwRmz-TdlQrI2NfmceJedRBaICtCI3I-/view"
              target="_blank"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium 
                       hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              View Resume
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-primary text-primary rounded-md font-medium 
                       hover:bg-primary/10 transition-colors"
            >
              Contact Me
            </a>
          </div>
          <div className="mt-8 fade-in-section" style={{ animationDelay: "1.2s" }}>
            <SocialLinks className="justify-center" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="text-foreground/50 hover:text-primary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
