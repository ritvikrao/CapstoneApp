import * as React from 'react';
import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const MyComponent = () => {
    const [page, setPage] = React.useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Information</DataTable.Title>
                <DataTable.Title numeric>Value</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
                <DataTable.Cell>Water Temperature</DataTable.Cell>
                <DataTable.Cell numeric>0</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>OtherDataExample</DataTable.Cell>
                <DataTable.Cell numeric>0</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Pagination
                page={page}
                numberOfPages={1}
                onPageChange={(page) => setPage(page)}
                label="1"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
            />
        </DataTable>
    );
}

export default MyComponent;