/**
 * @name Custom Game Manager
 * @author Relictum
 * @description Manage multiple game clients.
 */

const STORAGE_KEY = 'plugin_custom_games_list';
const PATHS_KEY = 'warmane_game_paths';

// Helper to get stored games
function getStoredGames() {
    try {
        const stored = RelictumAPI.storage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to parse stored games:", e);
        return [];
    }
}

// Helper to save games
function saveStoredGames(games) {
    RelictumAPI.storage.setItem(STORAGE_KEY, JSON.stringify(games));
}

// Helper to update game path
function updateGamePath(id, path) {
    try {
        const stored = RelictumAPI.storage.getItem(PATHS_KEY);
        const paths = stored ? JSON.parse(stored) : {};
        if (path) {
            paths[id] = path;
        } else {
            delete paths[id];
        }
        RelictumAPI.storage.setItem(PATHS_KEY, JSON.stringify(paths));
    } catch (e) {
        console.error("Failed to update game paths", e);
    }
}

// Initialize: Register all stored games on startup
const storedGames = getStoredGames();
storedGames.forEach(game => {
    RelictumAPI.addGame(game);
});

// UI State
let isAdding = false;
let newGameData = { name: '', version: '3.3.5', path: '' };

// Render Function
function render() {
    const games = getStoredGames();
    
    let html = `
        <div style="padding: 40px; max-width: 800px; margin: 0 auto; color: #fff; font-family: 'Segoe UI', sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Custom Game Clients</h1>
                <button id="cgm-add-btn" style="
                    background: #3b82f6; 
                    color: white; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 6px; 
                    cursor: pointer;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: background 0.2s;
                ">
                    + Add New Client
                </button>
            </div>

            ${isAdding ? renderForm() : ''}

            <div style="background: rgba(30, 30, 30, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; overflow: hidden;">
                ${games.length === 0 ? `
                    <div style="padding: 40px; text-align: center; color: #888;">
                        No custom clients added yet. Click the button above to add one.
                    </div>
                ` : `
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: rgba(0, 0, 0, 0.2); text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <th style="padding: 15px; font-weight: 600; color: #ccc;">Name</th>
                                <th style="padding: 15px; font-weight: 600; color: #ccc;">Version</th>
                                <th style="padding: 15px; font-weight: 600; color: #ccc;">Path</th>
                                <th style="padding: 15px; text-align: right; font-weight: 600; color: #ccc;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${games.map(game => {
                                const path = RelictumAPI.getGamePath(game.id) || 'Not set';
                                return `
                                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                        <td style="padding: 15px; font-weight: 500;">${game.name}</td>
                                        <td style="padding: 15px;">
                                            <span style="
                                                background: rgba(255, 255, 255, 0.1); 
                                                padding: 4px 8px; 
                                                border-radius: 4px; 
                                                font-size: 12px;
                                                color: #ddd;
                                            ">${game.version}</span>
                                        </td>
                                        <td style="padding: 15px; color: #888; font-size: 13px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${path}">
                                            ${path}
                                        </td>
                                        <td style="padding: 15px; text-align: right;">
                                            <button 
                                                class="cgm-delete-btn" 
                                                data-id="${game.id}"
                                                style="
                                                    background: transparent; 
                                                    border: 1px solid #ef4444; 
                                                    color: #ef4444; 
                                                    padding: 6px 12px; 
                                                    border-radius: 4px; 
                                                    cursor: pointer;
                                                    font-size: 12px;
                                                    transition: all 0.2s;
                                                "
                                            >Remove</button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                `}
            </div>
        </div>
    `;

    RelictumAPI.registerPage('custom-game-manager', html);
}

function renderForm() {
    return `
        <div style="
            background: rgba(30, 30, 30, 0.95); 
            border: 1px solid #444; 
            border-radius: 8px; 
            padding: 20px; 
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        ">
            <h3 style="margin-top: 0; margin-bottom: 20px; font-weight: 500;">Add Client</h3>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #ccc;">Name</label>
                <input id="cgm-new-name" type="text" value="${newGameData.name}" style="
                    width: 100%; 
                    padding: 10px 12px; 
                    background: #1a1a1a; 
                    border: 1px solid #333; 
                    color: white; 
                    border-radius: 6px;
                    outline: none;
                " placeholder="e.g. Warmane Icecrown">
            </div>

            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #ccc;">Expansion</label>
                    <select id="cgm-new-version" style="
                        width: 100%; 
                        padding: 10px 12px; 
                        background: #1a1a1a; 
                        border: 1px solid #333; 
                        color: white; 
                        border-radius: 6px;
                        outline: none;
                    ">
                        <option value="3.3.5" ${newGameData.version === '3.3.5' ? 'selected' : ''}>WotLK (3.3.5)</option>
                        <option value="2.4.3" ${newGameData.version === '2.4.3' ? 'selected' : ''}>TBC (2.4.3)</option>
                        <option value="1.12.1" ${newGameData.version === '1.12.1' ? 'selected' : ''}>Vanilla (1.12.1)</option>
                        <option value="4.3.4" ${newGameData.version === '4.3.4' ? 'selected' : ''}>Cataclysm (4.3.4)</option>
                        <option value="5.4.8" ${newGameData.version === '5.4.8' ? 'selected' : ''}>MoP (5.4.8)</option>
                        <option value="Custom" ${newGameData.version === 'Custom' ? 'selected' : ''}>Other / Custom</option>
                    </select>
                </div>
                
                <div style="flex: 2;">
                    <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #ccc;">Game Folder Path</label>
                    <div style="display: flex; gap: 10px;">
                        <input id="cgm-new-path" type="text" value="${newGameData.path}" readonly style="
                            flex: 1; 
                            padding: 10px 12px; 
                            background: #1a1a1a; 
                            border: 1px solid #333; 
                            color: #888; 
                            border-radius: 6px;
                            outline: none;
                        " placeholder="Select folder...">
                        <button id="cgm-browse-btn" style="
                            padding: 10px 15px; 
                            background: #444; 
                            color: white; 
                            border: none; 
                            border-radius: 6px; 
                            cursor: pointer;
                            white-space: nowrap;
                        ">Browse...</button>
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid #333; padding-top: 20px;">
                <button id="cgm-cancel-btn" style="
                    padding: 8px 16px; 
                    background: transparent; 
                    color: #aaa; 
                    border: 1px solid #444; 
                    border-radius: 6px; 
                    cursor: pointer;
                ">Cancel</button>
                <button id="cgm-save-btn" style="
                    padding: 8px 16px; 
                    background: #10b981; 
                    color: white; 
                    border: none; 
                    border-radius: 6px; 
                    cursor: pointer;
                    font-weight: 500;
                ">Save Client</button>
            </div>
        </div>
    `;
}

// Handler Functions
const clickHandler = async (e) => {
    // Add Button
    if (e.target.id === 'cgm-add-btn') {
        isAdding = true;
        render();
        setTimeout(() => {
            const el = document.getElementById('cgm-new-name');
            if (el) el.focus();
        }, 50);
    }

    // Cancel Button
    if (e.target.id === 'cgm-cancel-btn') {
        isAdding = false;
        newGameData = { name: '', version: '3.3.5', path: '' };
        render();
    }

    // Browse Button
    if (e.target.id === 'cgm-browse-btn') {
        const path = await RelictumAPI.selectFolder();
        if (path) {
            newGameData.path = path;
            const input = document.getElementById('cgm-new-path');
            if (input) input.value = path;
        }
    }

    // Save Button
    if (e.target.id === 'cgm-save-btn') {
        const nameInput = document.getElementById('cgm-new-name');
        const versionInput = document.getElementById('cgm-new-version');
        const pathInput = document.getElementById('cgm-new-path');

        const name = nameInput ? nameInput.value : '';
        const version = versionInput ? versionInput.value : '3.3.5';
        const path = pathInput ? pathInput.value : '';

        if (!name || !path) {
            RelictumAPI.toast('Please enter a name and select a path.');
            return;
        }

        const id = `custom-${Date.now()}`;
        
        const newGame = {
            id,
            name,
            version,
        };

        RelictumAPI.addGame(newGame);
        updateGamePath(id, path);

        const games = getStoredGames();
        games.push(newGame);
        saveStoredGames(games);

        isAdding = false;
        newGameData = { name: '', version: '3.3.5', path: '' };
        render();
        RelictumAPI.toast('Client added successfully!');
    }

    // Delete Button
    if (e.target.classList.contains('cgm-delete-btn')) {
        const id = e.target.getAttribute('data-id');
        if (confirm('Are you sure you want to remove this client?')) {
            RelictumAPI.removeGame(id);
            updateGamePath(id, null);

            let games = getStoredGames();
            games = games.filter(g => g.id !== id);
            saveStoredGames(games);

            render();
            RelictumAPI.toast('Client removed.');
        }
    }
};

const inputHandler = (e) => {
    if (e.target.id === 'cgm-new-name') newGameData.name = e.target.value;
    if (e.target.id === 'cgm-new-version') newGameData.version = e.target.value;
};

// Register Listeners
document.addEventListener('click', clickHandler);
document.addEventListener('input', inputHandler);

// Cleanup
RelictumAPI.onCleanup(() => {
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('input', inputHandler);
    RelictumAPI.removeMenuItem('Manage Custom Games');
});

// Initial Render
render();

// Add Menu Item
RelictumAPI.addMenuItem('Manage Custom Games', 'plugin:custom-game-manager');

console.log("[Custom Game Manager] Loaded");
