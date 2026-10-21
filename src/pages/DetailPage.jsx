import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getApplication } from '../api.js'
import Message from '../components/Message.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { formatDate } from '../utils.js'
import './DetailPage.css'

function ApplicationDetail({ id }) {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    getApplication(id)
      .then((data) => {
        if (!ignore) {
          setApplication(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) {
    return <Message type="loading">Loading application...</Message>
  }

  if (error) {
    return <Message type="error">{error}</Message>
  }

  return (
    <article className={`detail status-${application.status}`}>
      <div className="detail-top">
        <div>
          <h1 className="page-title">{application.company}</h1>
          <p className="detail-position">{application.position}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      <dl className="detail-fields">
        <div className="detail-field">
          <dt>Application ID</dt>
          <dd>#{application.id}</dd>
        </div>
        <div className="detail-field">
          <dt>Location</dt>
          <dd>{application.location}</dd>
        </div>
        <div className="detail-field">
          <dt>Work mode</dt>
          <dd className="detail-capitalize">{application.workMode}</dd>
        </div>
        <div className="detail-field">
          <dt>Applied on</dt>
          <dd>{formatDate(application.appliedAt)}</dd>
        </div>
        <div className="detail-field detail-notes">
          <dt>Notes</dt>
          <dd>{application.notes || 'No notes'}</dd>
        </div>
      </dl>
    </article>
  )
}

function DetailPage() {
  const { id } = useParams()

  return (
    <div className="detail-page">
      <Link to="/" className="button button-secondary detail-back">
        ← Back to applications
      </Link>
      <ApplicationDetail key={id} id={id} />
    </div>
  )
}

export default DetailPage
