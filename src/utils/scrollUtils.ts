
export const handleScrollToSection = (
  sectionId: string,
  e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  if (e) {
    e.preventDefault();
  }

  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Account for fixed header
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
};

export const isElementInView = (
  el: HTMLElement, 
  partiallyVisible = false
): boolean => {
  const { top, bottom, height } = el.getBoundingClientRect();
  const { innerHeight } = window;
  
  return partiallyVisible 
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) 
    : top >= 0 && bottom <= innerHeight;
};
