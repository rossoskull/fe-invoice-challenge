import { v4 as uuidv4 } from 'uuid'

/**
 * Invoice class with multiple methods to support calculations and data manipulation
 */
export class Invoice {
  id = null
  customer = {
    name: '',
    address: '',
    contact: '',
    email: '',
    pincode: ''
  }
  orderNumber = 0
  tax = 0
  discount = 0
  createdAt = ''
  items = []

  constructor (id, customer, orderNumber, tax, discount, items) {
    if (id) {
      this.id = id
    } else {
      this.id = uuidv4()
    }
    this.customer = {
      name: customer.name || '',
      address: customer.address || '',
      contact: customer.contact || '',
      email: customer.email || '',
      pincode: customer.pincode || ''
    }
    this.orderNumber = orderNumber
    this.tax = tax
    this.discount = discount
    this.createdAt = Date.now()

    const validItems = items.map((item) => new Item(
      item.id,
      item.name,
      item.price,
      item.quantity
    ))

    this.items = validItems
  }

  /**
   * Get value of current instance in JSON format
   * @returns JSON object
   */
  toJson () {
    return {
      id: this.id,
      customer: this.customer,
      orderNumber: this.orderNumber,
      tax: this.tax,
      discount: this.discount,
      items: this.items.map((item) => item.toJson())
    }
  }

  /**
   * Get list of all items in this instance
   * @returns list of all items
   */
  getItems () {
    return this.items
  }

  // TODO: remove
  getDiscount () {
    return this.discount
  }

  /**
   * Get date and time of creation of this instance
   * @returns creation date time in string format
   */
  getDate () {
    const date = new Date(this.createdAt)

    const hour = date.getHours() % 12
    const minutes = date.getMinutes()

    const period = date.getHours() > 12 ? 'PM' : 'AM'

    return `${hour}:${minutes} ${period} - TODAY`
  }

  /**
   * Update values of properties in current instance's customer property
   * @param {srting} value New value to be set
   * @param {srting} field Field name where value should be set
   */
  setCustomerValue (value, field) {
    const currentCustomer = { ...this.customer }
    currentCustomer[field] = value
    this.customer = currentCustomer
  }

  /**
   * Update values of tax and discount properties of current instance
   * @param {string} value New value to be set
   * @param {string} field Field name where value should be set
   */
  setTDValue (value, field) {
    const setValue = value ? value : 0
    if (field === 'tax') this.tax = parseFloat(setValue)
    if (field === 'discount') this.discount = parseFloat(setValue)
  }

  /**
   * Set a new list of items in current instance
   * @param {Array} list list of items to be set in current instance
   */
  setItems (list) {
    this.items = [...list]
  }

  // TODO: remove
  getDiscountValue () {
    if (!this) return 0
    let grandTotal = this.items.reduce((previous, current) => {
      const total = current.price * current.quantity
      return total + previous
    }, 0)
    return grandTotal
  }

  /**
   * Get values related to current instance
   * @returns {Object} Object having sub total, discount, tax and grand total values
   */
  getTotalValues () {
    if (!this) return {
      subTotal: 0,
      totalTax: 0,
      totalDiscount: 0,
      grandTotal: 0
    }
    const subTotal = this.items.reduce((previous, current) => {
      const total = current.price * current.quantity
      return total + previous
    }, 0)

    const totalTax = this.tax ? (subTotal * this.tax) / 100 : 0
    const totalDiscount = this.discount ? (subTotal * this.discount) / 100 : 0

    const grandTotal = subTotal + totalTax - totalDiscount

    return {
      subTotal,
      totalTax,
      totalDiscount,
      grandTotal
    }
  }
}

export class Item {
  id = null
  name = ''
  price = 0
  quantity = 0

  constructor (id, name, price, quantity) {
    if (id) {
      this.id = id
    } else {
      this.id = uuidv4()
    }
    this.name = name
    this.price = price
    this.quantity = quantity
  }

  /**
   * Fetch current instance in JSON format
   * @returns {Object} Current instance in JSON format
   */
  toJson () {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantity
    }
  }
}

/**
 * Save a list of invoices in localStorage
 * @param {Array} invoices list of invoice instances
 */
export const saveAllInvoicesInLS = (invoices) => {
  const invoicesJson = invoices.map((invoice) => invoice.toJson())
  localStorage.setItem('allItems', JSON.stringify(invoicesJson))
}

/**
 * Get the list of invoice instances from localStorage
 * @returns {Array} list of invoice instances
 */
export const getAllInvoicesFromLS = () => {
  const allItems = localStorage.getItem('allItems') || ''
  if (allItems.length > 0) {
    return JSON.parse(allItems)
  } else {
    return []
  }
}

/**
 * Save a single instance of Invoice in localStorage
 * @param {Invoice} invoice Invoice instance
 */
export const saveCurrentInvoiceInLS = (invoice) => {
  const invoiceJson = JSON.stringify(invoice.toJson())

  if (invoiceJson) {
    localStorage.setItem('print', invoiceJson)
  }
}

/**
 * Get single instance of Invoice from localStorage
 * @returns {Invoice} Invoice instance
 */
export const getCurrentInvoiceFromLS = () => {
  const invoice = localStorage.getItem('print') || ''

  if (invoice) {
    const invoiceJson = JSON.parse(invoice)
    const obj = new Invoice(
      invoiceJson.id,
      invoiceJson.customer,
      invoiceJson.orderNumber,
      invoiceJson.tax,
      invoiceJson.discount,
      invoiceJson.items
    )

    return obj
  }
}

/**
 * Decorate a value to view upto 2 decimal points and insert commas in large numbers
 * @param {Number} value Value to be decorated
 * @returns {string} decorated value
 */
export const decorator = (value) => {
  return parseFloat(value).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}