
import { Github, Linkedin } from "lucide-react";

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <a
        href="https://github.com/brijesh-kavar"
        target="_blank"
        rel="noopener noreferrer"
        className="text-background/70 hover:text-primary transition-colors hover:scale-110 transform duration-200"
        aria-label="GitHub"
      >
        <div className="p-2 bg-foreground rounded-full hover:bg-primary/10 transition-colors">
          <Github size={18} />
        </div>
      </a>
      <a
        href="https://www.linkedin.com/in/brijesh-kavar"
        target="_blank"
        rel="noopener noreferrer"
        className="text-background/70 hover:text-primary transition-colors hover:scale-110 transform duration-200"
        aria-label="LinkedIn"
      >
        <div className="p-2 bg-foreground rounded-full hover:bg-primary/10 transition-colors">
          <Linkedin size={18} />
        </div>
      </a>
    </div>
  );
}
