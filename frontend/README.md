Authentication flow:

React app loads
AuthProvider mounts
user = null
loading = true

useEffect runs once: GET /auth/me
setUser and setLoading in authContext.js depends if the token was verified or not
