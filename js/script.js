$(function() {
    $('.slider').on('init', function(event, slick, currentSlide, nextSlide) {
        var currSlide = slick.currentSlide + 1;
        var slideCount = slick.slideCount;
        $("#cp").text(formatCount(currSlide));
        $('#slides-length').text(formatCount(slideCount));
    });
    $('.slider').slick({
        arrows: true,
        prevArrow: '<div class="slick-left"></div>',
        nextArrow: '<div class="slick-right"></div>',
    });

    $(".slider").on('afterChange', function(event, slick, currentSlide) {
        let currSlide = slick.currentSlide + 1;
        $("#cp").text(formatCount(currSlide));

        $('.bouquet-img').fadeOut();
        $('.bouquet-img').attr('src', 'img/slider/slide' + currSlide + '.png').fadeIn();
    });

    function formatCount(cnt) {
        return cnt < 10 ? `0${cnt}` : cnt;
    }
});



// countdown


const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

const newYears = "1 Jan 2021";

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

countdown();

setInterval(countdown, 1000);



// let arr = document.querySelectorAll('.products-list li');



// dropdown list


const list = document.querySelectorAll('.dropdown-list'),
    link = document.querySelectorAll('.link-dropdown');



const collection = Array.from(document.querySelectorAll("[data-price]"));

function removeItems() {
    for (const i of collection) { i.remove(); }
}

function riseSort(arr) {
    let newCollect = [...arr].sort((a, b) => {
        return a.getAttribute("data-price") - b.getAttribute("data-price");
    });
    for (const i of newCollect) { document.querySelector('.products-list').append(i); }
    return newCollect;
}

function fallSort(arr) {
    let newCollectReverse = [...arr].reverse();
    for (const i of newCollectReverse) { document.querySelector('.products-list').append(i); }
    return newCollectReverse;
}

function newSort(arr) {
    for (const i of collection) {
        if (i.getAttribute('data-property') == 'new' || i.getAttribute('data-property') == 'new discount') {
            document.querySelector('.products-list').append(i);
        }
    }
}

function discountSort(arr) {
    for (const i of collection) {

        if (i.getAttribute('data-property') == 'discount' || i.getAttribute('data-property') == 'new discount') {
            document.querySelector('.products-list').append(i);
        }
    }
}

function popularSort(arr) {
    for (const i of collection) {

        if (i.getAttribute('data-property') == 'bestseller') {
            document.querySelector('.products-list').append(i);
        }
    }
}



if (link) {
    link.forEach(el => {
        el.addEventListener('click', node => {
            node.preventDefault();
            node.target.parentElement.classList.toggle('open');
        });

    });

    list.forEach(el => {
        const listLi = el.querySelectorAll('li');

        el.addEventListener('click', node => {
            listLi.forEach(li => {
                li.classList.remove('active');
            });
            node.target.classList.add('active');
            node.target.parentElement.parentElement.classList.remove('open');
            node.target.parentElement.previousElementSibling.textContent = node.target.textContent;
            if (node.target.getAttribute('data-filter') == 'rise') {
                removeItems();
                riseSort(collection);
            } else if (node.target.getAttribute('data-filter') == 'fall') {
                removeItems();
                fallSort(riseSort(collection));
            } else if (node.target.getAttribute('data-filter') == 'new') {
                removeItems();
                newSort(collection);
            } else if (node.target.getAttribute('data-filter') == 'discont') {
                removeItems();
                discountSort(collection);
            } else if (node.target.getAttribute('data-filter') == 'popular') {
                removeItems();
                popularSort(collection);
            }
        });
    });
}


function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

$(document).on('click', '.checkbox-block input', function(e) {

    let parent = findAncestor(e.target, 'range-block');
    let a = ($(this).prop('checked')) ? 'checked' : '';
    $(this).parent().attr('class', a).siblings().removeClass('checked');

    if (parent.classList.contains('bouquet-block')) {
        let bouqAttr = $(this).val();
        removeItems();
        for (let el of collection) {
            if (bouqAttr == el.dataset.bouq || bouqAttr == 'all') {
                document.querySelector('.products-list').append(el);
            }
        }
    }

    if (parent.classList.contains('flowers-block')) {
        let flovAttr = $(this).val();
        removeItems();
        for (let el of collection) {
            if (flovAttr == el.dataset.flovers || flovAttr == 'all') {
                document.querySelector('.products-list').append(el);
            }
        }
    }
});

