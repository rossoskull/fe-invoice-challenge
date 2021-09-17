import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import InvoiceApp from './components/Invoice/Invoice'
import Print from './components/Print/Print'

import './sass/_base.scss'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={InvoiceApp}
        />
        <Route
          exact
          path="/print"
          component={Print}
        />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)