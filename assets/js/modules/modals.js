import { SiteConfig } from '../config.js';
export function initModals() {
    const discordBtn = document.getElementById("social_discord_btn");
    if (discordBtn) {
        discordBtn.addEventListener('click', showDiscordModal);
    }
    const closeBtn = document.getElementById("discord_modal_btn_close");
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDiscordModal);
    }
    const copyBtn = document.getElementById("discord_copy_btn");
    if (copyBtn) {
        copyBtn.addEventListener('click', copyDiscordName);
    }
    const joinBtn = document.getElementById("discord_join_btn");
    if (joinBtn) {
        joinBtn.addEventListener('click', () => { 
            const discordData = SiteConfig.socials.find(s => s.isDiscordModal);
            if (discordData) window.location.href = discordData.inviteLink; 
        });
    }
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('discord_modal_container');
        if (event.target === modal) {
            closeDiscordModal();
        }
    });
}
function showDiscordModal() {
    const modal = document.getElementById("discord_modal_container");
    if (modal) modal.classList.add("active");
}
function closeDiscordModal() {
    const modal = document.getElementById("discord_modal_container");
    if (modal) modal.classList.remove("active");
}
function copyDiscordName() {
    const discordData = SiteConfig.socials.find(s => s.isDiscordModal);
    if (discordData) navigator.clipboard.writeText(discordData.username);
    const copyBtn = document.getElementById("discord_copy_btn");
    if (copyBtn) {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied!";
        copyBtn.style.backgroundColor = "#10b981"; 
        copyBtn.style.color = "white";
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.backgroundColor = ""; 
            copyBtn.style.color = "";
        }, 3000);
    }
}
