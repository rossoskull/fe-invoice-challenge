import DetailsView from './DetailsView/DetailsView'

import './Details.scss'

const Details = ({ details }) => {

  return (
    <div className="details">
      <div className="details__container">
        <p className="details__title">
          Invoice details
        </p>

        {details ? (
          <div className="details__view-container">
            <DetailsView
              invoice={details}
            />
          </div>
        ) : (
          <p className="details__no-details">
            No details to view
          </p>
        )}
      </div>
    </div>
  )
}

export default Details