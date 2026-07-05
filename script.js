/*==================================================
                PORTFOLIO JAVASCRIPT
==================================================*/

document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // Loader Setup
    // =========================
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 500);
    }

    // =========================
    // Theme Toggle & Persistence
    // =========================
    const themeBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check local storage, fallback to system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        if(themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
    }

    if(themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            themeBtn.innerHTML = isDark 
                ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>' 
                : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
        });
    }

    // =========================
    // Scroll Performance (RAF Throttling)
    // =========================
    let ticking = false;
    const header = document.querySelector(".header");
    const progressBar = document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Progress Bar
                if (progressBar) {
                    const scrollTop = document.documentElement.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const progress = (scrollTop / scrollHeight) * 100;
                    progressBar.style.width = progress + "%";
                }

                // Sticky Header
                if (header) {
                    if (window.scrollY > 30) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // =========================
    // Typing Effect
    // =========================
    const typingElement = document.getElementById("typing-text");
    const words = ["Product Designer", "Software Developer", "Passionate About Research"];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        if (!typingElement) return;
        const currentWord = words[wordIndex];

        if (!deleting) {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(typeEffect, deleting ? 50 : 100);
    }
    typeEffect();

    // =========================
    // Experience Accordion A11y
    // =========================
    const expRows = document.querySelectorAll('.exp-row');
    
    expRows.forEach(row => {
        row.addEventListener('click', () => {
            const parentGroup = row.parentElement;
            const isCurrentlyActive = parentGroup.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.exp-row-group').forEach(group => {
                group.classList.remove('active');
                group.querySelector('.exp-row').setAttribute('aria-expanded', 'false');
            });

            // Toggle clicked
            if (!isCurrentlyActive) {
                parentGroup.classList.add('active');
                row.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // =========================
    // Contact Form & Calendar
    // =========================
    const dateGrid = document.getElementById('dates-grid');
    const monthYearDisplay = document.getElementById('current-month-year');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const slotsList = document.getElementById('slots-list');
    const selectedTimeDisplay = document.getElementById('selected-datetime-display');
    const projectForm = document.getElementById('project-form');

    // Make sure calendar elements exist before running logic
    if (dateGrid && monthYearDisplay) {
        let currentDate = new Date(); 
        let selectedDate = null;
        let selectedTime = null;

        const timeSlots = [
            "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", 
            "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", 
            "4:00 PM", "5:00 PM"
        ];

        function renderCalendar() {
            dateGrid.innerHTML = '';
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
            monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            for (let i = 0; i < firstDay; i++) {
                const emptyDiv = document.createElement('div');
                emptyDiv.setAttribute('aria-hidden', 'true');
                dateGrid.appendChild(emptyDiv);
            }
            
            for (let i = 1; i <= daysInMonth; i++) {
                const btn = document.createElement('button');
                btn.classList.add('date-btn');
                btn.textContent = i;
                btn.type = 'button';
                btn.setAttribute('aria-label', `${monthNames[month]} ${i}, ${year}`);
                
                if (selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
                }
                
                btn.addEventListener('click', () => {
                    selectedDate = new Date(year, month, i);
                    selectedTime = null; 
                    renderCalendar();
                    renderTimeSlots();
                    updateDisplay();
                });
                
                dateGrid.appendChild(btn);
            }
        }

        function renderTimeSlots() {
            if(!slotsList) return;
            slotsList.innerHTML = '';
            
            timeSlots.forEach(time => {
                const btn = document.createElement('button');
                btn.classList.add('slot-btn');
                btn.textContent = time;
                btn.type = 'button';
                
                if(selectedTime === time) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
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

        function updateDisplay() {
            if(!selectedTimeDisplay) return;
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

        if(projectForm) {
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

                window.location.href = `mailto:sabbir.ahmed@example.com?subject=${subject}&body=${body}`;
            });
        }

        // Initialize Calendar
        renderCalendar();
        renderTimeSlots();
    }
});