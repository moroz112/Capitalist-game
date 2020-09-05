import {
    UPDATE_BALANCE,
    UpdateBalanceActionType,
} from '../actions/actionTypes';

export const balance = (state: number = 3000, action: UpdateBalanceActionType) => {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_BALANCE:
            return payload;
        default:
            return state;
    }
}