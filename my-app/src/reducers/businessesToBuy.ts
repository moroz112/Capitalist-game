import {
    FreeBusinessesActionType,
    SET_BUSINESSES_TO_BUY,
    BUY_BUSINESS,
} from '../actions/actionTypes';
import {Businesses} from '../types';

export const businessesToBuy = (state: Businesses[] = [], action: FreeBusinessesActionType) => {
    const {type, payload} = action;

    switch(type) {
        case SET_BUSINESSES_TO_BUY:
            return [...payload];
        case BUY_BUSINESS:
            // const boughtBusinessNames = payload.map((value) => value.name);
            return [...state.filter((business) => business.name !== payload[0].name)]
        default:
            return state;
    }
}