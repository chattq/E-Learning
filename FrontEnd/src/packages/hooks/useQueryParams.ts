import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
  const [searchParams] = useSearchParams();
  const dataParams = Object.fromEntries([...(searchParams as any)]);
  return Object.keys(dataParams).length === 0 ? null : dataParams;
}
