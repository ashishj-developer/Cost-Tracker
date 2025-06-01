import "./tableItem.css";
import { Box, IconButton, Text, Wrap } from "@chakra-ui/react";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";





const TableItem = (props) => {

    const { mergedobj, loading } = props;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    }
    // Function to render the edit button with a popover
    const editButton = () => {
        return (
            <Popover.Root>
                <Popover.Trigger asChild>
                    <IconButton aria-label="Search database" variant={"outeline"}>
                        <FaEdit />
                    </IconButton>
                </Popover.Trigger>
                <Portal>
                    <Popover.Positioner>
                        <Popover.Content className="popover-content">
                            <Popover.Body className="popover-body">
                                <Button >Edit</Button>
                                <Button >Delete</Button>
                            </Popover.Body>
                        </Popover.Content>
                    </Popover.Positioner>
                </Portal>
            </Popover.Root>
        )
    }




    return (
        <>
            <Box className="table-Body">
                <Skeleton height="6" width="100" loading={loading}>
                    <Wrap align={"center"}>
                        {editButton()}
                        <Text fontSize={'2.5vh'} fontWeight={'bold'}>{mergedobj.name}</Text>
                    </Wrap>
                </Skeleton>
                <Skeleton height="6" width="100" loading={loading}>
                    <Text fontSize={'2vh'}>{formatCurrency(mergedobj.cost)}</Text>
                </Skeleton>
            </Box>

            <Skeleton className="table-SubBody" height="6" width="100" loading={loading}>
                <Wrap>
                    <HiMiniArrowTurnDownRight />
                    <Text fontSize={'1.5vh'}>{mergedobj.description}</Text>
                </Wrap>
                <Text fontSize={'1.5vh'}>--{formatCurrency(mergedobj.amount)}</Text>
            </Skeleton>

            <hr />
        </>
    );
}
export default TableItem;
