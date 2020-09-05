import {
    Businesses
} from '../types';

export const BUY_BUSINESS = 'BUY_BUSINESS';
export const UPGRADE_BUSINESS = 'UPGRADE_BUSINESS';
export const SET_BOUGHT_BUSINESSES = 'GET_BOUGHT_BUSINESSES';
export const SET_BUSINESSES_TO_BUY = 'SET_BUSINESSES_TO_BUY';
export const UPDATE_BALANCE = 'UPDATE_BALANCE';
export const INSUFFICIENT_BALANCE_MODAL = 'INSUFFICIENT_BALANCE_MODAL';
export const ALREADY_MAX_UPGRADED_BUSINESS_MODAL = 'ALREADY_MAX_UPGRADED_BUSINESS_MODAL';
export const MONEY_WAS_MADE_WHILE_YOU_AWAY_MODAL = 'MONEY_WAS_MADE_WHILE_YOU_AWAY_MODAL'
export const ASSIGN_MANAGER ='ASSIGN_MANAGER';


export interface MoneyWasMadeWhileYouAwayActionType {
    type: typeof MONEY_WAS_MADE_WHILE_YOU_AWAY_MODAL;
    payload: boolean;
}

export interface AssignManagerActionType {
    type: typeof ASSIGN_MANAGER;
    payload: Businesses[];
}

export interface BusinessActionType {
    type: typeof SET_BUSINESSES_TO_BUY;
    payload: Businesses[];
}

export interface BuyBusinessActionType {
    type: typeof BUY_BUSINESS;
    payload: Businesses[];
}

export interface BoughtBusinessActionType {
    type: typeof SET_BOUGHT_BUSINESSES;
    payload: Businesses[];
}

export interface UpdateBalanceActionType {
    type: typeof UPDATE_BALANCE;
    payload: number;
}

export interface MaxUpgradedBusinessActionType {
    type: typeof ALREADY_MAX_UPGRADED_BUSINESS_MODAL;
    payload: boolean;
}

export interface InsufficientBalanceActionType {
    type: typeof INSUFFICIENT_BALANCE_MODAL;
    payload: boolean;
}

export interface UpgradeBusinessActionType {
    type: typeof UPGRADE_BUSINESS;
    payload: Businesses[]
}

export type FreeBusinessesActionType = BusinessActionType | BuyBusinessActionType;

export type AllBoughtBusinessesActionType = BoughtBusinessActionType | BuyBusinessActionType | UpgradeBusinessActionType | AssignManagerActionType;