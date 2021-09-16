import './Header.scss'

const Header = () => {

  return (
    <div className="header">
      <p className="header__title">Dashboard</p>
      <button className="header__add">
        <img src="/assets/plus-white.png" alt="Add new invoice" />
      </button>
    </div>
  )
}

export default Header