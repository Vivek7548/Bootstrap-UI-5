// This is a test script to verify dropdown functionality
console.log('Dropdown test script loaded');

// Function to test if dropdown submenus are working
function testDropdownSubmenus() {
    console.log('Testing dropdown submenus...');
    
    // Get all dropdown submenu toggles
    const submenuToggles = document.querySelectorAll('.dropdown-submenu .dropdown-toggle');
    console.log(`Found ${submenuToggles.length} submenu toggles`);
    
    // Log each submenu toggle
    submenuToggles.forEach((toggle, index) => {
        console.log(`Submenu toggle ${index + 1}: ${toggle.textContent.trim()}`);
        
        // Check if the toggle has a dropdown menu
        const menu = toggle.nextElementSibling;
        if (menu && menu.classList.contains('dropdown-menu')) {
            console.log(`  - Has dropdown menu with ${menu.querySelectorAll('.dropdown-item').length} items`);
        } else {
            console.log('  - No dropdown menu found');
        }
    });
}

// Run the test when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, running dropdown tests...');
    testDropdownSubmenus();
    
    // Handle nested dropdowns
    const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
    
    dropdownSubmenus.forEach(function(submenu) {
        const toggle = submenu.querySelector('.dropdown-toggle');
        const menu = submenu.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Add click event to toggle dropdown
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other open submenus
                dropdownSubmenus.forEach(function(otherSubmenu) {
                    if (otherSubmenu !== submenu) {
                        const otherMenu = otherSubmenu.querySelector('.dropdown-menu');
                        const otherToggle = otherSubmenu.querySelector('.dropdown-toggle');
                        if (otherMenu && otherMenu.classList.contains('show')) {
                            otherMenu.classList.remove('show');
                            otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Toggle the show class on the submenu
                menu.classList.toggle('show');
                
                // Set aria-expanded attribute for accessibility
                toggle.setAttribute('aria-expanded', menu.classList.contains('show'));
            });
        }
    });
    
    // Close all submenus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-submenu')) {
            dropdownSubmenus.forEach(function(submenu) {
                const menu = submenu.querySelector('.dropdown-menu');
                const toggle = submenu.querySelector('.dropdown-toggle');
                if (menu && menu.classList.contains('show')) {
                    menu.classList.remove('show');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
    
    // Prevent main dropdown from closing when clicking on submenu items
    document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
        menu.addEventListener('click', function(e) {
            if (e.target.closest('.dropdown-item') && !e.target.closest('.dropdown-toggle')) {
                e.stopPropagation();
            }
        });
    });
});