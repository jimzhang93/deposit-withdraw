import React from 'react'
import {Router, Route, IndexRedirect, hashHistory} from 'react-router'
import {render} from 'react-dom'
import Home from './components/Home'
import {connect, Provider} from 'react-redux'
import store from './redux/store'
import Account from './components/Account'
import {setAccount} from './redux/actions'
import {Link} from 'react-router'

const onAccountEnter = (lastRouterParams) => {
  let currentAccount = store.getState().accounts.filter(account => {
    return account.id === +lastRouterParams.params.id
  })[0]
  store.dispatch(setAccount(currentAccount))
}

const App = ({children}) => (
  <div>
    <div className="ui inverted menu">
      <Link to="/" className="header large item">
        Jimmy's Bank
      </Link>
    </div>
    {children}
  </div>
)

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="home" component={Home} />
        <Route path="account/:id" component={Account} onEnter={onAccountEnter} />
        <IndexRedirect to="/home" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
