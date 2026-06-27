import list from "./pages.json";

// Keyed by slug for O(1) route lookup in Page.js
const pages = list.reduce((acc, page) => {
  acc[page.slug] = page;
  return acc;
}, {});

export default pages;
