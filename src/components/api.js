const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
      authorization: '09d511b4-e2f9-427f-a6ea-1c950098424f',
      'Content-Type': 'application/json'
    }
}
  
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error(err);
        alert('Произошла ошибка. Попробуйте позже.');
    });
}

export const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error(err);
        alert('Произошла ошибка. Попробуйте позже.');
    });
}

export const setProfileData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error(err);
        alert('Произошла ошибка. Попробуйте позже.');
    });
}

export const setAvatarImage = (newAvatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: newAvatarLink })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error(err);
        alert('Произошла ошибка. Попробуйте позже.');
    });
};

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error(err);
        alert('Произошла ошибка. Попробуйте позже.');
    });
};

export const toggleLikeButton = (cardId, hasLiked) => {
    const fetchMethod = hasLiked ? 'DELETE' : 'PUT';
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: fetchMethod,
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error(err);
        alert('Произошла ошибка. Попробуйте позже.');
    });
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error(err);
        alert('Произошла ошибка. Попробуйте позже.');
    });
};