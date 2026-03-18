'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    const user = searchParams.get('user')

    if (token && user) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', decodeURIComponent(user))
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#0a0a0f', color: '#7a7990', fontSize: '14px'
    }}>
      Signing you in...
    </div>
  )
}