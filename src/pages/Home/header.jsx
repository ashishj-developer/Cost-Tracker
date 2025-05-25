import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { IconButton, Button } from "@chakra-ui/react";
import { useColorMode } from "../../components/ui/color-mode"
import { LuMoon, LuSun } from "react-icons/lu"
import "./header.css"; // Assuming you have a CSS file for styling
import { IoLogOutSharp } from "react-icons/io5";


const Header = () => {
    const navigate = useNavigate();
    const { toggleColorMode, colorMode } = useColorMode()

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <header className="header">
            <IconButton onClick={toggleColorMode} variant="outline" size="sm" border={'0px'} padding={'2vh'} marginRight={'1vh'}>
                {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
            <Button onClick={handleSignOut}  variant="outline"><IoLogOutSharp />
            </Button>
        </header>
    );
}

export default Header;