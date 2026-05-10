import { SiteConfig } from '../config.js';
let currentSpotlightPage = 1;
const spotlightPerPage = SiteConfig.ui.spotlightItemsPerPage;
export function initPagination() {
    renderSpotlightPagination();
    const prevBtn = document.getElementById("spotlight_prev_btn");
    const nextBtn = document.getElementById("spotlight_next_btn");
    if (prevBtn) {
        prevBtn.addEventListener('click', spotlightPrevPage);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', spotlightNextPage);
    }
}
function renderSpotlightPagination() {
    const articles = document.getElementsByClassName("spotlight-artical");
    if (!articles || articles.length === 0) return;
    const totalPages = Math.ceil(articles.length / spotlightPerPage);
    for (let i = 0; i < articles.length; i++) {
        articles[i].classList.remove("fade-in");
        articles[i].style.display = "none";
        if (i >= (currentSpotlightPage - 1) * spotlightPerPage && i < currentSpotlightPage * spotlightPerPage) {
            articles[i].style.display = "flex";
            void articles[i].offsetWidth; 
            articles[i].classList.add("fade-in");
        }
    }
    updatePaginationInfo(totalPages);
    const prevBtn = document.getElementById("spotlight_prev_btn");
    const nextBtn = document.getElementById("spotlight_next_btn");
    if (prevBtn) prevBtn.disabled = currentSpotlightPage === 1;
    if (nextBtn) nextBtn.disabled = currentSpotlightPage === totalPages;
}
function updatePaginationInfo(totalPages) {
    const info = document.getElementById("spotlight_page_info");
    if (!info) return;
    info.innerHTML = "";
    for (let p = 1; p <= totalPages; p++) {
        if (p === currentSpotlightPage) {
            const span = document.createElement("span");
            span.className = "page-num active-page-num";
            span.textContent = p;
            info.appendChild(span);
        } else if (p === 1 || p === totalPages || (p >= currentSpotlightPage - 1 && p <= currentSpotlightPage + 1)) {
            const span = document.createElement("span");
            span.className = "page-num";
            span.textContent = p;
            span.addEventListener('click', () => goToSpotlightPage(p));
            info.appendChild(span);
        } else if (p === currentSpotlightPage - 2 || p === currentSpotlightPage + 2) {
            const span = document.createElement("span");
            span.className = "page-dots";
            span.textContent = "...";
            span.title = "Jump to page";
            span.addEventListener('click', () => promptSpotlightPage(totalPages));
            info.appendChild(span);
        }
    }
}
function promptSpotlightPage(totalPages) {
    const input = prompt("Go to page (1 - " + totalPages + "):");
    if (input !== null) {
        const pageNum = parseInt(input, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            goToSpotlightPage(pageNum);
        } else {
            alert("Invalid page number.");
        }
    }
}
function goToSpotlightPage(page) {
    currentSpotlightPage = page;
    renderSpotlightPagination();
    document.getElementById("tab_spotlight").scrollIntoView({ behavior: 'smooth' });
}
function spotlightPrevPage() {
    if (currentSpotlightPage > 1) {
        goToSpotlightPage(currentSpotlightPage - 1);
    }
}
function spotlightNextPage() {
    const articles = document.getElementsByClassName("spotlight-artical");
    const totalPages = Math.ceil(articles.length / spotlightPerPage);
    if (currentSpotlightPage < totalPages) {
        goToSpotlightPage(currentSpotlightPage + 1);
    }
}
