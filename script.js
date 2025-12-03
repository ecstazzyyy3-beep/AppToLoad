// Инициализация сайта
document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    updateYear();
    setupScrollListener();
    checkLoginStatus();
    
    // Имитация рекламы
    setInterval(() => {
        const ads = [
            "Скачай сейчас и получи бонус!",
            "Премиум доступ временно закрыт",
            "Безопасные загрузки с AppToLoad"
        ];
        const randomAd = ads[Math.floor(Math.random() * ads.length)];
        document.querySelector('.ad-banner span:nth-child(2)').textContent = randomAd;
    }, 5000);
});

// Загрузка игр
async function loadGames() {
    const games = [
        {
            id: 1,
            name: "Minecraft",
            description: "Создавайте и исследуйте бесконечные миры",
            downloads: "100M+",
            rating: "4.8",
            icon: "fas fa-cube"
        },
        {
            id: 2,
            name: "Among Us",
            description: "Найдите предателя на космическом корабле",
            downloads: "50M+",
            rating: "4.5",
            icon: "fas fa-user-astronaut"
        },
        {
            id: 3,
            name: "Genshin Impact",
            description: "Открытый мир с элементами RPG",
            downloads: "80M+",
            rating: "4.7",
            icon: "fas fa-wind"
        },
        {
            id: 4,
            name: "Roblox",
            description: "Играйте в созданные игроками миры",
            downloads: "200M+",
            rating: "4.3",
            icon: "fas fa-gamepad"
        },
        {
            id: 5,
            name: "PUBG Mobile",
            description: "Королевская битва на мобильном",
            downloads: "150M+",
            rating: "4.6",
            icon: "fas fa-crosshairs"
        },
        {
            id: 6,
            name: "Clash of Clans",
            description: "Стройте деревню и сражайтесь",
            downloads: "120M+",
            rating: "4.4",
            icon: "fas fa-fort-awesome"
        }
    ];

    const gamesGrid = document.getElementById('games-grid');
    gamesGrid.innerHTML = games.map(game => `
        <div class="game-card">
            <div class="game-img">
                <i class="${game.icon}"></i>
            </div>
            <div class="game-info">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <div class="game-stats">
                    <span><i class="fas fa-download"></i> ${game.downloads}</span>
                    <span><i class="fas fa-star"></i> ${game.rating}</span>
                </div>
                <button class="download-btn" onclick="downloadGame(${game.id})">
                    <i class="fas fa-download"></i> Скачать
                </button>
                <div class="store-links">
                    <button class="store-btn" onclick="redirectToStore('play', ${game.id})">
                        <i class="fab fa-google-play"></i> Play
                    </button>
                    <button class="store-btn" onclick="redirectToStore('appstore', ${game.id})">
                        <i class="fab fa-app-store"></i> App Store
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Проверка файла через Virus Total
function checkFile() {
    const fileUrl = document.getElementById('file-url').value;
    if (!fileUrl) {
        alert('Пожалуйста, введите URL файла');
        return;
    }

    const results = document.getElementById('vt-results');
    const scanDate = document.getElementById('scan-date');
    const fileSize = document.getElementById('file-size');
    const fileHash = document.getElementById('file-hash');

    // Имитация проверки
    results.innerHTML = `
        <div class="vt-status safe">
            <i class="fas fa-sync-alt fa-spin"></i>
            <p>Проверяем файл...</p>
        </div>
    `;

    setTimeout(() => {
        const isSafe = Math.random() > 0.1; // 90% шанс что файл безопасен
        
        if (isSafe) {
            results.innerHTML = `
                <div class="vt-status safe">
                    <i class="fas fa-check-circle"></i>
                    <p>Файл безопасен. 0/70 антивирусов обнаружили угрозы</p>
                </div>
                <div class="vt-details">
                    <h4>Детали проверки:</h4>
                    <ul>
                        <li>Дата проверки: <span id="scan-date">${new Date().toLocaleString()}</span></li>
                        <li>Размер файла: <span id="file-size">${(Math.random() * 100).toFixed(2)} MB</span></li>
                        <li>Хеш SHA-256: <span id="file-hash">${generateHash()}</span></li>
                    </ul>
                </div>
            `;
        } else {
            results.innerHTML = `
                <div class="vt-status" style="color: var(--danger-color);">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Обнаружены угрозы! 3/70 антивирусов обнаружили вредоносный код</p>
                </div>
                <div class="vt-details">
                    <h4>Детали проверки:</h4>
                    <ul>
                        <li>Дата проверки: <span id="scan-date">${new Date().toLocaleString()}</span></li>
                        <li>Статус: <span style="color: var(--danger-color);">ОПАСНО</span></li>
                        <li>Рекомендуем не скачивать этот файл</li>
                    </ul>
                </div>
            `;
        }
    }, 2000);
}

function generateHash() {
    return Array.from({length: 64}, () => 
        Math.floor(Math.random() * 16).toString(16)
    ).join('');
}

// Система пользователей
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('apptoload_user'));
    const loginBtn = document.querySelector('.login-btn');
    
    if (user) {
        if (loginBtn) {
            loginBtn.innerHTML = `<i class="fas fa-user"></i> ${user.name}`;
            loginBtn.href = "pages/profile.html";
        }
    }
}

// Регистрация/Вход
function registerUser() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const name = document.getElementById('reg-name').value;

    if (!email || !password || !name) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const user = {
        email,
        password,
        name,
        joinDate: new Date().toISOString(),
        downloads: 0,
        premium: false
    };

    localStorage.setItem('apptoload_user', JSON.stringify(user));
    alert('Регистрация успешна!');
    window.location.href = "index.html";
}

function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Простая проверка (в реальном приложении нужно проверять на сервере)
    const user = JSON.parse(localStorage.getItem('apptoload_user'));
    
    if (user && user.email === email && user.password === password) {
        alert('Вход успешен!');
        window.location.href = "../index.html";
    } else {
        alert('Неверный email или пароль');
    }
}

function updateProfile() {
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    
    const user = JSON.parse(localStorage.getItem('apptoload_user'));
    if (user) {
        user.name = name;
        user.email = email;
        localStorage.setItem('apptoload_user', JSON.stringify(user));
        alert('Профиль обновлен!');
    }
}

// Скачивание игры
function downloadGame(gameId) {
    const user = JSON.parse(localStorage.getItem('apptoload_user'));
    
    if (!user) {
        if (confirm('Для скачивания необходимо войти в систему. Перейти на страницу входа?')) {
            window.location.href = "pages/login.html";
        }
        return;
    }

    // Имитация скачивания
    const downloadBtn = event.target;
    const originalText = downloadBtn.innerHTML;
    
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Скачивание...';
    downloadBtn.disabled = true;

    // Обновляем статистику пользователя
    user.downloads++;
    localStorage.setItem('apptoload_user', JSON.stringify(user));

    setTimeout(() => {
        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Скачано!';
        
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 2000);
    }, 3000);
}

// Перенаправление в магазины
function redirectToStore(store, gameId) {
    const gameNames = [
        "Minecraft",
        "Among Us", 
        "Genshin Impact",
        "Roblox",
        "PUBG Mobile",
        "Clash of Clans"
    ];
    
    const gameName = gameNames[gameId - 1];
    
    const stores = {
        'play': `https://play.google.com/store/search?q=${encodeURIComponent(gameName)}`,
        'appstore': `https://apps.apple.com/search?term=${encodeURIComponent(gameName)}`
    };
    
    window.open(stores[store], '_blank');
}

// Закрытие рекламы
function closeAd() {
    document.getElementById('ad-banner').style.display = 'none';
}

// Обновление года в подвале
function updateYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Фиксированный текст при прокрутке
function setupScrollListener() {
    const footerFixed = document.querySelector('.footer-fixed');
    
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            footerFixed.style.display = 'none';
        } else {
            footerFixed.style.display = 'block';
        }
    });
}