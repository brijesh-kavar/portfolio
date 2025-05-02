
import { useEffect, useState, RefObject } from "react";

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = { threshold: 0.1, rootMargin: "0px" }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin,
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, options.threshold, options.rootMargin]);

  return isIntersecting;
}

export function useAnimateOnScroll(
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = { threshold: 0.1, rootMargin: "0px" }
) {
  const isIntersecting = useIntersectionObserver(ref, options);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isIntersecting, hasAnimated]);

  return hasAnimated;
}
