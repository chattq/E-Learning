import { Flex, Spin } from "antd";
import { useAtomValue } from "jotai";
import { LoadingAtom } from "../../store/loading.store";
import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  const loading = useAtomValue(LoadingAtom);
  return (
    <div className="absolute z-50 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined spin />}
        size="large"></Spin>
    </div>
  );
}
