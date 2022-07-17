import type { TUserOrderDescription } from "../types/data";

export const SET_CLICKED_ORDER: 'SET_CLICKED_ORDER' = "SET_CLICKED_ORDER";
export const REMOVE_CLICKED_ORDER: 'REMOVE_CLICKED_ORDER'  = "REMOVE_CLICKED_ORDER";

export interface ISetUserOrderDescriptionAction {
    readonly type: typeof SET_CLICKED_ORDER;
    readonly userOrderDescription: TUserOrderDescription | null;
}

export interface IRemoveUserOrderDescriptionAction {
    readonly type: typeof REMOVE_CLICKED_ORDER;
}

export type TUserOrderDescriptionActions = 
| ISetUserOrderDescriptionAction
| IRemoveUserOrderDescriptionAction;