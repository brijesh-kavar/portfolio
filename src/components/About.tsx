
import { useEffect, useRef } from "react";

type Skill = {
  name: string;
  level: number;
};

const skills: Skill[] = [
  { name: "JavaScript / Typescript", level: 95 },
  { name: "React.js", level: 90 },
  { name: "Next.js", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "MySQL", level: 85 },
  { name: "Git & GitHub", level: 90 },
  { name: "Chrome DevTools", level: 84 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

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

            // Animate skill bars
            const skillBars = entry.target.querySelectorAll(".skill-progress");
            skillBars.forEach((bar) => {
              const width = bar.getAttribute("data-width") || "0";
              (bar as HTMLElement).style.width = `${width}%`;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-secondary/30 relative"
    >
      <div className="container mx-auto">
        <h2 className="section-heading fade-in-section">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="fade-in-section">
            <p className="text-lg mb-4">
              Hey, I'm a Full Stack Developer who's passionate about building fast, scalable, and beautiful web experiences.
            </p>
            <p className="text-lg mb-4">
              I specialize in modern tech like Next.js, React, and Node.js, and love creating applications that not only perform flawlessly but also feel effortless to use.
            </p>
            <p className="text-lg mb-4">
              For me, it's not just about writing clean code — it's about solving real problems, optimizing user journeys, and pushing digital experiences to the next level.
            </p>
            <p className="text-lg mb-4">
              Every project I take on is a chance to learn, improve, and leave something better than I found it.
            </p>
            <p className="text-lg mb-6">
              Let's collaborate and create something exceptional — reach out!
            </p>

            <div className="mt-8 fade-in-section">
              <a
                href="#contact"
                className="px-6 py-3 bg-primary text-white rounded-md font-medium 
                         hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Get In Touch
              </a>
            </div>
          </div>

          <div>
            <div className="mb-8 fade-in-section">
              <h3 className="text-xl font-medium mb-4">Frontend Skills</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="fade-in-section">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        data-width={skill.level}
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
