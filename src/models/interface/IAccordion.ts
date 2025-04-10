export interface IAccordion {
  id: string;
  title: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
  defaultOpen?: boolean;
  className?: string;
  classNameContainer?: string;
  icon?: React.ReactNode;
}
