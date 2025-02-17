import { FC } from "react";
import { IAccordion } from "../../../models/interface/IAccordion";

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
      </summary>
      <div className={`${className} pt-2`}>{children}</div>
    </details>
  );
};
