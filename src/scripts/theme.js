export function initThemeObserver(elementId) {
  const element = document.getElementById(elementId);
  const html = document.documentElement;

  if (!element) return;

  function updateElement() {
    const currentTheme = html.getAttribute("data-theme") || "light";
    
    if (currentTheme === "dark") {
      const darkSrc = element.getAttribute("data-dark-src");
      if (darkSrc) {
        element.src = darkSrc;
      }
    } else {
      const lightSrc = element.getAttribute("data-light-src");
      if (lightSrc) {
        element.src = lightSrc;
      }
    }
  }

  updateElement();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        updateElement();
      }
    });
  });

  observer.observe(html, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

export function initializeThemeElements() {
  const themeElements = document.querySelectorAll("[data-theme-element]");
  
  themeElements.forEach((element) => {
    if (element.id) {
      initThemeObserver(element.id);
    }
  });
}

export function initializeOnReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}