const fetchedContent = {};

function SPA() {
    const mainElement = document.getElementById("main");
    const hostname = window.location.hostname;

    function fetchAndStoreContent(link) {
        const href = link.getAttribute('href');
        if (href.includes('#') || link.hasAttribute('target')) return;

        const pathname = new URL(href, document.baseURI).pathname;
        if (link.hostname !== hostname || link.hasAttribute("data-no-preload") || fetchedContent[pathname]) return;

        fetch(href)
            .then(response => response.text())
            .then(content => {
                fetchedContent[pathname] = { content, title: link.textContent };
            });
    }

    function handleLinkClick(event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.button === 1) return;

        const link = event.target.closest('a');
        if (!link || link.getAttribute('target') || link.href.includes('#')) return;

        event.preventDefault();
        const pathname = new URL(link.href, document.baseURI).pathname;
        const contentObj = fetchedContent[pathname];

        if (contentObj) {
            window.history.pushState({ title: contentObj.title }, contentObj.title, pathname);
            updatePageContent(contentObj);
        } else {
            window.location.href = link.href;
        }
    }

    function updatePageContent(contentObj) {
        document.body.innerHTML = stripAssets(contentObj.content);
        window.kickStart();
        typeof codeWrapFunc === 'function' && codeWrapFunc();
        SPA();
        scrollToContent();
    }

    function scrollToContent() {
        const activeTag = document.querySelector(".active-tag");
        activeTag ? activeTag.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }) : window.scrollTo(0, 0);
    }

    mainElement.querySelectorAll('a').forEach(fetchAndStoreContent);
    mainElement.addEventListener('click', handleLinkClick);
}

function handlePopState() {
    if (window.location.href.includes('#')) return;

    const pathname = window.location.pathname;
    const contentObj = fetchedContent[pathname];

    contentObj ? updatePageContent(contentObj) : (window.location.href = window.location.href);
}

function stripAssets(content) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    tempElement.querySelectorAll('link[rel="stylesheet"]').forEach(link => link.remove());
    return tempElement.innerHTML;
}

document.addEventListener('DOMContentLoaded', SPA);
window.addEventListener('popstate', handlePopState);