// function lessItems() {
//     const collection = Array.from(document.querySelectorAll("[data-price]"));

//     collection.sort((a, b) => {
//         return a.getAttribute("data-price") - b.getAttribute("data-price");
//     });

//     for (const i of collection) {
//         console.log(i);
//     }
// }

// lessItems();



$(function() {

    $("#slider-range").slider({
        range: true,
        min: 1000,
        max: 2000,
        values: [1000, 2000],
        slide: function(event, ui) {
            $("#amount1").val(ui.values[0]);
            $("#amount2").val(ui.values[1]);
        },
        stop: function(event, ui) {

            let fall = riseSort(collection);
            fall.forEach(elem => {
                elem.remove();
                if (+elem.dataset.price >= ui.values[0] && +elem.dataset.price <= ui.values[1]) {
                    document.querySelector('.products-list').append(elem);
                }
            });
        }
    });
    $("#amount1").val($("#slider-range").slider("values", 0));
    $("#amount2").val($("#slider-range").slider("values", 1));


    $("#slider-range1").slider({
        range: true,
        min: 0,
        max: 1000,
        values: [0, 1000],
        slide: function(event, ui) {
            $("#amount3").val(ui.values[0]);
            $("#amount4").val(ui.values[1]);
        }
    });
    $("#amount3").val($("#slider-range1").slider("values", 0));
    $("#amount4").val($("#slider-range1").slider("values", 1));

});


// ввод ширины и высоты в ручную
// $('.min-val').change(function() {
//     let value = $(this).val();
//     let minVal = 1000;
//     let maxVal = 2000;

//     if (value < minVal) {
//         $(this).parent().prev().slider('values', 0, minVal);
//     } else if (value > maxVal) {
//         $(this).parent().prev().slider('values', 0, maxVal);
//     } else {
//         $(this).parent().prev().slider('values', 0, value);
//     }
// });

const minVal = document.querySelectorAll('.min-val');
const maxVal = document.querySelectorAll('.max-val');
const inputBlock = document.querySelectorAll('.input-block input');

let mnVal;
let mxVal;

changeInputValue(minVal, "amount1", "amount3", 0);
changeInputValue(maxVal, "amount2", "amount4", 1);

function changeInputValue(Value, id1, id2, handle) {
    for (const i of Value) {
        i.addEventListener('change', e => {
            let value;
            let siblingPrev = e.target.parentElement.previousElementSibling;

            if (e.target.id == id1) {
                value = e.target.value;
                mnVal = 1000;
                mxVal = 2000;
            }
            if (e.target.id == id2) {
                value = e.target.value;
                mnVal = 0;
                mxVal = 1000;
            }
            if (value < mnVal) {
                e.target.value = mnVal;
                $(siblingPrev).slider('values', handle, mnVal);
            } else if (value > mxVal) {
                e.target.value = mxVal;
                $(siblingPrev).slider('values', handle, mxVal);
            } else {
                e.target.value = value;
                $(siblingPrev).slider('values', handle, value);
            }
        });
    }
}


inputBlock.forEach(node => { // фильтр товаров при вводе значений в ручную
    node.addEventListener('change', e => {
        let ancestor = findAncestor(e.currentTarget, 'input-fields');
        let firstInput = ancestor.querySelectorAll('input')[0].value;
        let secondInput = ancestor.querySelectorAll('input')[1].value;

        let fall = riseSort(collection);
        fall.forEach(elem => {
            elem.remove();
            if (+elem.dataset.price >= firstInput && +elem.dataset.price <= secondInput) {
                document.querySelector('.products-list').append(elem);
            }
        });
    })
})

// $('.max-val').change(function() {
//     let value = $(this).val();
//     let minVal = 0;
//     let maxVal = 1000;


//     if (value < minVal) {
//         $(this).parent().prev().slider('values', 1, minVal);
//     } else if (value > maxVal) {
//         $(this).parent().prev().slider('values', 1, maxVal);
//     } else {
//         $(this).parent().prev().slider('values', 1, value);
//     }
// });


$('.hamburger-menu').on('click', function() {
    $('.bar').toggleClass('animate');
    $('#main-menu').slideToggle();
});


function showMenu() {
    let windowWidth = document.body.clientWidth;
    const mainMenu = document.querySelector('#main-menu');
    if (windowWidth >= 992) {
        mainMenu.style.display = 'block';
        $('.bar').addClass('animate');
    } else {
        mainMenu.style.display = 'none';
        $('.bar').removeClass('animate');
    }
}

