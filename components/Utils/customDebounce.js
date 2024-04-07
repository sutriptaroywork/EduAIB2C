// customDebounce.js
// coded by yaseen and durgesh
const customDebounce = (func, delay) => {
    let timeoutId;
  
    return function (...args) {
      const context = this;
  
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
  
  export default customDebounce;
  