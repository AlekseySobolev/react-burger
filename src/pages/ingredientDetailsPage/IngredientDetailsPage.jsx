import ingredientDetailsStyles from './ingredientDetailsPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../../components/appHeader/AppHeader';

function IngredientDetailsPage({ isRouter }) {
    
    const {id : ingredientId } = useParams();
    const { ingredients } = useSelector(state=>state.burgerIngredients);

    const ingredientDescription = useMemo(
    () => ingredients.find(ingredient => ingredient._id === ingredientId)
    , [ingredientId, ingredients])
    
    return (
        <>
        {ingredientDescription &&
            <>
            <AppHeader/>
            <main className={ingredientDetailsStyles.ingredientDataBox}>
                 <h1 className={ingredientDetailsStyles.h2 + " text text_type_main-medium"}>{"Детали ингридиента"}</h1>
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
            </main>
            </>
        }
        </>
    )
}

IngredientDetailsPage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default IngredientDetailsPage