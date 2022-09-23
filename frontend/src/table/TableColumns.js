import { DataGender, DataTag, DateData } from "./DataValues"
import { SelectColumnFilter, NumberRangeColumnFilter } from "./filters"
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
        filter: 'includes',
        Cell: ({ cell: { value } }) => <DataGender value={value} />
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
        Cell: ({ cell: { value } }) => <DateData value={value} />
    },
    {
        Header: "Last Known Activity",
        accessor: 'update_date',
        Filter: false,
        Cell: ({ cell: { value } }) => <DateData value={value} />
    }
]


export const MotherlessColumns = [
    {
        Header: "Recipe Name",
        accessor: 'name',
        filter: 'fuzzyText'
    },
    {
        Header: "Food Tags",
        accessor: 'tags',
        width: 400,
        Filter: false,
        Cell: ({ cell: { value } }) => <DataTag valueList={value} />
    },
    {
        Header: "Prep Time",
        accessor: 'prepareTime',
        Filter: NumberRangeColumnFilter,
        filter: 'between'
    },
    {
        Header: "Macro Nutrients",
        columns: [
            {
                Header: "Calories",
                accessor: 'nutrients.caloriesKCal',
                Filter: NumberRangeColumnFilter,
                filter: 'between'
            },
            {
                Header: "Carbohydrates (grams)",
                accessor: 'nutrients.totalCarbs',
                Filter: NumberRangeColumnFilter,
                filter: 'between'
            },
            {
                Header: "Fat Content",
                accessor: 'nutrients.fat',
                Filter: NumberRangeColumnFilter,
                filter: 'between'
            },
            {
                Header: "Protein Content",
                accessor: 'nutrients.protein',
                Filter: NumberRangeColumnFilter,
                filter: 'between'
            },
        ],
    }
]

