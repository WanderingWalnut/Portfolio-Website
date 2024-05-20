function toggleMenu(){
    const menu = document. querySelector(".menu-links") // select the menu-links class
    const icon = document.querySelector(".hamburger-icon") // select the hamburger-icon class
    menu.classList.toggle("open") // toggle the open class on the menu
    icon.classList.toggle("open") // toggle the open class on the icon
}