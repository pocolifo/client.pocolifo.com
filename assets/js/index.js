'use strict';

const NAV = document.querySelector('nav');
const BACKGROUND_IMG = document.querySelector('.background-image');
const BACKGROUND_IMG_LDR = document.querySelector('.background-image-loader');
const NAV_LOGO = NAV.querySelector('.logo');

const DOWNLOAD_BUTTON = document.querySelector('.download-button');
const DOWNLOAD_LINK = document.querySelector('.download-link');

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
    }, 500)
});