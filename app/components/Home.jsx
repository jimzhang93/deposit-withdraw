import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {setAccount, getAccountName} from '../redux/actions'

const Home = props => {
  let newTransactions = props.transactions.map(transaction => {
    transaction.accountName = getAccountName(transaction.accountId, props.accounts).split(" ")[0]
    return transaction
  })
  return (
    <div className="ui main justified container">
      <div className="ui massive selection horizontal list">
        <h1>Accounts</h1>
        {
          props.accounts && props.accounts.map(account => {
            return (
              <div key={account.id} className="item">
                <i className="large money middle aligned icon" />
                <div className="content">
                  <Link  to={"account/" + account.id}>
                    <li> {account.name.split(" ")[0]} </li>
                  </Link>
                  <div className="description"> ${account.balance} </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="ui medium divided list">
        <h2>Recent Transactions</h2>
        {
          newTransactions && newTransactions
          .sort((a,b) => new Date(b.time).getTime() - new Date(a.time).getTime())
          .map(transaction => {
            return transaction.type === "deposit" ?
            <div key={transaction.id} className="item">
              <i className="small plus middle aligned icon"></i>
              <div className="content">
                <div className="header">${transaction.amount}</div>
                {transaction.time} | {transaction.accountName}
              </div>
            </div>
            :
            <div key={transaction.id} className="item">
              <i className="small minus middle aligned icon"></i>
              <div className="content">
                <div className="header">${transaction.amount}</div>
                {transaction.time} | {transaction.accountName}
              </div>
            </div>
          })
        }
      </div>
    </div>
  )

}

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions
})



export default connect(mapStateToProps)(Home)
