export const SET_ACCOUNT = 'SET_ACCOUNT'
export const CHANGE_BALANCE = 'CHANGE_ACCOUNTS'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'

export const setAccount = account => ({
  type: SET_ACCOUNT,
  currentAccount: account
})

export const changeAccounts = accounts => ({
  type: CHANGE_BALANCE,
  accounts
})

export const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  transaction
})


export const convertDate = date => {
  let dateStringArr = date.toString().split(" ")
  return dateStringArr.slice(0, 5).join(" ")
}

export const getAccountName = (accountId, accounts) => {
  let accountName
  accounts.forEach(account => {
    if(account.id === accountId){
      accountName = account.name
    }
  })
  return accountName
}
