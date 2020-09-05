import {
    AllBoughtBusinessesActionType,
    SET_BOUGHT_BUSINESSES,
    BUY_BUSINESS,
    UPGRADE_BUSINESS,
    ASSIGN_MANAGER,
} from '../actions/actionTypes';
import {Businesses} from '../types';

export const boughtBusinesses = (state: Businesses[] = [], action: AllBoughtBusinessesActionType) => {
    const {type, payload} = action;

    switch(type) {
        case SET_BOUGHT_BUSINESSES:
            return [...payload];
        case BUY_BUSINESS:
            return [...state, payload[0]];
        case UPGRADE_BUSINESS:
        case ASSIGN_MANAGER:
            const index = state.findIndex((item) => item.name === payload[0].name);
            state.splice(index, 1, payload[0]);
            return [...state];
        default:
            return state;
    }

}