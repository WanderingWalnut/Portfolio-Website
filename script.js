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
        setTimeout(() => textTypingEffect(element, text, i + 1), 200); // Adjust the timeout to slow down the typing effect
    }
}

document.addEventListener("DOMContentLoaded", () => {
    textTypingEffect(div, text);
});