window.addEventListener('resize', function(event) {
    showMenu();
});


$(".big-round-btn[href^='#'], .top-menu a[href^='#']").on('click', function() {
    elementClick = $(this).attr("href");
    let headerHeight = document.querySelector('header').clientHeight;
    destination = $(elementClick).offset().top - headerHeight;
    $('html, body').animate({ scrollTop: destination }, 1100);
    if ($('.hamburger-menu').is(':visible')) {
        $('#main-menu').slideToggle();
        $('.bar').removeClass('animate');
    }
    return false;
});



// modal

// $('.js-modal').on('click', function(e){
// e.preventDefault();
//   $('body').addClass('modal-body');
//   let dataModal = $(this).data('modal');
//   $("#" + dataModal).addClass('modal-visible');
//   $("#" + dataModal).children().addClass('modal-reveal');
// });


// $('.js-close-modal').on('click', function(e){
//   e.preventDefault();
//   $(this).parents('.modal').removeClass('modal-visible');
//   $(this).parents('.modal-inner').removeClass('modal-reveal');
//   $('body').removeClass('modal-body');
// });


// $('.modal-visible').on('click', function(e){
//   $(this).parents('.modal').removeClass('modal-visible');
//   $(this).parents('.modal-inner').removeClass('modal-reveal');
//   $('body').removeClass('modal-body');
// });




// 'use strict';

class Modal {

    constructor() {
        this.triggers = document.querySelectorAll('.js-modal');
        this.close = document.querySelectorAll('.js-close-modal');
        this.modals = document.querySelectorAll('.modal');
        this.modalInners = document.querySelectorAll('.modal-inner');

        this.listeners();
    }

    listeners() {
        window.addEventListener('keydown', this.keyDown);

        this.triggers.forEach(el => {
            el.addEventListener('click', this.openModal, false);
        });

        this.modals.forEach(el => {
            el.addEventListener('transitionend', this.revealModal, false);
            el.addEventListener('click', this.backdropClose, false);
        });

        this.close.forEach(el => {
            el.addEventListener('click', Modal.hideModal, false);
        });

        this.modalInners.forEach(el => {
            el.addEventListener('transitionend', this.closeModal, false);
        });
    }

    keyDown(e) {
        if (27 === e.keyCode && document.body.classList.contains('modal-body')) {
            Modal.hideModal();
        }
    }

    backdropClose(el) {
        if (!el.target.classList.contains('modal-visible')) {
            return;
        }

        let backdrop = el.currentTarget.dataset.backdrop !== undefined ? el.currentTarget.dataset.backdrop : true;

        if (backdrop === true) {
            Modal.hideModal();
        }
    }

    static hideModal() {
        let modalOpen = document.querySelector('.modal.modal-visible');

        modalOpen.querySelector('.modal-inner').classList.remove('modal-reveal');
        document.querySelector('.modal-body').addEventListener('transitionend', Modal.modalBody, false);
        document.body.classList.add('modal-fadeOut');
    }

    closeModal(el) {
        if ('opacity' === el.propertyName && !el.target.classList.contains('modal-reveal')) {
            document.querySelector('.modal.modal-visible').classList.remove('modal-visible');
        }
    }

    openModal(el) {
        el.preventDefault();
        if (!el.currentTarget.dataset.modal) {
            console.error('No data-modal attribute defined!');
            return;
        }

        let modalID = el.currentTarget.dataset.modal;
        let modal = document.getElementById(modalID);
        document.body.classList.add('modal-body');
        modal.classList.add('modal-visible');
    }

    revealModal(el) {
        if ('opacity' === el.propertyName && el.target.classList.contains('modal-visible')) {
            el.target.querySelector('.modal-inner').classList.add('modal-reveal');
        }
    }

    static modalBody(el) {
        if ('opacity' === el.propertyName && el.target.classList.contains('modal') && !el.target.classList.contains('modal-visible')) {
            document.body.classList.remove('modal-body', 'modal-fadeOut');
        }
    }
}

let mod = new Modal();


