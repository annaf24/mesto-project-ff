// Конфигурация API
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
        authorization: '60463840-25c8-497b-85f3-b32d12713a21',
        'Content-Type': 'application/json'
    }
}
  
// Обработчик ответа сервера
const getResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

// Загрузка информации о пользователе с сервера (GET)
export const getUserInfo = () => {
	return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(getResponse)
    // .then((data) => {
    //     console.log( data); // Выводим данные в консоль
    //   })
}

// Загрузка карточек с сервера (GET)
export const getInitialCardsRequest = () => {
	return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(getResponse)
    // .then((data) => {
    //     console.log( data); // Выводим данные в консоль
    //   })
}

// Редактирование профиля (PATCH)
export const updateProfileInfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
    })
    .then(getResponse)
}

// Добавление новой карточки (POST)
export const createNewCard = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(cardData)
    })
    .then(getResponse)
}

// Обновление аватара
export const updateAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
    .then(getResponse);
};

// Постановка/удаление лайка
export const putLikeAPI = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then(getResponse)
}

export const deleteLikeAPI = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(getResponse)
}

// Удаление карточки
export const deleteCardAPI = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
    .then(handleResponse)
}
