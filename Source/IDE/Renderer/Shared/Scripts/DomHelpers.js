export const DOM_ELEMENT = {
  PLACEHOLDER: "placeholder"
}

export function setDomElementValue(HtmlElementId, Value, DomElement) {
  var A;
  A = document.getElementById(HtmlElementId);
  if (DomElement) A[`${DomElement}`] = Value;
  else A.innerHTML = Value;
}
