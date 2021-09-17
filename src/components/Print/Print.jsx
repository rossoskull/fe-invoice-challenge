import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { getCurrentInvoiceFromLS } from '../../utils/utils'
import DetailsView from '../Invoice/Details/DetailsView/DetailsView'

import './Print.scss'

const Print = () => {
  // State
  const [redirect, setRedirect] = useState(false)
  const [invoice, setInvoice] = useState({
    id: null,
    customer: {},
    orderNumber: null,
    tax: null,
    discount: null,
    items: [],
    getDate: () => {},
    getTotalValues: () => ({
      subTotal: null,
      totalTax: null,
      totalDiscount: null,
      grandTotal: null
    })
  })

  // Component did mount
  useEffect(() => {
    const invoiceObject = getCurrentInvoiceFromLS()
    if (invoiceObject) {
      setInvoice(invoiceObject)
    }
  }, [])

  const back = () => {
    setRedirect(true)
  }

  const printWindow = () => {
    window.print()
  }

  if (redirect) return <Redirect to="/" />

  return (
    <div className="print">
      <div className="print__actions no-print">
        <button
          className="no-print footer-button"
          onClick={back}
        >
          <img
            src="/assets/close-btn@2x.png"
            alt="Back"
          />
          Back
        </button>

        <button
          className="no-print footer-button print-button"
          onClick={printWindow}
        >
          Print
          <img
            src="/assets/printer-blue@2x.png"
            alt="Back"
          />
        </button>
      </div>
      <DetailsView
        print
        invoice={invoice}
      />
    </div>
  )
}

export default Print