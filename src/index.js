import './pages/index.css';
import {createCard, deleteCard, likeCard} from "./scripts/components/card.js";
import {openModal, closeModal} from "./scripts/components/modal.js";
import {enableValidation, clearValidation} from './scripts/components/validation.js';
import {getUserInfo, getInitialCardsRequest, updateProfileInfo, createNewCard, updateAvatar} from './scripts/components/api.js'

// DOM-элементы

// Общие контейнеры
const placesList = document.querySelector('.places__list');

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_avatar');

// Формы внутри попапов
const popupEditForm = document.querySelector('.popup__form[name="edit-profile"]');
const popupNewCardForm = document.querySelector('.popup__form[name="new-place"]');
const editAvatarForm = document.querySelector('.popup__form[name="edit-avatar"]');

//Элементы редактирования профиля
const editProfileFormElement = popupEdit.querySelector('.popup__form');
const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
const jobInput = editProfileFormElement.querySelector('.popup__input_type_description');

// Профиль пользователя
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Элементы добавления карточки
const newCardForm = popupNewCard.querySelector('.popup__form');
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');

// Элементы попапа изображения
const popupImageElement = popupImage.querySelector('.popup__image');
const imagePopupCaptionElement = popupImage.querySelector('.popup__caption');

// Элементы добавления аватара
const avatarUrlInput = editAvatarForm.querySelector('.popup__input_type_avatar');

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

// Информирование пользователя о процессе загрузки
const loading = {
    start: btn => btn.textContent = 'Сохранение...',
    stop: btn => btn.textContent = 'Сохранить'
}

// Функция добавления обработчиков для закрытия модального окна
const addListenerFunction = (elementModal) => {
    const closeButton = elementModal.querySelector('.popup__close');
    closeButton.addEventListener("click", () => {
        closeModal(elementModal);
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

// ФОРМА РЕДАКТИРОВАНИЯ ИНФОРМАЦИИ О СЕБЕ

// Обработчик события клика на кнопку редактирования профиля
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(popupEditForm, validationConfig);
    openModal(popupEdit);
});

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
    loading.start(evt.submitter);
    evt.preventDefault();

    const newUserData = {
        name: nameInput.value,
        about: jobInput.value
    };

    updateProfileInfo(newUserData)
    .then((newUserData) => {
        profileName.textContent = newUserData.name;
        profileJob.textContent = newUserData.about;
        closeModal(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally (() => {
        loading.stop(evt.submitter)}
    );
}

// ФОРМА ДОБАВЛЕНИЕ КАРТОЧЕК

// Обработчик события клика на кнопку добавления карточки
addButton.addEventListener('click', () => {
    newCardForm.reset();
    clearValidation(popupNewCardForm, validationConfig);
    openModal(popupNewCard);
});

// Обработчик отправки полей карточки
function handleNewCardSubmit(evt) {
    loading.start(evt.submitter);
    evt.preventDefault();

    // Получение значений полей
    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    createNewCard(cardData)
    .then ((card) => {
        const newCard = createCard(card, deleteCard, openImageModal, likeCard, myId);
        placesList.prepend(newCard);
        closeModal(popupNewCard);
        newCardForm.reset();
    })
    .catch (err => console.error(err))
    .finally (() => {
        loading.stop(evt.submitter)}
    );
}

// ИЗМЕНЕНИЕ АВАТАРКИ

// Установка слушателя клика по аватарке
profileImage.addEventListener('click', () => {
	editAvatarForm.reset();
	clearValidation(editAvatarForm, validationConfig);
	openModal(popupEditAvatar);
})

// Обработчик отправки новой аватврки
function handleAvatarSubmit(evt) {
    evt.preventDefault();
    const avatarUrl = avatarUrlInput.value;
    updateAvatar(avatarUrl)
    .then((avatar) => {
        profileImage.style.backgroundImage = `url(${avatar.avatar})`;
        editAvatarForm.reset();
        closeModal(popupEditAvatar);
    })
    .catch(err => console.log(err));
}

Promise.all([getUserInfo(), getInitialCardsRequest()])
  .then(([user, cards])=>{
    myId = user._id;
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
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

// Обработчики события “submit” - «отправка»
editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardSubmit);
editAvatarForm.addEventListener('submit', handleAvatarSubmit);

// Добавление слушателей для закрытия попапов
addListenerFunction(popupEdit);
addListenerFunction(popupNewCard);
addListenerFunction(popupImage);
addListenerFunction(popupEditAvatar);

enableValidation(validationConfig);