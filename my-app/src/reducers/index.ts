import {combineReducers} from 'redux';
import {boughtBusinesses} from './boughtBusinesses';
import {businessesToBuy} from './businessesToBuy';
import {balance} from './balance';
import {insufficientBalanceModal} from './insufficientBalanceModal';
import {maxUpgradedBusinessModal} from './maxUpgradedBusinessModal';
import {moneyWasMadeWhileYouAwayModal} from './moneyWasMadeWhileYouAwayModal';

export default combineReducers({
    boughtBusinesses,
    businessesToBuy,
    balance,
    insufficientBalanceModal,
    maxUpgradedBusinessModal,
    moneyWasMadeWhileYouAwayModal,
})