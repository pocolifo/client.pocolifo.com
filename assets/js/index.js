'use strict';

const NAV = document.querySelector('nav');
const BACKGROUND_IMG = document.querySelector('.background-image');
const BACKGROUND_IMG_LDR = document.querySelector('.background-image-loader');
const NAV_LOGO = NAV.querySelector('.logo');

const DOWNLOAD_BUTTON = document.querySelector('.download-button');
const DOWNLOAD_LINK = document.querySelector('.download-link');

const COUNTDOWN_TEXT = document.querySelector('.countdown-text');
const COUNTDOWN_DATE = new Date("Mar 27, 2022 17:00:00 EST");

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

async function getLatestReleaseDownloadUrl() {
    let result = await (await fetch('https://api.github.com/repos/pocolifo/client.pocolifo.com/releases/latest')).json();

    for (let asset in result.assets) {
        asset = result.assets[asset];

        if (asset.name.endsWith('.jar')) {
            return asset.browser_download_url;
        }
    }

    return null;
}

function updateCountdown() {
    let timeUntilRelease = COUNTDOWN_DATE.getTime() - Date.now();

    if (timeUntilRelease > 0) {
        let dayCount = timeUntilRelease / ONE_DAY;
        let hourCount = (timeUntilRelease % ONE_DAY) / ONE_HOUR;
        let minuteCount = (timeUntilRelease % ONE_HOUR) / ONE_MINUTE;
        let secondCount = (timeUntilRelease % ONE_MINUTE) / ONE_SECOND;

        dayCount = Math.floor(dayCount).toString();
        hourCount = Math.floor(hourCount).toString();
        minuteCount = Math.floor(minuteCount).toString();
        secondCount = Math.floor(secondCount).toString();

        if (2 > dayCount.length) {
            dayCount = `0${dayCount}`;
        }

        if (2 > hourCount.length) {
            hourCount = `0${hourCount}`;
        }

        if (2 > minuteCount.length) {
            minuteCount = `0${minuteCount}`;
        }

        if (2 > secondCount.length) {
            secondCount = `0${secondCount}`;
        }

        COUNTDOWN_TEXT.textContent = `${dayCount}:${hourCount}:${minuteCount}:${secondCount}`;
    } else {
        COUNTDOWN_TEXT.textContent = "Released! 🥳";
    }
}

document.addEventListener('scroll', e => {
    NAV.style.background = "rgb(33, 33, 33, " + window.scrollY / 650 + ")";
    NAV.style.fontSize = Math.max(20, 25 - window.scrollY / 200) + "px";

    NAV_LOGO.style.width = Math.max(40, 48 - window.scrollY / 200) + "px";
    BACKGROUND_IMG.style.top = "-" + window.scrollY / 6 + "px";
});

window.addEventListener('load', e => {
    let timeout = setTimeout(() => {
        BACKGROUND_IMG.src = "assets/img/splash/" + Math.round(Math.random() * 4) + ".png";

        BACKGROUND_IMG.onload = () => {
            BACKGROUND_IMG.classList.add('loaded');
            BACKGROUND_IMG_LDR.classList.add('loaded');
        };

        new Promise((resolve, reject) => {
            resolve(getLatestReleaseDownloadUrl());
        }).then(url => {
            if (url == null) {
                DOWNLOAD_BUTTON.textContent = "Download coming soon!";
            } else {
                DOWNLOAD_BUTTON.textContent = "Download Installer (Java 8)";
                DOWNLOAD_LINK.href = url;
            }
        });

        clearTimeout(timeout);
    }, 500);

    updateCountdown();
    setInterval(updateCountdown, ONE_SECOND);
});