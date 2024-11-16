const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
 export function createCard(cardData, deleteCard, handleImageClick, likeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton =cardElement.querySelector('.card__like-button');

    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;

    //Обработчик клика на изображение карточки
    cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

    // Обработчик клика для удаления карточки
    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    // Обработчик клика лайка
    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));

    return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}

// Функция лайка карточки
export function likeCard(likeButtin) {
    likeButtin.classList.toggle('card__like-button_is-active');
}