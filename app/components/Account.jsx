import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Deposit from './Deposit'
import Withdraw from './Withdraw'

class Account extends React.Component {
  constructor(props){
    super(props)
    this.state={
      action: "Deposit"
    }
  }
  handleDepositClick(event){
    event.preventDefault()
    this.setState({action: "Deposit"})
  }

  handleWithdrawClick(event){
    event.preventDefault()
    this.setState({action: "Withdraw"})
  }

  render(){

    return (
      <div className="ui center aligned container">
        <div className="ui section">
          <h1 className="ui blue header">Welcome to your {this.props.currentAccount.name}!</h1>
        </div>
        <div className="ui center aligned basic segment">
          <h2 className="ui teal header">Your current balance is </h2>
          <h1 className="ui pink header"> ${this.props.currentAccount.balance} </h1>
        </div>

        <div className="ui huge buttons">
          <button onClick={this.handleDepositClick.bind(this)} className="ui violet button">Deposit</button>
          <div className="or"></div>
          <button onClick={this.handleWithdrawClick.bind(this)} className="ui purple button">Withdraw</button>
        </div>
        <div className="ui section divider"></div>
        <div className="ui basic segment">
          {
            this.state.action === "Deposit" ?
            <Deposit />
            :
            <Withdraw />
          }
        </div>

      </div>
    )
  }

}

const mapStateToProps = state => ({
  currentAccount: state.currentAccount,
  transactionsForAccount: state.transactions
})


export default connect(mapStateToProps)(Account)
