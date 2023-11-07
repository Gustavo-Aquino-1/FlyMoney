import React from 'react'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Login from './pages/Login'
import Home from './pages/Home'
import Article from './pages/Article'
import ArticleDetails from './pages/ArticleDetails'
import FavoritesArticles from './pages/FavoritesArticles'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/article' component={Article} />
      <Route exact path='/article/:id' component={ArticleDetails} />
      <Route exact path='/favorites' component={FavoritesArticles} />
    </Switch>
  )
}

export default App
