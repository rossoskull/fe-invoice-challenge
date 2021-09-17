import { useState } from 'react'

import Search from './Search/Search'

import './List.scss'
import { decorator } from '../../../utils/utils'

const List = ({ list, handleDetailsChange, currentDetails }) => {
  // State
  const [searchStr, setSearchStr] = useState('')

  /**
   * Render list of items with search filter
   * @returns JSX elements of rendered list items after filtered by search
   */
  const renderedList = () => {
    return list.filter((item) => {
      return item.customer.name.toLowerCase().includes(searchStr.toLowerCase()) || item.orderNumber.toString().includes(searchStr)
    }).map((item, index) => (
      <div
        key={item.id}
        className={`list__container__items__item ${index === currentDetails && 'active'}`}
        onClick={() => handleDetailsChange(index)}
      >
        <div className="list__container__items__item__left">
          <p className="list__container__items__item__left__invoice-number">INV. # - {item.orderNumber}</p>

          <div className="list__container__items__item__left__customer">
            <p className="list__container__items__item__left__customer__count">Items - {item.items.length}</p>
            <p className="list__container__items__item__left__customer__name">{item.customer.name || 'Unknown Customer'}</p>
          </div>
        </div>

        <div className="list__container__items__item__right">
          <p className="list__container__items__item__right__date">{item.getDate()}</p>
          <p className="list__container__items__item__right__amount">$ {decorator(item.getTotalValues().grandTotal)}</p>
        </div>
      </div>
    ))
  }

  return (
    <div className="list">
      <Search setSearchStr={setSearchStr} />
      <p className="list__count">INVOICES &middot; <span>{list.length}</span></p>

      <div className="list__container" id="list-container">
        <div className="list__container__items">
          {renderedList()}
        </div>
      </div>
    </div>
  )
}

export default List