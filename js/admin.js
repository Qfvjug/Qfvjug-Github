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
// Später mit Passwortschutz und Funktionen ergänzen
