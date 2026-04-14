export function setCssVariable(CssVariable, Value) {
  const root = document.documentElement;
  root.style.setProperty(CssVariable, Value);
}

export function getCssVariable(CssVariable) {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  return style.getPropertyValue(CssVariable);
}