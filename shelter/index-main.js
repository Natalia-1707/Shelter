//burger-menu//

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("burger").addEventListener("click", function(){
        document.querySelector(".header").classList.toggle("open");
        document.body.classList.toggle("no-scroll");
    })
})
document.getElementById("burger").addEventListener("click", event => {
    event._isClickWithInMenu = true;
})
document.getElementById("navigation").addEventListener("click", event => {
    event._isClickWithInMenu = true;
})
document.body.addEventListener("click", event => {
    if(event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open");
    document.body.classList.remove("no-scroll");
})
document.getElementById("navigation").querySelectorAll("li").forEach((link) => {
    link.addEventListener("click", () => {
        document.querySelector(".header").classList.remove("open");
        document.body.classList.remove("no-scroll");
    });
});