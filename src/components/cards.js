import { toggleLikeButton, deleteCard } from './api.js';
// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(cardData, curUserId){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeCount = cardElement.querySelector('.card__like-count');
    cardImg.alt = cardData.name;
    cardImg.src = cardData.link;
    cardTitle.textContent = cardData.name;
    cardLikeCount.textContent = cardData.likes.length;
    //Обработчик кнопки Лайк
    const likeButton = cardElement.querySelector('.card__like-button');
    //Обработчик кнопки Корзина
    const delButton = cardElement.querySelector('.card__delete-button');

    if (cardData.owner._id === curUserId){
        delButton.style.display = 'block';
    }
    else{
        delButton.style.display = 'none';
    }

    if (cardData.likes.find(user => user._id === curUserId) !== undefined){
        likeButton.classList.add('card__like-button_is-active');
    }
    else{
        likeButton.classList.remove('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        const hasLiked = likeButton.classList.contains('card__like-button_is-active');
        toggleLikeButton(cardData._id, hasLiked)
            .then((changedCard) => {
                cardData = changedCard;
                cardLikeCount.textContent = cardData.likes.length;

                if (cardData.likes.find(user => user._id === curUserId) !== undefined){
                    likeButton.classList.add('card__like-button_is-active');
                }
                else{
                    likeButton.classList.remove('card__like-button_is-active');
                }
            })
            .catch((err) => {
                console.error('Ошибка нажатия Лайка', err);
            });

    });


    delButton.addEventListener('click', () => {
        deleteCard(cardData._id)
        .then(() => cardElement.remove())
        .catch((err) => {
            console.error('Ошибка удаления карточки', err);
        });
    });

    return cardElement;
}

export {createCard};