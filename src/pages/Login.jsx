import "./index.css";
import {
    Button,
    Card,
    Field,
    Input,
    Stack,
    SegmentGroup,
    Fieldset,IconButton
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { PasswordInput } from "../components/ui/password-input";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider ,
    signInWithPopup
} from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";

export const Login = () => {
    const [loading, setLoading] = useState(false); // Loading state for login/signup
    const [email, setEmail] = useState(""); // Email input state
    const [password, setPassword] = useState(""); // Password input state
    const [errorMessage, setErrorMessage] = useState(""); // Error message
    const [renderPage, setRenderPage] = useState("Login"); // "Login" or "Signup" page
    const [user, setUser] = useState(null); // Authenticated user
    const [checkingAuth, setCheckingAuth] = useState(true); // Check auth status

    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    // Check authentication status on mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setCheckingAuth(false); // Done checking
        });
        return () => unsubscribe(); // Cleanup listener
    }, []);

    // Handle toggle between Login and Signup forms
    const conditionRender = (event) => {
        setRenderPage(event.target.value);
        setErrorMessage("");
    };

    // Signup form submit
    const signUpForm = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message.slice(10)); // Show clean error
        } finally {
            setLoading(false);
        }
    };

    const signUpwithGoogle = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message.slice(10)); // Show clean error
        } finally {
            setLoading(false);
        }
    }

    // Login form submit
    const loginForm = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message.slice(10)); // Show clean error
        } finally {
            setLoading(false);
        }
    };

    // Signup form component
    const RenderSignup = () => {
        return (
            <Card.Root
                data-state="open"
                _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                }}
                size="md"
                maxH="lg"
                h="half"
                maxW="xl"
                w="full"
                variant="outline"
            >
                <SegmentGroup.Root justifyContent="flex-end" defaultValue="Signup">
                    <SegmentGroup.Indicator />
                    <SegmentGroup.Items onChange={conditionRender} items={["Signup", "Login"]} />
                </SegmentGroup.Root>
                <Card.Header>
                    <Card.Title>Sign up</Card.Title>
                    <Card.Description>
                        Fill in the form below to create an account
                    </Card.Description>
                </Card.Header>
                <Card.Body>
                    <Stack gap="4" w="full">
                        <Field.Root required>
                            <Field.Label>
                                Email <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Enter your email"
                            />
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                Password <Field.RequiredIndicator />
                            </Field.Label>
                            <PasswordInput
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field.Root>
                    </Stack>
                    <Fieldset.Root invalid={errorMessage.length}>
                        <Fieldset.ErrorText>{errorMessage}</Fieldset.ErrorText>
                    </Fieldset.Root>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    <IconButton onClick={signUpwithGoogle} aria-label="Search database"  backgroundColor={'transparent'}>
                        <FcGoogle />
                    </IconButton>
                    <Button loading={loading} onClick={signUpForm}>
                        Sign UP
                    </Button>
                </Card.Footer>
            </Card.Root>
        );
    };

    // Login form component
    const RenderLogin = () => {
        return (
            <Card.Root
                data-state="open"
                _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                }}
                size="md"
                maxH="lg"
                h="half"
                maxW="xl"
                w="full"
                variant="outline"
            >
                <SegmentGroup.Root justifyContent="flex-end" defaultValue="Login">
                    <SegmentGroup.Indicator />
                    <SegmentGroup.Items onChange={conditionRender} items={["Signup", "Login"]} />
                </SegmentGroup.Root>
                <Card.Header>
                    <Card.Title>Login</Card.Title>
                    <Card.Description>Fill in the form below to login</Card.Description>
                </Card.Header>
                <Card.Body>
                    <Stack gap="4" w="full">
                        <Field.Root required>
                            <Field.Label>
                                Email <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Enter your email"
                            />
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                Password <Field.RequiredIndicator />
                            </Field.Label>
                            <PasswordInput
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field.Root>
                    </Stack>
                    <Fieldset.Root invalid={errorMessage.length}>
                        <Fieldset.ErrorText>{errorMessage}</Fieldset.ErrorText>
                    </Fieldset.Root>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    <IconButton onClick={signUpwithGoogle} aria-label="Search database" backgroundColor={'transparent'}>
                        <FcGoogle />
                    </IconButton>
                    <Button loading={loading} onClick={loginForm}>
                        Login
                    </Button>
                </Card.Footer>
            </Card.Root>
        );
    };

    // Show loading spinner while checking auth state
    if (checkingAuth) {
        return <div>Loading...</div>;
    }

    // If user is logged in, redirect to home
    if (user) {
        return <Navigate to="/" />;
    }

    // Render login or signup UI based on state
    return (
        <div className="centered_component">
            {renderPage === "Login" ? RenderLogin() : RenderSignup()}
        </div>
    );
};
