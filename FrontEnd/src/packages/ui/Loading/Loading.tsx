import { Spin } from "antd";
import { useAtomValue } from "jotai";
import { LoadingAtom } from "../../store/loading.store";

export default function Loading() {
  const loading = useAtomValue(LoadingAtom);
  return <Spin size="large" spinning={loading} />;
}
