import Header from "./header";
import AddItemForm from "./addForm";
import "./index.css";
import {
  EmptyState,
  VStack,
  Heading,
  Text,
  Wrap,
  Box,
  Button,
  ProgressCircle,
} from "@chakra-ui/react";
import { FaWpforms } from "react-icons/fa";
import TableItem from "./TableItem";
import { useColorModeValue } from "../../components/ui/color-mode";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Adjust the path if necessary


const stage = {
  "L": "Loading Stage",
  "E": "Empty Stage",
  "S": "Succes Stage",
  "F": "Failed Stage",
}

const Home = () => {
  const [mergedItems, setMergedItems] = useState([]);
  const [currentStage, setCurrentStage] = useState("L"); // Initial stage
  const [loading, setLoading] = useState(false);
  const userId = auth.currentUser?.uid;
  const borderColor = useColorModeValue("#333446", "#EAEFEF");

  useEffect(() => {
    const getDocument = async () => {
      setCurrentStage("L"); // Set to loading stage
      const querySnapshot1 = await getDocs(collection(db, "users", userId, "items"));
      const querySnapshot2 = await getDocs(collection(db, "users", userId, "otherCosts"));

      const fetchedItems = [];
      const fetchedOtherCosts = [];

      querySnapshot1.forEach((doc) => {
        fetchedItems.push({ id: doc.id, ...doc.data() });
      });

      querySnapshot2.forEach((doc) => {
        fetchedOtherCosts.push({ id: doc.id, ...doc.data() });
      });

      // 🔄 Merge after setting
      const merged = fetchedItems.map(item => {
        const matched = fetchedOtherCosts.find(cost => cost.id === item.id);
        return {
          ...item,
          ...(matched || {}) // if matched, merge fields
        };
      });

      setMergedItems(merged);
      setCurrentStage(merged.length > 0 ? "S" : "E"); // Set to success if items exist, else empty
      return merged;
    };

    const fetchData = async () => {
      try {
        await getDocument();
      } catch (error) {
        console.error("Error fetching documents:", error);
        setCurrentStage("F"); // Set to failed stage on error
        console.log("Current Stage:", stage[currentStage]);
      }
    };

    fetchData();
  }, [userId]);


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };



  const renderListItem = () => {
    const totalItemPrice = mergedItems.reduce((acc, item) => acc + Number(item.cost || 0), 0);
    const totalOtherCost = mergedItems.reduce((acc, cost) => acc + Number(cost.amount || 0), 0);
    const totalCombined = totalItemPrice + totalOtherCost;
    console.log("Fetched and merged items:", mergedItems);

    return (
      <Box borderColor={borderColor} className="table-Item">
        <Box className="table-Header">
          <Heading size="2xl" fontFamily="sans">
            Item Name
          </Heading>
          <Heading size="2xl" fontFamily="sans">
            Price
          </Heading>
        </Box>
        <hr />
        <Wrap className="table-content">
          {mergedItems.map((item) => (
            <TableItem
              loading={loading}
              setLoading={setLoading}
              key={item.id}
              mergedobj={item} />
          ))}</Wrap>
        <Box className="table-Footer">
          <hr />
          <Wrap className="Total-item">
            <Text fontSize="2.5vh">Total</Text>
            <Text fontSize="1.5vh">Total OtherCost</Text>
            <Text fontSize="1.5vh">Total Item</Text>
          </Wrap>
          <Wrap className="Total-Price">
            <Text fontSize="2.5vh">{formatCurrency(totalCombined)}</Text>
            <Text fontSize="1.5vh">{formatCurrency(totalOtherCost)}</Text>
            <Text fontSize="1.5vh">{formatCurrency(totalItemPrice)}</Text>
          </Wrap>
        </Box>
      </Box>
    );
  };

  const renderEmpty = () => {
    return (
      <Box className="empty-state">
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <FaWpforms />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>Your Form is empty</EmptyState.Title>
              <EmptyState.Description>
                Enter Details to add items to your list.
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Box>
    );
  };

  const renderLoading = () => {
    return (
      <Wrap className="empty-state" justify="center">
        <ProgressCircle.Root value={null} size="sm">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root></Wrap>
    )
  }

  const renderFailed = () => {
    return (
      <Box className="empty-state">
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <FaWpforms />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>Failed to load data</EmptyState.Title>
              <EmptyState.Description>
                Please try again later.
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Box>
    );
  }

  const renderCondition = () => {
    switch (currentStage) {
      case "L":
        return renderLoading();
      case "E":
        return renderEmpty();
      case "S":
        return renderListItem();
      case "F":
        return renderFailed();
      default:
        return null;
    }
  }

  return (
    <div>
      <Header />
      <div className="home-container">
        {renderCondition()}
        <AddItemForm setMergedItems={setMergedItems} loading={loading} setLoading={setLoading} />
      </div>
    </div>
  );
};

export default Home;
