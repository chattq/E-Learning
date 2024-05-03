export const useConvertNumber = () => {
  const convertMoneyVND = (number: any) => {
    if (number) {
      const parts = number?.toString().split(".");
      // Lấy phần nguyên và thêm dấu phẩy
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // Kết hợp lại thành chuỗi định dạng
      return parts.join(".") + "đ";
    }
    return 0;
  };
  const convertPercent = (percent: any) => {
    return percent?.toFixed(2);
  };
  const convertDecimal = (decimal: any) => {
    return decimal?.toFixed(2).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
  };
  return {
    convertDecimal,
    convertMoneyVND,
    convertPercent,
  };
};
