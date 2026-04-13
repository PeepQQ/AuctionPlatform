import {
    HTMLAttributes,
    TdHTMLAttributes,
    ThHTMLAttributes
} from "react";

export type TableProps = HTMLAttributes<HTMLTableElement>
export type TBodyProps = HTMLAttributes<HTMLTableSectionElement>
export type THeadProps = HTMLAttributes<HTMLTableSectionElement>
export type TrProps = HTMLAttributes<HTMLTableRowElement>
export type TdProps = TdHTMLAttributes<HTMLTableCellElement>
export type ThProps = ThHTMLAttributes<HTMLTableCellElement>

export interface TablePaginateProps {
    pageSize: number;
    totalCount: number;
    onSelectPage: (page: number) => void;
    activePage: number;
}