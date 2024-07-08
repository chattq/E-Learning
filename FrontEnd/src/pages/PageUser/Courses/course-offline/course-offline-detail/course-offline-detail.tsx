import React from "react";
import UserPageLayout from "../../../../../packages/layouts/user-page-layout/user-page-layout";
import { Affix, Button, Tabs, TabsProps } from "antd";

export default function CourseOfflineDetail() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Mục tiêu khóa học",
    },
    {
      key: "2",
      label: "Thông tin khóa học",
    },
    {
      key: "3",
      label: "Chương trình học",
    },
    {
      key: "4",
      label: "Đánh giá",
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <UserPageLayout>
      <div>
        <div className="bg-[#212121d2] h-[358px]"></div>
        <div className="sticky top-[65px]">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            className="sticky top-[65px] z-40"
          />
          <div className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]">
            <div>Bạn sẽ nhận được gì sau khi học khóa học</div>
            <ul>
              <li>
                Có nền tảng ngữ pháp trung cấp, tương đương B1 ~ IELTS 4.0 để
                bắt đầu luyện IELTS
              </li>
              <li>
                Nắm vững các chủ điểm ngữ pháp quan trọng trong IELTS Writing
              </li>
              <li>
                Xây dựng vốn từ vựng học thuật, làm nền móng để đọc/nghe hiểu
                các chủ điểm chắc chắn sẽ xuất hiện trong 2 phần thi Listening
                và Reading
              </li>
            </ul>
          </div>
          <div>
            <div>Thông tin khóa học</div>
            <div className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]">
              <div>
                Cầm lá thư trên tay... Anh khóc!... Đó là những giọt nước mắt
                thật sự. Không phải là vì lòng tự tôn như trước nữa, mà bằng cả
                con tim, bằng cả nỗi đau đớn... nỗi oán hận bản thân khi đã đối
                xử tệ bạc với mẹ... Và ước gì... Người mẹ mù một mắt “Mẹ của tôi
                chỉ có một mắt. Khi tôi lớn lên, tôi ghét nó nên tôi cũng ghét
                cả bà. Mỗi khi đến lớp, đám bạn đều nhìn tôi với ánh mắt khinh
                bỉ, chúng nhìn chằm chằm, bàn tán rồi hất mặt đi với sự ghê tởm.
                Ở nhà, mẹ tôi vất vả từ sớm đến khuya để làm 2 công việc một lúc
                nuôi tôi ăn học, còn tôi thì luôn luôn xấu hổ vì người đó là mẹ
                tôi, tôi chỉ ước rằng bà ta chết ngay đi để tôi không còn nhìn
                thấy bà nữa. Mỗi lần mẹ đến trường để thăm tôi, tôi chỉ muốn độn
                thổ trốn xuống dưới đất. Tôi căm hận người phụ nữ đã làm tôi xấu
                hổ trước mặt bạn bè, thậm chí, tôi từng nói thẳng là tôi muốn bà
                chết quách đi. Tôi hoàn toàn không quan tâm gì đến bà nữa. Khi
                tôi lớn lên, tôi làm bất cứ thứ gì mà tôi có thể thoát khỏi mẹ
                tôi. Tôi học hành chăm chỉ cật lực để đi du học rồi kiếm được
                công việc làm ở nước ngoài để tôi khỏi phải gặp mặt bà nữa. Tôi
                kết hôn và gây dựng gia đình mới cho riêng mình. Tôi bắt đầu bận
                rộn với mọi thứ việc từ gia đình, công sở đến chăm sóc những đứa
                trẻ. Tôi nghĩ rằng tôi sẽ không còn người mẹ nào trên đời này
                nữa. Hoàn toàn bất ngờ, một ngày kia mẹ tôi đến thăm tôi. Cái
                mắt ghê tởm năm xưa làm tôi ám ảnh và những đứa trẻ sợ khóc
                thét. Tôi vô cùng giận dữ vì sự có mặt không trông đợi này và
                cấm bà vĩnh viễn không được quay trở lại nhà tôi nữa. Tôi la hét
                và chửi bới vào mặt bà, nhưng bà lặng lẽ rời đi không nói một
                lời nào. Ngày nọ, bạn bè trường cấp ba mời tôi quay trở về họp
                lớp sau nhiều năm. Dù ghét mẹ thế nào, tôi cũng không thể ngăn
                mình dừng lại bên cái nhà rách nát tạm bợ năm xưa tôi từng sinh
                sống. Những người hàng xóm nói với tôi rằng mẹ tôi đã qua đời và
                để lại cho tôi… một bức thư: Con của mẹ yêu dấu: Mẹ phải xin lỗi
                con về việc sang thăm nhà con một cách đường đột và làm mấy đứa
                trẻ sợ hãi, mẹ yêu chúng lắm. Từ sâu trong tim, mẹ thật lòng xin
                lỗi vì đã làm con bị mọi người cười chê kể từ ngày con lớn khôn.
                Mẹ biết rằng một ngày nào đó con sẽ trở về nhưng có lẽ, lúc ấy
                mẹ không còn trên đời này nữa, vì vậy, mẹ phải nói cho con nghe
                sự thật này… Khi con còn nhỏ, con yêu dấu của mẹ, con bị tai nạn
                và mất đi một mắt. Mẹ sững sờ với ý nghĩ rằng con của mẹ sẽ lớn
                lên như thế nào với một mắt bị mù. Mẹ muốn con được nhìn thấy
                thế giới ngoài kia đẹp như thế nào, mẹ muốn con được sống trọn
                vẹn như những đứa trẻ khác . Vì thế, mẹ đã bán tất cả để phẫu
                thuật mắt của mình cho con. Con yêu dấu của mẹ, mẹ sẽ luôn có
                con và yêu con mãi trong trái tim của mẹ. Mẹ chưa bao giờ hối
                tiếc về quyết định của mình và mẹ cảm thấy yên lòng khi con bước
                vào đời để có một cuộc sống hoàn toàn trọn vẹn mà con xứng đáng.
                Mẹ của con.”
              </div>
            </div>
          </div>
        </div>
        <div className="fixed top-[100px] h-[560px] w-[360px] right-[10px] bg-black z-30">
          a
        </div>
      </div>
    </UserPageLayout>
  );
}
