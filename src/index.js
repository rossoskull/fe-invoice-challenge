import React from 'react'
import ReactDOM from 'react-dom'

import InvoiceApp from './components/Invoice/Invoice'

import './sass/_base.scss'

ReactDOM.render(
  <React.StrictMode>
    <InvoiceApp />
  </React.StrictMode>,
  document.getElementById('root')
)