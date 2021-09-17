import { useState, useEffect } from 'react'

import Header from './Header/Header'
import List from './List/List'
import Details from './Details/Details'
import Modal from '../Modal/Modal'
import { getAllInvoicesFromLS, Invoice, saveAllInvoicesInLS } from '../../utils/utils'
import { PartOneContent, PartOneFooter, PartOneHeader, PartTwoContent, PartTwoFooter } from './FormComponents/FormComponents'

import './Invoice.scss'

const InvoiceApp = () => {
  // States
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
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    pincode: ''
  })
  const [currentDetails, setCurrentDetails] = useState(null)

  // componentDidMount
  useEffect(() => {
    const previousItems = getAllInvoicesFromLS()
    if (previousItems) {
      const validInvoiceList = previousItems.map((invoice) => {
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
      if (validInvoiceList.length > 0) {
        setCurrentDetails(0)
      }
    }
  }, [])

  // Close the create Invoice form and reset state values for inputs
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

    setCustomerDetails({
      name: '',
      contact: '',
      email: '',
      address: '',
      pincode: ''
    })
  }

  // Open Invoice form and initiate new Invoice instance for state values
  const openForm = () => {
    const newInvoice = new Invoice(null, {}, invoices.length, null, null, [])
    setNewInvoice(newInvoice)
    setOpenCreateModal(true)
  }

  // Go to part two of the form
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

  // Go to part one of the form
  const openPreviousFormPage = () => setFormPage(1)

  // Methods to edit form values
  // Update values of name, email, contact, address and pincode fields
  const updateCustomerValues = (e, field) => {
    const value = e.target.value
    if ((field === 'contact' || field === 'pincode') && isNaN(value)) {
      return
    }
    newInvoice.setCustomerValue(value, field)
    setCustomerDetails({...newInvoice.customer})
  }

  // Update values of tax and discount fields
  const updateInvoiceTaxDiscount = (e, field) => {
    const value = e.target.value
    if (value >= 0 && value <= 100) {
      newInvoice.setTDValue(value, field)
      calculateTotals()
    }
  }

  // Update list of items in an invoice
  const updateInvoiceItems = (list) => {
    newInvoice.setItems(list)
    calculateTotals()
  }

  // Update state values of all total calculations related to newInvoice instance
  const calculateTotals = () => {
    const newTotals = newInvoice.getTotalValues()
    setTotalValues(newTotals)
  }

  // Push the newInvoice instance to invoice list, save in localstorage
  const handleSubmit = () => {
    if (newInvoice.items.length === 0) {
      alert('Insert atleast 1 item')
      return
    }
    const newList = [newInvoice, ...invoices]
    setInvoices(newList)
    setCurrentDetails(0)
    const el = document.getElementById('list-container')
    if (el) el.scrollTop = 0

    saveAllInvoicesInLS(newList)

    closeForm()
  }

  // Choose what detail to view in details section
  const handleDetailsChange = (newIndex) => {
    setCurrentDetails(newIndex)
  }

  return (
    <div className="invoice">
      <Header openForm={openForm} />

      <div className="invoice__contents">
        <List
          list={invoices}
          handleDetailsChange={handleDetailsChange}
          currentDetails={currentDetails}
        />
        <Details
          details={invoices[currentDetails]}
        />
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
              customerDetails={customerDetails}
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