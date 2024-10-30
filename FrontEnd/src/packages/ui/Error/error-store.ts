import { atom } from "jotai";

export const showErrorAtom = atom(
  [], // Khởi tạo là một mảng trống
  (get, set, newError) => {
    // Lấy danh sách lỗi hiện tại bằng get
    const currentErrors = get(showErrorAtom);
    // Cập nhật danh sách lỗi mới với set
    if (newError !== null) {
      set(showErrorAtom, [...currentErrors, newError]);
    } else {
      set(showErrorAtom, []);
    }
  }
);
export const clearErrorsAtom = atom(null, (get, set) => {
  set(showErrorAtom, null); // Đặt lại về mảng rỗng
});
