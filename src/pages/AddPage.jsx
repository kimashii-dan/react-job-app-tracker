import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createApplication } from '../api.js'
import ApplicationForm from '../components/ApplicationForm.jsx'
import Message from '../components/Message.jsx'
import './AddPage.css'

function AddPage() {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

  function handleSave(data) {
    setSaving(true)
    setSaveError(null)
    createApplication(data)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        setSaveError(err.message)
        setSaving(false)
      })
  }

  return (
    <div className="add-page">
      <h1 className="page-title">New application</h1>
      {saveError && <Message type="error">{saveError}</Message>}
      <ApplicationForm
        submitLabel="Save application"
        saving={saving}
        onSave={handleSave}
        onCancel={() => navigate('/')}
      />
    </div>
  )
}

export default AddPage
