import ingredientDetailsStyles from './ingredientDetails.module.css';
import { useSelector } from 'react-redux';
function IngredientDetails() {

    const { ingredientDescription } = useSelector(state => state.ingredientDescription);

    return (
        <>
        {ingredientDescription &&
            <div className={ingredientDetailsStyles.ingredientDataBox}>
                <img className={"mb-4 pl-5 pr-5"} src={ingredientDescription.image_large} alt="Изображение ингредиента" />
                <h2 className={ingredientDetailsStyles.h2 + " text text_type_main-medium"}>{ingredientDescription.name}</h2>
                <div className= {ingredientDetailsStyles.caloriesBox + " mt-8"}>
                    <div className={ingredientDetailsStyles.infoBox}>
                        <p className={"text text_type_main-small text_color_inactive"}>Калории,&nbsp;ккал</p>
                        <p className={"text text_type_main-default text_color_inactive"}>{ingredientDescription.calories}</p>
                    </div>
                    <div className={ingredientDetailsStyles.infoBox}>
                        <p className={"text text_type_main-small text_color_inactive"}>Белки,&nbsp;г</p>
                        <p className={"text text_type_main-default text_color_inactive"}>{ingredientDescription.proteins}</p>
                    </div>
                    <div className={ingredientDetailsStyles.infoBox}>
                        <p className={"text text_type_main-small text_color_inactive"}>Жиры,&nbsp;г</p>
                        <p className={"text text_type_main-default text_color_inactive"}>{ingredientDescription.fat}</p>
                    </div>
                    <div className={ingredientDetailsStyles.infoBox}>
                        <p className={"text text_type_main-small text_color_inactive"}>Углеводы,&nbsp;г</p>
                        <p className={"text text_type_main-default text_color_inactive"}>{ingredientDescription.carbohydrates}</p>
                    </div>
                </div>
            </div>

        }
        </>
    )
}

export default IngredientDetails