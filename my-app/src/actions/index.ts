import {Dispatch} from 'redux';
import {
    SET_BOUGHT_BUSINESSES,
    SET_BUSINESSES_TO_BUY,
    BUY_BUSINESS,
    UPGRADE_BUSINESS,
    UPDATE_BALANCE,
    INSUFFICIENT_BALANCE_MODAL,
    ALREADY_MAX_UPGRADED_BUSINESS_MODAL,
    MONEY_WAS_MADE_WHILE_YOU_AWAY_MODAL,
    ASSIGN_MANAGER
} from './actionTypes';
import {businessesToBuyData} from '../data';
import {
    Businesses,
    UserState,
} from '../types';

export const assignManager = (business: Businesses) => (dispatch: Dispatch, getState: () => UserState) => {
    const {balance} = getState();
    const newBalance = balance - business.priceForManager;

    if (newBalance < 0) {
        return dispatch(openInsufficientBalanceModal());
    }

    dispatch({
        type: UPDATE_BALANCE,
        payload: newBalance,
    });

    dispatch({
        type: ASSIGN_MANAGER,
        payload: [{...business, assignedManager: true}]
    });
};

export const upgradeBusiness = (business: Businesses) => (dispatch: Dispatch, getState: () => UserState) => {
    const {balance} = getState();
    if (business.level + 1 <= business.maxLevel) {
        const newBalance = balance - business.priceForUpgrade[business.level + 1];

        if (newBalance < 0) {
            return dispatch(openInsufficientBalanceModal());
        }

        dispatch({
            type: UPDATE_BALANCE,
            payload: newBalance,
        });

        dispatch({
            type: UPGRADE_BUSINESS,
            payload: [{...business, level: business.level + 1}]
        })
    } else {
        dispatch(openAlreadyMaxUpGradedBusiness());
    }
};

export const makeMoneyFromBusiness = (payload: number) => (dispatch: Dispatch, getState: () => UserState) => {
    const {balance} = getState();
    const newBalance = balance + payload;

    dispatch({
        type: UPDATE_BALANCE,
        payload: newBalance
    })
};

export const setAppBaseState = () => (dispatch: Dispatch, getState: () => UserState): void => {
    const {balance} = getState();
    const storageBusinessesToBuy = localStorage.getItem('businessesToBuy');
    const storageBoughtBusinesses = localStorage.getItem('boughtBusinesses');
    const storageBalance = Number(localStorage.getItem('balance'));
    const storageLeaveOnVacationDate = Number(localStorage.getItem('leaveOnVacationDate'));
    const businessesToBuy = storageBusinessesToBuy ? JSON.parse(storageBusinessesToBuy) : businessesToBuyData;
    const boughtBusinesses = storageBoughtBusinesses ? JSON.parse(storageBoughtBusinesses) : [];
    const balancePayload = storageBalance ? storageBalance : balance;
    const currentDate = Math.round(new Date().getTime() / 1000);
    const iterationNumber = Math.round((currentDate - storageLeaveOnVacationDate) / 3);

    const sumManagerMakesPerIterationArr = boughtBusinesses
        .filter((business: Businesses) => business.assignedManager)
        .map((item:Businesses) => item.revenue[item.level]);
    const addToBalanceSum = sumManagerMakesPerIterationArr.reduce((acc: number, curr: number) => {
        return acc + curr
    }, 0) * iterationNumber;

    dispatch(openYourManagersMadeForYouModal(addToBalanceSum));

    dispatch({
        type: SET_BUSINESSES_TO_BUY,
        payload: businessesToBuy,
    });

    dispatch({
        type: SET_BOUGHT_BUSINESSES,
        payload: boughtBusinesses,
    });

    dispatch({
        type: UPDATE_BALANCE,
        payload: balancePayload + addToBalanceSum,
    })
};

export const buyBusiness = (business: Businesses) => (dispatch: Dispatch, getState: () => UserState) => {
    const {balance} = getState();
    const newBalance = balance - business.price;

    if (newBalance < 0) {
        return dispatch(openInsufficientBalanceModal());
    }

    dispatch({
        type: BUY_BUSINESS,
        payload: [business],
    });

    dispatch({
        type: UPDATE_BALANCE,
        payload: newBalance,
    })
};

export const closeInsufficientBalanceModal = () => ({
    type: INSUFFICIENT_BALANCE_MODAL,
    payload: false,
});

export const openInsufficientBalanceModal = () => ({
    type: INSUFFICIENT_BALANCE_MODAL,
    payload: true,
});

export const openAlreadyMaxUpGradedBusiness = () => ({
    type: ALREADY_MAX_UPGRADED_BUSINESS_MODAL,
    payload: true
});

export const closeAlreadyMaxUpGradedBusiness = () => ({
    type: ALREADY_MAX_UPGRADED_BUSINESS_MODAL,
    payload: false
});

export const openYourManagersMadeForYouModal = (value: number) => ({
    type: MONEY_WAS_MADE_WHILE_YOU_AWAY_MODAL,
    payload: value,
});

export const closeYourManagersMadeForYouModal = () => ({
    type: MONEY_WAS_MADE_WHILE_YOU_AWAY_MODAL,
    payload: 0,
});