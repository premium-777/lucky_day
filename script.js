// Массив абсурдных подарков
const absurdGifts = [
    {
        title: "Скидка 50% на курсы по садоводству для жителей многоэтажек",
        description: "Изучите премудрости ландшафтного дизайна для вашего подоконника. В подарок - набор семян кактусов, которые невозможно убить.",
        originalPrice: 14999,
        discount: 50,
        icon: "fas fa-seedling"
    },
    {
        title: "Подарочный сертификат на аренду яхты в пустыне",
        description: "Мечтали поплавать на яхте, но живете за тысячи километров от моря? Теперь у вас есть эта уникальная возможность!",
        originalPrice: 25000,
        discount: 30,
        icon: "fas fa-ship"
    },
    {
        title: "Курс игры на волынке для начинающих",
        description: "Ваши соседи будут в восторге! Получите базовые навыки игры на самом громком музыкальном инструменте.",
        originalPrice: 12000,
        discount: 40,
        icon: "fas fa-music"
    },
    {
        title: "Скидка на аппарат для приготовления облачного попкорна",
        description: "Технология будущего уже здесь! Готовьте попкорн из облаков (придется купить облака отдельно).",
        originalPrice: 35999,
        discount: 25,
        icon: "fas fa-cloud"
    },
    {
        title: "Эксклюзивный мастер-класс по плетению лаптей",
        description: "Возрождаем старинные традиции! После курса вы станете экспертом по древнерусской обуви.",
        originalPrice: 8999,
        discount: 60,
        icon: "fas fa-shoe-prints"
    },
    {
        title: "Подарочный набор для разведения дождевых червей",
        description: "Превратите свою квартиру в эко-ферму! В комплекте: инструкция, грунт и 10 особей редких червей.",
        originalPrice: 7500,
        discount: 35,
        icon: "fas fa-worm"
    },
    {
        title: "Абонемент на занятия синхронным плаванием для одного",
        description: "Освойте сложнейшие элементы водного балета в одиночку! Тренер будет направлять вас по видеосвязи.",
        originalPrice: 18000,
        discount: 45,
        icon: "fas fa-swimmer"
    },
    {
        title: "Курс выживания в джунглях для городских жителей",
        description: "Научитесь разводить огонь без спичек, строить укрытие из офисной мебели и находить воду в автопарке.",
        originalPrice: 22000,
        discount: 55,
        icon: "fas fa-tree"
    },
    {
        title: "Эксклюзивная скидка на золочение всего, что попадется под руку",
        description: "Позолотите свои старые кроссовки, сковородку или холодильник! Минимальный заказ - 5 кг.",
        originalPrice: 50000,
        discount: 20,
        icon: "fas fa-crown"
    },
    {
        title: "Мастер-класс по чтению мыслей домашних животных",
        description: "Наконец-то поймете, о чем думает ваш кот! Методика запатентована и абсолютно не работает.",
        originalPrice: 15000,
        discount: 50,
        icon: "fas fa-cat"
    },
    {
        title: "Скидка на пожизненную подписку на газету 1985 года",
        description: "Каждый день вы будете получать свежий номер старой газеты. Узнайте, что было актуально 40 лет назад!",
        originalPrice: 30000,
        discount: 70,
        icon: "fas fa-newspaper"
    },
    {
        title: "Курс по строительству иглу для жителей южных регионов",
        description: "Подготовьтесь к глобальному похолоданию, которого не предвидится! В подарок - виртуальный снег.",
        originalPrice: 13500,
        discount: 40,
        icon: "fas fa-igloo"
    }
];

// Переменные для состояния
let giftsLeft = 750;
let generatedGifts = [];

