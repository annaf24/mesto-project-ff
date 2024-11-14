// Функция для закрытия попапа по нажатию Esc
const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
};

// Функция для открытия модального окна
export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener("keyup", handleEscKeyUp)
}

// Функция для закрытия модального окна
export const closeModal= (modal) => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener("keyup", handleEscKeyUp)
};

// Функция добавления обработчиков для закрытия модального окна
export const addListenerFunction = (elementModal) => {
    const closeButton = elementModal.querySelector('.popup__close');
    closeButton.addEventListener("click", () => {
        closeModal(elementModal)
});

elementModal.addEventListener("mousedown", (event) => {
    if (event.target === elementModal) {
        closeModal(elementModal);
}});
}