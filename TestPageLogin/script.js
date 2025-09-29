// Versicherungsportal JavaScript

// Warte bis DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Prüfe ob Benutzer eingeloggt ist
    checkLoginStatus();

    // Login-Formular behandeln
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout-Button behandeln
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

// Login-Status prüfen
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('insurancePortalLoggedIn');
    const currentPath = window.location.pathname;

    // Wenn nicht eingeloggt und nicht auf Login-Seite
    if (!isLoggedIn && !currentPath.includes('index.html')) {
        window.location.href = 'index.html';
        return;
    }

    // Wenn eingeloggt und auf Login-Seite, weiterleiten zum Dashboard
    if (isLoggedIn && currentPath.includes('index.html')) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Benutzername anzeigen wenn eingeloggt
    if (isLoggedIn) {
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay) {
            const username = localStorage.getItem('insurancePortalUsername') || 'User';
            usernameDisplay.textContent = username;
        }
    }
}

// Login behandeln
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Einfache Authentifizierung
    if (username === 'User' && password === '123456') {
        // Login erfolgreich
        localStorage.setItem('insurancePortalLoggedIn', 'true');
        localStorage.setItem('insurancePortalUsername', username);

        // Weiterleitung zum Dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Login fehlgeschlagen
        errorMessage.textContent = 'Ungültiger Benutzername oder Passwort';
        errorMessage.style.display = 'block';

        // Formular zurücksetzen
        document.getElementById('password').value = '';
    }
}

// Logout behandeln
function handleLogout() {
    // Session-Daten löschen
    localStorage.removeItem('insurancePortalLoggedIn');
    localStorage.removeItem('insurancePortalUsername');

    // Zur Login-Seite weiterleiten
    window.location.href = 'index.html';
}

// Download-Funktion für Buttons
function downloadFile(filePath) {
    // Erstelle einen temporären Link zum Herunterladen
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Hilfsfunktion für Navigation (falls benötigt)
function navigateTo(page) {
    window.location.href = page;
}

// Simuliere einige interaktive Features
document.addEventListener('DOMContentLoaded', function() {
    // Füge Hover-Effekte zu Karten hinzu
    const cards = document.querySelectorAll('.card, .download-item, .mail-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Simuliere Ladezeiten für Downloads
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Wird geladen...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        });
    });
});

// Error-Handling für fehlende Dateien
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
        console.warn('Fehler beim Laden der Ressource:', e.target.src || e.target.href);
    }
}, true);
