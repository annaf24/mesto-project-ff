const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
 export function createCard(cardData, deleteCard, handleImageClick) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;

    //Обработчик клика на изображение карточки
    cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

    // Обработчик клика для удаления карточки
    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}