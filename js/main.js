// YouTube API: Live-Abonnentenzahl und Featured-Video
// Hinweis: Du brauchst einen eigenen API-Key und die Channel-ID!
const YOUTUBE_API_KEY = 'AIzaSyDrtb0QsKbIdYV1qL2KztvWGTA0foVmNd4'; // <-- Ersetzen!
const CHANNEL_ID = 'UCfvPPfsOkPkAU6cfCfnIp0A'; // <-- Ersetzen!

// Live-Abonnentenzahl laden
function fetchSubscriberCount() {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const count = data.items?.[0]?.statistics?.subscriberCount || 'N/A';
            document.getElementById('abo-count').textContent = count;
        })
        .catch(() => {
            document.getElementById('abo-count').textContent = 'Fehler';
        });
}
if (document.getElementById('abo-count')) fetchSubscriberCount();

// Featured-Video dynamisch laden (letztes Video vom Kanal)
function fetchFeaturedVideo() {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`)
        .then(res => res.json())
        .then(data => {
            const videoId = data.items?.[0]?.id?.videoId;
            if (videoId) {
                document.getElementById('featured-video-container').innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video" frameborder="0" allowfullscreen></iframe>`;
            } else {
                document.getElementById('featured-video-container').textContent = 'Kein Video gefunden.';
            }
        })
        .catch(() => {
            document.getElementById('featured-video-container').textContent = 'Fehler beim Laden.';
        });
}
if (document.getElementById('featured-video-container')) fetchFeaturedVideo();
// News-Ticker Animation
// Dark-/Light-Mode Toggle
const modeToggle = document.getElementById('modeToggle');
let darkMode = true;
function setMode(dark) {
    darkMode = dark;
    if (dark) {
        document.body.style.setProperty('--bg', '#181818');
        document.body.style.setProperty('--fg', '#f5f5f5');
        document.body.style.setProperty('--header-bg', '#222');
        document.body.style.setProperty('--footer-bg', '#222');
        document.body.style.setProperty('--section-bg', '#242424');
        document.body.style.setProperty('--nav-color', '#00bfff');
        document.body.style.setProperty('--nav-hover-bg', '#333');
        modeToggle.textContent = '🌙';
        modeToggle.classList.remove('light');
    } else {
        document.body.style.setProperty('--bg', '#f5f5f5');
        document.body.style.setProperty('--fg', '#181818');
        document.body.style.setProperty('--header-bg', '#e0e0e0');
        document.body.style.setProperty('--footer-bg', '#e0e0e0');
        document.body.style.setProperty('--section-bg', '#fff');
        document.body.style.setProperty('--nav-color', '#0055ff');
        document.body.style.setProperty('--nav-hover-bg', '#cce6ff');
        modeToggle.textContent = '☀️';
        modeToggle.classList.add('light');
    }
}
if (modeToggle) {
    modeToggle.addEventListener('click', () => setMode(!darkMode));
    setMode(true);
}
const ticker = document.getElementById('ticker');
if (ticker) {
    let messages = [
        'Willkommen auf der offiziellen Qfvjug-Webseite!',
        'Neues Video online!',
        'Discord-Community wächst!'
    ];
    let i = 0;
    setInterval(() => {
        ticker.textContent = messages[i % messages.length];
        i++;
    }, 4000);
}
