let isReverse = false;

function toggleTheme() {
    isReverse = !isReverse;
    document.documentElement.style.setProperty('--primary-color', isReverse ? 'var(--primary-color-reverse)' : '#31438f');
    document.documentElement.style.setProperty('--secondary-color', isReverse ? 'var(--secondary-color-reverse)' : '#f8fafc');
    document.documentElement.style.setProperty('--accent-color', isReverse ? 'var(--accent-color-reverse)' : '#5cabde');
}
{
document.title = "Monitoring Tools";
}
{
    document.addEventListener("contextmenu", function(event){
        event.preventDefault();
    });
    
}
const trollingLink = document.getElementById('trolling-link');
let idleTimeout;
let isTrolling = false; // State to determine if trolling should happen

// Function to move the link to a random position
function moveRandom() {
    const randomX = Math.floor(Math.random() * 100) - 50; // Random offset for X (-50px to +50px)
    const randomY = Math.floor(Math.random() * 100) - 50; // Random offset for Y (-50px to +50px)
    trollingLink.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Function to reset the link's position
function resetPosition() {
    trollingLink.style.transform = 'translate(0, 0)';
}

// Add click listener to enable trolling
trollingLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    isTrolling = true; // Enable trolling after the first click
    clearTimeout(idleTimeout); // Clear idle timeout when the user interacts
    moveRandom(); // Move randomly on click
});

// Add hover listener to move the link randomly, but only if trolling is enabled
trollingLink.addEventListener('mouseenter', () => {
    if (isTrolling) {
        clearTimeout(idleTimeout); // Clear idle timeout when the user interacts
        moveRandom();
    }
});

// Add a listener for when the mouse leaves the link
trollingLink.addEventListener('mouseleave', () => {
    if (isTrolling) {
        idleTimeout = setTimeout(() => {
            resetPosition(); // Reset after 10 seconds of inactivity
        }, 5000);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const aboutLink = document.getElementById("trolling-link");
    const messageBubble = document.getElementById("message-bubble");

    // Show the bubble on page load
    messageBubble.style.display = "block";

    // Add click event to the "About" link
    aboutLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link action

        // Fade out the bubble
        messageBubble.style.animation = "fadeOut 0.5s ease-in-out";
        setTimeout(() => {
            messageBubble.style.display = "none"; // Hide it
        }, 500);

        // Reappear the bubble after 5 seconds
        setTimeout(() => {
            messageBubble.style.display = "block";
            messageBubble.style.animation = "fadeIn 0.5s ease-in-out";
        },100000);
    });
});
function filterContent() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
        const boxes = section.querySelectorAll(".box");
        let sectionHasMatch = false;

        boxes.forEach((box) => {
            const title = box.querySelector("h3").textContent.toLowerCase();

            if (title.includes(query)) {
                box.style.display = "block"; // Show matching box
                sectionHasMatch = true;
            } else {
                box.style.display = "none"; // Hide non-matching box
            }
        });

        // Show or hide the section based on matches
        section.style.display = sectionHasMatch ? "block" : "none";
    });
}

document.getElementById("search-bar").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const query = document.getElementById("search-bar").value.toLowerCase();
        const boxes = document.querySelectorAll(".box");

        boxes.forEach((box) => {
            const title = box.querySelector("h3").textContent.toLowerCase();
            if (title.includes(query)) {
                // Scroll to matching box
                box.scrollIntoView({ behavior: "smooth", block: "center" });

                // Highlight the box
                box.classList.add("highlight");
                setTimeout(() => {
                    box.classList.remove("highlight");
                }, 2000);
            }
        });
    }
});
