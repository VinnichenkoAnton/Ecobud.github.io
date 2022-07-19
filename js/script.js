/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/modules/carousel.js":
/*!************************************!*\
  !*** ./src/js/modules/carousel.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function carousel({
  carouselContent,
  nextSlide,
  prevSlide,
  dotsParent,
  firstPosition,
  classForAnimation
}) {
  const content = document.querySelector(carouselContent);
  const next = document.querySelector(nextSlide),
        prev = document.querySelector(prevSlide),
        dotsContainer = document.querySelector(dotsParent),
        animationClass = classForAnimation.slice(1);
  let firstSlide = document.querySelector(firstPosition),
      contentArr = [...content.children];
  const dots = document.createElement('ol'),
        indicators = [];
  dots.classList.add('brandslider__dots');
  dotsContainer.append(dots);
  contentArr.forEach((number, index) => {
    for (let i = 0; i < content.children.length; i++) {
      number.setAttribute('slide-number', index);
    }
  });

  for (let i = 0; i < content.children.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i);
    dot.classList.add('brandslider__dot');

    if (i == 0) {
      dot.classList.add('brandslider__dot_active');
    }

    dots.append(dot);
    indicators.push(dot);
  }

  indicators.forEach(dot => {
    dot.addEventListener('click', e => {
      let slideDot = e.target.getAttribute('data-slide-to');
      let newArr = contentArr.filter(number => {
        if (number.getAttribute('slide-number') === slideDot) {
          return number;
        } else {
          return;
        }
      });
      let newContentList = contentArr.slice(0, newArr[0].getAttribute('slide-number'));
      content.prepend(newArr[0]);
      content.append(...newContentList);
      indicators.forEach(dot => dot.classList.remove('brandslider__dot_active'));
      indicators[slideDot].classList.add('brandslider__dot_active');
      contentArr.forEach(child => child.classList.remove(animationClass));
      content.firstChild.classList.add(animationClass);
    });
  });

  const slide = event => {
    event.preventDefault();

    if (event.currentTarget.className == next.className) {
      firstSlide = document.querySelector(firstPosition);
      content.append(firstSlide);
      contentArr.forEach(child => child.classList.remove(animationClass));
      content.firstChild.classList.add(animationClass);
      let slideDot = +firstSlide.getAttribute('slide-number');
      indicators.forEach(dot => dot.classList.remove('brandslider__dot_active'));

      if (slideDot + 1 == indicators.length) {
        slideDot = 0;
        indicators[slideDot].classList.add('brandslider__dot_active');
      } else {
        indicators[slideDot + 1].classList.add('brandslider__dot_active');
      }
    } else if (event.currentTarget.className == prev.className) {
      firstSlide = document.querySelector(firstPosition);
      content.prepend(content.lastChild);
      contentArr.forEach(child => child.classList.remove(animationClass));
      content.firstChild.classList.add(animationClass);
      let slideDot = firstSlide.getAttribute('slide-number');
      indicators.forEach(dot => dot.classList.remove('brandslider__dot_active'));

      if (slideDot == 0) {
        slideDot = indicators.length - 1;
        indicators[slideDot].classList.add('brandslider__dot_active');
      } else {
        indicators[slideDot - 1].classList.add('brandslider__dot_active');
      }
    } else {
      return;
    }
  };

  prev.addEventListener("click", slide);
  next.addEventListener("click", slide);
}

/* harmony default export */ __webpack_exports__["default"] = (carousel);

/***/ }),

/***/ "./src/js/modules/images.js":
/*!**********************************!*\
  !*** ./src/js/modules/images.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function images(tabsWrapper) {
  const imgPopup = document.createElement('div'),
        workSection = document.querySelector(tabsWrapper),
        bigImage = document.createElement('img'),
        body = document.querySelector('body');
  imgPopup.classList.add('tabs__popup');
  workSection.appendChild(imgPopup);
  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';
  imgPopup.appendChild(bigImage);
  workSection.addEventListener('click', e => {
    e.preventDefault();
    let target = e.target;

    if (target && target.classList.contains('tabs__preview')) {
      imgPopup.style.display = 'flex';
      const path = target.getAttribute('src');
      bigImage.setAttribute('src', path);
      body.style.overflow = 'hidden';
    }

    if (target && target.matches('div.tabs__popup')) {
      imgPopup.style.display = 'none';
      body.style.overflow = 'visible';
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (images);

/***/ }),

/***/ "./src/js/modules/mailer.js":
/*!**********************************!*\
  !*** ./src/js/modules/mailer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function mailer(formSelector, serveraddress, modalSelector, fileSelector, labelSelector) {
  const form = document.querySelector(formSelector);
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо. Мы скоро свяжемся с вами",
    failure: "Что-то пошло не так..."
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await res.json();
  };

  const file = document.querySelector(fileSelector),
        fileLabel = document.querySelector(labelSelector);
  file.addEventListener('change', function () {
    if (this.value) {
      fileLabel.style.background = '#8dc73d';
      fileLabel.style.color = '#fff';
      fileLabel.childNodes[0].textContent = `Добавлено файлов: ${this.files.length}`;
    } else {
      fileLabel.style.background = '#eef0f4';
      fileLabel.style.color = '#a7a9b0';
      fileLabel.childNodes[0].textContent = `Выберите файл`;
    }
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;`;
    form.insertAdjacentElement('afterend', statusMessage);
    const formData = new FormData(form);
    postData(serveraddress, formData).then(function () {
      showThanksModal(message.success);
      statusMessage.remove();
    }).catch(() => {
      showThanksModal(message.failure);
    }).finally(() => {
      form.reset();
      fileLabel.style.background = '#eef0f4';
      fileLabel.style.color = '#a7a9b0';
      fileLabel.childNodes[0].textContent = `Выберите файл`;
    });
  });

  function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = "hidden";
  }

  function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = "";
  }

  function showThanksModal() {
    const prevModalDialog = document.querySelector(modalSelector).firstChild;
    prevModalDialog.style.display = 'none';
    openModal(modalSelector);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__thanks');
    thanksModal.innerHTML = `
            <div class="modal__title title_blgr">${message.success}</div>`;
    document.querySelector(modalSelector).append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.style.display = 'none';
      prevModalDialog.style.display = 'block';
      closeModal(modalSelector);
    }, 3000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (mailer);

/***/ }),

