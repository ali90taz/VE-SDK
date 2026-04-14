export function getOffset(ElementId) {
  const element = document.getElementById(ElementId);
  const rect = element.getBoundingClientRect(); 
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

export function getWindowInnerWidth() {
  return window.innerWidth;
}

export function getWindowInnerHeight() {
  return window.innerHeight;
}