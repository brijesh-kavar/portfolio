
import { useIsMobile } from "@/hooks/use-mobile";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();

  return (
    <footer className={`py-8 px-4 bg-card text-foreground/70 ${isMobile ? 'pb-24' : ''}`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} Brijesh Kavar. All rights reserved.
            </p>
          </div>

          <SocialLinks className="mb-4 md:mb-0" />

          <p className="text-xs">
            Designed and built with passion & precision
          </p>
        </div>
      </div>
    </footer>
  );
}
