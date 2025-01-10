import {deleteCardAPI, deleteLikeAPI, putLikeAPI} from "./api";

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
 export function createCard(cardData, deleteCard, handleImageClick, likeCard, myId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likesCount = cardElement.querySelector('.card__like-count');

    console.log(cardData);

    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;
    likesCount.textContent = cardData.likes.length;

    //Обработчик клика на изображение карточки
    cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

    // // Обработчик клика для удаления карточки
    // cardDeleteButton.addEventListener('click', () => deleteCard(cardElement, cardData._id));
    
    // const userLiked = cardData.likes.some(like => like._id === myId);
    // // if (userLiked) {
    // //     cardLikeButton.classList.add('card__like-button_is-active');
    // // }
    console.log(cardData.owner._id, myId);
    if (cardData.owner._id !== myId) {
        cardDeleteButton.remove();
    } else {
        cardDeleteButton.addEventListener('click', () => deleteCard(cardElement, cardData._id));
    }

    // Обработчик клика лайка
    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardData._id, likesCount));

    return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement, cardID) {
    deleteCardAPI(cardID)
    .then (() => {
        cardElement.remove()
    })
    .catch(err => {
        console.log(`Ошибка при удалении карточки: ${err}`)
    })   
}

// Функция лайка карточки
export function likeCard(cardLikeButton, cardID, likesCount) {
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
        deleteLikeAPI(cardID) 
    .then((likedCard) => {
        cardLikeButton.classList.toggle('card__like-button_is-active')
        likesCount.textContent = likedCard.likes.length
    })
    .catch(err => {
        console.log(`Ошибка при установке лайка: ${err}`)
    })
    } else {
        putLikeAPI(cardID) 
    .then((likedCard) => {
        cardLikeButton.classList.toggle('card__like-button_is-active')
        likesCount.textContent = likedCard.likes.length
    })
    .catch(err => {
        console.log(`Ошибка при установке лайка: ${err}`)
    })
    }
    
}
    
