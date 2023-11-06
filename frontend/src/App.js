import React from 'react'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/home' component={Home} />
    </Switch>
  )
}

export default App
