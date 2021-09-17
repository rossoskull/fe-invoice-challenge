import { v4 as uuidv4 } from 'uuid'

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

  getItems () {
    return this.items
  }

  getDiscount () {
    return this.discount
  }

  getDate () {
    const date = new Date(this.createdAt)

    const hour = date.getHours() % 12
    const minutes = date.getMinutes()

    const period = date.getHours() > 12 ? 'PM' : 'AM'

    return `${hour}:${minutes} ${period}`
  }

  setCustomerValue (value, field) {
    const currentCustomer = { ...this.customer }
    currentCustomer[field] = value
    this.customer = currentCustomer
  }

  setTDValue (value, field) {
    const setValue = value ? value : 0
    if (field === 'tax') this.tax = parseFloat(setValue)
    if (field === 'discount') this.discount = parseFloat(setValue)
  }

  setItems (list) {
    this.items = [...list]
  }

  getDiscountValue () {
    if (!this) return 0
    let grandTotal = this.items.reduce((previous, current) => {
      const total = current.price * current.quantity
      return total + previous
    }, 0)
    console.log(grandTotal, this.items)
    return grandTotal
  }

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

  toJson () {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantity
    }
  }
}

export const saveAllInvoicesInLS = (items) => {
  const itemsJson = items.map((item) => item.toJson())
  localStorage.setItem('allItems', JSON.stringify(itemsJson))
}

export const getAllInvoicesFromLS = () => {
  const allItems = localStorage.getItem('allItems') || ''
  if (allItems.length > 0) {
    return JSON.parse(allItems)
  } else {
    return []
  }
}

export const saveCurrentInvoiceInLS = (invoice) => {
  const invoiceJson = JSON.stringify(invoice.toJson())

  if (invoiceJson) {
    localStorage.setItem('print', invoiceJson)
  }
}

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

export const decorator = (value) => {
  return parseFloat(value).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}