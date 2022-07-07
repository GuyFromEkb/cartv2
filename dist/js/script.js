"use strict";
document.addEventListener('DOMContentLoaded', () => {

    //Данные с формы
    document.querySelector('.form-item').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObj = (Object.fromEntries(formData.entries()));

        // console.log(formDataJson)
        renderCart(formDataObj)
        e.target.reset();

    })

    //Отрисовка элемента в корзине 
    function renderCart({ name, price, count }) {

        const cartItem =
            `
                <div class="item">
                    <div class="item__close"></div>
                    <div class="item__name">
                        <p>Название товара:</p>
                        <span>${name}</span>
                    </div>
                    <div class="item__count">
                        <p>кол-во товара:</p>
                        <span>${count}</span>
                    </div>
                    <div class="item__price">
                        <p>Цена товара:</p>
                        <span>${price + " Р"}</span>
                    </div>
                </div>
             `;

        document.querySelector('.cart__wrap').insertAdjacentHTML('beforeend', cartItem);
    }
    //Удаление элемента из корзины
    function deleteCart() {
        document.querySelector('.cart__wrap').addEventListener('click', (e) => {
            console.log(e.target);
            const target= e.target;
            if(target.classList.contains('item__close'))
            {
                target.closest('.item').remove();
            }
        })
    }
    deleteCart();

});