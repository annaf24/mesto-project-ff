import './pages/index.css';
import {initialCards} from "./scripts/cards.js";
import {createCard, deleteCard} from "./components/card.js";
import {openModal, closeModal, addListenerFunction} from "./components/modal.js";

//DOM-элементы
const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileName = document.querySelector('.profile__title'); // Элемент имени на странице
const profileJob = document.querySelector('.profile__description'); // Элемент информации о себе на странице
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name'); // Поле для имени
const jobInput = formElement.querySelector('.popup__input_type_description'); // Поле для информации о себе


// Кнопки для открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Элементы попапа с изображением
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');

// Открытие попапа с изображениями
function openImageModal(link, name) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaptionElement.textContent = name;
    openModal(popupImage);
}

// Вывод карточек на страницу
initialCards.forEach((element) => {
    placesList.append(createCard(element, deleteCard, openImageModal));
});

// Открытие попапов по клику
editButton.addEventListener('click', () => openModal(popupEdit));
addButton.addEventListener('click', () => openModal(popupNewCard));

// Добавление слушателей для закрытия попапов
addListenerFunction(popupEdit);
addListenerFunction(popupNewCard);
addListenerFunction(popupImage);

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile__title'); // Элемент имени на странице
    const profileJob = document.querySelector('.profile__description'); // Элемент информации о себе на странице
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;

    closeModal(popupEdit);
}

// Добавляем обработчик события клика на кнопку редактирования профиля
editButton.addEventListener('click', () => {
    // Заполняем поля формы текущими значениями со страницы
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    // Открываем модальное окно редактирования
    openModal(popupEdit);
});
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

addListenerFunction(popupEdit);
addListenerFunction(popupNewCard);
addListenerFunction(popupImage);