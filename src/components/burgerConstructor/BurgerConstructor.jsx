import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderBox from '../orderBox/OrderBox.jsx';
// import { burgerElements } from '../../utils/data';
import burgerConstructorStyles from './burgerConstructor.module.css';

const renderTopConstructorElement = (e) => {

    return (

        <li key={e._id} className={burgerConstructorStyles.listElement + " ml-8 mr-2"}>
            <ConstructorElement type={"top"} isLocked={true} text={e.name + " (верх)"} price={e.price} thumbnail={e.image} />
        </li>

    )
};

const renderBottomConstructorElement = (e) => {

    return (

        <li key={e._id} className={burgerConstructorStyles.listElement + " ml-8 mr-2"}>
            <ConstructorElement type={"bottom"} isLocked={true} text={e.name + " (низ)"} price={e.price} thumbnail={e.image} />
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
    const firstElement = burgerElements[0];
    const lastElement = burgerElements[burgerElements.length - 1];

    return (

        <section className={burgerConstructorStyles.section}>
            <ul className={burgerConstructorStyles.list + " mt-15 ml-4 mb-10"} >
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

BurgerConstructor.propTypes = {
    burgerElements: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func
}

export default BurgerConstructor;
