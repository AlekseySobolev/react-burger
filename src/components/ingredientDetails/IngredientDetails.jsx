import styles from './ingredientDetails.module.css';
import stroke from '../../images/Vector (Stroke).png';

function IngredientDetails(props) {
    console.log(props.clickedIngredient);
    const clickedIngredient = props.clickedIngredient;
    return (
        <form className={styles.form + ' ' + "ml-10 mb-15 mr-10 mt-10"}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 className={"text text_type_main-large"}>Детали ингредиента</h1>
                <button className={styles.button} type='button'><img src={stroke} alt="Изображение крестика" onClick = {() => props.onOverlayClick()}/></button>
            </div>
            <div className={styles.ingredientDataBox}>
                <img className={"mb-4 pl-5 pr-5"} src={clickedIngredient.image_large} alt="Изображение ингредиента" />
                <h2 className={"text text_type_main-medium mb-8"}>{clickedIngredient.name}</h2>
                <div style={{ display: "flex", gap:"20px"}}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap:"8px"}}>
                        <p className={"text text_type_main-medium text_color_inactive"}>Калории,&nbsp;ккал</p>
                        <p className={"text text_type_main-medium text_color_inactive"}>{clickedIngredient.calories}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap:"8px"}}>
                        <p className={"text text_type_main-medium text_color_inactive"}>Белки,&nbsp;г</p>
                        <p className={"text text_type_main-medium text_color_inactive"}>{clickedIngredient.proteins}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap:"8px"}}>
                        <p className={"text text_type_main-medium text_color_inactive"}>Жиры,&nbsp;г</p>
                        <p className={"text text_type_main-medium text_color_inactive"}>{clickedIngredient.fat}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap:"8px"}}>
                        <p className={"text text_type_main-medium text_color_inactive"}>Углеводы,&nbsp;г</p>
                        <p className={"text text_type_main-medium text_color_inactive"}>{clickedIngredient.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default IngredientDetails