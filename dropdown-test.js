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
    
    // Add test click handler to each submenu toggle
    document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach((toggle, index) => {
        console.log(`Adding test click handler to submenu toggle ${index + 1}`);
        
        toggle.addEventListener('click', function(e) {
            console.log(`Clicked on submenu toggle: ${this.textContent.trim()}`);
            console.log(`  - Next element has show class: ${this.nextElementSibling?.classList.contains('show')}`);
            console.log(`  - aria-expanded attribute: ${this.getAttribute('aria-expanded')}`);
        });
    });
});