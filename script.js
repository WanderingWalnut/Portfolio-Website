function toggleMenu() {
    const menu = document.querySelector(".menu-links"); // select the menu-links class
    const icon = document.querySelector(".hamburger-icon"); // select the hamburger-icon class
    menu.classList.toggle("open"); // toggle the open class on the menu
    icon.classList.toggle("open"); // toggle the open class on the icon
}

const div = document.querySelector(".title");
const text = "Naveed"; // Ensure the space is included between first and last name

function textTypingEffect(element, text, i = 0) {
    if (i === 0) {
        element.innerText = ""; // Clear text initially
    }

    if (i < text.length) {
        element.innerText += text[i];
        setTimeout(() => textTypingEffect(element, text, i + 1), 250); // Adjust the timeout to slow down the typing effect
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (div) {
        textTypingEffect(div, text);
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});
