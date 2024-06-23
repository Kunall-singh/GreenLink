import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './reports.css';

const ReportsPage = () => {
    const data = useMemo(() => [
        { id: 1, name: 'Report 2023', status: 'Download', url: '/downloads/report2023.pdf' },
        { id: 2, name: 'Report 2022', status: 'Preview', url: '/downloads/report2022.pdf' },
        { id: 3, name: 'Report 2021', status: 'Download', url: '/downloads/report2021.pdf' },
        // More reports
    ], []);

    const columns = useMemo(() => [
        { Header: 'Report Name', accessor: 'name' },
        { Header: 'Action', accessor: 'status', 
            Cell: ({ row }) => (
                <div>
                    <button onClick={() => window.open(row.original.url, "_blank")} style={{ backgroundColor: row.original.status === 'Download' ? 'red' : 'green' }}>
                        {row.original.status}
                    </button>
                </div>
            )
        }
    ], []);

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <div className="reports-container">
            <h1>Previous Audit Reports</h1>
            <table {...getTableProps()} style={{ width: '100%', marginBottom: '20px' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsPage;
