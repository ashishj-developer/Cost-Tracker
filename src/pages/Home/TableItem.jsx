import { IconButton, Heading, Text, Wrap, Box, Button } from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa";
import { useColorModeValue } from "../../components/ui/color-mode"
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import "./TableItem.css"; // Assuming you have a CSS file for styling
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Adjust the import path as necessary


const TableItem = () => {

    const userId = auth.currentUser.uid;

    const getDocument = async () => {

        const querySnapshot1 = await getDocs(collection(db, "users", userId, "items"));
        console.log("Fetching all items for user:", userId);
        querySnapshot1.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        const querySnapshot2 = await getDocs(collection(db, "users", userId, "otherCosts"));
        console.log("Fetching all items for user:", userId);
        querySnapshot2.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc);
        });
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    }

    const borderColor = useColorModeValue("#333446", "#EAEFEF")

    return (
        <Box borderColor={borderColor} className="table-Item" >
            <Box className="table-Header">
                <Heading size="2xl" fontFamily={'sans'}>Item Name</Heading>
                <Heading size="2xl" fontFamily={'sans'}>Price</Heading>
            </Box>
            <hr />
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
            <Box className="table-Footer">
                <hr />
                <Wrap className="Total-item">
                    <Text fontSize={'2.5vh'}>Total</Text>
                    <Text fontSize={'1.5vh'}>Total OtherCost</Text>
                    <Text fontSize={'1.5vh'}>Total Item</Text>
                </Wrap>
                <Wrap className="Total-Price">
                    <Text fontSize={'2.5vh'}>{formatCurrency(100)}</Text>
                    <Text fontSize={'1.5vh'}>{formatCurrency(100)}</Text>
                    <Text fontSize={'1.5vh'}>{formatCurrency(100)}</Text>
                </Wrap>
            </Box>
            <Button onClick={getDocument} colorScheme="blue" variant="solid" size="sm" marginTop="2vh">
                Fetch Document
            </Button>
        </Box>
    );
}
export default TableItem;