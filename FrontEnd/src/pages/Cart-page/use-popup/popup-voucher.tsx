import { Button, Input, Modal, Radio } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useWindowSize } from "../../../packages/hooks/useWindowSize";
import "./popup-voucher.scss";
import { IVoucherShop } from "../Cart-page.types";

interface IPopupVoucher {}

export const PopupVoucher = forwardRef(({}: IPopupVoucher, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataVoucher, setDataVoucher] = useState<IVoucherShop[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useImperativeHandle(ref, () => ({
    showModal(data: IVoucherShop[]) {
      setDataVoucher(data);
      showModal();
    },
  }));

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const windowSize = useWindowSize();
  return (
    <Modal
      title={
        <div className="px-[20px] pt-[15px]">
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            Mã giảm giá của Shop
          </span>
          <div className="flex gap-4 items-center pt-4 pb-3">
            <Input
              className="w-full h-[40px]"
              allowClear
              placeholder="Nhập mã ưu đãi"
            />
            <Button className="h-[40px]">Dùng mã</Button>
          </div>
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      width={400}
      style={{ top: 50, bottom: 25 }}
      styles={{
        content: {
          padding: 0,
        },
      }}
      footer={
        <>
          {dataVoucher?.length > 0 && (
            <div className="px-[20px] py-[15px] border-t-[1px]">
              <div className="flex items-center justify-between">
                <div className="translate-y-[-3px]">
                  <div className="text-[#0f1e29] text-[14px] font-normal text-left">
                    Tiết kiệm
                  </div>
                  <div className="text-[#0f1e29] text-[16px] font-bold leading-4 text-left">
                    20.000đ
                  </div>
                </div>
                <div>
                  <Button className="h-[40px] w-[150px] bg-red-600 text-white font-bold">
                    Áp dụng
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      }
      onCancel={handleCancel}>
      <>
        <div
          className="w-full px-[20px] border-t-[1px]"
          style={{
            height: windowSize.height - 300,
            overflowY: "auto",
          }}>
          {dataVoucher?.length > 0 ? (
            <div className="flex py-4 flex-col gap-4">
              {dataVoucher.map((voucher: IVoucherShop) => (
                <div
                  className="flex items-center gap-2"
                  key={voucher.IdVoucher}>
                  <Radio></Radio>
                  <div className="px-3 py-2 w-[100%] border-[1px] card-voucher rounded-[8px]">
                    <div>
                      <span className="line-clamp-2 text-[#d5600c] text-[16px] font-bold">
                        {voucher.VoucherName}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-normal">HSD</span>
                      <span className="text-[12px] ml-2 font-bold">
                        {voucher.VoucherEndDate as any}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="m-auto">
                <img
                  src="https://media3.scdn.vn/img4/2020/06_17/LK8KrvP2CDM2y1EIWExc.png"
                  alt=""
                />
              </div>
              <div className="text-center text-[#6f787e] font-bold text-[16px] p-[0.6rem]">
                <h3>Chưa có mã giảm giá của Shop</h3>
              </div>
            </div>
          )}
        </div>
      </>
    </Modal>
  );
});
