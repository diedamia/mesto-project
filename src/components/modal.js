function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

function addClickListener() {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.addEventListener('click', closeByOverlay);
}

function removeClickListener() {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.removeEventListener('click', closeByOverlay);
}

function closeByOverlay(evt) {
    closeModal(evt.target);
}

// Функция открытия поп-апа
function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    popup.querySelector('.popup__close').addEventListener('click', () => {
        closeModal(popup);
    });

    document.addEventListener('keydown', closeByEsc);

    const popupWindow = popup.querySelector('.popup__content');
    popupWindow.addEventListener('mouseout', addClickListener);
    popupWindow.addEventListener('mouseover', removeClickListener);
    popup.addEventListener('click', closeByOverlay);
};

// Функция закрытия поп-апа
function closeModal(popup) {     
    popup.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', closeByEsc);

    const popupWindow = popup.querySelector('.popup__content');
    popup.removeEventListener('click', closeByOverlay);
    popupWindow.removeEventListener('mouseout', addClickListener);
    popupWindow.removeEventListener('mouseover', removeClickListener);
};


export{openModal, closeModal}