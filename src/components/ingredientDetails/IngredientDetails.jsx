import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredientDetails.module.css';

function IngredientDetails({clickedIngredient}) {

    return (
        <>
        {clickedIngredient &&
            <div className={ingredientDetailsStyles.ingredientDataBox}>
                <img className={"mb-4 pl-5 pr-5"} src={clickedIngredient.image_large} alt="Изображение ингредиента" />
                <h2 className={ingredientDetailsStyles.h2 + " text text_type_main-medium"}>{clickedIngredient.name}</h2>
                <div className= {ingredientDetailsStyles.caloriesBox + " mt-8"}>
                    <div className={ingredientDetailsStyles.infoBox}>
                        <p className={"text text_type_main-small text_color_inactive"}>Калории,&nbsp;ккал</p>
                        <p className={"text text_type_main-default text_color_inactive"}>{clickedIngredient.calories}</p>
                    </div>
                    <div className={ingredientDetailsStyles.infoBox}>
                        <p className={"text text_type_main-small text_color_inactive"}>Белки,&nbsp;г</p>
                        <p className={"text text_type_main-default text_color_inactive"}>{clickedIngredient.proteins}</p>
                    </div>
                    <div className={ingredientDetailsStyles.infoBox}>
                        <p className={"text text_type_main-small text_color_inactive"}>Жиры,&nbsp;г</p>
                        <p className={"text text_type_main-default text_color_inactive"}>{clickedIngredient.fat}</p>
                    </div>
                    <div className={ingredientDetailsStyles.infoBox}>
                        <p className={"text text_type_main-small text_color_inactive"}>Углеводы,&nbsp;г</p>
                        <p className={"text text_type_main-default text_color_inactive"}>{clickedIngredient.carbohydrates}</p>
                    </div>
                </div>
            </div>

        }
        </>
    )
}

const clickedIngredient = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates:  PropTypes.number.isRequired,
    fat:  PropTypes.number.isRequired,
    image:  PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price:  PropTypes.number.isRequired,
    proteins:  PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v:  PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired 

});

IngredientDetails.propTypes = {
    clickedIngredient: clickedIngredient
}

export default IngredientDetails