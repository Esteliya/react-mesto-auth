const BASE_URL = 'https://auth.nomoreparties.co'

//проверяем ответ сервера
const response = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }

}

//запрос проверки ответа НЕ РАБОТАЕТ - ПРОВЕРИТЬ!!!
const request = (urlEndpoint, options) => {
    return fetch(`${BASE_URL}${urlEndpoint}`, options)
        .then(response);
}

//регистрация пользователя 
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(response)
}

//авторизация пользователя
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(response)
}

//проверка пользователя
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(response)

}