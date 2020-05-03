const contentEl = document.querySelector('#content');
const titleEl = document.querySelector('title');
/**/ const language = {
    riskdiceroller: "riskterningruller",
    Start_battle: "Start angrep",
    Distribute_territories: "Fordel territorier",
    Preferences: "Innstillinger",
    Usage_guide: "Bruksanvisning"
};/**/
/* const language = {
    riskdiceroller: "riskdiceroller",
    Start_battle: "Start battle",
    Distribute_territories: "Distribute territories",
    Preferences: "Preferences",
    Usage_guide: "Usage guide"
};*/
contentEl.innerHTML = Handlebars.compile(contentEl.innerHTML)(language);
contentEl.style.display = 'block';
titleEl.innerHTML = Handlebars.compile(titleEl.innerHTML)(language);
