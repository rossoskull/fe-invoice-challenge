import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import { Item } from '../../../utils/utils'

import ItemsTable from '../../ItemsTable/ItemsTable'

import './FormComponents.scss'

export const PartOneHeader = ({ invoice }) => {
  return (
    <div className="form1__header">
      <h1 className="form1__header__title">Create New Invoice</h1>
      <p className="form1__header__invoice-number">Order No: {invoice.orderNumber}</p>
    </div>
  )
}

export const PartOneContent = ({ next, invoice, update }) => {
  return (
    <div className="form1__content">
      <div className="form1__content__section-title">
        <p className="form1__content__section-title__title">Customer Details</p>

        <button onClick={() => next(false)} className="form1__content__section-title__button">
          <span className="form1__content__section-title__button__text">Skip</span>
          <img
            src="/assets/skip-icon@2x.png"
            alt="Skip"
            className="form1__content__section-title__button__img"
          />
        </button>
      </div>
      <div className="form1__content__fields">
        <div className="form1__content__fields__left">
          <div className="field-group">
            <label
              for="name"
              className="field-group__label"
            >
              Full Name<span className="required">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-group__field"
              placeholder="Customer name"
              onChange={(e) => update(e, 'name')}
              value={invoice.customer.name}
            />
          </div>

          <div className="field-group">
            <label
              for="address"
              className="field-group__label"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              className="field-group__field"
              placeholder="Complete Address"
              onChange={(e) => update(e, 'address')}
              value={invoice.customer.address}
            />
          </div>
        </div>
        <div className="form1__content__fields__right">
          <div className="field-group">
            <label
              for="phonenumber"
              className="field-group__label"
            >
              Phone Number<span className="required">*</span>
            </label>
            <div className="field-group__phone">
              <div className="field-group__phone__code">+91</div>
              <input
                id="phonenumber"
                name="phonenumber"
                type="text"
                className="field-group__field phone"
                onChange={(e) => update(e, 'contact')}
                value={invoice.customer.contact}
              />
            </div>
          </div>

          <div className="field-group">
            <label
              for="email"
              className="field-group__label"
            >
              Email ID<span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="field-group__field"
              placeholder="Customer Email Address"
              onChange={(e) => update(e, 'email')}
              value={invoice.customer.email}
            />
          </div>

          <div className="field-group">
            <label
              for="pincode"
              className="field-group__label"
            >
              Pin Code
            </label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              className="field-group__field"
              placeholder="560067"
              style={{
                width: '72px'
              }}
              onChange={(e) => update(e, 'pincode')}
              value={invoice.customer.pincode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const PartOneFooter = ({ next }) => {
  return (
    <div className="form1__footer">
      <button onClick={() => next(true)} className="footer-button">
        Proceed
      </button>
    </div>
  )
}

// Components for part two of the form

// contents of part two
export const PartTwoContent = ({ previous, invoice, updateTD, updateInvoiceItems }) => {
  // State
  const [dataList, setDataList] = useState([])
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 0,
    price: 0
  })
  const [tdValues, setTdValues] = useState({
    tax: null,
    discount: null
  })
  
  // Use hook to update tax and discount
  useEffect(() => {
    setTdValues({
      tax: invoice.tax,
      discount: invoice.discount
    })
  }, [invoice.tax, invoice.discount])

  const updateItem = (value, field) => {
    if ((field === 'price' || field === 'quantity') && isNaN(value)) {
      return
    }
    const oldValue = {...newItem}
    oldValue[field] = value
    setNewItem(oldValue)
  }

  const pushItem = () => {
    if (newItem.name.length > 0 && !isNaN(newItem.price) && !isNaN(newItem.quantity) && newItem.price * newItem.quantity > 0) {
      const list = [...dataList]
      list.push(new Item(null, newItem.name, newItem.price, newItem.quantity))
      setDataList([...list])
      setNewItem({
        name: '',
        quantity: 0,
        price: 0
      })
      updateInvoiceItems(list)
    }
  }

  return (
    <div className="form2__content">
      <div className="form2__content__section-title">
        <h1 className="form2__content__section-title__title">Product Details</h1>

        <div className="form2__content__section-title__customer">
          <div className="form2__content__section-title__customer__info">
            <div className="form2__content__section-title__customer__info__title">Customer Details</div>
            <div className="form2__content__section-title__customer__info__name">{invoice.customer.name || 'Unknown Customer'}</div>
            <div className="form2__content__section-title__customer__info__email">{invoice.customer.email || 'No email provided'}</div>
          </div>
          <button onClick={previous} className="form2__content__section-title__customer__edit">
            <img
              className="form2__content__section-title__customer__edit__img"
              src="/assets/edit@2x.png"
              alt="Edit"
            />
          </button>
        </div>
      </div>

      <div className="form2__content__table">
        <ItemsTable list={dataList} />
      </div>
      <div className="form2__content__inputs">
        <input
          type="text"
          className="form2__content__inputs__name"
          name="itemname"
          id="itemname"
          placeholder="Please enter item name"
          value={newItem.name}
          onChange={(e) => updateItem(e.target.value, 'name')}
        />

        <input
          type="text"
          className="form2__content__inputs__quantity"
          name="itemnquantity"
          id="itemquantity"
          placeholder="0.00"
          value={newItem.quantity}
          onChange={(e) => updateItem(e.target.value, 'quantity')}
        />

        <input
          type="text"
          className="form2__content__inputs__price"
          name="itemprice"
          id="itemprice"
          placeholder="0.00"
          value={newItem.price}
          onChange={(e) => updateItem(e.target.value, 'price')}
        />

        <button onClick={pushItem} className="form2__content__inputs__submit">
          <img
            src="/assets/enter-icon@2x.png"
            alt="Submit"
          />
        </button>
      </div>

      <div className="form2__content__footer">
        <div className="form2__content__footer__fields">
          <div className="form2__content__footer__fields__field">
            <input
              type="text"
              name="tax"
              id="tax"
              placeholder="Tax"
              onChange={(e) => updateTD(e, 'tax')}
              value={tdValues.tax}
            />
            <p>%</p>
          </div>
          <div className="form2__content__footer__fields__field">
            <input
              type="text"
              name="discount"
              id="discount"
              placeholder="Discount"
              onChange={(e) => updateTD(e, 'discount')}
              value={tdValues.discount}
            />
            <p>%</p>
          </div>
        </div>
        <div className="form2__content__footer__total">
          <p className="form2__content__footer__total__text">Sub Total</p>
          <p className="form2__content__footer__total__value">$ 300</p>
        </div>
      </div>
    </div>
  )
}

export const PartTwoFooter = ({ invoice, items, discount }) => {
  // State
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalTax, setTotalTax] = useState(0)

  // Calculate tax and discount values
  useEffect(() => {
    console.log(items, discount)
    const newDiscount = invoice.getDiscountValue()
    setTotalDiscount(newDiscount)
  }, [invoice, items, discount])
  return (
    <div className="form2__footer">
      <div className="form2__footer__calculations">
        <div className="form2__footer__calculations__calc">
          <p className="form2__footer__calculations__calc__title">Tax</p>
          <p className="form2__footer__calculations__calc__value">$ 200</p>
        </div>
        <div className="form2__footer__calculations__calc">
          <p className="form2__footer__calculations__calc__title">Discount</p>
          <p className="form2__footer__calculations__calc__value">$ {totalDiscount}</p>
        </div>
      </div>

      <div className="form2__footer__action">
        <div className="form2__footer__action__total">
          <p className="form2__footer__action__total__title">Grand Total</p>
          <p className="form2__footer__action__total__value">$ 1000</p>
        </div>
        <button className="footer-button">
          Save
        </button>
      </div>

    </div>
  )
}