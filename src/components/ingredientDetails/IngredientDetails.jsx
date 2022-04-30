import ingredientDetailsStyles from './ingredientDetails.module.css';
import { ingredientType } from '../../utils/constants';

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

IngredientDetails.propTypes = {
    clickedIngredient: ingredientType
}

export default IngredientDetails