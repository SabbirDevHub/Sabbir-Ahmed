/*==================================================
                PORTFOLIO JAVASCRIPT
==================================================*/

// =========================
// Loader
// =========================

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});

// =========================
// Scroll Progress Bar
// =========================

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    document.getElementById("progress-bar").style.width = progress + "%";

});

// =========================
// Typing Effect
// =========================

const typingElement = document.getElementById("typing-text");

const words = [


    "Product Designer",

    "Software Developer",

    "Passionate About Research"

];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;

function typeEffect() {

    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();

// =========================
// Sticky Navbar Shadow
// =========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "none";

    }

});

// =========================
// Theme Toggle
// =========================

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    } else {

        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    }

});

// =========================
// Smooth Scroll
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
/*==================================================
            EXPERIENCE ACCORDION JS
==================================================*/
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.exp-row');
    
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const parentGroup = row.parentElement;
            
            // Close other open accordions (optional)
            document.querySelectorAll('.exp-row-group').forEach(group => {
                if(group !== parentGroup) {
                    group.classList.remove('active');
                }
            });

            // Toggle current accordion
            parentGroup.classList.toggle('active');
        });
    });
});