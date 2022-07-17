export type TLocationParams = {
    pathname: string;
    state: {
        background?: string;
        currentOrder?: any;
        currentIngredient?: TIngredientDescription;
        from?: {
            pathname?: string
        }
    };
    search: string;
    hash: string;
    key: string;
};

export type TUser = {
    email: string;
    name: string;
};

export type TIngredientDescription = {

    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly proteins: number;
    readonly type: String;
     __v: number;
    readonly _id: string;

};

export type TIngredientDescriptionWithUuid = {
    ingredient: TIngredientDescription;
    uuid: string;
}

export type TUserOrderDescription = {

    readonly _id: string;
    readonly ingredients: string[];
    readonly status: string;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly number: number;

};

export type TUserOrders = {

    orders: TUserOrderDescription[];
    total: number;
    totalToday: number;

};

export type TOrderDescription = {

    readonly success: boolean;
    readonly name: string;
    readonly order: TUserOrderDescription;
};