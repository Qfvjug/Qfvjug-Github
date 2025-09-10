// Einfacher Passwortschutz (Frontend, unsicher!)
const ADMIN_PASSWORD = "qfvjug2025"; // Passwort anpassen!
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const adminPanel = document.getElementById("admin-panel");
const adminLogin = document.getElementById("admin-login");
const loginError = document.getElementById("loginError");

if (loginBtn) {
	loginBtn.onclick = function() {
		const pw = document.getElementById("adminPassword").value;
		if (pw === ADMIN_PASSWORD) {
			adminPanel.style.display = "block";
			adminLogin.style.display = "none";
			loginError.style.display = "none";
		} else {
			loginError.style.display = "block";
		}
	};
}
if (logoutBtn) {
	logoutBtn.onclick = function() {
		adminPanel.style.display = "none";
		adminLogin.style.display = "block";
		document.getElementById("adminPassword").value = "";
	};
}
// Dummy für Admin-Panel
// Video-Verwaltung
function loadVideos() {
	const videos = JSON.parse(localStorage.getItem('videos') || '[]');
	const list = document.getElementById('videoList');
	list.innerHTML = '';
	videos.forEach((v, i) => {
		const li = document.createElement('li');
		li.innerHTML = `<b>${v.title}</b> <a href="${v.url}" target="_blank">Video</a> <button onclick="deleteVideo(${i})">🗑️</button>`;
		list.appendChild(li);
	});
}
function addVideo(e) {
	e.preventDefault();
	const title = document.getElementById('videoTitle').value;
	const url = document.getElementById('videoUrl').value;
	const videos = JSON.parse(localStorage.getItem('videos') || '[]');
	videos.push({title, url});
	localStorage.setItem('videos', JSON.stringify(videos));
	loadVideos();
	e.target.reset();
}
function deleteVideo(idx) {
	const videos = JSON.parse(localStorage.getItem('videos') || '[]');
	videos.splice(idx, 1);
	localStorage.setItem('videos', JSON.stringify(videos));
	loadVideos();
}
if (document.getElementById('addVideoForm')) {
	document.getElementById('addVideoForm').onsubmit = addVideo;
	loadVideos();
}

// Download-Verwaltung
// Firebase-Konfiguration (ersetzen mit deinen Daten!)
const firebaseConfig = {
	apiKey: "AIzaSyCIvIpODOa5cTA-6VSE9yXRDdH8CdIoKr8",
  	authDomain: "qfvjug-2fc91.firebaseapp.com",
  	databaseURL: "https://qfvjug-2fc91-default-rtdb.europe-west1.firebasedatabase.app",
  	projectId: "qfvjug-2fc91",
  	storageBucket: "qfvjug-2fc91.firebasestorage.app",
  	messagingSenderId: "99637805559",
  	appId: "1:99637805559:web:894394bd3c050ed1966ef2",
};

// Firebase initialisieren
if (typeof firebase === 'undefined') {
	const script = document.createElement('script');
	script.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
	script.onload = () => {
		const dbScript = document.createElement('script');
		dbScript.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js";
		dbScript.onload = () => {
			window.initFirebaseDownloads && window.initFirebaseDownloads();
		};
		document.head.appendChild(dbScript);
	};
	document.head.appendChild(script);
} else {
	window.initFirebaseDownloads && window.initFirebaseDownloads();
}

window.initFirebaseDownloads = function() {
	firebase.initializeApp(firebaseConfig);
	const db = firebase.database();

	function loadDownloads() {
		const list = document.getElementById('downloadList');
		list.innerHTML = '<li>Lädt...</li>';
		db.ref('downloads').once('value', snap => {
			const downloads = snap.val() || [];
			list.innerHTML = '';
			downloads.forEach((d, i) => {
				const li = document.createElement('li');
				li.innerHTML = `<b>${d.title}</b> <a href="${d.url}" target="_blank">Download</a> <button onclick="deleteDownload(${i})">🗑️</button>`;
				list.appendChild(li);
			});
		});
	}
	window.loadDownloads = loadDownloads;

	function addDownload(e) {
		e.preventDefault();
		const title = document.getElementById('downloadTitle').value;
		const url = document.getElementById('downloadUrl').value;
		db.ref('downloads').once('value', snap => {
			const downloads = snap.val() || [];
			downloads.push({title, url});
			db.ref('downloads').set(downloads, loadDownloads);
		});
		e.target.reset();
	}
	window.addDownload = addDownload;

	function deleteDownload(idx) {
		db.ref('downloads').once('value', snap => {
			const downloads = snap.val() || [];
			downloads.splice(idx, 1);
			db.ref('downloads').set(downloads, loadDownloads);
		});
	}
	window.deleteDownload = deleteDownload;

	if (document.getElementById('addDownloadForm')) {
		document.getElementById('addDownloadForm').onsubmit = addDownload;
		loadDownloads();
	}
}

// Benachrichtigungen
function loadNotify() {
	const history = JSON.parse(localStorage.getItem('notifyHistory') || '[]');
	const list = document.getElementById('notifyHistory');
	list.innerHTML = '';
	history.slice(-10).reverse().forEach((msg, i) => {
		const li = document.createElement('li');
		li.textContent = msg;
		list.appendChild(li);
	});
}
function addNotify(e) {
	e.preventDefault();
	const msg = document.getElementById('notifyMsg').value;
	const history = JSON.parse(localStorage.getItem('notifyHistory') || '[]');
	history.push(msg);
	localStorage.setItem('notifyHistory', JSON.stringify(history));
	loadNotify();
	e.target.reset();
}
if (document.getElementById('notifyForm')) {
	document.getElementById('notifyForm').onsubmit = addNotify;
	loadNotify();
}
// Später mit Passwortschutz und Funktionen ergänzen
