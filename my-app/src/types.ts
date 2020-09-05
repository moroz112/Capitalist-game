export interface Businesses {
    name: string;
    revenue: Record<string, number>;
    priceForUpgrade: Record<string, number>;
    price: number;
    level: number;
    maxLevel: number;
    assignedManager: boolean;
    priceForManager: number;
}

export interface UserState {
    businessesToBuy: Businesses[];
    boughtBusinesses: Businesses[];
    balance: number;
    insufficientBalanceModal: boolean;
    maxUpgradedBusinessModal: boolean;
    moneyWasMadeWhileYouAwayModal: number;
}
