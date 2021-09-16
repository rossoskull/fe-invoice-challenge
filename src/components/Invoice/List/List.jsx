import { useState } from 'react'

import Search from './Search/Search'

import './List.scss'

const List = ({ list }) => {
  // State
  const [searchStr, setSearchStr] = useState('')

  /**
   * Set the value of search state
   * @param {string} str - New search string value
   */
  const updateSearch = (str) => {
    setSearchStr(str)
  }

  /**
   * Render list of items with search filter
   * @returns JSX elements of rendered list items after filtered by search
   */
  const renderedList = () => {
    return list.filter((item) => {
      return item.customer.name.includes(searchStr) || item.orderNumber.toString().includes(searchStr)
    }).map((item) => (
      <div key={item.id} className="list__container__items__item">
        <div className="list__container__items__item__left">
          <p className="list__container__items__item__left__invoice-number">INV. # - {item.orderNumber}</p>

          <div className="list__container__items__item__left__customer">
            <p className="list__container__items__item__left__customer__count">Items - {item.items.length}</p>
            <p className="list__container__items__item__left__customer__name">{item.customer.name}</p>
          </div>
        </div>

        <div className="list__container__items__item__right">
          <p className="list__container__items__item__right__date">{item.getDate()}</p>
          <p className="list__container__items__item__right__amount">$ 4000</p>
        </div>
      </div>
    ))
  }

  return (
    <div className="list">
      <Search setSearchStr={setSearchStr} />
      <p className="list__count">INVOICES &middot; <span>{list.length}</span></p>

      <div className="list__container">
        <div className="list__container__items">
          {renderedList()}
        </div>
      </div>
    </div>
  )
}

export default List