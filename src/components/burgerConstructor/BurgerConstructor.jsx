import { useContext } from 'react';
//import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderBox from '../orderBox/OrderBox.jsx';
import burgerConstructorStyles from './burgerConstructor.module.css';
//import { ingredientType } from '../../utils/constants.js';
import { baseUrl } from '../../utils/constants';
import { BurgerContext } from '../../services/burgerContext.js';

const renderBunElement = (e, isTop) => {

    const lastWord = isTop ? " (верх)" : " (низ)";
    const typeValue = isTop ? "top" : "bottom";
    return (

        <li key={isTop} className={burgerConstructorStyles.listElement + " ml-8 mr-2"}>
            <ConstructorElement type={typeValue} isLocked={true} text={e.name + lastWord} price={e.price} thumbnail={e.image} />
        </li>

    )
};


const renderMiddleConstructorElement = (e) => {

    const isMiddle = e.type === "bun" ? false : true;

    return (
        <>
            {isMiddle &&
                <li key={e._id} className={burgerConstructorStyles.middleListElement + " mr-2"}>  {/* Непонимиаю почему возникает ошибка. Warning: Each child in a list should have a unique "key" prop.

                                                                                                Check the render method of `BurgerConstructor`. See https://reactjs.org/link/warning-keys for more information.*/}
                    <DragIcon type="primary" />
                    <ConstructorElement isLocked={!isMiddle} text={e.name} price={e.price} thumbnail={e.image} />
                </li>
            }
        </>
    )
};

function BurgerConstructor() {
    

    const { burgerElements, onOrderButtonClick } = useContext(BurgerContext);
    const prices = [];
    const bunElement = burgerElements.find(e => (e.type === 'bun'));
    const noBunElements = burgerElements.filter(e => (e.type !== 'bun'));
    noBunElements.forEach(noBunElement => prices.push(noBunElement.price));
    if(bunElement)prices.push(2*bunElement.price);

    const idBurgersElement = burgerElements.map(e => e._id);
    
    return (
        <>
            {bunElement &&
                <section className={burgerConstructorStyles.section}>
                    <ul className={burgerConstructorStyles.list + " mt-15 ml-4 mb-10"} >
                        {renderBunElement(bunElement, true)} 
                        <div key = {Math.random()} className={burgerConstructorStyles.list + " " + burgerConstructorStyles.constructorBox}> 
                            {noBunElements.map(renderMiddleConstructorElement)}
                        </div> 
                        {renderBunElement(bunElement, false)}
                    </ul>
                    <OrderBox onOrderButtonClick={onOrderButtonClick} prices={prices} idBurgersElement={idBurgersElement} />
                </section>
            }
        </>
    );

}

export default BurgerConstructor;
