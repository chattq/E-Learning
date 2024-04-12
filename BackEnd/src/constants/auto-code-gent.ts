function generateRandomChars(length: any) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.'
  let randomChars = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    randomChars += chars.charAt(randomIndex)
  }
  return randomChars
}
export const useAutoCodeGen = () => {
  const autoCodeGenCategory = () => {
    // Lấy ngày và thời gian hiện tại
    const currentDate = new Date()
    const year = currentDate.getFullYear().toString().slice(-2) // Lấy 2 số cuối của năm
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Lấy tháng và thêm 0 phía trước nếu cần
    const day = String(currentDate.getDate()).padStart(2, '0') // Lấy ngày và thêm 0 phía trước nếu cần
    const hours = String(currentDate.getHours()).padStart(2, '0') // Lấy giờ và thêm 0 phía trước nếu cần
    const minutes = String(currentDate.getMinutes()).padStart(2, '0') // Lấy phút và thêm 0 phía trước nếu cần
    const seconds = String(currentDate.getSeconds()).padStart(2, '0') // Lấy giây và thêm 0 phía trước nếu cần

    // Tạo chuỗi ký tự ngẫu nhiên có thể chứa ký tự đặc biệt
    const randomChars = generateRandomChars(5)

    // Sắp xếp thời gian và ngày ngẫu nhiên
    const timeArray = [day, hours, minutes, seconds]
    timeArray.sort(() => Math.random() - 0.5)
    const randomizedTime = timeArray.join('')

    // Tạo mã category_id
    const category_id = `24${year}${month}CTGRCODE${randomizedTime}${randomChars}`

    return category_id
  }
  return {
    autoCodeGenCategory
  }
}
