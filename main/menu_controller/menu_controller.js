/**
 * @name Menu Controller
 * @author Relictum
 * @description Restyles the sidebar to a cleaner look when enabled.
 * @version 2.0.0
 */

(function() {
    const STYLE_ID = 'menu-controller-style';
    const ACTIVE_CLASS = 'menu-clean-active';

    const css = `
    #app-sidebar {
        background: linear-gradient(180deg, rgba(24, 32, 41, 0.95) 0%, rgba(28, 38, 49, 0.95) 100%) !important;
        backdrop-filter: blur(16px) !important;
        border-right: 1px solid rgba(255,255,255,0.06) !important;
    }
    #app-sidebar .navItem {
        background: transparent !important;
        border: 1px solid transparent !important;
        border-radius: 10px !important;
        padding: 10px 14px !important;
        color: rgba(225,225,225,0.88) !important;
        transition: background .15s ease, color .15s ease !important;
    }
    #app-sidebar .navItem:hover {
        background: rgba(255,255,255,0.06) !important;
        color: #fff !important;
        border-color: rgba(255,255,255,0.08) !important;
    }
    #app-sidebar .navItem.${ACTIVE_CLASS} {
        background: linear-gradient(90deg, rgba(60,125,194,0.40) 0%, rgba(60,125,194,0.25) 100%) !important;
        color: #fff !important;
        border-color: rgba(60,125,194,0.35) !important;
        box-shadow: inset 0 0 0 1px rgba(60,125,194,0.15) !important;
    }

    .titleBar {
        background: linear-gradient(180deg, rgba(24, 32, 41, 0.92) 0%, rgba(24, 32, 41, 0.88) 100%) !important;
        border-bottom: 1px solid rgba(255,255,255,0.06) !important;
        backdrop-filter: blur(10px) !important;
    }
    .windowControls .controlBtn, .rightControls .controlBtn {
        border-radius: 6px !important;
        margin-left: 4px !important;
        border: 1px solid transparent !important;
    }
    .controlBtn:hover {
        background: rgba(255,255,255,0.08) !important;
        color: #fff !important;
        border-color: rgba(255,255,255,0.06) !important;
    }
    .controlBtn.close:hover {
        background: #e11d48 !important;
        color: #fff !important;
        box-shadow: 0 0 15px rgba(225, 29, 72, 0.35) !important;
        border-color: rgba(225, 29, 72, 0.4) !important;
    }

    [class*="addonsView"] {
        background: rgba(24, 32, 41, 0.75) !important;
        backdrop-filter: blur(14px) !important;
        border: 1px solid rgba(255,255,255,0.06) !important;
        border-radius: 10px !important;
    }
    [class*="settingsView"] {
        background: rgba(24, 32, 41, 0.75) !important;
        backdrop-filter: blur(14px) !important;
        border: 1px solid rgba(255,255,255,0.06) !important;
        border-radius: 10px !important;
        padding: 20px !important;
    }
    [class*="settingsSection"] {
        background: rgba(0, 0, 0, 0.25) !important;
        border-color: rgba(255,255,255,0.06) !important;
    }
    [class*="viewHeader"] {
        border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
    }
    [class*="addonsListContainer"] {
        padding-right: 8px !important;
    }
    [class*="addonRow"] {
        background: rgba(255, 255, 255, 0.04) !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        border-radius: 8px !important;
    }
    [class*="addonRow"]:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        transform: translateX(2px) !important;
    }
    [class*="searchInput"] {
        background: rgba(0, 0, 0, 0.35) !important;
        border-color: rgba(255, 255, 255, 0.14) !important;
        color: #e5e7eb !important;
        border-radius: 6px !important;
    }
    [class*="sortDropdownTrigger"], [class*="versionOptions"] {
        background: rgba(0, 0, 0, 0.35) !important;
        border-color: rgba(255, 255, 255, 0.14) !important;
        border-radius: 6px !important;
        color: #e5e7eb !important;
    }
    [class*="sortDropdownMenu"] {
        background: #182029 !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        border-radius: 8px !important;
    }
    [class*="sortOption"] {
        color: #c7cacf !important;
    }
    [class*="sortOption"]:hover {
        background: rgba(255,255,255,0.08) !important;
        color: #fff !important;
    }
    [class*="versionBadge"] {
        background: rgba(255, 255, 255, 0.10) !important;
        color: #c7cacf !important;
        border-radius: 6px !important;
    }
    [class*="addonIconPlaceholder"] {
        background: rgba(255, 255, 255, 0.06) !important;
        color: rgba(255, 255, 255, 0.25) !important;
    }
    [class*="addonModulesBadge"] {
        background: rgba(59, 130, 246, 0.12) !important;
        color: #93c5fd !important;
        border-radius: 10px !important;
    }

    [class*="viewBtnSmall"] {
        background: rgba(255, 255, 255, 0.06) !important;
        color: #c7cacf !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-radius: 6px !important;
    }
    [class*="viewBtnSmall"]:hover {
        background: rgba(255, 255, 255, 0.10) !important;
        color: #fff !important;
        border-color: rgba(255,255,255,0.14) !important;
    }
    [class*="deleteBtnSmall"] {
        background: rgba(225, 29, 72, 0.12) !important;
        color: #fb7185 !important;
        border: 1px solid rgba(225, 29, 72, 0.25) !important;
        border-radius: 6px !important;
    }
    [class*="deleteBtnSmall"]:hover {
        background: rgba(225, 29, 72, 0.20) !important;
        border-color: rgba(225, 29, 72, 0.35) !important;
    }
    [class*="installBtnSmall"] {
        background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%) !important;
        color: #0b1220 !important;
        border-radius: 6px !important;
        border: 1px solid rgba(59, 130, 246, 0.5) !important;
    }
    [class*="installBtnSmall"]:hover:not(:disabled) {
        filter: brightness(1.03) !important;
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25) !important;
    }
    [class*="installBtnSmall"].installed {
        background: rgba(34, 197, 94, 0.15) !important;
        color: #4ade80 !important;
        border-color: rgba(34, 197, 94, 0.35) !important;
    }

    [class*="iconBtnLarge"] {
        border-radius: 8px !important;
        background: rgba(59, 130, 246, 0.10) !important;
        border: 1px solid rgba(59, 130, 246, 0.30) !important;
        color: #93c5fd !important;
    }
    [class*="iconBtnLarge"]:hover {
        background: rgba(59, 130, 246, 0.18) !important;
        box-shadow: 0 0 18px rgba(59, 130, 246, 0.25) !important;
    }
    [class*="locateButton"] {
        border-radius: 6px !important;
        border-style: solid !important;
        border-color: rgba(255, 255, 255, 0.18) !important;
        background: rgba(255, 255, 255, 0.04) !important;
        color: #c7cacf !important;
    }
    [class*="locateButton"]:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        color: #fff !important;
        border-color: rgba(255, 255, 255, 0.28) !important;
    }
    [class*="gameView"] [class*="detailCard"], [class*="aboutView"] [class*="securityCard"], [class*="aboutView"] [class*="gameItem"] {
        background: rgba(0, 0, 0, 0.25) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-radius: 8px !important;
    }
    [class*="aboutView"] [class*="gameIconWrapper"] {
        background: rgba(0, 0, 0, 0.30) !important;
    }

    /* Dashboard view */
    [class*="dashboardView"] {
        background: radial-gradient(circle at center, rgba(24,32,41,0.40) 0%, rgba(11,12,16,0.80) 100%) !important;
    }
    [class*="gameIconCard"] {
        background: rgba(24, 32, 41, 0.60) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: blur(8px) !important;
        border-radius: 12px !important;
    }
    [class*="gameIconCard"]:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }
    [class*="versionLabel"] {
        opacity: 0.85 !important;
        color: #c7cacf !important;
    }
    [class*="gameIcon"] {
        filter: drop-shadow(0 6px 18px rgba(0,0,0,0.55)) !important;
    }

    /* Game Details: primary action buttons */
    [class*="playButtonLarge"], [class*="installButtonLarge"] {
        background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%) !important;
        color: #0b1220 !important;
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25) !important;
        border-radius: 6px !important;
    }
    [class*="playButtonLarge"]:hover, [class*="installButtonLarge"]:hover {
        filter: brightness(1.06) !important;
    }
    [class*="downloadCompactContainer"] {
        background: rgba(24, 32, 41, 0.75) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-radius: 8px !important;
        backdrop-filter: blur(10px) !important;
    }
    [class*="removePathBtn"] {
        color: #60a5fa !important;
    }
    `;

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function markActiveButton(targetBtn) {
        try {
            document.querySelectorAll('#app-sidebar button').forEach(b => b.classList.remove(ACTIVE_CLASS));
            if (targetBtn) targetBtn.classList.add(ACTIVE_CLASS);
        } catch (e) {}
    }

    const clickHandler = (e) => {
        const btn = e.target.closest('#app-sidebar .navItem');
        if (!btn) return;
        markActiveButton(btn);
    };

    function init() {
        injectStyle();
        const root = document.getElementById('app-sidebar');
        if (root) {
            root.addEventListener('click', clickHandler, true);
            // Best-effort: mark first nav item active on load
            const firstBtn = root.querySelector('.navItem');
            if (firstBtn) markActiveButton(firstBtn);
        }
    }

    function cleanup() {
        const style = document.getElementById(STYLE_ID);
        if (style) style.remove();
        const root = document.getElementById('app-sidebar');
        if (root) root.removeEventListener('click', clickHandler, true);
        document.querySelectorAll('#app-sidebar .navItem').forEach(b => b.classList.remove(ACTIVE_CLASS));
    }

    init();
    RelictumAPI.onCleanup(cleanup);
    console.log('[Menu Controller] Sidebar restyle applied');
})();

