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
    this.customer = { ...customer }
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

  getDate () {
    const date = new Date(this.createdAt)

    const hour = date.getHours() % 12
    const minutes = date.getMinutes()

    const period = date.getHours() > 12 ? 'PM' : 'AM'

    return `${hour}:${minutes} ${period}`
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