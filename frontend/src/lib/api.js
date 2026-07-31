import { getToken } from '../utils/auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function request(path, options = {}) {
  const token = getToken()

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại.')
  }

  return data
}

export function registerUser({ username, email, password, confirmPassword }) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, confirmPassword }),
  })
}

export function loginUser({ username, password }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
}

export function fetchCvs() {
  return request('/api/cvs')
}

export function fetchCv(id) {
  return request(`/api/cvs/${id}`)
}

export function createCv(data) {
  return request('/api/cvs', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateCv(id, data) {
  return request(`/api/cvs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteCv(id) {
  return request(`/api/cvs/${id}`, { method: 'DELETE' })
}
