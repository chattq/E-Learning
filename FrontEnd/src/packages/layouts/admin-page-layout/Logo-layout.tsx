import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
export default function LogoLayout() {
  const nav = useNavigate();
  return (
    <div
      style={{ display: "flex" }}
      className="text-[24px] font-bold cursor-pointer ml-4"
      onClick={() => nav("/")}
    >
      <img style={{ width: "70px", height: "auto" }} src={logo} alt="Logo" />
      <div>E-Learning</div>
    </div>
  );
}
