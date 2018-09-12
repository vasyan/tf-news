export default function formatDate(timestamp) {
  const date = new Date(timestamp)
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  let yy = date.getFullYear() % 100

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  if (yy < 10) {
    yy = '0' + yy
  }

  return dd + '.' + mm + '.' + yy
}
