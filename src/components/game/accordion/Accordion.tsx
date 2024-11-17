import { IAccordion } from "../../../models/interface/IAccordion";

export const Accordion = ({id, title, children}: IAccordion) => {
  return (
    <details id={id}>
      <summary className="text-white border-bottom">{title}</summary>
      <div>{children}</div>
    </details>
  );
};
