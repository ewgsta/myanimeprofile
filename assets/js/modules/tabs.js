import { SiteConfig } from '../config.js';
export function initTabs() {
    const tabButtons = document.querySelectorAll('.nav-item');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetNav = e.target.id;
            const targetTab = targetNav.replace('nav_', 'tab_');
            selectTab(targetNav, targetTab);
        });
    });
    if (document.getElementsByClassName("active-tab").length === 0) {
        const defaultTab = document.getElementById(SiteConfig.ui.defaultTab);
        if (defaultTab) defaultTab.classList.add("active-tab");
        const defaultNav = document.getElementById(SiteConfig.ui.defaultTab.replace('tab_', 'nav_'));
        if (defaultNav) defaultNav.classList.add("nav-item-active", "nav-item-selected");
    }
}
export function selectTab(nav_item_id, tab_id) {
    const tabs = document.getElementsByClassName("tab-actionable");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active-tab");
    }
    const targetTab = document.getElementById(tab_id);
    if (targetTab) targetTab.classList.add("active-tab");
    const navItems = document.getElementsByClassName("nav-item");
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("nav-item-active", "nav-item-selected");
    }
    const targetNav = document.getElementById(nav_item_id);
    if (targetNav) targetNav.classList.add("nav-item-active", "nav-item-selected");
}
