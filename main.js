(()=>{"use strict";function e(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function t(){document.querySelector(".popup_is-opened").addEventListener("click",o)}function n(){document.querySelector(".popup_is-opened").removeEventListener("click",o)}function o(e){c(e.target)}function r(r){r.classList.add("popup_is-opened"),r.querySelector(".popup__close").addEventListener("click",(function(){c(r)})),document.addEventListener("keydown",e);var a=r.querySelector(".popup__content");a.addEventListener("mouseout",t),a.addEventListener("mouseover",n),r.addEventListener("click",o)}function c(r){r.classList.remove("popup_is-opened"),document.removeEventListener("keydown",e);var c=r.querySelector(".popup__content");r.removeEventListener("click",o),c.removeEventListener("mouseout",t),c.removeEventListener("mouseover",n)}var a={baseUrl:"https://nomoreparties.co/v1/frontend-st-cohort-201",headers:{authorization:"09d511b4-e2f9-427f-a6ea-1c950098424f","Content-Type":"application/json"}},u=document.querySelector("#card-template").content;function i(e,t){var n=u.querySelector(".card").cloneNode(!0),o=n.querySelector(".card__image"),r=n.querySelector(".card__title"),c=n.querySelector(".card__like-count");o.alt=e.name,o.src=e.link,r.textContent=e.name,c.textContent=e.likes.length;var i=n.querySelector(".card__like-button"),s=n.querySelector(".card__delete-button");return e.owner._id===t?s.style.display="block":s.style.display="none",void 0!==e.likes.find((function(e){return e._id===t}))?i.classList.add("card__like-button_is-active"):i.classList.remove("card__like-button_is-active"),i.addEventListener("click",(function(){var n=i.classList.contains("card__like-button_is-active");(function(e,t){var n=t?"DELETE":"PUT";return fetch("".concat(a.baseUrl,"/cards/likes/").concat(e),{method:n,headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.error(e),alert("Произошла ошибка. Попробуйте позже.")}))})(e._id,n).then((function(n){e=n,c.textContent=e.likes.length,void 0!==e.likes.find((function(e){return e._id===t}))?i.classList.add("card__like-button_is-active"):i.classList.remove("card__like-button_is-active")})).catch((function(e){console.error("Ошибка нажатия Лайка",e)}))})),s.addEventListener("click",(function(){var t;(t=e._id,fetch("".concat(a.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.error(e),alert("Произошла ошибка. Попробуйте позже.")}))).then((function(){return n.remove()})).catch((function(e){console.error("Ошибка удаления карточки",e)}))})),n}var s=function(e,t,n,o){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(o),r.classList.remove(n),r.textContent=""},l=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);d(n,o,t.inactiveButtonClass),n.forEach((function(n){s(e,n,t.errorClass,t.inputErrorClass)}))},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n):t.classList.add(n)},p=document.querySelector(".profile__image"),_=document.querySelector(".profile__title"),f=document.querySelector(".profile__description"),v="none",m=document.querySelector(".places__list"),y=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_image"),q=document.querySelector(".popup_type_edit-avatar"),L=S.querySelector(".popup__image"),k=S.querySelector(".popup__caption"),b=document.querySelector(".profile__edit-button"),E=document.querySelector(".profile__add-button");y.classList.add("popup_is-animated"),h.classList.add("popup_is-animated"),S.classList.add("popup_is-animated"),q.classList.add("popup_is-animated");var C=document.querySelector(".profile__avatar"),x=q.querySelector(".popup__form"),g=x.querySelector(".popup__input_type_avatar-link");C.addEventListener("click",(function(){g.value=p.src,l(x,w),r(q)})),x.addEventListener("submit",(function(e){e.preventDefault();var t=g.value,n=q.querySelector(".button");n.textContent="Сохранение...",function(e){return fetch("".concat(a.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:a.headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.error(e),alert("Произошла ошибка. Попробуйте позже.")}))}(t).then((function(){p.src=t,c(q)})).catch((function(e){console.error("Ошибка изменения аватара",e)})).finally((function(){n.textContent="Сохранить"}))}));var j=y.querySelector(".popup__form"),P=j.querySelector(".popup__input_type_name"),U=j.querySelector(".popup__input_type_description");P.value=_.textContent,U.value=f.textContent,b.addEventListener("click",(function(){P.value=_.textContent,U.value=f.textContent,l(j,w),r(y)})),j.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=P.value,r=U.value,u=y.querySelector(".button");u.textContent="Сохранение...",(t=o,n=r,fetch("".concat(a.baseUrl,"/users/me"),{method:"PATCH",headers:a.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.error(e),alert("Произошла ошибка. Попробуйте позже.")}))).then((function(){_.textContent=o,f.textContent=r,c(y)})).catch((function(e){console.error("Ошибка изменения данных профиля",e)})).finally((function(){u.textContent="Сохранить"}))}));var A=h.querySelector(".popup__content"),B=A.querySelector(".popup__input_type_card-name"),T=A.querySelector(".popup__input_type_url");E.addEventListener("click",(function(e){e.preventDefault(),B.value="",T.value="",l(A,w),r(h)})),A.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=B.value,r=T.value,u=h.querySelector(".button");u.textContent="Сохранение...",(t=o,n=r,fetch("".concat(a.baseUrl,"/cards"),{method:"POST",headers:a.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.error(e),alert("Произошла ошибка. Попробуйте позже.")}))).then((function(e){var t=i(e,v);m.prepend(t),c(h)})).catch((function(e){console.error("Ошибка добавления карточки",e)})).finally((function(){u.textContent="Сохранить"}))})),m.addEventListener("click",(function(e){e.target.classList.contains("card__image")&&(L.src=e.target.src,L.alt=e.target.alt,k.textContent=e.target.alt,r(S))})),fetch("".concat(a.baseUrl,"/cards"),{headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.error(e),alert("Произошла ошибка. Попробуйте позже.")})).then((function(e){console.log(e),e.forEach((function(e){var t=i(e,v);m.append(t)}))})).catch((function(e){console.error("Ошибка загрузки данных карточек: ",e),alert("Не удалось загрузить данные. Попробуйте позже.")})),fetch("".concat(a.baseUrl,"/users/me"),{headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.error(e),alert("Произошла ошибка. Попробуйте позже.")})).then((function(e){_.textContent=e.name,f.textContent=e.about,p.src=e.avatar,v=e._id})).catch((function(e){console.error("Ошибка загрузки данных пользователя: ",e),alert("Не удалось загрузить данные. Попробуйте позже.")}));var D,w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_error",errorClass:"popup__error_active"};D=w,Array.from(document.querySelectorAll(D.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);d(n,o,t.inactiveButtonClass),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n,o){t.validity.valid?s(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.name,"-error"));t.classList.add(r),c.classList.add(o),c.textContent=n}(e,t,t.validationMessage,n,o)}(e,r,t.errorClass,t.inputErrorClass),d(n,o,t.inactiveButtonClass)}))}))}(e,D)}))})();