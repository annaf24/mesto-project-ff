import './pages/index.css';
//import {initialCards} from "./scripts/components/cards.js";
import {createCard, deleteCard, likeCard} from "./scripts/components/card.js";
import {openModal, closeModal} from "./scripts/components/modal.js";
import {enableValidation, clearValidation} from './scripts/components/validation.js';
import {getUserInfo, getInitialCardsRequest, updateProfileInfo, createNewCard} from './scripts/components/api.js'

//DOM-элементы
const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.querySelector('.popup__form[name="edit-profile"]')
const popupNewCardForm = document.querySelector('.popup__form[name="new-place"]')
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image')
const editProfileFormElement = popupEdit.querySelector('.popup__form');
const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
const jobInput = editProfileFormElement.querySelector('.popup__input_type_description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupImageElement = popupImage.querySelector('.popup__image');
const imagePopupCaptionElement = popupImage.querySelector('.popup__caption');
const newCardForm = popupNewCard.querySelector('.popup__form');
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');
// const popupAvatar = document.querySelector('.')
// const buttonSubmit = document.querySelector('.popup__button');

let myId = null;


// Настройка параметров валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Функция добавления обработчиков для закрытия модального окна
const addListenerFunction = (elementModal) => {
    const closeButton = elementModal.querySelector('.popup__close');
    closeButton.addEventListener("click", () => {
        closeModal(elementModal)
});

elementModal.addEventListener("mousedown", (event) => {
    if (event.target === elementModal) {
        closeModal(elementModal);
}});
}

// Открытие попапа с изображениями
function openImageModal(link, name) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    imagePopupCaptionElement.textContent = name;
    openModal(popupImage);
}

// // Открытие попапов по клику РАБОТАЕТ БЕЗ НИХ
// editButton.addEventListener('click', () => openModal(popupEdit));
// addButton.addEventListener('click', () => openModal(popupNewCard));

// ФОРМА РЕДАКТИРОВАНИЯ ИНФОРМАЦИИ О СЕБЕ


// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    // Получите значение полей
    // const nameValue = nameInput.value;
    // const jobValue = jobInput.value;

    const newUserData = {
        name: nameInput.value,
        about: jobInput.value
    };

    updateProfileInfo(newUserData)
    .then((userData) => {
        console.log(userData);
        profileName.textContent = newUserData.name;
        profileJob.textContent = newUserData.about;
        closeModal(popupEdit);
    })
    .catch(err => console.log(err)) 
}

// Обработчик события клика на кнопку редактирования профиля
editButton.addEventListener('click', () => {
    // Заполнение полей формы текущими значениями со страницы
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    // clearValidation(popupEditForm, validationConfig);
    // Открытие модального окно редактирования
    openModal(popupEdit);
});

// Обработчик события “submit” - «отправка»
editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);



// ФОРМА ДОБАВЛЕНИЕ КАРТОЧЕК

// Очистка полей формы при открытии
addButton.addEventListener('click', () => {
    newCardForm.reset();
    // clearValidation(popupNewCard, validationConfig);
    openModal(popupNewCard);
});

function handleNewCardSubmit(evt) {
    evt.preventDefault();

    // Получение значений полей
    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    createNewCard(cardData)
    .then ((card) => {
        // Создание новой карточки и добавление её в начало контейнера
        console.log(card);
        const newCard = createCard(card, deleteCard, openImageModal, likeCard, myId);
        placesList.prepend(newCard); // Добавляем карточку в начало списка
        // Закрытие попапа после добавления, очищение полей формы
        closeModal(popupNewCard);
        newCardForm.reset();
    })
    .catch (err => console.error(err))
}

//ПОСМОТРЕТЬ ЕЩЕ РАЗ
newCardForm.addEventListener('submit', handleNewCardSubmit);

Promise.all([getUserInfo(), getInitialCardsRequest()])
  .then(([user, cards])=>{
    console.log('User:', user);
    console.log('Cards:', cards);

    myId = user._id;
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    cards.forEach((element) => {
        const newCard = createCard(
            element,
            deleteCard,
            openImageModal,
            likeCard,
            myId
        );
        placesList.append(newCard);
    });
})
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
})



// Добавление слушателей для закрытия попапов
addListenerFunction(popupEdit);
addListenerFunction(popupNewCard);
addListenerFunction(popupImage);

enableValidation(validationConfig);