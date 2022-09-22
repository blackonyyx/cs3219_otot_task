import { SelectColumnFilter, SliderColumnFilter, filterGreaterThan } from "./filters"
export const ContributorColumn = [
    {
        Header: "Name",
        accessor: 'name',
        filter: 'fuzzyText'
    },
    {
        Header: "Email",
        accessor: 'email',
        filter: 'fuzzyText'
    },
    {
        Header: "Gender",
        accessor: 'gender',
        Filter: SelectColumnFilter,
        filter: 'includes'
    },
    {
        Header: "User Description",
        accessor: 'userDescription',
        filter: 'fuzzyText'
    },
    {
        Header: "Phone",
        accessor: 'phone',
        filter: 'fuzzyText'
    },
    {
        Header: "Join Date",
        accessor: 'create_date',
        Filter: false,
    },
    {
        Header: "Last Known Activity",
        accessor: 'update_date',
        Filter: false,
    }
]
