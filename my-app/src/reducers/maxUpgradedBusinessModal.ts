import {
    ALREADY_MAX_UPGRADED_BUSINESS_MODAL,
    MaxUpgradedBusinessActionType
} from '../actions/actionTypes';

export const maxUpgradedBusinessModal = (state: boolean = false, action: MaxUpgradedBusinessActionType) => {
    const {type, payload} = action;

    switch (type) {
        case ALREADY_MAX_UPGRADED_BUSINESS_MODAL:
            return payload;
        default: 
            return state;
    }

}