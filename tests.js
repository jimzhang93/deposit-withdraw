
import {createStore} from 'redux';
import {range, last} from 'lodash';

import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import {shtestallow} from 'enzyme';

import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import faker from 'faker';

import reducer from './app/redux/reducer'
import store from './app/redux/store'

import {SET_ACCOUNT, CHANGE_BALANCE, ADD_TRANSACTION, setAccount, changeAccounts, addTransaction, convertDate } from './app/redux/actions'


    describe('Redux test', () => {


        describe('store and reducer', () => {

            let testingStore;
            beforeEach('Create testing store from reducer', () => {
                testingStore = createStore(reducer);
            });

            it('has an initial state as described', () => {
                const currentStoreState = testingStore.getState();
                expect(currentStoreState.accounts.length).to.be.equal(2);
            });

            describe('reducing on SET_ACCOUNT', () => {

                it('sets the state to the correct account', () => {

                    testingStore.dispatch({
                        type: SET_ACCOUNT,
                        currentAccount: {id:1, name: "Checking Account", balance: 1000}
                    });

                    const newState = testingStore.getState();

                    expect(newState.currentAccount.id).to.be.deep.equal(1);
                    expect(newState.currentAccount.name).to.be.deep.equal("Checking Account");

                });


            });


            describe('reducing on ADD_TRANSACTION', () => {
                beforeEach(() => {
                    testingStore = createStore(
                        reducer
                    );
                });


                it('sets transactions to different array from previous state', () => {

                    const originalState = testingStore.getState();

                    testingStore.dispatch({
                        type: ADD_TRANSACTION,
                        transaction: {id:1, accountId:1, type:"withdraw", account: 2500, time: convertDate(new Date("04/12/2017"))}
                    });

                    const newState = testingStore.getState();

                    expect(newState.transactions).to.not.be.equal(originalState.transactions);
                    expect(originalState.transactions).to.have.length(8);
                    expect(newStatelState.transactions).to.have.length(9);

                });

            });

        });



   });
