const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

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
