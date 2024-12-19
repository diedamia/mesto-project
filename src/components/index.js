import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { createCard } from './cards.js';
import { enableValidation, checkValid } from './validate.js';
import { getInitialCards, setProfileData, getProfileData, setAvatarImage, addNewCard } from './api.js'



// Пользовательские данные профиля
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
let curUserId = 'none';
//profileImage.style.backgroundImage = `url(${profileData.avatar})`; 

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

// Поп-апы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');

// DOM узлы поп-апов
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Кнопки вызова поп-апов
const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');

// Анимация поп-апов
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
avatarPopup.classList.add('popup_is-animated');

////Поп-ап редактирования аватара////


const avatarBlock = document.querySelector('.profile__avatar');
//Форма аватара
const avatarFormElement = avatarPopup.querySelector('.popup__form');
//Поле формы
const avatarLinkInput = avatarFormElement.querySelector('.popup__input_type_avatar-link');

// Открытие поп-апа редактирования аватара
avatarBlock.addEventListener('click', () => {
    avatarLinkInput.value = profileImage.src;
    checkValid(avatarFormElement, validationSettings);
    openModal(avatarPopup);
})

// Обработчик формы
function handleAvatarFormSubmit(evt) {
    evt.preventDefault(); 
    const newAvatarLink = avatarLinkInput.value;
    const enterButton = avatarPopup.querySelector('.button');
    enterButton.textContent = 'Сохранение...';
    setAvatarImage(newAvatarLink)
        .then(() => {
            profileImage.src = newAvatarLink;
            closeModal(avatarPopup);
        })
        .catch((err) => {
            console.error('Ошибка изменения аватара', err);
        })
        .finally(() =>{
            enterButton.textContent = 'Сохранить';
        });
}

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit); 


////Поп-ап редактирования профиля////

// Форма профиля
const profileFormElement = profilePopup.querySelector('.popup__form');

// Поля формы профиля
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Открытие поп-апа редактирования профиля
profileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    checkValid(profileFormElement, validationSettings);
    openModal(profilePopup);
})

// Обработчик формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const newProfileTitle = nameInput.value;
    const newProfileDescription = jobInput.value;
    const enterButton = profilePopup.querySelector('.button');
    enterButton.textContent = 'Сохранение...';

    setProfileData(newProfileTitle, newProfileDescription)
        .then(() => {
            profileTitle.textContent = newProfileTitle;
            profileDescription.textContent = newProfileDescription;
            closeModal(profilePopup);
        })
        .catch((err) => {
            console.error('Ошибка изменения данных профиля', err);
        })
        .finally(() =>{
            enterButton.textContent = 'Сохранить';
        });
}

// Прикрепление обработчика к форме
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

////Поп-ап добавления карточки///

// Форма добавления карточки
const cardFormElement = cardPopup.querySelector('.popup__content');

// Поля формы карточки
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');

// Открытие поп-апа добавления карточки
cardButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cardNameInput.value = '';
    cardUrlInput.value = '';
    checkValid(cardFormElement, validationSettings);
    openModal(cardPopup);
})

// Обработчик формы
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = cardNameInput.value;
    const cardUrl = cardUrlInput.value;
    const enterButton = cardPopup.querySelector('.button');
    enterButton.textContent = 'Сохранение...';

    addNewCard(cardName, cardUrl)
        .then((newCardData) => {
            const newCard = createCard(newCardData, curUserId);
            cardsContainer.prepend(newCard);
            closeModal(cardPopup);
        })
        .catch((err) => {
            console.error('Ошибка добавления карточки', err);
        })
        .finally(() =>{
            enterButton.textContent = 'Сохранить';
        });

}

// Прикрепление обработчика к форме
cardFormElement.addEventListener('submit', handleCardFormSubmit); 


//Поп-ап с картинкой
cardsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__image')){
        popupImage.src = evt.target.src;
        popupImage.alt = evt.target.alt;
        popupCaption.textContent = evt.target.alt;
        openModal(imagePopup);
    }
})



////Работа с сервером///

getInitialCards()
.then((cardsData) => {
    console.log(cardsData);
    cardsData.forEach((cardData) => {
        const card = createCard(cardData, curUserId);
        cardsContainer.append(card);
    });
})
.catch((err) => {
  console.error('Ошибка загрузки данных карточек: ', err);
  alert('Не удалось загрузить данные. Попробуйте позже.');
});

getProfileData()
.then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;
    curUserId = userData._id;
})
.catch((err) => {
    console.error('Ошибка загрузки данных пользователя: ', err);
    alert('Не удалось загрузить данные. Попробуйте позже.');
});


// Создание объекта с настройками валидации
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_active'
}
  
enableValidation(validationSettings);

