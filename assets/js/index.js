'use strict';

const NAV = document.querySelector('nav');
const BACKGROUND_IMG = document.querySelector('.background-image');
const NAV_LOGO = NAV.querySelector('.logo');

document.addEventListener('scroll', e => {
    NAV.style.background = "rgb(33, 33, 33, " + window.scrollY / 650 + ")";
    NAV.style.fontSize = Math.max(23, 25 - window.scrollY / 200) + "px";

    NAV_LOGO.style.width = Math.max(43, 48 - window.scrollY / 200) + "px";
    BACKGROUND_IMG.style.top = "-" + window.scrollY / 6 + "px";
});

window.addEventListener('DOMContentLoaded', e => {
    BACKGROUND_IMG.src = "assets/img/splash/" + Math.round(Math.random() * 4) + ".png";
});