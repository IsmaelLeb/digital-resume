document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".cv-section");
    const menuLinks = document.querySelectorAll(".menu-link");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70; // ajuster pour menu fixe
            if(pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove("active");
            if(link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
            }
        });
    });
});