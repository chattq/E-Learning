import UserPageLayout from "../../../../../packages/layouts/user-page-layout/user-page-layout";
import { Button } from "antd";
import { BiFilm, BiSolidUser } from "react-icons/bi";
import { FaInfinity, FaUsers } from "react-icons/fa6";
import "./couse-offline-detail.scss";
import { useRef } from "react";
import { match } from "ts-pattern";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { cartAtom } from "../../../../../packages/store/cart.store";
import { nanoid } from "nanoid";

export default function CourseOfflineDetail() {
  const nav = useNavigate();
  const setDataAddCart = useSetAtom(cartAtom);

  const handlePayment = () => {
    nav("/payment");
  };
  const handleAddCart = () => {
    setDataAddCart((prev: any) => [
      ...prev,
      {
        id: nanoid(),
        name: "React JS: Từ đầu đến nghiệp vụ",
        image: "https://iviet.vn/wp-content/uploads/2021/10/ElearningBooks.jpg",
        price: 100000,
        quantity: 1,
      },
    ]);
  };
  return (
    <UserPageLayout>
      <div>
        <div className="bg-[#212121d2] h-[358px]">
          <img
            src="https://iviet.vn/wp-content/uploads/2021/10/ElearningBooks.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="sticky top-[65px]">
          <div className="w-[80%] m-auto pt-9">
            <div className="flex gap-[20px]">
              <div className="flex-1">
                <div
                  id="course-objectives"
                  className="px-[24px] pb-[24px] pt-[15px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff] boxShadow-couses">
                  <div className="font-semibold text-[1.55rem] mb-[10px] text-[#1a1a1a]">
                    Bạn sẽ đạt được gì sau khi học khóa học?
                  </div>
                  <ul>
                    <li>
                      Có nền tảng ngữ pháp trung cấp, tương đương B1 ~ IELTS 4.0
                      để bắt đầu luyện IELTS
                    </li>
                    <li>
                      Nắm vững các chủ điểm ngữ pháp quan trọng trong IELTS
                      Writing
                    </li>
                    <li>
                      Xây dựng vốn từ vựng học thuật, làm nền móng để đọc/nghe
                      hiểu các chủ điểm chắc chắn sẽ xuất hiện trong 2 phần thi
                      Listening và Reading
                    </li>
                  </ul>
                </div>

                <div id="course-information" className="mt-[40px]">
                  <div className="font-semibold text-[1.55rem] text-[#1a1a1a] mb-[1rem]">
                    Thông tin khóa học
                  </div>
                  <div className="p-[24px] mb-[16px] rounded-[6px] boxShadow-couses bg-[#fff]">
                    <div>
                      Cầm lá thư trên tay... Anh khóc!... Đó là những giọt nước
                      mắt thật sự. Không phải là vì lòng tự tôn như trước nữa,
                      mà bằng cả con tim, bằng cả nỗi đau đớn... nỗi oán hận bản
                      thân khi đã đối xử tệ bạc với mẹ... Và ước gì... Người mẹ
                      mù một mắt “Mẹ của tôi chỉ có một mắt. Khi tôi lớn lên,
                      tôi ghét nó nên tôi cũng ghét cả bà. Mỗi khi đến lớp, đám
                      bạn đều nhìn tôi với ánh mắt khinh bỉ, chúng nhìn chằm
                      chằm, bàn tán rồi hất mặt đi với sự ghê tởm. Ở nhà, mẹ tôi
                      vất vả từ sớm đến khuya để làm 2 công việc một lúc nuôi
                      tôi ăn học, còn tôi thì luôn luôn xấu hổ vì người đó là mẹ
                      tôi, tôi chỉ ước rằng bà ta chết ngay đi để tôi không còn
                      nhìn thấy bà nữa. Mỗi lần mẹ đến trường để thăm tôi, tôi
                      chỉ muốn độn thổ trốn xuống dưới đất. Tôi căm hận người
                      phụ nữ đã làm tôi xấu hổ trước mặt bạn bè, thậm chí, tôi
                      từng nói thẳng là tôi muốn bà chết quách đi. Tôi hoàn toàn
                      không quan tâm gì đến bà nữa. Khi tôi lớn lên, tôi làm bất
                      cứ thứ gì mà tôi có thể thoát khỏi mẹ tôi. Tôi học hành
                      chăm chỉ cật lực để đi du học rồi kiếm được công việc làm
                      ở nước ngoài để tôi khỏi phải gặp mặt bà nữa. Tôi kết hôn
                      và gây dựng gia đình mới cho riêng mình. Tôi bắt đầu bận
                      rộn với mọi thứ việc từ gia đình, công sở đến chăm sóc
                      những đứa trẻ. Tôi nghĩ rằng tôi sẽ không còn người mẹ nào
                      trên đời này nữa. Hoàn toàn bất ngờ, một ngày kia mẹ tôi
                      đến thăm tôi. Cái mắt ghê tởm năm xưa làm tôi ám ảnh và
                      những đứa trẻ sợ khóc thét. Tôi vô cùng giận dữ vì sự có
                      mặt không trông đợi này và cấm bà vĩnh viễn không được
                      quay trở lại nhà tôi nữa. Tôi la hét và chửi bới vào mặt
                      bà, nhưng bà lặng lẽ rời đi không nói một lời nào. Ngày
                      nọ, bạn bè trường cấp ba mời tôi quay trở về họp lớp sau
                      nhiều năm. Dù ghét mẹ thế nào, tôi cũng không thể ngăn
                      mình dừng lại bên cái nhà rách nát tạm bợ năm xưa tôi từng
                      sinh sống. Những người hàng xóm nói với tôi rằng mẹ tôi đã
                      qua đời và để lại cho tôi… một bức thư: Con của mẹ yêu
                      dấu: Mẹ phải xin lỗi con về việc sang thăm nhà con một
                      cách đường đột và làm mấy đứa trẻ sợ hãi, mẹ yêu chúng
                      lắm. Từ sâu trong tim, mẹ thật lòng xin lỗi vì đã làm con
                      bị mọi người cười chê kể từ ngày con lớn khôn. Mẹ biết
                      rằng một ngày nào đó con sẽ trở về nhưng có lẽ, lúc ấy mẹ
                      không còn trên đời này nữa, vì vậy, mẹ phải nói cho con
                      nghe sự thật này… Khi con còn nhỏ, con yêu dấu của mẹ, con
                      bị tai nạn và mất đi một mắt. Mẹ sững sờ với ý nghĩ rằng
                      con của mẹ sẽ lớn lên như thế nào với một mắt bị mù. Mẹ
                      muốn con được nhìn thấy thế giới ngoài kia đẹp như thế
                      nào, mẹ muốn con được sống trọn vẹn như những đứa trẻ khác
                      . Vì thế, mẹ đã bán tất cả để phẫu thuật mắt của mình cho
                      con. Con yêu dấu của mẹ, mẹ sẽ luôn có con và yêu con mãi
                      trong trái tim của mẹ. Mẹ chưa bao giờ hối tiếc về quyết
                      định của mình và mẹ cảm thấy yên lòng khi con bước vào đời
                      để có một cuộc sống hoàn toàn trọn vẹn mà con xứng đáng.
                      Mẹ của con.”
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[380px]"></div>
            </div>
          </div>
        </div>
        <div className="fixed top-[90px] h-[600px] couser-sidebar w-[380px] right-[9.5%] bg-[#ffff] z-30">
          <div className="overflow-auto rounded-t-[0.65rem] h-[230px] w-full">
            <img
              src="https://service.keyframe.vn/uploads/filecloud/2018/April/25/72-559201524659628-1524659628.jpg"
              alt=""
              className="h-full w-full"
            />
          </div>
          <div className="px-4">
            <div className="flex gap-2 items-center py-4">
              <div className="text-[1.85rem] font-bold text-[#3cb46e] truncate flex-1">
                5.990.000đ
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[0.85rem] font-medium text-[#677788] flex items-center gap-1">
                  <div>Giá gốc:</div>
                  <div className="line-through truncate flex-1">1.099.000đ</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[0.85rem] text-[#ec8f8f] font-normal flex gap-1 items-center">
                    <div className="">Tiết kiệm:</div>
                    <div className="truncate flex-1">1.000.000đ</div>
                  </div>
                  <div>
                    <span className="text-[12px] rounded-sm bg-[#ec8f8f] text-[#ffff] px-1 py-[2px]">
                      -20%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <Button
                onClick={handleAddCart}
                className="bg-[#71869d hover:bg-[#82a5b0] button-couse-add-cart w-full text-[#b1b1b1] font-bold h-[40px] border-[1px] border-[#71869d] ">
                Thêm vào giỏ hàng
              </Button>
              <Button
                className="bg-[#9a2424] w-full text-[#fff] font-bold h-[40px]"
                onClick={handlePayment}>
                Mua ngay
              </Button>
            </div>
            <div>
              <div className="flex flex-col gap-3 border-t-[1px] border-b-[1px] mt-4 py-3">
                <div className="flex items-center gap-3">
                  <BiSolidUser size={20} />
                  <p>Nguyễn Thị Bích Tuệ</p>
                </div>
                <div className="flex items-center gap-3">
                  <BiFilm size={20} />
                  <p>Tổng số 12 bài học</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaInfinity size={20} />
                  <p>Quyền truy cập đầy đủ suốt đời</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers size={20} />
                  <p>123456789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
}
