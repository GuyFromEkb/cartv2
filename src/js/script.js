"use strict";
document.addEventListener('DOMContentLoaded', () => {

    //Данные с формы
    document.querySelector('.form-item').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObj = (Object.fromEntries(formData.entries()));

        // console.log(formDataJson)
        renderItem(formDataObj)
        checkListEmpty();
        e.target.reset();

    })
    //Поиск по id, если в списке уже есть товар с таким id, возвраает данный элемент
    function searchId(id) {
        const itemInList = document.querySelector('.list__wrap').querySelector(`[data-id="${id}"]`);

        return (itemInList) ? itemInList.closest('.item') : false;

    }

    //Отрисовка элемента в корзине 

    function renderItem({ name, id, price }) {
        const item = searchId(id);

        //Меняет имя и цену, елси данный товар присутсвует в корзине
        if (item) {

            item.querySelector('[data-price]').innerText = price + " Р";
            item.querySelector('.item__name p').innerText = name;
        }
        else {
            //Либо отрисовывает
            const listItem =
                `
                <div class="item">
                    <div class="item__close"></div>
                    <div class="item__name">
                        <p>${name}</p> 
                        
                    </div>
                    <div data-id="${id}" class="item__id">
                        <p>ID: <span>${id}</span></p>

                    </div>
                    <div class="item__price">
                        <span data-price>${price + " Р"}</span>
                        <span data-discount=""></span>
                        
                    </div>
                </div>
             `;

            document.querySelector('.list__wrap').insertAdjacentHTML('beforeend', listItem);

        }



    }


    //Удаление элемента из корзины

    function deleteItem() {
        document.querySelector('.list__wrap').addEventListener('click', (e) => {
            // console.log(e.target);
            const target = e.target;
            if (target.classList.contains('item__close')) {
                target.closest('.item').remove();
                checkListEmpty()
            }
        })
    }
    deleteItem();

    //Добавление сообщения о том, что корзина пуста

    function checkListEmpty() {
        const itemsInLists = document.querySelector('.list__wrap').children.length;

        // console.log(itemsInLists)

        if (itemsInLists === 0) {
            document.querySelector('.list__empty').classList.add('show');
            document.querySelector('.list__title').classList.remove('show');

        }
        else {
            document.querySelector('.list__title').classList.add('show');
            document.querySelector('.list__empty').classList.remove('show');
        }
        calculation()

    }
    checkListEmpty()

    // подсчёт кол-во и суммы
    function calculation() {
        const allItems = Array.from(document.querySelector('.list__wrap').children);

        const result = allItems.reduce((acc, item) => {

            acc += parseInt(item.querySelector('.item__price span').innerText);
            return acc;

        }, 0)

        document.querySelector('.list__sum').innerText = result + " Р";
        document.querySelector('.list__count').innerText = allItems.length;
    }


});