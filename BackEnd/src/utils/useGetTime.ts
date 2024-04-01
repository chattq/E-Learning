export const useGetTime = () => {
  const today = new Date()
  const getTimeMoment = () => {
    const day = today.getDate()
    const month = today.getMonth() + 1 // Tháng bắt đầu từ 0
    const year = today.getFullYear()
    const hours = today.getHours() > 9 ? `${today.getHours()}` : `0${today.getHours()}`
    const minutes = today.getMinutes() > 9 ? `${today.getMinutes()}` : `0${today.getMinutes()}`
    const seconds = today.getSeconds() > 9 ? `${today.getSeconds()}` : `0${today.getSeconds()}`
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  return {
    getTimeMoment
  }
}
