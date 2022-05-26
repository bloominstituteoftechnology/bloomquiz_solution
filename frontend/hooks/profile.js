import { useState } from 'react'

function parseJwt(token) { // credit to https://stackoverflow.com/a/38552302
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

function useProfile() {
  const [profileData] = useState(() => {
    const token = window.localStorage.getItem('token')
    if (!token) return {}
    const parsed = parseJwt(token)
    return { username: parsed.username }
  })
  return profileData
}

export default useProfile
