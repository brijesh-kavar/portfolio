
import { useEffect, useRef } from "react";

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
};

const experiences: ExperienceItem[] = [
  {
    title: "SDE-I (Full Stack)",
    company: "Techuz InfoWeb Private Limited",
    period: "July 2023 - Present",
    description:
      "Deepened expertise in building scalable web applications using React, Node.js, TypeScript, and Next.js. Contributed to improving workflows, optimizing performance, and collaborating across teams to deliver high-quality, impactful solutions.",
    technologies: ["JavaScript / Typescript", "React.js", "Next.js", "Node.js", "MySQL", "Gatsby.js", "Tailwind", "Bootstrap", "SCSS", "Git & GitHub", "Chrome DevTools"],
  },
  {
    title: "Software Developer Trainee",
    company: "Techuz InfoWeb Private Limited",
    period: "Jan 2023 - Jult 2023",
    description:
      "Gained hands-on experience with JavaScript, Node.js, React.js, and Express.js. Contributed to developing core features, debugging issues, and optimizing database interactions with MySQL and MongoDB. Learned and applied best practices for writing clean, efficient code.",
    technologies: ["JavaScript", "React.js", "Node.js", "MySQL", "MongoDB", "HTML & CSS", "Git & GitHub"],
  },
];

export default function Experience() {
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
              }, index * 200);
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
      id="experience"
      ref={sectionRef}
      className="section-padding bg-background"
    >
      <div className="container mx-auto">
        <h2 className="section-heading fade-in-section">My Experience</h2>

        <div className="relative pl-5 border-l-2 border-muted max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="mb-12 last:mb-0 fade-in-section relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[29px] mt-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background"></div>

              <div className="p-6 bg-card rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-card/80">
                <div className="flex flex-wrap justify-between mb-2 items-start">
                  <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                  <span className="text-sm text-primary-foreground bg-primary px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                <p className="text-lg font-medium mb-3">{exp.company}</p>
                <p className="mb-4 text-foreground/80">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
