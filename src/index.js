import './pages/index.css';
import {initialCards} from "./scripts/cards.js";
import {createCard, deleteCard} from "./components/card.js";
import {openModal, closeModal, addListenerFunction} from "./components/modal.js";

//DOM-элементы
const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');
const newCardForm = popupNewCard.querySelector('.popup__form');
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');

// Открытие попапа с изображениями
function openImageModal(link, name) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaptionElement.textContent = name;
    openModal(popupImage);
}

// Вывод карточек на страницу
initialCards.forEach((element) => {
    placesList.append(createCard(element, deleteCard, openImageModal, likeCard));
});

// Открытие попапов по клику
editButton.addEventListener('click', () => openModal(popupEdit));
addButton.addEventListener('click', () => openModal(popupNewCard));

// ФОРМА РЕДАКТИРОВАНИЯ ИНФОРМАЦИИ О СЕБЕ

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();

    // Получите значение полей
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Вставьте новых значений
    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;

    closeModal(popupEdit);
}

// Обработчик события клика на кнопку редактирования профиля
editButton.addEventListener('click', () => {

    // Заполнение полей формы текущими значениями со страницы
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    // Открытие модального окно редактирования
    openModal(popupEdit);
});

// Обработчик события “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


// ФОРМА ДОБАВЛЕНИЕ КАРТОЧЕК

// Очистка полей формы при открытии
addButton.addEventListener('click', () => {
    placeNameInput.value = '';
    placeLinkInput.value = '';
    openModal(popupNewCard);
});

// Обработчик добавления новой карточки
function handleNewCardSubmit(evt) {
    evt.preventDefault();

    // Получение значений полей
    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    // Создание новой карточки и добавление её в начало контейнера
    const newCard = createCard(cardData, deleteCard, openImageModal, likeCard);
    placesList.prepend(newCard); // Добавляем карточку в начало списка

    // Закрытие попапа после добавления, очищение полей формы
    closeModal(popupNewCard);
    newCardForm.reset();
}

newCardForm.addEventListener('submit', handleNewCardSubmit);

// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ЛАЙКОВ
function likeCard(likeButtin) {
    likeButtin.classList.toggle('card__like-button_is-active');
}

// Добавление слушателей для закрытия попапов
addListenerFunction(popupEdit);
addListenerFunction(popupNewCard);
addListenerFunction(popupImage);