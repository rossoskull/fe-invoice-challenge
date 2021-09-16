import { useState, useEffect } from 'react'

import Header from './Header/Header'
import List from './List/List'
import Details from './Details/Details'
import { Invoice, Item } from '../../utils/utils'
import { dummyData } from '../../utils/dummy'

import './Invoice.scss'

const InvoiceApp = () => {
  // State
  const [invoices, setInvoices] = useState([])

  // componentDidMount
  useEffect(() => {
    const validInvoiceList = dummyData.map((invoice) => {
      return new Invoice(
        invoice.id,
        invoice.customer,
        invoice.orderNumber,
        invoice.tax,
        invoice.discount,
        invoice.items
      )
    })

    setInvoices(validInvoiceList)
  }, [])


  return (
    <div className="invoice">
      <Header />

      <div className="invoice__contents">
        <List
          list={invoices}
        />
        <Details />
      </div>
    </div>
  )
}

export default InvoiceApp