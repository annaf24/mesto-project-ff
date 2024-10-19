// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;

    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

const placesList = document.querySelector('.places__list'); 

initialCards.forEach((element) => {
    placesList.append(createCard(element, deleteCard));
});