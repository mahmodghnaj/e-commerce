import React, { useEffect, useState } from "react";
import {
  ComponentProps,
  propTypesAction,
  propTypesClassName,
  propTypesColumn,
  propTypesFetchQuery,
  propTypesShowFooter,
} from "./type";
import Footer from "./components/footer";
import Body from "./components/body";
import Header from "./components/header";
import BodyLoading from "./components/body-loading";
import { IPaginationOptions } from "@/services/type";

type IBaseParams = Omit<IPaginationOptions, "total">;

const baseParams: IBaseParams = {
  page: 1,
  limit: 10,
};

const Table = ({
  columns,
  fetchQuery,
  className = "",
  showFooter,
  actions,
  onUpdateRow,
}: ComponentProps & { onUpdateRow?: (updatedData: any[]) => void }) => {
  const [params, setParams] = useState<IBaseParams>(baseParams);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

  const {
    isLoading,
    data: InfoTable,
    isError,
  } = fetchQuery({ ...params, total: true });

  useEffect(() => {
    if (InfoTable) {
      setData(InfoTable.data);
      setTotal(InfoTable.total);
    }
  }, [InfoTable]);

  useEffect(() => {
    if (total !== undefined) {
      setTotalPages(Math.ceil(total / params.limit));
    }
  }, [total, params.limit]);

  const handleLimitChange = (pageNumber: number) => {
    setParams((prev) => ({
      ...prev,
      limit: pageNumber,
      page: 1,
    }));
  };

  const handleChangeParams = (updates: Partial<IBaseParams>) => {
    setParams((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  if (isError) {
    return <div>Error loading data</div>;
  }

  const tableClasses = `overflow-auto overflow-x-auto h-96  ${className}`;
  const tableInnerClasses =
    "table table-xs table-pin-rows table-zebra table-pin-cols";

  return (
    <>
      <div className={tableClasses}>
        <table className={tableInnerClasses}>
          <Header actions={actions} columns={columns} />
          {isLoading && !data && (
            <BodyLoading columns={columns} limit={params.limit} />
          )}
          {!isLoading && data && (
            <Body
              actions={actions}
              data={data}
              columns={columns}
              showFooter={showFooter}
            />
          )}
        </table>
      </div>
      <Footer
        limit={params.limit}
        handleLimitChange={handleLimitChange}
        totalPages={totalPages}
        handleChangeParams={handleChangeParams}
        page={params.page}
      />
    </>
  );
};

Table.propTypes = {
  columns: propTypesColumn,
  fetchQuery: propTypesFetchQuery,
  className: propTypesClassName,
  showFooter: propTypesShowFooter,
  actions: propTypesAction,
};

export default Table;
