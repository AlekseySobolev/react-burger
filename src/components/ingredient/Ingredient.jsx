import PropTypes from 'prop-types';
import ingredientStyles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient({ image, price, name }) {
        return (
                <>
                        <Counter count={1} size="default" />
                        <img className={"mb-1 mr-4 ml-4"} src={image}></img>
                        <div className={ingredientStyles.container + " mb-1"}>
                                <p className={ingredientStyles.paragraph + " text text_type_digits-default"}>{price}</p>
                                <CurrencyIcon type="primary" />
                        </div>
                        <p className={ingredientStyles.p + " text text_type_main-default mb-6"}>{name}</p>
                </>
        );
}

Ingredient.propTypes = {
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
}

export default Ingredient;