// Элементы DOM
const generateBtn = document.getElementById('generate-btn');
const giftTitle = document.getElementById('gift-title');
const giftDescription = document.getElementById('gift-description');
const originalPrice = document.getElementById('original-price');
const discountPrice = document.getElementById('discount-price');
const discountPercent = document.getElementById('discount-percent');
const giftMainIcon = document.getElementById('gift-main-icon');
const giftsLeftElement = document.getElementById('gifts-left');
const progressFill = document.getElementById('progress-fill');
const giftIdElement = document.getElementById('gift-id');
const giftTimerElement = document.getElementById('gift-timer');

// Элементы таймера
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Устанавливаем дату окончания акции (через 1 день)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 1);
countdownDate.setHours(23, 59, 59, 999);

// Таймер обратного отсчета
function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate.getTime() - now;
    
    if (distance < 0) {
        // Время истекло
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-ban"></i><span>Акция завершена</span>';
        generateBtn.style.opacity = "0.7";
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Обновляем таймер подарка
    updateGiftTimer();
}

// Таймер для конкретного подарка (5 минут)
let giftEndTime = null;

function startGiftTimer() {
    giftEndTime = new Date();
    giftEndTime.setMinutes(giftEndTime.getMinutes() + 5);
    updateGiftTimer();
}

function updateGiftTimer() {
    if (!giftEndTime) return;
    
    const now = new Date();
    const distance = giftEndTime.getTime() - now.getTime();
    
    if (distance < 0) {
        giftTimerElement.textContent = "00:00";
        return;
    }
    
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    giftTimerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Генерация случайного подарка
function generateRandomGift() {
    if (giftsLeft <= 0) {
        alert("Все подарки закончились! Возвращайтесь завтра.");
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-ban"></i><span>Подарки закончились</span>';
        return;
    }
    
    // Выбираем случайный подарок из массива
    const randomIndex = Math.floor(Math.abs(Math.sin(generatedGifts.length) * 1000)) % absurdGifts.length;
    const gift = absurdGifts[randomIndex];
    
    // Генерируем уникальный ID
    const giftId = Math.floor(Math.random() * 900) + 100;
    
    // Вычисляем цену со скидкой
    const discountedPrice = Math.round(gift.originalPrice * (1 - gift.discount / 100));
    
    // Обновляем DOM
    giftTitle.textContent = gift.title;
    giftDescription.textContent = gift.description;
    originalPrice.textContent = `${gift.originalPrice.toLocaleString()} ₽`;
    discountPrice.textContent = `${discountedPrice.toLocaleString()} ₽`;
    discountPercent.textContent = `-${gift.discount}%`;
    giftMainIcon.className = gift.icon;
    giftIdElement.textContent = giftId;
    
    // Уменьшаем количество оставшихся подарков
    giftsLeft--;
    giftsLeftElement.textContent = giftsLeft;
    
    // Обновляем прогресс бар
    const progressPercentage = (750 - giftsLeft) / 750 * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    // Запускаем таймер подарка
    startGiftTimer();
    
    // Добавляем подарок в историю
    generatedGifts.push({
        id: giftId,
        title: gift.title,
        timestamp: new Date()
    });
    
    // Анимация кнопки
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Генерируем еще...</span>';
    generateBtn.disabled = true;
    
    setTimeout(() => {
        generateBtn.innerHTML = '<i class="fas fa-magic"></i><span>Сгенерировать подарок</span>';
        generateBtn.disabled = false;
    }, 1500);
}

// Инициализация
function init() {
    // Запускаем основной таймер
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Запускаем таймер подарка
    setInterval(updateGiftTimer, 1000);
    
    // Событие для кнопки генерации
    generateBtn.addEventListener('click', generateRandomGift);
    
    // Генерируем первый подарок при загрузке
    setTimeout(generateRandomGift, 1000);
    
    // Добавляем эффект параллакса для декоративных элементов
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const circles = document.querySelectorAll('.decoration-circle');
        circles.forEach((circle, index) => {
            const speed = index === 0 ? 0.05 : index === 1 ? 0.03 : 0.07;
            circle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// Запускаем при полной загрузке страницы
window.addEventListener('load', init);
