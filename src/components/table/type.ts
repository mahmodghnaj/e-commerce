import { UseQueryResult } from "react-query";
import PropTypes from "prop-types";
import { Column, IPaginationOptions, TableAction } from "@/services/type";

export const propTypesColumn: unknown = PropTypes.array.isRequired;
export const propTypesFetchQuery: unknown = PropTypes.func.isRequired;
export const propTypesSyncRoute: unknown = PropTypes.bool;
export const propTypesFilter: unknown = PropTypes.object;
export const propTypesClassName: unknown = PropTypes.string;
export const propTypesShowFooter: unknown = PropTypes.bool;
export const propTypesStickyActions: unknown = PropTypes.bool;
export const propTypesAction: unknown = PropTypes.array;

export interface MyComponentMethods {
  updateRow: <T>(callback: (value: T) => boolean, object: Partial<T>) => void;
}

interface QueryDataResponseType<T> {
  data: T[];
  total?: number;
}

export interface PaginationProps extends React.ComponentProps<"div"> {
  totalPages: number;
  page: number;
  handlePageChange: (object: object) => void;
}

export interface FooterProps extends React.ComponentProps<"div"> {
  limit: number;
  handleLimitChange: (value: number) => void;
  totalPages: number | undefined;
  page: number;
  handleChangeParams: (object: object) => void;
}

export interface BodyProps extends React.ComponentProps<"tbody"> {
  data: unknown[];
  columns: Column<unknown>[];
  actions: TableAction<unknown>[] | undefined;
  showFooter: boolean | undefined;
}

export interface BodyLoadingPros extends React.ComponentProps<"tbody"> {
  columns: Column<unknown>[];
}

export interface HeaderProps extends React.ComponentProps<"thead"> {
  columns: Column<unknown>[];
  actions: TableAction<unknown>[] | undefined;
}

export interface ComponentProps extends React.ComponentProps<"table"> {
  columns: Column<unknown>[];
  fetchQuery: (
    params: IPaginationOptions
  ) => UseQueryResult<QueryDataResponseType<unknown>, unknown>;
  syncRoute?: boolean;
  filter?: object;
  className?: string;
  showFooter?: boolean;
  stickyActions?: boolean;
  actions?: TableAction<unknown>[];
}
