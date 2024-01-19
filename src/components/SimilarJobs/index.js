import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
// import {FaRegStar} from 'react-icons/fa'
import {FaStar} from 'react-icons/fa'

import './index.css'

const SimilarJobDetails = props => {
  const {eachElement} = props
  return (
    <li className="li">
      <div className="SimilarFlex">
        <div>
          <img
            className="SimilarJobs"
            src={eachElement.company_logo_url}
            alt="similar job company logo"
          />
        </div>
        <div>
          <h1 className="SimilarTitle">{eachElement.title}</h1>
          <p>
            <FaStar className="Star" />
            &nbsp;{eachElement.rating}
          </p>
        </div>
      </div>
      <h1>Description</h1>
      <p>{eachElement.job_description}</p>
      <div className="FlexLocationSimilar">
        <p>
          <IoLocationOutline />
          &nbsp;{eachElement.location}
        </p>
        <p>
          <BsBriefcaseFill />
          &nbsp;{eachElement.employment_type}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobDetails
