import './ItemsTable.scss'

const ItemsTable = ({ list, comfortable }) => {

  /**
   * Update className based on comfortable value
   * @param {string} className className of current element
   * @returns {string} className with additional value of comfortable
   */
  const classWithComfort = (className) => {
    return comfortable ? `${className} comfortable` : className
  }
  
  return (
    <div className="table-container">
      <table className="table-container__table">
        <thead>
          <tr className="table-container__table__header">
            <th className="item-name">Item</th>
            <th className="item-quantity">Quantity</th>
            <th className="item-price">Price - $</th>
          </tr>
        </thead>
        <tbody>
          {list.map((i) => {
            const data = i.toJson()
            return (
              <tr key={data.id}>
                <td className={classWithComfort('item-name')}>{data.name}</td>
                <td className={classWithComfort('item-quantity')}>{data.quantity}</td>
                <td className={classWithComfort('item-price')}>{parseFloat(data.price).toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ItemsTable