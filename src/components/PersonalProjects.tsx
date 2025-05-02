
import { ReactNode, useEffect, useRef, useState } from "react";
import SmartRetriever from '../../public/smart-retriever.png'
import DiskScheduling from '../../public/disk-scheduling.png'
import TacklingRoadDepression from '../../public/tackling-road-depression.png'
import CollisionControl from '../../public/collision-control.png'

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
    title: "Real-Time Collision Detection and Traffic Congestion Control",
    subtitle: "Autonomous vehicle network solution for real-time incident response and route optimization",
    image: CollisionControl,
    description: (
      <>
        <p>
          Designed and implemented a system to detect collisions in real-time and dynamically control traffic routing.
        </p>
        <ul className="list-disc pl-10">
          <li>Trained a <b>computer vision model</b> to detect vehicle collisions from video streams</li>
          <li>Created <b>route recalculation logic</b> to optimize traffic flow during congestion</li>
          <li>Simulated <b>real-time distributed response</b> across vehicular networks</li>
        </ul>
      </>
    ),
    technologies: ["C++", "ML", "Computer Vision", "Autonomous Vehicles", "Communication Protocols", "Smart Transportation"],
  },
  {
    id: 2,
    title: "Tackling Unexpected Road Depression",
    subtitle: "Embedded system to detect road anomalies and alert control units and nearby vehicles in real-time",
    image: TacklingRoadDepression,
    description: (
      <>
        <p>
          Built a sensor-integrated system to detect road depressions and enhance driver safety in smart mobility scenarios.
        </p>
        <ul className="list-disc pl-10">
          <li>Integrated <b>gyro sensor</b> with <b>Arduino Uno</b> to capture road anomalies</li>
          <li>Configured <b>ESP8266 Wi-Fi module</b> for wireless data transmission</li>
          <li>Developed <b>control logic</b> to trigger vehicle warnings upon detection</li>
          <li>Promoted road safety through <b>real-time feedback</b> and alerts</li>
        </ul>
      </>
    ),
    technologies: ["Arduino Uno", "ESP8266", "C++", "Gyroscope Sensors", "Embedded C", "IoT"],
  },
  {
    id: 3,
    title: "Disk Scheduling Algorithm Visualizer",
    subtitle: "Interactive tool to simulate disk scheduling algorithms for educational use",
    image: DiskScheduling,
    description: (
      <>
        <p>
          Developed a visual simulator to demonstrate and compare multiple disk scheduling strategies.
        </p>
        <ul className="list-disc pl-10">
          <li>Implemented key algorithms like <b>FCFS</b>, <b>SSTF</b>, <b>SCAN</b>, <b>C-SCAN</b>, <b>LOOK</b>, and <b>C-LOOK</b></li>
          <li>Built an <b>intuitive UI</b> for disk queue input and head movement visualization</li>
          <li>Displayed <b>seek time metrics</b> to illustrate performance trade-offs</li>
          <li>Enhanced understanding of <b>OS-level scheduling</b> through interaction</li>
        </ul>
      </>
    ),
    technologies: ["JavaScript", "HTML", "CSS", "Data Structures", "Operating System Concepts", "Operating Systems", "Algorithms"],
  },
  {
    id: 4,
    title: "Smart Retriever",
    subtitle: "Custom Q&A platform with document/web ingestion and LLM-powered retrieval",
    image: SmartRetriever,
    description: (
      <>
        <p>
          Built an application that allows users to query their own documents or web links using local language models powered by LangChain and Ollama.
        </p>
        <ul className="list-disc pl-10">
          <li>Integrated LangChain's <b>RetrievalQA</b> with <b>FAISS</b> for semantic search</li>
          <li>Used <b>UnstructuredURLLoader</b> and <b>TextLoader</b> to support training from URLs or plain text files</li>
          <li>Stored and reused <b>custom embeddings</b> using local model inference and <b>pickle</b></li>
          <li>Built an interactive Q&A interface using <b>Streamlit</b></li>
          <li>Served models like <code>moondream</code> using <b>Ollama</b> for fast local inference</li>
          <li>Applied LangChain's core concepts like <b>prompt templates</b>, <b>memory</b>, and <b>chains</b></li>
        </ul>
      </>
    ),
    technologies: ["Python", "LangChain", "Ollama", "FAISS", "Streamlit", "LLMs", "RetrievalQA", "Embeddings", "Pickle"],
  }
];

export default function PersonalProjects() {
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
      className="section-padding bg-background"
    >
      <div className="container mx-auto">
        <h2 className="section-heading fade-in-section">Personal Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="fade-in-section group"
              onClick={() => setActiveProject(project)}
            >
              <div className="bg-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2">
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
