import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {convertDate, changeAccounts, addTransaction} from '../redux/actions'

class Deposit extends React.Component {

  constructor(props){
    super(props)
    this.state={
      input: "",
      buttonEnabled: false
    }
  }

  handleChange(event){
    //Check if the amount entered is only a numerical value with 2 decimal places and greater than 0
    new RegExp('^[0-9]*(\.[0-9]{1,2})?$').test(event.target.value) && +event.target.value > 0 ?
    this.setState({
      buttonEnabled: true,
      input: event.target.value
    })
    :
    this.setState({
      buttonEnabled: false,
      input: event.target.value
    })
  }

  handleClick(event){
    this.props.handleDeposit(+this.state.input, this.props.currentAccount, this.props.transactions, this.props.accounts)
  }


  render(){

    return (
        <div className="ui center aligned container">
          <div className="ui large labeled section input">
              <div className="ui label">$</div>
              <input onChange={this.handleChange.bind(this)} value={this.state.input} type="text" name="deposit" placeholder="Enter Deposit Amount" />
            </div>
            <div className="ui hidden divider"></div>
            <div className="ui section">
              {
                this.state.buttonEnabled ?

                <Link to="/"><button onClick={this.handleClick.bind(this)} className="positive ui button">Confirm Deposit</button></Link>
                :
                <button disabled={true} className="red ui button">Invalid Deposit Amount</button>
              }
            </div>
          </div>
      )
    }

  }

  const mapStateToProps = state => ({
    currentAccount: state.currentAccount,
    transactions: state.transactions,
    accounts: state.accounts
  })

  const mapDispatchToProps = dispatch => ({
    handleDeposit: function(amount, accountToChange, transactions, accounts){
      let newTransaction = {
        id: transactions.length + 1,
        accountId: accountToChange.id,
        type: "deposit",
        amount: amount,
        time: convertDate(new Date())
      }
      let modifiedAccounts = accounts.map(account => {

        if(account.id === accountToChange.id){
          return account.balance += amount
        } else{
          return
        }
      })
      dispatch(changeAccounts(modifiedAccounts))
      dispatch(addTransaction(newTransaction))
    }
  })

  export default connect(mapStateToProps, mapDispatchToProps)(Deposit)
