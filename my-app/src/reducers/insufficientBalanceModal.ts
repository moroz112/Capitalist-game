import {
    INSUFFICIENT_BALANCE_MODAL,
    InsufficientBalanceActionType
} from '../actions/actionTypes';

export const insufficientBalanceModal = (state: boolean = false, action: InsufficientBalanceActionType) => {
    const {type, payload} = action;

    switch (type) {
        case INSUFFICIENT_BALANCE_MODAL:
            return payload;
        default: 
            return state;
    }

}