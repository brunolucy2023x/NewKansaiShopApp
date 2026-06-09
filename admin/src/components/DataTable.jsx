import {
    ChevronLeftIcon,
    ChevronRightIcon,
  } from "lucide-react";
  
  function DataTable({
    columns = [],
    data = [],
    loading = false,
    emptyMessage = "No records found",
    page = 1,
    totalPages = 1,
    onPageChange,
  }) {
    if (loading) {
      return (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg" />
        </div>
      );
    }
  
    return (
      <div className="space-y-4">
        {/* TABLE */}
  
        <div className="overflow-x-auto bg-base-100 rounded-box shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                {columns.map(
                  (column) => (
                    <th
                      key={
                        column.key
                      }
                    >
                      {
                        column.label
                      }
                    </th>
                  )
                )}
              </tr>
            </thead>
  
            <tbody>
              {data.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={
                      columns.length
                    }
                    className="text-center py-10 opacity-70"
                  >
                    {
                      emptyMessage
                    }
                  </td>
                </tr>
              ) : (
                data.map(
                  (
                    row,
                    rowIndex
                  ) => (
                    <tr
                      key={
                        row.id ||
                        rowIndex
                      }
                    >
                      {columns.map(
                        (
                          column
                        ) => (
                          <td
                            key={
                              column.key
                            }
                          >
                            {column.render
                              ? column.render(
                                  row
                                )
                              : row[
                                  column
                                    .key
                                ]}
                          </td>
                        )
                      )}
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
  
        {/* PAGINATION */}
  
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm opacity-70">
              Page {page} of{" "}
              {totalPages}
            </div>
  
            <div className="join">
              <button
                className="join-item btn"
                disabled={
                  page === 1
                }
                onClick={() =>
                  onPageChange?.(
                    page - 1
                  )
                }
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
  
              <button className="join-item btn btn-active">
                {page}
              </button>
  
              <button
                className="join-item btn"
                disabled={
                  page ===
                  totalPages
                }
                onClick={() =>
                  onPageChange?.(
                    page + 1
                  )
                }
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default DataTable;