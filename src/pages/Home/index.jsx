import Header from "./header";
import AddItemForm from "./addForm";
import "./index.css";
import { EmptyState, VStack, Heading, Text, Wrap, Box, Button } from "@chakra-ui/react"
import { FaWpforms } from "react-icons/fa";
import TableItem from "./TableItem";
import { useColorModeValue } from "../../components/ui/color-mode"
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Adjust the import path as necessary


const Home = () => {
  const listItem = [];
  const [items, setItems] = useState([]);
  const [otherCosts, setOtherCosts] = useState([]);

  const userId = auth.currentUser.uid;

  const getDocument = async () => {

    const querySnapshot1 = await getDocs(collection(db, "users", userId, "items"));
    console.log("Fetching all items for user:", userId);
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const itemDataObject = {
        id: doc.id,
        ...doc.data()
      };
      setItems(prevItems => [...prevItems, itemDataObject]);
    });
    const querySnapshot2 = await getDocs(collection(db, "users", userId, "otherCosts"));
    console.log("Fetching all items for user:", userId);
    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const otherCostDataObject = {
        id: doc.id,
        ...doc.data()
      };
      setOtherCosts(prevCosts => [...prevCosts, otherCostDataObject]);
    });
  }


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  }

    console.log("Items:", items);
    console.log("Other Costs:", otherCosts);

  const borderColor = useColorModeValue("#333446", "#EAEFEF")


  const renderListItem = () => {
    if (listItem.length !== 0) {
      return (
        <div className="empty-state">
          <EmptyState.Root >
            <EmptyState.Content>
              <EmptyState.Indicator>
                <FaWpforms />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>Your Form is empty</EmptyState.Title>
                <EmptyState.Description>
                  Enter Detais to add items to your list.
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        </div>
      )
    }
    return (
      <Box borderColor={borderColor} className="table-Item" >
        <Box className="table-Header">
          <Heading size="2xl" fontFamily={'sans'}>Item Name</Heading>
          <Heading size="2xl" fontFamily={'sans'}>Price</Heading>
        </Box>
        <hr />
        <TableItem />
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
    )
  }

  return (
    <div>
      <Header />
      <div className="home-container">
        {renderListItem()}
        <AddItemForm />
      </div>
    </div>
  );
};

export default Home;
