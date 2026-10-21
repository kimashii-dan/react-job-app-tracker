import seed from './data/applications.json'

const STORAGE_KEY = 'applications'
export const PAGE_SIZE = 10

function load() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    return JSON.parse(saved)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
  return seed
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 500))
}

export async function getApplications({ search = '', status = 'all', sort = 'newest', page = 1 } = {}) {
  await delay()
  const text = search.trim().toLowerCase()

  let list = load().filter((app) => {
    const matchesText =
      app.company.toLowerCase().includes(text) || app.position.toLowerCase().includes(text)
    const matchesStatus = status === 'all' || app.status === status
    return matchesText && matchesStatus
  })

  if (sort === 'newest') {
    list = list.toSorted((a, b) => b.appliedAt.localeCompare(a.appliedAt) || b.id - a.id)
  } else if (sort === 'oldest') {
    list = list.toSorted((a, b) => a.appliedAt.localeCompare(b.appliedAt) || a.id - b.id)
  } else if (sort === 'company') {
    list = list.toSorted((a, b) => a.company.localeCompare(b.company) || b.appliedAt.localeCompare(a.appliedAt))
  }

  const start = (page - 1) * PAGE_SIZE
  return {
    items: list.slice(start, start + PAGE_SIZE),
    total: list.length,
  }
}

export async function getApplication(id) {
  await delay()
  const app = load().find((item) => item.id === Number(id))
  if (!app) {
    throw new Error('Not found')
  }
  return app
}

export async function createApplication(data) {
  await delay()
  const list = load()
  const newId = list.reduce((max, item) => Math.max(max, item.id), 0) + 1
  const newApp = { ...data, id: newId }
  save([newApp, ...list])
  return newApp
}
