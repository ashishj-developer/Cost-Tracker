import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AddItemForm from "./addForm";

const Home = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our application.</p>
      <Button onClick={handleSignOut}>Sign Out</Button>
      <AddItemForm/>
    </div>
  );
};

export default Home;
