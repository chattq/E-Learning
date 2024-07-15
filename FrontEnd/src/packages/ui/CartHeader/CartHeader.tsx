import { useCallback } from "react";
import "./Cart.scss";
import { Avatar, Badge, Dropdown, Empty, Typography } from "antd";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { cartAtom } from "../../store/cart.store";

export default function CartHeader() {
  const nav = useNavigate();
  const dataAddCart = useAtomValue(cartAtom);

  const dropdownRender = useCallback(() => {
    return (
      <div className="bg-[#fff] w-[430px] border-[1px] px-3 rounded-md">
        <div className="">
          <div className="font-bold text-[1.5rem] py-1 border-b-[1px]">
            Giỏ hàng
          </div>
          {dataAddCart.length > 0 ? (
            <>
              <div className="max-h-[450px] scroll-cart overflow-y-auto">
                {dataAddCart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-lg hover:bg-[rgba(0,0,0,0.1)]  py-3 px-3 cursor-pointer ">
                    <img
                      src={item.image}
                      alt="product"
                      className="w-[70px] h-[70px] object-cover rounded-lg"
                    />
                    <div>
                      <div className="line-clamp-2 leading-[18px] font-bold text-[15px]">
                        Để tạo nền gần trong suốt
                      </div>
                      <div className="leading-[18px]">
                        <div className="text-nowrap text-[13px] ">
                          Hoa Hải Đường
                        </div>
                        <div className="text-nowrap text-[13px] font-bold">
                          800.000 VNĐ
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pb-3 border-t-[1px] pt-3">
                <div
                  onClick={handleClickCart}
                  className="font-semibold bg-[#E4E6EB] hover:bg-[#b7b8ba] cursor-pointer hover:underline  py-[6px] rounded-md text-[14px] text-center">
                  Xem giỏ hàng
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-[200px]">
              <Empty
                className="m-auto"
                description={
                  <Typography.Text>Giỏ hàng trống</Typography.Text>
                }></Empty>
            </div>
          )}
        </div>
      </div>
    );
  }, [dataAddCart]);
  const handleClickCart = () => {
    nav(`/cart`);
  };
  return (
    <Dropdown
      align={{
        offset: [0, 5],
        autoArrow: false,
      }}
      trigger={["hover"]}
      rootClassName="cart_header"
      dropdownRender={dropdownRender}
      placement="bottomLeft"
      arrow={{ pointAtCenter: false }}>
      <Badge count={dataAddCart.length} size="default" offset={[0, 0]}>
        <Avatar
          style={{
            backgroundColor: "#e4e6eb",
            color: "black",
            borderRadius: "50%",
          }}
          size={35}
          className="cursor-pointer"
          rootClassName="cart_header"
          onClick={handleClickCart}
          icon={<BsCart4 />}
        />
      </Badge>
    </Dropdown>
  );
}
