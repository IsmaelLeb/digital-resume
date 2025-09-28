document.addEventListener("DOMContentLoaded", () => {
    const showBtn = document.querySelector(".show");
    const closeBtn = document.querySelector(".close");
    const menu = document.querySelector(".menu-burger");
    showBtn.addEventListener("click", () => {
        menu.style.display = "flex";
        showBtn.style.display = "none";
    });
    closeBtn.addEventListener("click", () => {
        menu.style.display = "none";
        showBtn.style.display = "flex";
    });
});