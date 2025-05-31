import "./TableItem.css";
import { Box, IconButton, Text, Wrap } from "@chakra-ui/react";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";


const TableItem = () => {
    
    const formatCurrency = (amount) => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
            }).format(amount);
        }

    return (
        <>
            <Box className="table-Body">
                <Wrap align={"center"}>
                    <IconButton aria-label="Search database" variant={"outeline"}>
                        <FaEdit />
                    </IconButton>
                    <Text fontSize={'2.5vh'} fontWeight={'bold'}>Laptop</Text>
                </Wrap>
                <Text fontSize={'2vh'}>{formatCurrency(120.100)}</Text>
            </Box>
            <Box className="table-SubBody">
                <Wrap>
                    <HiMiniArrowTurnDownRight />
                    <Text fontSize={'1.5vh'}>Other Costs</Text>
                </Wrap>
                <Text fontSize={'1.5vh'}>--{formatCurrency(120.100)}</Text>
            </Box>
            <hr />
        </>
    );
}
export default TableItem;
