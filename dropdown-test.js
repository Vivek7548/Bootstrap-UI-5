// This is a test script to verify dropdown functionality
console.log("Dropdown test script loaded");

// Function to test if dropdown submenus are working
function testDropdownSubmenus() {
  console.log("Testing dropdown submenus...");

  // Get all dropdown submenu toggles
  const submenuToggles = document.querySelectorAll(
    ".dropdown-submenu .dropdown-toggle"
  );
  console.log(`Found ${submenuToggles.length} submenu toggles`);

  // Log each submenu toggle
  submenuToggles.forEach((toggle, index) => {
    console.log(`Submenu toggle ${index + 1}: ${toggle.textContent.trim()}`);

    // Check if the toggle has a dropdown menu
    const menu = toggle.nextElementSibling;
    if (menu && menu.classList.contains("dropdown-menu")) {
      console.log(
        `  - Has dropdown menu with ${
          menu.querySelectorAll(".dropdown-item").length
        } items`
      );
    } else {
      console.log("  - No dropdown menu found");
    }
  });
}

// Run the test when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, running dropdown tests...");
  testDropdownSubmenus();

  // Close navbar when clicking outside on mobile
  document.addEventListener("click", function (event) {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    const toggler = document.querySelector(".navbar-toggler");

    // Check if the navbar is currently open and the click is outside
    if (
      navbarCollapse &&
      toggler &&
      navbarCollapse.classList.contains("show") &&
      !navbarCollapse.contains(event.target) &&
      !toggler.contains(event.target)
    ) {
      toggler.click(); // Simulate a click on the toggler to close the navbar
    }
  });

  // Handle active navbar links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const sections = document.querySelectorAll("section[id]");

  function setActiveLink() {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Set active link on scroll
  window.addEventListener("scroll", setActiveLink);

  // Set active link on click
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only handle links that point to sections
      if (this.getAttribute("href").startsWith("#")) {
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Handle nested dropdowns
  const dropdownSubmenus = document.querySelectorAll(".dropdown-submenu");

  dropdownSubmenus.forEach(function (submenu) {
    const toggle = submenu.querySelector(".dropdown-toggle");
    const menu = submenu.querySelector(".dropdown-menu");

    if (toggle && menu) {
      // Add click event to toggle dropdown
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Close other open submenus
        dropdownSubmenus.forEach(function (otherSubmenu) {
          if (otherSubmenu !== submenu) {
            const otherMenu = otherSubmenu.querySelector(".dropdown-menu");
            const otherToggle = otherSubmenu.querySelector(".dropdown-toggle");
            if (otherMenu && otherMenu.classList.contains("show")) {
              otherMenu.classList.remove("show");
              otherToggle.setAttribute("aria-expanded", "false");
            }
          }
        });

        // Toggle the show class on the submenu
        menu.classList.toggle("show");

        // Set aria-expanded attribute for accessibility
        toggle.setAttribute("aria-expanded", menu.classList.contains("show"));
      });
    }
  });

  // Close all submenus when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown-submenu")) {
      dropdownSubmenus.forEach(function (submenu) {
        const menu = submenu.querySelector(".dropdown-menu");
        const toggle = submenu.querySelector(".dropdown-toggle");
        if (menu && menu.classList.contains("show")) {
          menu.classList.remove("show");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  });

  // Prevent main dropdown from closing when clicking on submenu items
  document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
    menu.addEventListener("click", function (e) {
      if (
        e.target.closest(".dropdown-item") &&
        !e.target.closest(".dropdown-toggle")
      ) {
        e.stopPropagation();
      }
    });
  });
});
