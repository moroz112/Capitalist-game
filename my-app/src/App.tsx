import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {BusinessToBuy} from './components/businessToBuy/BusinessToBuy';
import {BoughtBusiness} from './components/boughtBusiness/BoughtBusiness';
import {Modal} from './common/Modal';
import {businessesToBuyData} from './data';
import {
  setAppBaseState,
  buyBusiness,
  closeInsufficientBalanceModal,
  closeAlreadyMaxUpGradedBusiness,
  makeMoneyFromBusiness,
  upgradeBusiness,
  assignManager,
  closeYourManagersMadeForYouModal,
} from './actions';
import {UserState} from './types';
import {
  Businesses,
} from './types';
import './App.scss';
import { Button } from '@material-ui/core';

interface AppProps {
  setAppBaseState: any;
  buyBusiness: any;
  assignManager: any;
  makeMoneyFromBusiness: any;
  upgradeBusiness: any;
  closeYourManagersMadeForYouModal: any;
  moneyWasMadeWhileYouAwayModal: number;
  closeInsufficientBalanceModal: any;
  closeAlreadyMaxUpGradedBusiness: any;
  boughtBusinesses: Businesses[];
  businessesToBuy: Businesses[];
  balance: number;
  insufficientBalanceModal: boolean;
  maxUpgradedBusinessModal: boolean;
}

function App(props: AppProps) {
  const {
    setAppBaseState,
    buyBusiness,
    boughtBusinesses,
    businessesToBuy,
    assignManager,
    balance,
    insufficientBalanceModal,
    closeInsufficientBalanceModal,
    closeAlreadyMaxUpGradedBusiness,
    closeYourManagersMadeForYouModal,
    moneyWasMadeWhileYouAwayModal,
    maxUpgradedBusinessModal,
    makeMoneyFromBusiness,
    upgradeBusiness,
  } = props;
  const [clearedNumber, setClearedNumber] = useState<number>(0);

  window.addEventListener('beforeunload', function() {
    localStorage.setItem('businessesToBuy', JSON.stringify(businessesToBuy));
    localStorage.setItem('boughtBusinesses', JSON.stringify(boughtBusinesses));
    localStorage.setItem('leaveOnVacationDate', JSON.stringify(Math.round(new Date().getTime() / 1000)));
    this.localStorage.setItem('balance', JSON.stringify(balance));
  });

  useEffect(() => {
    setAppBaseState();
  }, [clearedNumber]);

  const onClearState = () => {
    localStorage.setItem('businessesToBuy', JSON.stringify(businessesToBuyData));
    localStorage.setItem('boughtBusinesses', JSON.stringify([]));
    localStorage.setItem('balance', '3000');
    setClearedNumber(clearedNumber + 1);
  };

  return (
    <div className="App">
      <div className="App__header">
        <div className="balance">
            Your balance <span className="balance__value">{balance}$</span>
        </div>
        <div className="clear-state-button">
          <Button variant="contained" color="primary" onClick={onClearState}>
            Start again
          </Button>
        </div>
      </div>
      {!!moneyWasMadeWhileYouAwayModal && <Modal
        text={`While you were on vacation your managers made you ${moneyWasMadeWhileYouAwayModal}$`}
        closeModal={closeYourManagersMadeForYouModal}
      />}
      {insufficientBalanceModal && <Modal
        text="Insufficient balance. Make more money to perform this action"
        closeModal={closeInsufficientBalanceModal}
      />}
      {maxUpgradedBusinessModal && <Modal
        text="This Business already upgraded to maximum"
        closeModal={closeAlreadyMaxUpGradedBusiness}
      />}
      <div className="businesses-to-buy">
        <div className="businesses-to-buy__header">
          {!!businessesToBuy.length ? `Buy Bysinesses And Start Making Money Right Now` : `You bought all available businesses`}
        </div>
        <div className="businesses-to-buy__wrapper">
          {businessesToBuy.map((business) => (
            <BusinessToBuy
              balance={balance}
              key={business.name}
              buyBusiness={buyBusiness}
              business={business}
            />
          ))}
        </div>
      </div>
      <div className="bought-businesses">
          <div className="bought-businesses__header">
            {!!boughtBusinesses.length ? `Your Businesses` : ''}
          </div>
          {boughtBusinesses.map((business) => (
            <BoughtBusiness
              balance={balance}
              key={business.name}
              business={business}
              assignManager={assignManager}
              makeMoney={makeMoneyFromBusiness}
              upgradeBusiness={upgradeBusiness}
            />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: UserState) => ({
  boughtBusinesses: state.boughtBusinesses,
  businessesToBuy: state.businessesToBuy,
  balance: state.balance,
  insufficientBalanceModal: state.insufficientBalanceModal,
  maxUpgradedBusinessModal: state.maxUpgradedBusinessModal,
  moneyWasMadeWhileYouAwayModal: state.moneyWasMadeWhileYouAwayModal,
});

const mapDispatchToProps = {
  setAppBaseState,
  buyBusiness,
  closeInsufficientBalanceModal,
  closeAlreadyMaxUpGradedBusiness,
  closeYourManagersMadeForYouModal,
  makeMoneyFromBusiness,
  upgradeBusiness,
  assignManager,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

