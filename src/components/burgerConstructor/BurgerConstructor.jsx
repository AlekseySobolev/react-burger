import { useState, useEffect, useContext } from 'react';
//import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderBox from '../orderBox/OrderBox.jsx';
import burgerConstructorStyles from './burgerConstructor.module.css';
//import { ingredientType } from '../../utils/constants.js';
import { baseUrl } from '../../utils/constants';
import { BurgerConstracorContext } from '../../services/burgerConstractorContext.js';
//import { OrderBoxContext } from '../../services/OrderBoxContext.js';

const renderBunElement = (e, isTop) => {

    const lastWord = isTop ? " (верх)" : " (низ)";
    const typeValue = isTop ? "top" : "bottom";
    return (

        <li key={isTop} className={burgerConstructorStyles.listElement + " ml-8 mr-2"}>
            <ConstructorElement type={typeValue} isLocked={true} text={e.name + lastWord} price={e.price} thumbnail={e.image} />
        </li>

    )
};


const renderMiddleConstructorElement = (e, index, array) => {

    const isMiddle = e.type === "bun" ? false : true;

    return (
        <>
            {isMiddle &&
                <li key={e._id} className={burgerConstructorStyles.middleListElement + " mr-2"}>
                    <DragIcon type="primary" />
                    <ConstructorElement isLocked={!isMiddle} text={e.name} price={e.price} thumbnail={e.image} />
                </li>
            }
        </>
    )
};

// const fullPriceInitialState = { fullPrice: 0 };

// function reducer(state, action) {
//   switch (action.type) {
//     case "sum":
//       return { fullPrice: action.fullPrice };
//       case "zero":
//         return { fullPrice: fullPriceInitialState };
//     default:
//       throw new Error(`Wrong type of action: ${action.type}`);
//   }
// }

function BurgerConstructor() {
    

    const { burgerElements, onOrderButtonClick } = useContext(BurgerConstracorContext);
    // const [fullPriceState, fullPriceDispatcher] = useReducer(reducer, fullPriceInitialState, undefined);
    const prices = [];
    const bunElement = burgerElements.find(e => (e.type === 'bun'));
    const noBunElements = burgerElements.filter(e => (e.type !== 'bun'));
    noBunElements.forEach(noBunElement => prices.push(noBunElement.price));
    if(bunElement)prices.push(2*bunElement.price);

    const idBurgersElement = burgerElements.map(e => e._id);
    const orderNumberUrl = baseUrl + "/orders";

    const [orderNumberstate, setOrderNumberState] = useState({
        hasError: false,
        orderNumberInfo: {}
    });

    useEffect(() => {
        setOrderNumberState({ ...orderNumberstate, hasError: false });
        fetch(orderNumberUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                ingredients: idBurgersElement
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error occurred!")
                }
                return response.json()
            })
            .then(orderNumberInfo => setOrderNumberState({ ...orderNumberstate, orderNumberInfo }))
            .catch(e => {
                setOrderNumberState({ ...orderNumberstate, hasError: true });
            });
    }, []);


    return (
        <>
            {bunElement &&
                <section className={burgerConstructorStyles.section}>
                    <ul className={burgerConstructorStyles.list + " mt-15 ml-4 mb-10"} >
                        {renderBunElement(bunElement, true)}
                        <div className={burgerConstructorStyles.list + " " + burgerConstructorStyles.constructorBox}>
                            {noBunElements.map(renderMiddleConstructorElement)}
                        </div>
                        {renderBunElement(bunElement, false)}
                    </ul>
                    {/* <OrderBoxContext.Provider value={{ fullPriceState, fullPriceDispatcher, onOrderButtonClick, fullPrice}}> */}
                    <OrderBox onOrderButtonClick={onOrderButtonClick} prices={prices} orderNumberstate={orderNumberstate} />
                    {/* </OrderBoxContext.Provider> */}
                </section>
            }
        </>
    );

}

export default BurgerConstructor;
