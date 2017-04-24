
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

        // describe('EXTRA CREDIT', () => {
        //
        //     describe('component connection', () => {
        //
        //         /*  --- EXTRA CREDIT ---
        //          *   The assertions in this describe block assume ALL OTHERS have passed.
        //          *   Please only move on to this portion once all specs are passing.
        //          */
        //
        //         describe('<Inbox />', () => {
        //
        //             let inboxWrapper;
        //             beforeEach('Get an <Inbox />', () => {
        //                 inboxWrapper = shallow(<Inbox />);
        //             });
        //
        //             it('has an initial local state that reflects the current store state', () => {
        //                 const componentState = inboxWrapper.state();
        //                 expect(componentState.messagesLoading).to.be.false;
        //                 expect(componentState.messages).to.be.deep.equal([]);
        //             });
        //
        //             /**
        //              * SPECIAL NOTE
        //              *
        //              * The specific way we are testing components means that they get *ready* to
        //              * mount, but never *actually* become mounted. In other words, the
        //              * `componentDidMount` hook will never run, though certain other hooks may
        //              * run. For the sake of this checkpoint, you may use those other hooks
        //              * instead, even if you wouldn't use them in a real app.
        //              */
        //
        //             it('is subscribed to changes from the redux store and always reflects state accurately', () => {
        //
        //                 actualStore.dispatch(createLoadingAction());
        //
        //                 let currentComponentState = inboxWrapper.state();
        //
        //                 expect(currentComponentState.messagesLoading).to.be.true;
        //                 expect(currentComponentState.messages).to.be.deep.equal([]);
        //
        //                 const randomMessages = testUtilities.createRandomMessages(10);
        //                 actualStore.dispatch(createMessagesReceivedAction(randomMessages));
        //
        //                 currentComponentState = inboxWrapper.state();
        //
        //                 expect(currentComponentState.messagesLoading).to.be.false;
        //                 expect(currentComponentState.messages).to.be.deep.equal(randomMessages);
        //
        //                 const randomNewMessage = testUtilities.createOneRandomMessage();
        //
        //                 actualStore.dispatch(createNewMessageAction(randomNewMessage));
        //
        //                 currentComponentState = inboxWrapper.state();
        //
        //                 expect(currentComponentState.messages).to.be.deep.equal([...randomMessages, randomNewMessage]);
        //
        //             });
        //
        //         });
        //
        //     });
        //
        // });


   });
