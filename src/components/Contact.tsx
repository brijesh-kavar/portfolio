
import { useState, useRef, useEffect } from "react";
import emailjs from 'emailjs-com';
import { useToast } from "@/hooks/use-toast";
import SocialLinks from "./SocialLinks";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY
      if (!(serviceId && templateId && publicKey)) {
        alert("Email credentials missing!")
        return 
      }

      setIsSubmitting(true);

      await emailjs.send(
        serviceId,
        templateId,
        { ...formData, title: "Sent from contact section" },
        publicKey,
      )
      setFormData({ name: "", email: "", message: "" });
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    } catch(error: any) {
      console.error(error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-secondary/30 relative"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[30%] right-[15%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="section-heading fade-in-section">Get In Touch</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="fade-in-section">
            <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
            <p className="mb-6 text-foreground/70">
              Whether you have a question, project idea, or just want to say hello, feel free to reach out!
            </p>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Email</p>
                  <a
                    href="mailto:brijkavar2021@gmail.com"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    brijkavar2021@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Location</p>
                  <p className="text-foreground">Ahmedabad, Gujarat</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-3">Follow me on</h4>
              <SocialLinks />
            </div>
          </div>

          <div className="fade-in-section">
            <form
              onSubmit={handleSubmit}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground/80 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  maxLength={100}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-secondary text-foreground border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground/80 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  maxLength={100}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-secondary text-foreground border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground/80 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  maxLength={5000}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-secondary text-foreground border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary text-white rounded-md font-medium 
                       hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 
                       disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
