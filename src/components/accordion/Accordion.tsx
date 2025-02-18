import { FC } from "react";
import { IAccordion } from "../../models/interface/IAccordion";
import { FaChevronDown } from "react-icons/fa";

export const Accordion: FC<IAccordion> = ({
  id,
  title,
  children,
  className,
  classNameContainer,
  headerContent,
  defaultOpen = false,
}) => {
  return (
    <details id={id} open={defaultOpen} className={classNameContainer}>
      <summary className="text-white border-bottom d-flex justify-content-between align-items-center">
        {title}
        {headerContent}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: 16 }}
        >
          <FaChevronDown className="rotate" />
        </div>
      </summary>
      <div className={`${className} pt-2`}>{children}</div>
    </details>
  );
};
