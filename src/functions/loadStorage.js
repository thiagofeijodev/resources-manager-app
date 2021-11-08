export default function loadStorage(key) {
  const user = localStorage.getItem(key)

  if (user) {
    return JSON.parse(user) || {}
  }
  return null
}
