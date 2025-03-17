import { FaTriangleExclamation } from "react-icons/fa6";
import { text } from "../../localization/eng";
import { Link } from "react-router";

const { header, content, link } = text.pages.notFound;

export const NotFound = () => (
  <section className="d-flex justify-content-center align-items-center h-100 w-100">
    <div className="d-flex flex-column align-items-center rounded bg-white p-4 mt-4">
      <FaTriangleExclamation size={100} />
      <h1>{header}</h1>
      <p>{content}</p>
      <Link to="/">{link}</Link>
    </div>
  </section>
);
