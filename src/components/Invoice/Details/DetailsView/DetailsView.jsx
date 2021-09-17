import { useState } from "react"
import { Redirect } from "react-router-dom"

import ItemsTable from "../../../ItemsTable/ItemsTable"
import { saveCurrentInvoiceInLS, decorator } from '../../../../utils/utils'

import './DetailsView.scss'

const defaultInvoice = {
  id: null,
  orderNumber: null,
  customer: {},
  items: [],
  getDate: () => {},
  getTotalValues: () => ({})
}

const DetailsView = ({ invoice = defaultInvoice, print }) => {
  // State
  const [redirect, setRedirect] = useState(false)

  // Go to print page
  const handlePrintClick = () => {
    saveCurrentInvoiceInLS(invoice)
    setRedirect(true)
  }

  if (redirect) return <Redirect to="/print" />

  return (
    <div className="details-view">
      <div className="details-view__header">
        <div className="details-view__header__left">
          <p className="details-view__header__left__title">Invoice</p>
          <p className="details-view__header__left__invoice-no"># INV{invoice.orderNumber}</p>
          <p className="details-view__header__left__time">{invoice.getDate()}</p>
        </div>
        <div className="details-view__header__right">
          <div className="details-view__header__right__info">
            <p className="details-view__header__right__info__title">Customer details</p>
            <p className="details-view__header__right__info__name">{invoice.customer.name || 'Unknown Customer'}</p>
            <p className="details-view__header__right__info__email">{invoice.customer.email || 'No email provided'}</p>
          </div>
          {!print && (
            <button
              className="details-view__header__right__button"
              onClick={handlePrintClick}
            >
              <span>Print</span>
              <img src="/assets/printer-blue@2x.png" alt="Print" />
            </button>
          )}
        </div>
      </div>

      <ItemsTable comfortable list={invoice.items} />

      <div className="details-view__footer">
        <div className="details-view__footer__cost">
          <p className="details-view__footer__cost__label">Sub Total</p>
          <p className="details-view__footer__cost__value">$ {decorator(invoice.getTotalValues().subTotal)}</p>
        </div>
        <div className="details-view__footer__cost">
          <p className="details-view__footer__cost__label">Tax ({invoice.tax}%)</p>
          <p className="details-view__footer__cost__value">$ {decorator(invoice.getTotalValues().totalTax)}</p>
        </div>
        <div className="details-view__footer__cost">
          <p className="details-view__footer__cost__label">Discount ({invoice.discount}%)</p>
          <p className="details-view__footer__cost__value">$ {decorator(invoice.getTotalValues().totalDiscount)}</p>
        </div>
        <div className="details-view__footer__cost total">
          <p className="details-view__footer__cost__label">Grand Total</p>
          <p className="details-view__footer__cost__value">$ {decorator(invoice.getTotalValues().grandTotal)}</p>
        </div>
      </div>
    </div>
  )
}

export default DetailsView