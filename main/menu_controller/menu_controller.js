/**
 * @name Menu Controller
 * @author Relictum
 * @description Adds a Full Focus Mode and controls sidebar visibility.
 * @version 1.0.0
 */

// 1. Register a "Full Focus Mode" page
const pageContent = `
    <div style="text-align: center; margin-top: 50px;">
        <h1>Full Focus Mode</h1>
        <p>The sidebar menu is hidden for an immersive experience.</p>
        <button id="toggle-menu-btn" style="
            padding: 10px 20px; 
            background: #ef4444; 
            border: none; 
            color: white; 
            cursor: pointer; 
            margin-top: 20px;
            font-size: 16px;
            border-radius: 4px;
        ">
            Toggle Menu
        </button>
    </div>
`;

RelictumAPI.registerPage('focus-mode', pageContent);

// 2. Add logic to the page button
// Note: This only works if the page is currently rendered. 
// Better approach for React apps is usually event delegation, but this is a simple injection.
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'toggle-menu-btn') {
        const current = RelictumAPI.getSidebarVisible();
        RelictumAPI.setSidebarVisible(!current);
    }
});

// 3. Add a Game Button to toggle menu (visible in Game Details)
RelictumAPI.addGameButton('Toggle Sidebar', () => {
    const current = RelictumAPI.getSidebarVisible();
    RelictumAPI.setSidebarVisible(!current);
});

// 4. Add a Menu Item to go to Focus Mode
RelictumAPI.addMenuItem('Focus Mode', 'focus-mode');

// 5. Auto-hide menu on load
RelictumAPI.setStartPage('plugin:focus-mode', null);
RelictumAPI.setSidebarVisible(false);

// Force navigation to the focus mode page
RelictumAPI.showPage('plugin:focus-mode', null);

console.log("[Menu Controller] Plugin Loaded");
