import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Product from './Product'
import Products from './Products'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Products} />
    <Route path="/products" exact component={Products} />
    <Route path="/products/:id" exact component={Product} />
  </Switch>
)

export default Routes
