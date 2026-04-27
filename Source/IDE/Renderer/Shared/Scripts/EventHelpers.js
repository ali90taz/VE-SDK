export const EVENT = {
  MOUSE: {
    CLICK: 'click',
    OVER: 'mouseover',
    OUT: 'mouseout'
  },
  WINDOW: {
    RESIZE: 'resize',
    FOCUS: 'focus'
  }
}

export function addElementEvent(htmlElementId, eventId, callbackFunction) {
  var a;
  (a = document.getElementById(htmlElementId)) === null ||
   a === void 0 ? void 0 : a.addEventListener(eventId, callbackFunction);  
}

export function addWindowEvent(eventId, callbackFuntion) {
  window.addEventListener(eventId, callbackFuntion);
}