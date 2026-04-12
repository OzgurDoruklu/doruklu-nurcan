import { supabase, AppState } from 'https://cdn.doruklu.com/supabase-config.js';
import { ui as globalUI } from 'https://cdn.doruklu.com/ui.js';
import { initSubdomainAuth } from 'https://cdn.doruklu.com/auth.js';

export async function initAuth() {
    await initSubdomainAuth('nurcan_app', (user, profile) => {
        const appContent = document.getElementById('dashboard-screen');
        if (appContent) appContent.style.display = 'flex';

        // Global Header & Badge
        globalUI.renderGlobalHeader("Nurcan");
        globalUI.renderUserBadge(user, profile, async () => {
            const { clearAllCaches } = await import('https://cdn.doruklu.com/auth.js');
            await clearAllCaches();
            await supabase.auth.signOut();
            window.location.href = 'https://doruklu.com/?logout=true';
        });
    });
}

document.addEventListener('DOMContentLoaded', initAuth);
