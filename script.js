// Массив с отзывами
const testimonials = [
    {
        text: "Купил цифровую пыль. Файл весит 0 КБ, как и обещали. Теперь я чувствую себя просветленным и минималистичным. Спасибо!",
        author: "Игорь В., коллекционер невесомого"
    },
    {
        text: "Определитель одеял изменил мою жизнь! Теперь я точно знаю, что какое-то одеяло чьё-то. Супркг спит под пальто.",
        author: "Вероника Н., владелеца 2 одеял"
    },
    {
        text: "Аромат ''Пукнушки'' - это шедевр! На работе все спрашивают, чем это я так смело пахну...",
        author: "Игорь В., офисный смельчак"
    },
    {
        text: "Купила невидимый курсор. Теперь я трачу больше времени на поиск курсора, чем на работу. Продуктивность упала, зато осознанность выросла!",
        author: "Вероника Н., digital-ниндзя"
    },
    {
        text: "Плачу $9.99 в месяц за отписку от писем. Это дешевле, чем терапия по лечению спамофобии. Рекомендую!",
        author: "Игорь В., антиспам-активист"
    },
    {
        text: "Пазл 'Дзен и ярость' действительно работает! Первые 2 недели - дзен, потом - чистая ярость. Теперь я понимаю буддийских монахов.",
        author: "Игорь В., искатель просветления"
    },
    {
        text: "Сертификат на отложенные решения - гениально! Заплатила год назад, до сих пор не решила, что мне не нужно. Ощущение, что подарок еще впереди!",
        author: "Вероника Н., мастер прокрастинации"
    },
    {
        text: "Синхронное плавание в одиночку - это новый вид медитации. Особенно когда пытаешься синхронизироваться с самим собой.",
        author: "Игорь В., одиночный синхронист"
    }
];

// Функция для генерации случайных отзывов
function generateRandomTestimonials() {
    // Создаем копию массива, чтобы не изменять оригинал
    let availableTestimonials = [...testimonials];
    
    // Выбираем первый случайный отзыв
    const firstIndex = Math.floor(Math.random() * availableTestimonials.length);
    const firstTestimonial = availableTestimonials[firstIndex];
    
    // Удаляем выбранный отзыв из доступных, чтобы не повторяться
    availableTestimonials.splice(firstIndex, 1);
    
    // Выбираем второй случайный отзыв
    const secondIndex = Math.floor(Math.random() * availableTestimonials.length);
    const secondTestimonial = availableTestimonials[secondIndex];
    
    // Обновляем отзывы на странице
    document.getElementById('testimonial-text-1').textContent = `"${firstTestimonial.text}"`;
    document.getElementById('testimonial-author-1').innerHTML = `<strong>${firstTestimonial.author.split(', ')[0]}</strong>, ${firstTestimonial.author.split(', ')[1]}`;
    
    document.getElementById('testimonial-text-2').textContent = `"${secondTestimonial.text}"`;
    document.getElementById('testimonial-author-2').innerHTML = `<strong>${secondTestimonial.author.split(', ')[0]}</strong>, ${secondTestimonial.author.split(', ')[1]}`;
}

