export const DOM_PROPERTY = {
  TEXT_CONTENT: "textContent",
  TITLE: "title",
  PLACEHOLDER: "placeholder",
  ALT: "alt",
  VALUE: "value",
  SRC: "src"
};

export function setDomElementValue(htmlElementId, value, domProperty = DOM_PROPERTY.TEXT_CONTENT) {
  const element = document.getElementById(htmlElementId);

  if (!element) {
    console.warn(`DOM element not found: ${htmlElementId}`);
    return false;
  }

  element[domProperty] = value;
  return true;
}
