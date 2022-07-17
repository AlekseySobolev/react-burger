import type { TIngredientDescription } from "../types/data";

export const SET_INGREDIENT_DESCRIPTION: 'SET_INGREDIENT_DESCRIPTION'  = "SET_INGREDIENT_DESCRIPTION";
export const REMOVE_INGREDIENT_DESCRIPTION: 'REMOVE_INGREDIENT_DESCRIPTION' = "REMOVE_INGREDIENT_DESCRIPTION";



export interface ISetIngredientDescriptionAction {
    readonly type: typeof SET_INGREDIENT_DESCRIPTION;
    readonly ingredientDescription: TIngredientDescription | null;
}

export interface IRemoveIngredientDescriptionAction {
    readonly type: typeof REMOVE_INGREDIENT_DESCRIPTION;
}

export type TIngredientDescriptionActions = 
| ISetIngredientDescriptionAction
| IRemoveIngredientDescriptionAction;