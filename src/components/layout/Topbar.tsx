import { FaFlagCheckered } from "react-icons/fa";

export const Topbar = () => {
  return (
    <div className="topbar border-bottom sticky-top text-white px-1 pt-1 pb-2 ">
      <h1 className="d-flex align-items-center"><FaFlagCheckered className="me-2" />Score more</h1>
    </div>
  );
};
