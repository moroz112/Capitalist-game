import {
    MONEY_WAS_MADE_WHILE_YOU_AWAY_MODAL,
    MoneyWasMadeWhileYouAwayActionType
} from '../actions/actionTypes';

export const moneyWasMadeWhileYouAwayModal = (state: number = 0, action: MoneyWasMadeWhileYouAwayActionType) => {
    const {type, payload} = action;

    switch (type) {
        case MONEY_WAS_MADE_WHILE_YOU_AWAY_MODAL:
            return payload;
        default: 
            return state;
    }

}