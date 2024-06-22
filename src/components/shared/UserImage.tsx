import { FaUserGraduate } from "react-icons/fa";

interface IUserImage {
  size?: number
}

export const UserImage = ({size}: IUserImage) => (
  <div
    className="p-1 bg-white text-black rounded-circle d-flex justify-content-center align-items-center me-1"
    style={{ width: size ?? 28, height: size ?? 28 }}
  >
    <FaUserGraduate />
  </div>
);
