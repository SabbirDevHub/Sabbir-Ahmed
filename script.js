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
/*==================================================
            CONTACT FORM & CALENDAR LOGIC
==================================================*/
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Calendar Variables
    const dateGrid = document.getElementById('dates-grid');
    const monthYearDisplay = document.getElementById('current-month-year');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const slotsList = document.getElementById('slots-list');
    const selectedTimeDisplay = document.getElementById('selected-datetime-display');
    const projectForm = document.getElementById('project-form');

    let currentDate = new Date(); // July 2026 based on context, but uses actual date
    let selectedDate = null;
    let selectedTime = null;

    const timeSlots = [
        "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", 
        "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", 
        "4:00 PM", "5:00 PM"
    ];

    // 2. Render Calendar
    function renderCalendar() {
        dateGrid.innerHTML = '';
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Empty slots before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            dateGrid.appendChild(emptyDiv);
        }
        
        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const btn = document.createElement('button');
            btn.classList.add('date-btn');
            btn.textContent = i;
            btn.type = 'button';
            
            // Highlight selected date
            if (selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year) {
                btn.classList.add('active');
            }
            
            btn.addEventListener('click', () => {
                selectedDate = new Date(year, month, i);
                selectedTime = null; // Reset time when date changes
                renderCalendar();
                renderTimeSlots();
                updateDisplay();
            });
            
            dateGrid.appendChild(btn);
        }
    }

    // 3. Render Time Slots
    function renderTimeSlots() {
        slotsList.innerHTML = '';
        
        timeSlots.forEach(time => {
            const btn = document.createElement('button');
            btn.classList.add('slot-btn');
            btn.textContent = time;
            btn.type = 'button';
            
            if(selectedTime === time) {
                btn.classList.add('active');
            }
            
            btn.addEventListener('click', () => {
                if(!selectedDate) {
                    alert("Please select a date first.");
                    return;
                }
                selectedTime = time;
                renderTimeSlots();
                updateDisplay();
            });
            
            slotsList.appendChild(btn);
        });
    }

    // 4. Update Display Box
    function updateDisplay() {
        if (selectedDate && selectedTime) {
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            const formattedDate = selectedDate.toLocaleDateString('en-US', options);
            selectedTimeDisplay.textContent = `${formattedDate}, ${selectedTime} (GMT+6)`;
        } else if (selectedDate) {
            selectedTimeDisplay.textContent = "Please select a time slot";
        } else {
            selectedTimeDisplay.textContent = "Please select a date and time";
        }
    }

    // Event Listeners for Month Navigation
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // 5. Handle Form Submission (Mailto)
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if(!selectedDate || !selectedTime) {
            alert("Please select a valid date and time for the meeting before submitting.");
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const location = document.getElementById('location').value;
        const budget = document.getElementById('budget').value;
        const details = document.getElementById('details').value;
        const meetingTime = selectedTimeDisplay.textContent;

        const subject = encodeURIComponent(`New Project Inquiry: ${service} from ${name}`);
        const body = encodeURIComponent(
            `Hello Sabbir,\n\n` +
            `I would like to discuss a project with you.\n\n` +
            `Project Details:\n` +
            `- Name: ${name}\n` +
            `- Email: ${email}\n` +
            `- Service: ${service}\n` +
            `- Location: ${location}\n` +
            `- Budget: $${budget} USD\n` +
            `- Requested Meeting Time: ${meetingTime}\n\n` +
            `About the Project:\n${details}\n\n` +
            `Looking forward to hearing from you.`
        );

        // Open default mail client
        window.location.href = `mailto:sabbir.ahmed@example.com?subject=${subject}&body=${body}`;
    });

    // Initialize
    renderCalendar();
    renderTimeSlots();
});