/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
    * Define Global Variables
    * 
*/

const topOffset = 500;
let currentSection,
  currentSectionId = "",
  sections = [];

/**
    * End Global Variables
    * Start Helper Functions
    * 
*/

function getSectionOffset(sectionId) {
  return document.getElementById(sectionId).offsetTop;
}

function getSections() {
  return document.querySelectorAll("section");
}

// Returns a navigation item to be included in the nav
function makeNavItem(navItem) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("class", "menu__link");
  a.setAttribute("href", `#${navItem.getAttribute("id")}`);
  a.textContent = navItem.getAttribute("data-nav");
  li.appendChild(a);
  return li;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav

function buildNavigation() {
  const navList = document.getElementById("navbar__list");
  const sections = getSections();
  for (let id of sections) {
    navList.appendChild(makeNavItem(id));
  }
}


function makeSectionActive(sectionId) {
  const section = document.getElementById(sectionId);

  currentSection.classList.remove("active");
  document
    .querySelector(`a[href="#${currentSectionId}"]`)
    .classList.remove("active");

  section.classList.add("active");
  document.querySelector(`a[href="#${sectionId}"]`).classList.add("active");
  setCurrentSection(sectionId, section);
}


// Set the current section
function setCurrentSection(sectionId, section = null) {
  currentSection =
    section == null ? document.getElementById(sectionId) : section;
  currentSectionId = sectionId;
}

/*
 * Initialize global parameters
*/

function init() {
  let allSections = getSections();

  if (allSections.length != 0) {
    for (let section of allSections) {
      sections.push(section.getBoundingClientRect().top + window.scrollY);
    }
    setCurrentSection(allSections[0].id);

    makeSectionActive(currentSectionId);
  }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener("DOMContentLoaded", function () {
  buildNavigation();
  init();

  window.onscroll = function () {
    let i;
    for (let sectionIndex in sections) {
      if (sections[sectionIndex] - topOffset <= window.scrollY) {
        i = sectionIndex;
      }
    }
    for (let sec_i in sections) {
      let sec_i_int = parseInt(sec_i) + 1;
      if (sec_i == i) {
        makeSectionActive(`section${sec_i_int}`);
        setCurrentSection(`section${sec_i_int}`);
      }
    }
  };
});
