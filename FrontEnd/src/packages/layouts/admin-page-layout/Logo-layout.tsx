import { useNavigate } from "react-router-dom";

export default function LogoLayout() {
  const nav = useNavigate();
  return (
    <div
      className="text-[24px] font-bold cursor-pointer ml-4"
      onClick={() => nav("/")}>
      E-Learning
    </div>
  );
}
