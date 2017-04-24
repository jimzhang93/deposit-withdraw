import { convertDate, SET_ACCOUNT, ADD_TRANSACTION, CHANGE_ACCOUNTS  } from './actions'

const initialState = {
  accounts: [
    {id:1, name: "Checking Account", balance: 1000},
    {id:2, name: "Savings Account", balance: 20000}
  ],
  transactions: [
      {id: 2, accountId: 1, type: "withdraw", amount: 2500, time: convertDate(new Date("04/12/2017"))},
      {id: 3, accountId: 2, type: "withdraw", amount: 10000, time: convertDate(new Date("03/14/2017"))},
      {id: 4, accountId: 2, type: "deposit", amount: 5000, time: convertDate(new Date("03/12/2017"))},
      {id: 5, accountId: 1, type: "deposit", amount: 100, time: convertDate(new Date("02/21/2017"))},
      {id: 6, accountId: 2, type: "withdraw", amount: 12500, time: convertDate(new Date("02/4/2017"))},
      {id: 7, accountId: 2, type: "deposit", amount: 20000, time: convertDate(new Date("02/1/2017"))},
      {id: 8, accountId: 1, type: "deposit", amount: 3000, time: convertDate(new Date("01/4/2017"))},
      {id: 10, accountId: 1, type: "deposit", amount: 2000, time: convertDate(new Date("01/1/2017"))}
  ]
}

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch(action.type){
    case SET_ACCOUNT:
      newState.currentAccount = action.currentAccount
      break
    case ADD_TRANSACTION:
      newState.transactions = state.transactions.concat([action.transaction])
      break
    case CHANGE_ACCOUNTS:
      newState.accounts = action.accounts
      break
    default:
      return state
  }
  return newState
}


export default reducer;
