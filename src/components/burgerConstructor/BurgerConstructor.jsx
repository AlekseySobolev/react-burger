import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderBox from '../orderBox/OrderBox.jsx';
import burgerConstructorStyles from './burgerConstructor.module.css';

const renderBunElement = (e, isTop) => {

    const lastWord = isTop ? " (верх)" : " (низ)";
    const typeValue = isTop ? "top" : "bottom";

    return (

        <li key = {isTop} className={burgerConstructorStyles.listElement + " ml-8 mr-2"}>
            <ConstructorElement type={typeValue} isLocked={true} text={e.name + lastWord} price={e.price} thumbnail={e.image} />
        </li>

    )
};

const renderMiddleConstructorElement = (e, index, array) => {

    const isMiddle = (index === 0) || (index === (array.length - 1)) ? false : true;

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

function BurgerConstructor(props) {

    const burgerElements = props.burgerElements.data;
    const bunElement = burgerElements.find(e => (e.type === 'bun'));

    return (
        <>
            {bunElement &&
                <section className={burgerConstructorStyles.section}>
                    <ul className={burgerConstructorStyles.list + " mt-15 ml-4 mb-10"} >
                        {renderBunElement(bunElement, true)}
                        <div className={burgerConstructorStyles.list + " " + burgerConstructorStyles.constructorBox}>
                            {burgerElements.map(renderMiddleConstructorElement)}
                        </div>
                        {renderBunElement(bunElement, false)}
                    </ul>
                    <OrderBox onClick={props.onClick} />
                </section>
            }
        </>
    );

}

BurgerConstructor.propTypes = {
    burgerElements: PropTypes.object,
    onClick: PropTypes.func
}

export default BurgerConstructor;
