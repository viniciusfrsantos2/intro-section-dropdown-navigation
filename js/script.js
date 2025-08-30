'use strict'

const menuMobileBtn = document.querySelector('.header__menu-btn');
const mobileBtnImg = document.querySelector('.header__menu-btn img');

const menuContainer = document.querySelector('#menu');
const menu = document.querySelector('.menu__container');
const dropdownBtn = document.querySelector('.dropdown__btn');

const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');


const toggleOverlay = (show) => {
  overlay.hidden = !show;
  body.style.overflow = show ? 'hidden' : 'auto';
};

const closeMenuMobile = () => {
    menuMobileBtn.setAttribute('aria-expanded', 'false');
    menuContainer.hidden = true;
    mobileBtnImg.setAttribute('src', 'images/icon-menu.svg');
}

const closeMenuDropdown = () => {
    menu.querySelectorAll('.dropdown__btn').forEach( btn => btn.setAttribute('aria-expanded','false'));
    menu.querySelectorAll('.dropdown__container').forEach( drop => drop.hidden = true);    
}

const toggleDropdown = (button) => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.ariaExpanded = String(!expanded);

    const menuId = button.getAttribute('aria-controls');
    const menuDrop = document.getElementById(menuId);

    menuDrop.hidden = expanded;

    button.querySelector('.dropdown__btn-arrow').classList.toggle('moveArrow', !menuDrop.hidden ?  true : false);
}



menuMobileBtn.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.ariaExpanded = String(!expanded);

    menuContainer.hidden = expanded;

    this.classList.toggle('isOpen');
    mobileBtnImg.src = !expanded ? 'images/icon-close-menu.svg' : 'images/icon-menu.svg';

    toggleOverlay(!expanded);
})

menu.addEventListener('click', (e) => {
    e.preventDefault();

    const button = e.target.closest('.dropdown__btn');
    if(!button) return;

    toggleDropdown(button);
})

overlay.addEventListener('click', () => {
    const expanded = menuMobileBtn.getAttribute('aria-expanded') === 'true';
    closeMenuMobile();
    closeMenuDropdown();
    toggleOverlay(!expanded);
});