// yandex map

ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [52.596793, 39.567563],
        zoom: 17
    });
    myMap.behaviors.disable('scrollZoom');
    var myPlacemark = new ymaps.Placemark([52.596793, 39.567563], {
        balloonContent: 'г. Липецк, просп. Победы 29, 1 этаж'
    }, {
        preset: 'islands#icon',
        iconLayout: 'default#image',
        iconImageHref: 'img/pin.svg',
        iconImageSize: [56, 56],
    });
    myMap.geoObjects.add(myPlacemark);
}


$(".popup-forma").submit(function(e) {
    var isValid = true;
    $(this).find('input[type="text"]').each(function() {
        if ($.trim($(this).val()) == '') {
            isValid = false;
            $(this).css({
                "border": "1px solid red",
                "background": "#FFCECE"
            });
            if ($(this).attr('name') == 'username') {
                $(this).parent().next().html('Введите Ваше имя');
            }
            if ($(this).attr('name') == 'phone') {
                $(this).parent().next().html('Укажите Ваш телефон');
            }

        } else {
            $(this).css({
                "border": "",
                "background": ""
            });
        }
    });
    if (isValid == false) {
        e.preventDefault();
    } else {

        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            mod.modals[0].classList.remove('modal-visible');
            mod.modalInners[0].classList.remove('modal-reveal');

            mod.modals[1].classList.add('modal-visible');
            mod.modalInners[1].classList.add('modal-reveal');
            setTimeout(function() {
                document.querySelector(".popup-forma").reset();
            }, 1000);
        });
    }
    return false;
});

$(".popup-forma").keydown(function() {
    $('input[type="text"]').each(function() {
        $(this).css({
            "border": "",
            "background": ""
        });
        $(this).parent().next().html('');
    });
});


var Maskinput;
(function() {
    'use strict';

    Maskinput = function Maskinput(inputElem, type) {
        var _this = this;

        if (!inputElem) {
            return;
        }

        var defValue = '';

        this.tel = function(evStr) {
            if (evStr == 'focus' && !inputElem.value.length) {
                inputElem.value = '+7(';
            }

            if (!/[\+\d\(\)\-]*/.test(inputElem.value)) {
                inputElem.value = defValue;
            } else {
                var reg = /^(\+7?)?(\(\d{0,3})?(\)\d{0,3})?(\-\d{0,2}){0,2}$/,
                    cursPos = inputElem.selectionStart;

                if (!reg.test(inputElem.value)) {
                    inputElem.value = inputElem.value.replace(/^(?:\+7?)?\(?(\d{0,3})\)?(\d{0,3})\-?(\d{0,2})\-?(\d{0,2})$/, function(str, p1, p2, p3, p4) {
                        var res = '';

                        if (p4 != '') {
                            res = '+7(' + p1 + ')' + p2 + '-' + p3 + '-' + p4;
                        } else if (p3 != '') {
                            res = '+7(' + p1 + ')' + p2 + '-' + p3;
                        } else if (p2 != '') {
                            res = '+7(' + p1 + ')' + p2;
                        } else if (p1 != '') {
                            res = '+7(' + p1;
                        }

                        return res;
                    });
                }

                if (!reg.test(inputElem.value)) {
                    inputElem.value = defValue;
                } else {
                    defValue = inputElem.value;
                }
            }
        };

        inputElem.addEventListener('input', function() {
            _this[type]();
        });

        inputElem.addEventListener('focus', function() {
            _this[type]('focus');
        }, true);
    };
})();

$('input[data-type="tel"]').each(function() {
    new Maskinput(this, 'tel');
});


// test

// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'server/catalog.json', true);

// // responseType должно быть пустой строкой, либо "text"
// // xhr.responseType = 'text';

// xhr.onload = function() {
//     if (xhr.readyState === xhr.DONE) {
//         if (xhr.status === 200) {
//             xhr = JSON.parse(xhr.response);
//             let out = '';
//             for (let i in xhr) {
//                 out = `
//                 <div>Some text ${xhr[i]['name']}</div>
//                 `;
//             }

//         }
//     }
// };

// xhr.send(null);

// test





// products json
const ROOT_CART = document.querySelector('.cart-qty');
const ROOT_PRODUCTS = document.getElementById('products');
const ROOT_SPINNER = document.getElementById('spinner');


class Header {
    handlerOpenShoppingPage() {
        shoppingPage.render();
    }

    render(count) {
        const html = `
            
                <span onclick="headerPage.handlerOpenShoppingPage();">
                    ${count}
                </span>

        `;

        ROOT_CART.innerHTML = html;
    }
};

