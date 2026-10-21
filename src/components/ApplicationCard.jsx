import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'
import { formatDate } from '../utils.js'
import './ApplicationCard.css'

function ApplicationCard({ application }) {
  return (
    <Link to={`/applications/${application.id}`} className={`card status-${application.status}`}>
      <div className="card-top">
        <div>
          <h2 className="card-company">{application.company}</h2>
          <p className="card-position">{application.position}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      <div className="card-meta">
        <span>{application.location}</span>
        <span className="card-mode">{application.workMode}</span>
        <span>{formatDate(application.appliedAt)}</span>
      </div>
    </Link>
  )
}

export default ApplicationCard
