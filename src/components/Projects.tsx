
import { ReactNode, useEffect, useRef, useState } from "react";
import Techuz from '../../public/techuz.png'
import Setpro from '../../public/setpro.png'
import Neiv from '../../public/neiv.png'
import Insyd from '../../public/insyd.png'
import Realtor from '../../public/realtor.png'

type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: ReactNode;
  image: string;
  technologies: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Insyd",
    subtitle: "Internal platform focused on efficient service planning and code optimization",
    image: Insyd,
    description: (
      <>
        <p>
          Contributed to <b>Insyd</b> by supporting junior developers, improving performance, and guiding efficient service choices.
        </p>
        <ul className="list-disc pl-10">
          <li>Optimized code to reduce redundancy and improve maintainability</li>
          <li>Mentored juniors in best practices and solution architecture</li>
          <li>Assessed service choices and their performance implications</li>
          <li>Helped maintain <b>low technical debt</b> through modular design</li>
          <li>Implemented <b>discussion board</b> for open user-admin interactions</li>
          <li>Built filtering features for personalized discovery</li>
          <li>Contributed to <b>feed relevance logic</b> for curated user experience</li>
          <li>Integrated <b>access control</b> and internal utility modules</li>
        </ul>
      </>
    ),
    technologies: ["React.js", "Next.js", "Node.js", "Express", "MySQL", "REST APIs"],
  },
  {
    id: 2,
    title: "Realtor Marketplace",
    subtitle: "Real estate platform for listing and promoting properties",
    image: Realtor,
    description: (
      <>
        <p>
          A feature-rich platform for users and realtors to manage listings, subscriptions, and ads, with admin oversight.
        </p>
        <ul className="list-disc pl-10">
          <li><b>Built dashboards</b> for users, realtors, and admins</li>
          <li><b>Integrated subscriptions</b> and role-based access</li>
          <li>Added filtering, property management, and ad-booking flows</li>
          <li>Used a <b>scalable MySQL schema</b> for CRUD operations</li>
        </ul>
      </>
    ),
    technologies: ["React.js", "Next.js", "Node.js", "Express", "MySQL"],
  },
  {
    id: 3,
    title: "Techuz Website Revamp",
    subtitle: "Performance-first redesign of the Techuz official site",
    image: Techuz,
    description: (
      <>
        <p>
          A redesign project to improve performance, SEO, and UI alignment with brand goals.
        </p>
        <ul className="list-disc pl-10">
          <li>Used <b>Gatsby</b> for SSG and <b>GraphQL</b> for content querying</li>
          <li>Built responsive UI with <b>Tailwind CSS</b></li>
          <li><b>Improved Core Web Vitals</b> via performance optimization</li>
          <li>Worked with design/marketing to reflect business goals</li>
        </ul>
      </>
    ),
    technologies: ["Gatsby", "GraphQL", "Tailwind CSS"],
  },
  {
    id: 4,
    title: "Neiv – Discovery Platform for AEC Industry",
    subtitle: "A platform to discover professionals and firms in architecture and construction",
    image: Neiv,
    description: (
      <>
        <p>
          A responsive POC platform enabling discovery and connection across the AEC industry.
        </p>
        <ul className="list-disc pl-10">
          <li><b>Developed full stack</b> using React.js and Node.js</li>
          <li><b>Designed schema</b> and APIs for profiles and webspaces</li>
          <li>Focused on <b>low technical debt</b> and testable code</li>
        </ul>
      </>
    ),
    technologies: ["React.js", "Node.js", "Express", "MySQL"],
  },
  {
    id: 5,
    title: "SetPro Web & Mobile App",
    subtitle: "Payroll and compliance platform for the entertainment industry",
    image: Setpro,
    description: (
      <>
        <p>
          A platform built to streamline crew onboarding, payroll, and compliance for film/TV productions.
        </p>
        <ul className="list-disc pl-10">
          <li>Created responsive UI with <b>React.js</b></li>
          <li>Built REST APIs to manage subscriptions and access control</li>
          <li><b>Implemented onboarding flows</b> and role-based access</li>
          <li><b>Automated admin workflows</b> to increase efficiency</li>
        </ul>
      </>
    ),
    technologies: ["React.js", "Node.js", "Express", "MySQL"],
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-section");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("appear");
              }, index * 150);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setActiveProject(null);
      }
    };

    if (activeProject) {
      document.body.classList.add('overflow-hidden')
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeProject]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding bg-secondary/30"
    >
      <div className="container mx-auto">
        <h2 className="section-heading fade-in-section">Professional Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="fade-in-section group"
              onClick={() => setActiveProject(project)}
            >
              <div className="bg-secondary/50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full lg:object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 line-clamp-1">{project.title}</h3>
                  <p className="text-primary font-medium mb-3 line-clamp-1">
                    {project.subtitle}
                  </p>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-primary/50 text-muted-foreground rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <button className="text-primary font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {activeProject && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="bg-card rounded-lg shadow-2xl max-w-3xl w-full max-h-[90svh] overflow-y-auto animate-scale-in"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full md:object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{activeProject.title}</h3>
                    <p className="text-primary font-medium">
                      {activeProject.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="text-foreground/50 hover:text-foreground"
                    aria-label="Close"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-foreground/80 mb-6">
                  {activeProject.description}
                </p>
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, idx) => (
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
