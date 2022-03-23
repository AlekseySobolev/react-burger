import { useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderBox from '../orderBox/OrderBox.jsx';

import burgerConstructorStyles from './burgerConstructor.module.css';

const burgerElements = [
    {
        "name": "Краторная булка N-200i",
        "type": "bun",
        "image": "https://code.s3.yandex.net/react/code/bun-02.png"

    },
    {
        "name": "Соус традиционный галактический",
        "type": "sauce",
        "image": "https://code.s3.yandex.net/react/code/sauce-03.png"
    },
    {
        "name": "Мясо бессмертных моллюсков Protostomia",
        "type": "main",
        "image": "https://code.s3.yandex.net/react/code/meat-02.png"
    },
    {
        "name": "Плоды Фалленианского дерева",
        "type": "main",
        "image": "https://code.s3.yandex.net/react/code/sp_1.png"

    },
    {
        "name": "Хрустящие минеральные кольца",
        "type": "main",
        "image": "https://code.s3.yandex.net/react/code/mineral_rings.png"
    },
    {
        "name": "Хрустящие минеральные кольца",
        "type": "main",
        "image": "https://code.s3.yandex.net/react/code/mineral_rings.png"
    },
    ,
    {
        "name": "Хрустящие минеральные кольца",
        "type": "main",
        "image": "https://code.s3.yandex.net/react/code/mineral_rings.png"
    },
    ,
    {
        "name": "Хрустящие минеральные кольца",
        "type": "main",
        "image": "https://code.s3.yandex.net/react/code/mineral_rings.png"
    },
    {
        "name": "Краторная булка N-200i",
        "type": "bun",
        "image": "https://code.s3.yandex.net/react/code/bun-02.png"
    }
]

const renderTopConstructorElement = (arrElem) => {
  
    return (
        <>
 
                <li key={arrElem.index} className={burgerConstructorStyles.listElement + " ml-8 mr-2"}>
                    <ConstructorElement type={"top"} isLocked={true} text={arrElem.e.name + " (верх)"} price={200} thumbnail={arrElem.e.image} />
                </li>
    
        </>
    )
};

const renderBottomConstructorElement = (arrElem) => {
    
    return (
        <>
         
                <li key={arrElem.index} className={burgerConstructorStyles.listElement  + " ml-8 mr-2"}>
                    <ConstructorElement type={"bottom"} isLocked={true} text={arrElem.e.name + " (низ)"} price={200} thumbnail={arrElem.e.image} />
                </li>
            
        </>
    )
};
const renderMiddleConstructorElement = (e, index, array) => {

    let isMiddle = (index === 0) || (index === (array.length - 1)) ? false : true;

    // if ((index === 0) || (index === (array.length - 1))) {
    //     isMiddle = false;
    // }
  
    return (
        <>
            {isMiddle &&
                <li key={index} className={burgerConstructorStyles.middleListElement + " mr-2"}>
                    <DragIcon type="primary" />
                    <ConstructorElement isLocked={!isMiddle} text={e.name} price={200} thumbnail={e.image} />
                </li>
            }
        </>
    )
};

function BurgerConstructor(props) {

    let firstElement = {e: burgerElements[0], index: 0};
    let lastElement = {e: burgerElements[burgerElements.length -1], index: [burgerElements.length -1]};

    return (

        <section className={burgerConstructorStyles.section}>
            <ul className={burgerConstructorStyles.list + " mt-15 ml-4 mb-10"}>
                {renderTopConstructorElement(firstElement)}
                <div className={burgerConstructorStyles.list + " " + burgerConstructorStyles.constructorBox}>
                    {burgerElements.map(renderMiddleConstructorElement)}
                </div>
                {renderBottomConstructorElement(lastElement)}
            </ul>
            <OrderBox onClick={props.onClick} />
        </section>


    );

}

export default BurgerConstructor;
