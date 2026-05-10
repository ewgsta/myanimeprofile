import { SiteConfig } from './config.js';
import { initTabs, selectTab } from './modules/tabs.js';
import { initModals } from './modules/modals.js';
import { initPagination } from './modules/pagination.js';
document.addEventListener('DOMContentLoaded', async () => {
    const nameEl = document.getElementById('name');
    const handleEl = document.getElementById('handle');
    const bioEl = document.getElementById('biotext');
    if (nameEl) nameEl.textContent = SiteConfig.profile.name;
    if (handleEl) handleEl.textContent = SiteConfig.profile.handle;
    if (bioEl) bioEl.textContent = SiteConfig.profile.bio;
    const socialsContainer = document.getElementById('bio_socials');
    if (socialsContainer) {
        socialsContainer.innerHTML = '';
        SiteConfig.socials.forEach(social => {
            let el;
            if (social.isDiscordModal) {
                el = document.createElement('button');
                el.id = 'social_discord_btn';
            } else {
                el = document.createElement('a');
                el.href = social.url;
                el.target = "_blank"; 
                el.id = 'bio-social-' + social.platform.toLowerCase();
            }
            el.className = 'bio-social-item';
            if (social.iconImg) {
                const img = document.createElement('img');
                img.src = social.iconImg;
                img.alt = social.platform;
                el.appendChild(img);
            } else if (social.iconClass) {
                const i = document.createElement('i');
                i.className = social.iconClass;
                el.appendChild(i);
            }
            if (social.color) {
                el.style.setProperty('--brand-color', social.color);
            }
            if (social.hoverColor) {
                el.style.setProperty('--hover-color', social.hoverColor);
            } else {
                el.style.setProperty('--hover-color', 'white');
            }
            socialsContainer.appendChild(el);
        });
    }
    
    await renderArticles();
    
    initTabs();
    initModals();
    initPagination();
});

async function renderArticles() {
    const container = document.getElementById('markdown_articles_container');
    if (!container || !SiteConfig.articles) return;

    try {
        const articlePromises = SiteConfig.articles.map(path => fetch(path).then(r => r.text()));
        const markdowns = await Promise.all(articlePromises);

        markdowns.forEach(md => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'spotlight-artical';
            // Assuming marked.js is available globally via CDN
            articleDiv.innerHTML = marked.parse(md);
            container.appendChild(articleDiv);
        });
    } catch (error) {
        console.error("Error loading markdown articles:", error);
    }
}
    window.addEventListener("resize", function() {
        const w = window.innerWidth;
        const activeNav = document.querySelector(".nav-item-selected");
        if (!activeNav) return;
        if (w >= 900 && activeNav.id === "nav_about") {
            selectTab('nav_spotlight', 'tab_spotlight');
        }
    });
});
