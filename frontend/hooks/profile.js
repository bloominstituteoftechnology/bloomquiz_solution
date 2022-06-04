import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function parseJwt(tk_bloomqz) { // credit to https://stackoverflow.com/a/38552302
  var base64Url = tk_bloomqz.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  return JSON.parse(jsonPayload)
}

function useProfile() {
  const location = useLocation()
  const [profileData, setProfileData] = useState({})
  useEffect(() => {
    const tk_bloomqz = window.localStorage.getItem('tk_bloomqz')
    if (tk_bloomqz) {
      const parsed = parseJwt(tk_bloomqz)
      setProfileData({ username: parsed.username })
    } else {
      setProfileData({})
    }
  }, [location.pathname])
  return profileData
}

export default useProfile
