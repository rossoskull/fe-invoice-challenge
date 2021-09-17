import DetailsView from './DetailsView/DetailsView'

import './Details.scss'

const Details = ({ details }) => {

  return (
    <div className="details">
      <div className="details__container">
        <p className="details__title">
          Invoice details
        </p>

        <div className="details__view-container">
          <DetailsView
            invoice={details}
          />
        </div>
      </div>
    </div>
  )
}

export default Details