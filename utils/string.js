export const nameToAvatar = (name) => {
  if (!name) {
    return 'U'
  }
  return name.substring(0, 1).toUpperCase()
}
