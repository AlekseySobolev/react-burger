import React from 'react';
import ingredientStyles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient(props) {
        return (


                <>
                        <Counter count={1} size="default" />
                        <img className={"mb-1 mr-4 ml-4"} src={props.image}></img>
                        <div  className={ingredientStyles.container + " mb-1"}>
                                <p className={ingredientStyles.paragraph + " text text_type_digits-default"}>{props.price}</p>
                                <CurrencyIcon type="primary" />
                        </div>
                        <p style = {{width: "272px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}} className={"text text_type_main-default mb-6"}>{props.name}</p>
                </>



        );
}

export default Ingredient;