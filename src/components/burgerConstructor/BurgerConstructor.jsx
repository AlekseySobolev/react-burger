import { useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderBox from '../orderBox/OrderBox.jsx';

import burgerConstructorStyles from './burgerConstructor.module.css';

const burgerElements = [
    {
        "name": "Краторная булка N-200i",
        "type": "bun",     
        "image":"https://code.s3.yandex.net/react/code/bun-02.png"

    },
    {
        "name":"Соус традиционный галактический",
        "type":"sauce",
        "image":"https://code.s3.yandex.net/react/code/sauce-03.png"
    },
    {
        "name":"Мясо бессмертных моллюсков Protostomia",
        "type":"main",
        "image":"https://code.s3.yandex.net/react/code/meat-02.png"
    },
    {
        "name":"Плоды Фалленианского дерева",
        "type":"main",
        "image":"https://code.s3.yandex.net/react/code/sp_1.png"

    },
    {
        "name":"Хрустящие минеральные кольца",
        "type":"main",
        "image":"https://code.s3.yandex.net/react/code/mineral_rings.png"
    },
    {
        "name":"Хрустящие минеральные кольца",
        "type":"main",
        "image":"https://code.s3.yandex.net/react/code/mineral_rings.png"
    },
    {
        "name": "Краторная булка N-200i",
        "type": "bun",     
        "image":"https://code.s3.yandex.net/react/code/bun-02.png"
    }
]

const renderConstructorElement = (e, index, array) => {
    let typeValue = "";
    if(index === 0){
        typeValue = "top";
    }
    else if (index === (array.length -1)){
        typeValue = "bottom";
    }
    return( 
    <li key = {index} className = {burgerConstructorStyles.listElement}>
        <DragIcon type="primary" />
        <ConstructorElement type = {typeValue} isLocked = {e.type === "bun"} text={e.name} price={200}  thumbnail={e.image}/>
    </li>    
   )
};

function BurgerConstructor(props) {

        return(
            
            <section className = {burgerConstructorStyles.section}>
                <ul className ={burgerConstructorStyles.list + " mt-5 ml-4 mb-10 mr-2"}> 
                  {burgerElements.map(renderConstructorElement)}
                </ul> 
                <OrderBox onClick = {props.onCloseClick}/>
             </section>
            

        );
    
}

export default BurgerConstructor;