// Обновляем функцию generateRandomGift
function generateRandomGift() {
    if (giftsLeft <= 0) {
        alert("Все подарки закончились! Возвращайтесь завтра.");
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-ban"></i><span>Подарки закончились</span>';
        return;
    }
    
    // Выбираем случайный подарок из массива
    const randomIndex = Math.floor(Math.random() * absurdGifts.length);
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
    discountPercent.textContent = gift.discount > 0 ? `-${gift.discount}%` : "Без скидки";
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
    
    // Генерируем новые отзывы
    generateRandomTestimonials();
    
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

// Обновляем функцию init
function init() {
    // Запускаем основной таймер
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Запускаем таймер подарка
    setInterval(updateGiftTimer, 1000);
    
    // Генерируем начальные отзывы
    generateRandomTestimonials();
    
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

// Массив абсурдных подарков
const absurdGifts = [
    {
        title: "Платный курсор-невидимка (Premium опция)",
        description: "Эксклюзивный скин для курсора, который делает его полностью прозрачным. Идеально для тех, кто любит искать иголку в стоге сена на своем экране. Включает инструкцию по поиску собственного курсора.",
        originalPrice: 4999,
        discount: 40,
        icon: "fas fa-mouse-pointer"
    },
    {
        title: "Премиум-отписка от наших писем",
        description: "Устали от наших спам-писем? Теперь вы можете от них отписаться! Всего за $9.99 в месяц мы перестанем слать вам письма (но можем начать слать SMS).",
        originalPrice: 1499,
        discount: 0,
        icon: "fas fa-envelope"
    },
    {
        title: "Пазл из 10 000 белых деталей 'Дзен и ярость'",
        description: "Медитативный пазл для настоящих самураев. Все детали одинакового белого цвета. Собрав его, вы получите... чистый белый лист. И новую ступень просветления.",
        originalPrice: 12999,
        discount: 25,
        icon: "fas fa-puzzle-piece"
    },
    {
        title: "Подарочный сертификат на отложенные решения",
        description: "Заплатите сейчас, а решите потом, что вам не нужно! Сертификат действует 10 лет и дает право на одну неопределенную покупку в будущем.",
        originalPrice: 9999,
        discount: 30,
        icon: "fas fa-clock"
    },
    {
        title: "Цифровая пыль. Эксклюзивный файл весом 0 КБ",
        description: "Подчеркивает ваш минимализм и статус. Цифровой артефакт для истинных ценителей пустоты. В комплекте: пустой файл, ничего, пустота.",
        originalPrice: 19999,
        discount: 50,
        icon: "fas fa-file"
    },
    {
        title: "Премиум-курс 'Одеяльная детекция: от теории к практике'",
        description: "Глубокое погружение в мир идентификации постельных принадлежностей. Модули: 'Тактильный анализ', 'Ольфакторная экспертиза', 'Историческая реконструкция происхождения одеяла'. Сертификат международного образца.",
        originalPrice: 45999,
        discount: 55,
        icon: "fas fa-search"
    },
    {
        title: "ДНК-тест для одеял 'Чьё же оно?'",
        description: "Лабораторный анализ волокон одеяла с построением генетического профиля каждого члена семьи. Результат: 100% точное определение принадлежности.",
        originalPrice: 32999,
        discount: 40,
        icon: "fas fa-dna"
    },
    {
        title: "Консультация эксперта по определению принадлежности одеял",
        description: "Ваш персональный специалист поможет разобраться, какое одеяло чьё. Включает 3 сеанса видеоконсультаций и итоговый отчет с цветовой маркировкой.",
        originalPrice: 14999,
        discount: 35,
        icon: "fas fa-user-tie"
    },
    {
        title: "Элитный аромат 'Пукнушка' от парфюмерного дома Veronica",
        description: "Утонченная парфюмерная композиция с нотами бобовых, капусты и легким оттенком сюрприза. Для тех, кто ценит дерзость и хочет оставить незабываемое впечатление.",
        originalPrice: 29999,
        discount: 40,
        icon: "fas fa-wind"
    },
    {
        title: "Дизайнерский освежитель воздуха 'Пукнушка'",
        description: "Эксклюзивная коллекция освежителей от знаменитого дизайнера 'Veronica'. Теперь ваша туалетная комната будет пахнуть... ну, вы поняли.",
        originalPrice: 12999,
        discount: 45,
        icon: "fas fa-spray-can"
    },
    {
       title: "Набор ароматических свечей 'Пукнушки'",
       description: "Уютные свечи ручной работы с натуральным воском и ароматом домашнего уюта. Идеальный подарок для создания расслабляющей атмосферы после сытного ужина.",
       originalPrice: 8999,
       discount: 35,
       icon: "fas fa-smog"
    },
    {
        title: "Подарочный сертификат на аренду яхты в пустыне",
        description: "Мечтали поплавать на яхте, но живете за тысячи километров от моря? Теперь у вас есть эта уникальная возможность!",
        originalPrice: 25000,
        discount: 30,
        icon: "fas fa-ship"
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
        title: "Скидка на пожизненную подписку на газету 1985 года",
        description: "Каждый день вы будете получать свежий номер старой газеты. Узнайте, что было актуально 40 лет назад!",
        originalPrice: 30000,
        discount: 70,
        icon: "fas fa-newspaper"
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
    
    // Более случайный выбор подарка
    const randomIndex = Math.floor(Math.random() * absurdGifts.length);
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
    discountPercent.textContent = gift.discount > 0 ? `-${gift.discount}%` : "Без скидки";
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
