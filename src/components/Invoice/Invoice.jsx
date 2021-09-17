import { useState, useEffect } from 'react'

import Header from './Header/Header'
import List from './List/List'
import Details from './Details/Details'
import Modal from '../Modal/Modal'
import { Invoice } from '../../utils/utils'
import { dummyData } from '../../utils/dummy'
import { PartOneContent, PartOneFooter, PartOneHeader, PartTwoContent, PartTwoFooter } from './FormComponents/FormComponents'

import './Invoice.scss'

const InvoiceApp = () => {
  // State
  const [invoices, setInvoices] = useState([])
  const [formPage, setFormPage] = useState(1)
  const [newInvoice, setNewInvoice] = useState(null)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [totalValues, setTotalValues] = useState({
    totalTax: 0,
    totalDiscount: 0,
    subTotal: 0,
    grandTotal: 0
  })

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

    // setInvoices(validInvoiceList)
  }, [])

  const closeForm = () => {
    setNewInvoice(null)
    setFormPage(1)
    setOpenCreateModal(false)
    setTotalValues({
      totalTax: 0,
      totalDiscount: 0,
      subTotal: 0,
      grandTotal: 0
    })
  }

  const openForm = () => {
    const newInvoice = new Invoice(null, {}, invoices.length, null, null, [])
    setNewInvoice(newInvoice)
    setOpenCreateModal(true)
  }

  const openNextFormPage = async (validate) => {
    if (!validate) {
      setFormPage(2)
    } else {
      const { name, contact, email } = newInvoice.customer
      if (name && contact && email) {
        setFormPage(2)
      }
    }
  }

  const openPreviousFormPage = () => setFormPage(1)

  // Methods to edit form values
  const updateCustomerValues = (e, field) => {
    const value = e.target.value
    if ((field === 'contact' || field === 'pincode') && isNaN(value)) {
      return
    }
    newInvoice.setCustomerValue(value, field)
  }

  const updateInvoiceTaxDiscount = (e, field) => {
    const value = e.target.value
    if (value >= 0 && value <= 100) {
      newInvoice.setTDValue(value, field)
      calculateTotals()
    }
  }

  const updateInvoiceItems = (list) => {
    newInvoice.setItems(list)
    calculateTotals()
  }

  const calculateTotals = () => {
    const newTotals = newInvoice.getTotalValues()
    setTotalValues(newTotals)
  }

  const handleSubmit = () => {
    const newInvoices = [...invoices]
    newInvoices.push(newInvoice)
    setInvoices(newInvoices)
    closeForm()
  }

  return (
    <div className="invoice">
      <Header openForm={openForm} />

      <div className="invoice__contents">
        <List
          list={invoices}
        />
        <Details />
      </div>

      {openCreateModal && (
        <Modal
          closeForm={closeForm}
          header={<PartOneHeader invoice={newInvoice} />}
          content={formPage === 1 ? (
            <PartOneContent
              next={openNextFormPage}
              invoice={newInvoice}
              update={updateCustomerValues}
            />
          ) : (
            <PartTwoContent
              previous={openPreviousFormPage}
              invoice={newInvoice}
              updateTD={updateInvoiceTaxDiscount}
              updateInvoiceItems={updateInvoiceItems}
              subTotal={totalValues.subTotal}
            />
          )}
          footer={formPage === 1 ? (
            <PartOneFooter next={openNextFormPage} invoice={newInvoice} />
          ) : (
            <PartTwoFooter
              totalValues={totalValues}
              handleSubmit={handleSubmit}
            />
          )}
        />
      )}
    </div>
  )
}

export default InvoiceApp