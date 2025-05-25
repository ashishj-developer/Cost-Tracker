import Header from "./header";
import AddItemForm from "./addForm";
import "./index.css"; 
import { EmptyState, VStack } from "@chakra-ui/react"
import { FaWpforms } from "react-icons/fa";



const Home = () => {
  const listItem = [];


  const renderListItem = () => {
    if (listItem.length === 0) {
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
    return <h1>listitme is avi</h1>
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
