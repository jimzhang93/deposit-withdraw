import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {convertDate, changeAccounts, addTransaction} from '../redux/actions'

class Withdraw extends React.Component {

  constructor(props){
    super(props)
    this.state={
      input: "",
      buttonEnabled: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event){
    //Check if the amount entered is only a numerical value with 2 decimal places less than the balance in the account and greater than 0
    new RegExp('^[0-9]*(\.[0-9]{1,2})?$').test(event.target.value) && +event.target.value < this.props.currentAccount.balance && +event.target.value > 0 ?
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
    this.props.handleWithdraw(+this.state.input, this.props.currentAccount, this.props.transactions, this.props.accounts)
  }


  render(){
    return (
      <div className="ui center aligned container">
        <div className="ui large labeled section input">
            <div className="ui label">$</div>
            <input onChange={this.handleChange.bind(this)} value={this.state.input} type="text" name="withdraw" placeholder="Enter Withdrawal Amount" />
          </div>
          <div className="ui hidden divider"></div>
          <div className="ui section">
            {
              this.state.buttonEnabled ?

              <Link to="/"><button onClick={this.handleClick.bind(this)} className="positive ui button">Confirm Withdrawal</button></Link>
              :
              <button disabled={true} className="red ui button">Invalid Withdrawal Amount</button>
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
    handleWithdraw: function(amount, accountToChange, transactions, accounts){
      let newTransaction = {
        id: transactions.length + 1,
        accountId: accountToChange.id,
        type: "withdraw",
        amount: amount,
        time: convertDate(new Date())
      }
      let modifiedAccounts = accounts.map(account => {

        if(account.id === accountToChange.id){
          return account.balance -= amount
        } else{
          return
        }
      })
      dispatch(changeAccounts(modifiedAccounts))
      dispatch(addTransaction(newTransaction))
    }
  })

  export default connect(mapStateToProps, mapDispatchToProps)(Withdraw)
