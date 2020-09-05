import React, {useState, useEffect, useRef} from 'react';
import {Businesses} from '../../types';
import Button from '@material-ui/core/Button';
import './boughtBusiness.scss';

interface BoughtBusinessProps {
    business: Businesses;
    makeMoney: any;
    upgradeBusiness: any;
    assignManager: any;
    balance: number;
}

export const BoughtBusiness = (props: BoughtBusinessProps) => {
    const {
        business,
        makeMoney,
        upgradeBusiness,
        assignManager,
        balance,
    } = props;
    const [isMakingMoneyLoading, setIsMakingMoneyLoading] = useState<boolean>(false);
    const intervalRef = useRef<any>();
    const assignManagerRef = useRef<any>();
    const timeoutRef = useRef<any>();

    const onMakeMoney = () => {
        const moneyToMake = business.revenue[business.level];

        makeMoney(moneyToMake);
        setIsMakingMoneyLoading(true);
        setTimeout(() => {
            setIsMakingMoneyLoading(false);
        }, 2900)
    }

    const onUpgradeBusiness = () => {
        upgradeBusiness(business);
    }

    useEffect(() => {
        if (business.assignedManager) {
            intervalRef.current = setInterval(() => {
                onMakeMoney();
            }, 3000);
        }
        return () => {
            clearInterval(intervalRef.current);
            clearInterval(assignManagerRef.current);
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const onAssignManager = () => {
        assignManager(business);
        if (balance >= business.priceForManager) {
            timeoutRef.current = setTimeout(() => {
                onMakeMoney();
                assignManagerRef.current = setInterval(() => {
                    onMakeMoney();
                }, 3000);
            }, 500);
        }
    }

    return (
        <div className="bought-business">
            <div className="bought-businesses__name">
                {business.name}(level {business.level})
            </div>
            <div className="buttons-wrapper">
                <div className="make-money-button-wrapper">
                    <Button variant="contained" color="primary" onClick={onMakeMoney} disabled={isMakingMoneyLoading}>
                        Make money from your business
                    </Button>
                </div>
                <div className="upgrade-business-button-wrapper">
                    <Button variant="contained" color="secondary" onClick={onUpgradeBusiness}>
                        Upgrade your business
                    </Button>
                </div>
                <div className="assign-manager-button-wrapper">
                    {!business.assignedManager ? (
                        <Button variant="contained" color="default" onClick={onAssignManager}>
                            Assign Manager
                        </Button>
                    ) : `Manager's assigned`}
                </div>
            </div>
        </div>
    )
}
