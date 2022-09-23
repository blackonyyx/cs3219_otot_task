import React from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from "react-table"
import { DefaultColumnFilter, fuzzyTextFilterFn, GlobalFilter } from './filters'
import BTable from 'react-bootstrap/Table';
import DeleteContributorButton from '../Button/DeleteContributorButton';
import UpdateContributorButton from '../Button/UpdateContributorButton';

export default function Table({type ,columns, data, reload }) {
    // Table component logic and UI come here
    const filterTypes = React.useMemo(
        () => ({
          // Add a new fuzzyTextFilterFn filter type.
          fuzzyText: fuzzyTextFilterFn,
          // Or, override the default text filter to use
          // "startWith"
          text: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id]
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
          },
        }),
        []
      )
      const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
          Filter: DefaultColumnFilter,
        }),
        []
      )
        console.log("table component", type, data)
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        prepareRow, 
        page,
        state,
        visibleColumns, 
        preGlobalFilteredRows,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize}, 
    } = useTable({
        columns,
        data,
        initialState: {pageIndex: 0},
        defaultColumn, 
        filterTypes
    }, 
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
    )

    return (
        <>
        <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
        <BTable variant="dark" striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
              {type==="contributor" &&
                <th></th>
                }
            {type==="contributor"&& 
                    <th></th>
            }
            </tr>
          ))}
          <tr>
            <th
              colSpan={type==="contributor" ? visibleColumns.length :visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                        {...cell.getCellProps({style:{ width: cell.column.width }}
                      )}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
                {type==="contributor" &&
                <td><UpdateContributorButton contributor={row.original}  ></UpdateContributorButton></td>
                }
                {type==="contributor"&& 
                    <td><DeleteContributorButton contributor_id={row.original._id} reload={reload}></DeleteContributorButton></td>
                }
              </tr>
              
            )
          })}
        </tbody>
      </BTable>
      <div className="pagination">
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
      </>
    )
}

