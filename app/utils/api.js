const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Get token from localStorage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

// Get current user data
export const getMe = async () => {
  const token = getToken()
  if (!token) return null

  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()
  return data.success ? data.user : null
}

// Login
export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

// Signup
export const signup = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

// Logout
export const logout = () => {
  const confirmed = window.confirm('Are you sure you want to sign out?')
  if (confirmed) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }
}