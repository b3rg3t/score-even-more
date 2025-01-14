import { FC } from "react";
import { IAccordion } from "../../../models/interface/IAccordion";

export const Accordion: FC<IAccordion> = ({ id, title, children, className, defaultOpen = false }) => (
  <details id={id} open={defaultOpen}>
    <summary className="text-white border-bottom">{title}</summary>
    <div className={className}>{children}</div>
  </details>
);