/***/ "./src/js/modules/mask.js":
/*!********************************!*\
  !*** ./src/js/modules/mask.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function mask() {
  const eventCalllback = function (e) {
    let el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+38(0__) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");

    if (clearVal !== 'false' && e.type === 'blur') {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        e.target.value = '';
        return;
      }
    }

    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
  };

  const phone_inputs = document.querySelectorAll('[data-phone-pattern]');

  for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
      elem.addEventListener(ev, eventCalllback);
    }
  }
}

;
/* harmony default export */ __webpack_exports__["default"] = (mask);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const modals = () => {
  const showModalByTime = setTimeout(function () {
    document.querySelector('.modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }, 6000);

  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, window) {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll(window),
          scroll = calcScroll();
    trigger.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target) {
          e.preventDefault();
        }

        windows.forEach(item => {
          item.style.display = 'none';
        });
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
        clearInterval(showModalByTime);
      });
    });
    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
      clearInterval(showModalByTime);
    });
    modal.addEventListener('click', e => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach(item => {
          item.style.display = 'none';
        });
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
        clearInterval(showModalByTime);
      }
    });
  }

  function calcScroll() {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  bindModal('.calculate__btn', '.modal', '.modal__close', '[data-modal]');
  bindModal('.tender__btn_first', '.modal[data-modal="proj"]', '.modal__close_proj', '[data-modal]');
  bindModal('.tender__btn_second', '.modal[data-modal="tender"]', '.modal__close_tender', '[data-modal]');
  bindModal('.build__btn', '.modal', '.modal__close', '[data-modal]');
  bindModal('.interest__btn', '.modal', '.modal__close', '[data-modal]');
};

/* harmony default export */ __webpack_exports__["default"] = (modals);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field);
  let width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1,
      offset = 0;

  if (slides.length < 10) {
    total.textContent = `${slides.length}`;
    current.textContent = `${slideIndex}`;
  } else {
    total.textContent = `${slides.length}`;
    current.textContent = `${slideIndex}`;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  next.addEventListener('click', () => {
    width = window.getComputedStyle(slidesWrapper).width;

    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `${slideIndex}`;
    } else {
      current.textContent = `${slideIndex}`;
    }
  });
  prev.addEventListener('click', () => {
    width = window.getComputedStyle(slidesWrapper).width;

    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `${slideIndex}`;
    } else {
      current.textContent = `${slideIndex}`;
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  let tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_images__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/images */ "./src/js/modules/images.js");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/carousel */ "./src/js/modules/carousel.js");
/* harmony import */ var _modules_mask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/mask */ "./src/js/modules/mask.js");
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/mailer */ "./src/js/modules/mailer.js");










window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};

window.addEventListener('DOMContentLoaded', () => {
  Object(_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])('.tabs-btn', '.tabs__content', '.tabs__list', 'tabs-btn_active');
  Object(_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
    container: '#tab_one',
    slide: '.tabs__library',
    nextArrow: '.tabs__controls_right',
    prevArrow: '.tabs__controls_left',
    totalCounter: '.tabs__numeration_total',
    currentCounter: '.tabs__numeration_concrete',
    wrapper: '.tabs__wrapper',
    field: '.tabs__inner'
  });
  Object(_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
    container: '#tab_two',
    slide: '.tabs__library-second',
    nextArrow: '.tabs__controls_right-second',
    prevArrow: '.tabs__controls_left-second',
    totalCounter: '.tabs__numeration_total-second',
    currentCounter: '.tabs__numeration_concrete-second',
    wrapper: '.tabs__wrapper-second',
    field: '.tabs__inner-second'
  });
  Object(_modules_images__WEBPACK_IMPORTED_MODULE_3__["default"])('.tabs__wrapper');
  Object(_modules_images__WEBPACK_IMPORTED_MODULE_3__["default"])('.tabs__wrapper-second');
  Object(_modules_carousel__WEBPACK_IMPORTED_MODULE_4__["default"])({
    carouselContent: '.brandslider__content',
    nextSlide: '.brandslider__controls_right',
    prevSlide: '.brandslider__controls_left',
    dotsParent: '.brandslider__wrapper',
    firstPosition: '.brandslider__item',
    classForAnimation: '.fade'
  });
  Object(_modules_mask__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_modules_mask__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_modules_mailer__WEBPACK_IMPORTED_MODULE_6__["default"])('.modal__form_proj', '../mailer/send.php', '.modal[data-modal="proj"]', '#userfile', '.modal__file_proj');
  Object(_modules_mailer__WEBPACK_IMPORTED_MODULE_6__["default"])('.modal__form_tender', '../mailer/send-tender.php', '.modal[data-modal="tender"]', '#userfile-tender', '.modal__file_tender');
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map