const headerPage = new Header();




class Spinner {
    handleClear() {
        ROOT_SPINNER.innerHTML = '';
    }

    render() {
        const html = `
          <div class="spinner-container">
            <img class="spinner__img" src="img/spinner.svg" />
          </div>
        `;

        ROOT_SPINNER.innerHTML = html;
    }
}

const spinnerPage = new Spinner();

function render() {
    const productsStore = localStorageUtil.getProducts();
    headerPage.render(productsStore.length);

    // document.querySelector('.cart-qty').innerHTML = localStorageUtil.getProducts().length;
    productsPage.render();
}

spinnerPage.render();

let CATALOG = [];


fetch('server/catalog.json')
    .then(res => res.json())
    .then(body => {
        CATALOG = body;
        setTimeout(() => {
            spinnerPage.handleClear();
            render();
        }, 0);
    })
    .catch(() => {
        spinnerPage.handleClear();
        errorPage.render();
    })


class Products {
    constructor() {
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'В корзину';
        this.labelRemove = 'Отменить';
    }

    handlerSetLocatStorage(element, id) {
        const { pushProduct, products } = localStorageUtil.putProducts(id);

        if (pushProduct) {
            element.classList.add(this.classNameActive);
            element.innerText = this.labelRemove;
        } else {
            element.classList.remove(this.classNameActive);
            element.innerText = this.labelAdd;
        }

        // headerPage.render(products.length);
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';

        CATALOG.forEach(({ id, name, price, img, excerpt, flovers, property, bouq }) => {
            let activeClass = '';
            let activeText = '';

            if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' ' + this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += `
              <li data-flovers="${flovers}" data-bouq="${bouq}" data-property="${property}" data-price="${price}">
              <div class="sale-small-block">
                            <span class="${property}-green">${property}</span>
               </div>
              <a href="" class="shop-thumbnail-wrap">
                      <img src="${img}" alt="">
                  </a>
                  <div class="shop-summary-wrap">
                      <span class="product__title">«${name}»</span>
                      <p class="products__excerpt">${excerpt}</p>
                  </div>
                  <span class="product__price">${price.toLocaleString()} ₽</span>
                  <form class="cart-form" action="" method="post">
                                    <div class="quantity">
                                        <input type="button" value="" class="minus">
                                        <input 
                                            type="number"
                                            class="input-text qty text"
                                            step="1"
                                            min="1"
                                            max=""
                                            maxlength="3"
                                            name="quantity"
                                            value="1"
                                            title="Qty"
                                            inputmode="numeric">
                                        <input type="button" value="" class="plus">
                                    </div>

                                    <button
                                    type="submit"
                                    name="add-to-cart"
                                    value=""
                                    class="single_add_to_cart_button${activeClass}" onclick="productsPage.handlerSetLocatStorage(this, '${id}');"> ${activeText}</button>
                                </form>
              </li>
          `;
        });

        const html = `
          <ul class="products-list">
              ${htmlCatalog}
          </ul>
      `;

        ROOT_PRODUCTS.innerHTML = html;
    }
};

const productsPage = new Products();

// amount of goods


const qty = document.querySelectorAll('.qty');

if (qty) {


    document.addEventListener('click', node =>{

        if(node.target.classList.contains('plus')){
            let elem = node.target.previousElementSibling;
            let cnt = elem.value;
            if(cnt < 500) cnt++;
            elem.value = cnt; 
        }else if(node.target.classList.contains('minus')){
            let elem = node.target.nextElementSibling;
            let cnt = elem.value;
            if(cnt > 1) cnt--;
            elem.value = cnt;
        }
        return false;
    });
   
} 

// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'server/catalog.json', true);

// // responseType должно быть пустой строкой, либо "text"
// xhr.responseType = 'text';

// xhr.onload = function() {
//     if (xhr.readyState === xhr.DONE) {
//         if (xhr.status === 200) {
//             xhr = JSON.parse(xhr.response);
//             // console.log(xhr);
//             // console.log(xhr.response);
//             // console.log(xhr.responseText);
//             for (let i of xhr) {
//                 console.log(i.price);
//             }
//         }
//     }
// };

// xhr.send(null);



// function closest(el, cl) {
//     let elem = el;
//     while (elem.className != cl) {
//         if (elem.tagName.toLowerCase() == 'html') return false;
//         elem = elem.parentNode;
//     }
//     return elem;
// }