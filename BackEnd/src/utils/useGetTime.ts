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
  const convertISO8601Full = (dateTime: string) => {
    const date = new Date(dateTime)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
  }
  const getTimeNow = () => {
    function themSoKhong(neuCan: any, so: any) {
      return neuCan && so < 10 ? '0' + so : so
    }
    const now = new Date()

    // Lấy thông tin về năm, tháng, ngày, giờ, phút, giây
    const year = now.getFullYear()
    const month = themSoKhong(true, now.getMonth() + 1) // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const day = themSoKhong(true, now.getDate())
    const hour = themSoKhong(true, now.getHours())
    const minute = themSoKhong(true, now.getMinutes())
    const second = themSoKhong(true, now.getSeconds())
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  }
  return {
    getTimeMoment,
    convertISO8601Full,
    getTimeNow
  }
}
