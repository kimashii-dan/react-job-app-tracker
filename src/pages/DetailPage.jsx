import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getApplication, updateApplication } from '../api.js'
import ApplicationForm from '../components/ApplicationForm.jsx'
import Message from '../components/Message.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { formatDate } from '../utils.js'
import './DetailPage.css'

function ApplicationDetail({ id }) {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

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

  function handleSave(data) {
    setSaving(true)
    setSaveError(null)
    updateApplication(id, data)
      .then((updated) => {
        setApplication(updated)
        setEditing(false)
        setSaving(false)
      })
      .catch((err) => {
        setSaveError(err.message)
        setSaving(false)
      })
  }

  if (loading) {
    return <Message type="loading">Loading application...</Message>
  }

  if (error) {
    return <Message type="error">{error}</Message>
  }

  if (editing) {
    return (
      <div className="detail-edit">
        <h1 className="page-title">Edit application</h1>
        {saveError && <Message type="error">{saveError}</Message>}
        <ApplicationForm
          initialValues={application}
          submitLabel="Save changes"
          saving={saving}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      </div>
    )
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
      <div className="detail-actions">
        <button className="button button-primary" onClick={() => setEditing(true)}>
          Edit application
        </button>
      </div>
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
