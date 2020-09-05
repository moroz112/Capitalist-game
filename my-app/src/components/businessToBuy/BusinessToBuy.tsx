import React from 'react';
import {Businesses} from '../../types';
import './businessToBuy.scss';

interface BusinessProps {
    business: Businesses;
    buyBusiness: any;
    balance: number;
}

export const BusinessToBuy = (props: BusinessProps) => {
    const {
        business,
        buyBusiness,
    } = props;

    const onBuyBusinesses = () => {
        buyBusiness(business)
    }

    return (
        <div
            onClick={onBuyBusinesses}
            className="business-to-buy"
        >
            {business.name}
        </div>
    )
}