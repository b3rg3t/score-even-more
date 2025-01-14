export interface IAccordion {
    id: string;
    title: string;
    children: React.ReactNode | React.ReactNode[];
    defaultOpen?: boolean;
    className?: string;
}