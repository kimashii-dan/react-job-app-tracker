import { useState } from 'react'
import './ApplicationForm.css'

function getToday() {
  return new Date().toLocaleDateString('en-CA')
}

function ApplicationForm({ initialValues, submitLabel, saving, onSave, onCancel }) {
  const [form, setForm] = useState(() => initialValues || {
    company: '',
    position: '',
    location: '',
    workMode: 'onsite',
    status: 'applied',
    appliedAt: getToday(),
    notes: '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {}
    if (!form.company.trim()) {
      newErrors.company = 'Company is required'
    }
    if (!form.position.trim()) {
      newErrors.position = 'Position is required'
    }
    if (!form.location.trim()) {
      newErrors.location = 'Location is required'
    }
    if (!form.appliedAt) {
      newErrors.appliedAt = 'Date is required'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      return
    }

    onSave({
      ...form,
      company: form.company.trim(),
      position: form.position.trim(),
      location: form.location.trim(),
      notes: form.notes.trim(),
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field">
          <span className="form-label">Company</span>
          <input
            name="company"
            placeholder="e.g. Kaspi.kz"
            value={form.company}
            onChange={handleChange}
            className={errors.company ? 'input-error' : ''}
          />
          {errors.company && <span className="form-error">{errors.company}</span>}
        </label>

        <label className="form-field">
          <span className="form-label">Position</span>
          <input
            name="position"
            placeholder="e.g. Frontend Intern"
            value={form.position}
            onChange={handleChange}
            className={errors.position ? 'input-error' : ''}
          />
          {errors.position && <span className="form-error">{errors.position}</span>}
        </label>

        <label className="form-field">
          <span className="form-label">Location</span>
          <input
            name="location"
            placeholder="e.g. Almaty"
            value={form.location}
            onChange={handleChange}
            className={errors.location ? 'input-error' : ''}
          />
          {errors.location && <span className="form-error">{errors.location}</span>}
        </label>

        <label className="form-field">
          <span className="form-label">Work mode</span>
          <select name="workMode" value={form.workMode} onChange={handleChange}>
            <option value="onsite">Onsite</option>
            <option value="hybrid">Hybrid</option>
            <option value="remote">Remote</option>
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">Status</span>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">Applied on</span>
          <input
            type="date"
            name="appliedAt"
            value={form.appliedAt}
            onChange={handleChange}
            className={errors.appliedAt ? 'input-error' : ''}
          />
          {errors.appliedAt && <span className="form-error">{errors.appliedAt}</span>}
        </label>

        <label className="form-field form-field-wide">
          <span className="form-label">Notes</span>
          <textarea
            name="notes"
            rows="4"
            placeholder="Referral, interview dates, contacts..."
            value={form.notes}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="button button-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="button button-primary" disabled={saving}>
          {saving ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm
