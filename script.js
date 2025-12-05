body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: radial-gradient(circle at center,
        #b7e4ff 0%,
        #7bbce7 40%,
        #3f6fa3 100%
    );
    color: white;
    overflow-x: hidden;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 60px;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.logo img {
    width: 56px;
    height: auto;
    border-radius: 15px;
}

.register-btn {
    background-color: white;
    color: black;
    border: none;
    border-radius: 25px;
    padding: 12px 45px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s ease;
}

.register-btn:hover {
    background-color: #e0e0e0;
}

.language-switcher {
    display: flex;
    align-items: center;
    gap: 10px;
}

.lang-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid #555;
    border-radius: 20px;
    color: white;
    font-weight: 500;
    padding: 6px 12px;
    cursor: pointer;
    transition: 0.3s;
}

.lang-btn img {
    width: 20px;
    height: 14px;
}

.lang-btn:hover,
.lang-btn.active {
    background: white;
    color: black;
    border-color: white;
}

main {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 70vh;
    padding-left: 60px;
    padding-top: 170px;
}

.content {
    max-width: 700px;
    transform: translateY(-20px);
}

h1 {
    font-size: 3rem;
    line-height: 1.2;
    margin-bottom: 20px;
}

p {
    font-size: 1.1rem;
    color: #ccc;
    line-height: 1.6;
}

.why-section {
    text-align: center;
    padding: 60px 60px;
    background: linear-gradient(
        to bottom,
        #598ec7,
        #3f6fa3
    );
}

.why-header h2 {
    font-size: 2.8rem;
    margin-bottom: 10px;
}

.why-header h3 {
    font-size: 2rem;
    font-weight: 400;
    color: #bdbdbd;
    margin-bottom: 50px;
}

.why-cards {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 60px;
    flex-wrap: wrap;
}

.card {
    width: 300px;
    text-align: center;
}

.card img {
    width: 100px;
    height: 100px;
    margin-bottom: 25px;
}

.card h4 {
    font-size: 1.3rem;
    margin-bottom: 10px;
}

.card p {
    color: #ccc;
    font-size: 1rem;
    line-height: 1.5;
}

.registration-window {
    display: none;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}

.registration-content {
    background: #1a1a1a;
    border-radius: 20px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

.registration-header {
    background: #2a2a2a;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
}

.registration-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
}

.close-registration {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s;
}

.close-registration:hover {
    color: white;
}

.registration-body {
    padding: 30px;
}

.input-group {
    margin-bottom: 25px;
}

.input-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #ccc;
}

.phone-input-container {
    display: flex;
    align-items: center;
}

.phone-input {
    background: #333;
    color: white;
    border: 1px solid #555;
    border-radius: 10px;
    padding: 12px 15px;
    font-size: 16px;
    width: 100%;
    transition: border-color 0.3s;
}

.phone-input:focus {
    outline: none;
    border-color: #0088cc;
}

.iti {
    width: 100%;
}

.iti--allow-dropdown input {
    width: 100%;
}

.iti__country-list {
    background: #1a1a1a;
    border: 1px solid #333;
}

.iti__country-name,
.iti__dial-code {
    color: #fff;
}

.iti__country.iti__highlight {
    background: #333;
}

.iti__divider {
    border-color: #333;
}

.iti__search-input {
    background: #222;
    color: #fff;
    border-color: #444;
}

.code-input {
    background: #333;
    color: white;
    border: 1px solid #555;
    border-radius: 10px;
    padding: 12px 15px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.code-input:focus {
    outline: none;
    border-color: #0088cc;
}

.code-hint {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
}

.submit-btn {
    background: #0088cc;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: background 0.3s;
    margin-top: 10px;
}

.submit-btn:hover {
    background: #0077b3;
}

.submit-btn:active {
    transform: translateY(1px);
}

/* --- MOBILE ADAPTATION --- */
@media (max-width: 768px) {

    header {
        padding: 15px 20px;
    }

    .logo img {
        width: 45px;
    }

    .register-btn {
        padding: 10px 25px;
        font-size: 0.9rem;
    }

    .lang-btn {
        padding: 5px 10px;
        font-size: 0.85rem;
    }

    /* Главный блок */
    main {
        padding: 30px 20px;
        height: auto;
        padding-top: 100px;
    }

    h1 {
        font-size: 2.2rem;
        text-align: center;
    }

    p {
        font-size: 1rem;
        text-align: center;
    }

    .content {
        max-width: 100%;
        transform: none;
    }

    /* Блок "Почему Aygram" */
    .why-section {
        padding: 40px 20px;
    }

    .why-cards {
        flex-direction: column;
        gap: 30px;
    }

    .card {
        width: 100%;
    }

    /* Окно регистрации на телефонах */
    .registration-content {
        width: 95%;
        border-radius: 15px;
    }

    .submit-btn {
        padding: 13px;
        font-size: 15px;
    }
}

/* --- VERY SMALL PHONES (iPhone SE, etc.) --- */
@media (max-width: 430px) {

    h1 {
        font-size: 1.9rem;
    }

    p {
        font-size: 0.95rem;
    }

    .register-btn {
        padding: 8px 20px;
        font-size: 0.85rem;
    }

    .lang-btn {
        padding: 4px 8px;
        font-size: 0.8rem;
    }

    .registration-content {
        width: 90%;
        padding: 0;
    }

    .submit-btn {
        padding: 12px;
        font-size: 14px;
    }
}

/* Добавьте в конец файла style.css */

.success-message {
  text-align: center;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.success-icon {
  font-size: 60px;
  margin-bottom: 20px;
  color: #4CAF50;
  animation: scaleIn 0.5s ease-out;
}

.success-text {
  font-size: 18px;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
  max-width: 300px;
}

.error-message {
  color: #ff6b6b;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  border-left: 3px solid #ff6b6b;
}

/* Стили для анимации загрузки */
.loading-spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #0088cc;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Стили для регистрации в мобильной версии */
@media (max-width: 768px) {
  .success-message {
    padding: 30px 15px;
    min-height: 150px;
  }
  
  .success-icon {
    font-size: 50px;
    margin-bottom: 15px;
  }
  
  .success-text {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .loading-spinner {
    width: 30px;
    height: 30px;
  }
  
  .error-message {
    font-size: 13px;
    padding: 6px 10px;
  }
}

/* Стили для очень маленьких телефонов */
@media (max-width: 430px) {
  .success-message {
    padding: 20px 10px;
    min-height: 120px;
  }
  
  .success-icon {
    font-size: 40px;
    margin-bottom: 10px;
  }
  
  .success-text {
    font-size: 14px;
    margin-bottom: 15px;
  }
  
  .loading-spinner {
    width: 25px;
    height: 25px;
    border-width: 2px;
  }
}
