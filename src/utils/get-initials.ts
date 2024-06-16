export function getInitials(text: string) {
  const fullName = text.split(/\s/)
  const firstInitial = fullName[0].slice(0,1)
  const lastInitial = fullName.length - 1 === 0 ? "" : fullName[fullName.length - 1].slice(0,1)

  const initials = firstInitial + lastInitial
  return initials
}