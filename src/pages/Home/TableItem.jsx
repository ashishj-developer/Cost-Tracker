import "./TableItem.css";
import { Box, IconButton, Text, Wrap, Skeleton, Button, Popover, Portal, Drawer, CloseButton, Field, Input } from "@chakra-ui/react";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Adjust the path if necessary
import { useState } from "react";
import { toaster } from "../../components/ui/toaster"; // Adjust the path if necessary
import { TiDelete } from "react-icons/ti";


const TableItem = (props) => {

    const { mergedobj, loading, setMergedItems } = props;
    const [DelLoading, setDelLoading] = useState(false);
    const [itemName, setItemName] = useState(mergedobj.name);
    const [itemCost, setItemCost] = useState(mergedobj.cost.toString());
    const [otherCostName, setOtherCostName] = useState(mergedobj.description);
    const [otherCostAmount, setOtherCostAmount] = useState(mergedobj.amount.toString());
    const [updateLoading, setUpdateLoading] = useState(false);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    }

    // Function to delete data (placeholder)
    const deleteData = async () => {
        setDelLoading(true);
        try {
            const userId = auth.currentUser.uid;
            await deleteDoc(doc(db, `/users/${userId}/items/${mergedobj.id}`));
            await deleteDoc(doc(db, `/users/${userId}/otherCosts/${mergedobj.id}`));

            // Update the merged items state
            setMergedItems(prevItems => prevItems.filter(item => item.id !== mergedobj.id));

            setDelLoading(false);
        } catch (error) {
            console.error("Error deleting data:", error);
            setDelLoading(false);
        }
        // You can add additional logic here, like showing a success message or updating the UI
        // For now, just logging the deletion
        console.log("Data deleted successfully");
    }

    const negativeValueCheck1 = (event) => {
        const value = event.target.value;
        if (value > 0) {
            setOtherCostAmount(value);
        } else {
            setOtherCostAmount('');
        }
    }

    const negativeValueCheck2 = (event) => {
        const value = event.target.value;
        if (value > 0) {
            setItemCost(value);
        } else {
            setItemCost('');
        }
    }

    const update = async () => {
        
        if (itemName.length === 0 || itemCost === "" || otherCostName.length === 0 || otherCostAmount === "") {
            toaster.create({
                description: "Please fill all fields correctly.",
                type: "warning",
            })
            return;
        }
        try {
            setUpdateLoading(true);
            const userId = auth.currentUser.uid;
            const itemRef = doc(db, `/users/${userId}/items/${mergedobj.id}`);
            const otherCostRef = doc(db, `/users/${userId}/otherCosts/${mergedobj.id}`);
            await updateDoc(itemRef, {
                name: itemName,
                cost: parseFloat(itemCost),
            });
            await updateDoc(otherCostRef, {
                description: otherCostName,
                amount: parseFloat(otherCostAmount),
            });
            // Update the merged items state
            setMergedItems(prevItems => prevItems.map(item => {
                if (item.id === mergedobj.id) {
                    return {
                        ...item,
                        name: itemName,
                        cost: parseFloat(itemCost),
                        description: otherCostName,
                        amount: parseFloat(otherCostAmount),
                    };
                }
                return item;
            }));
            // Reset form fields after successful update
            setItemName('');
            setItemCost('');
            setOtherCostName('');
            setOtherCostAmount('');
            setUpdateLoading(false);
            toaster.create({
                title: `Data updated successfully`,
                type: "success",
            })
        } catch (e) {
            console.error("Error updating document: ", e);
            setUpdateLoading(false);
            toaster.create({
                title: `Failed to update item`,
                type: "error",
            })
        }
    }



    const drawer = () => {
        return (
            <Drawer.Root>
                <Drawer.Trigger asChild>
                    <IconButton aria-label="Search database" variant={"outeline"}>
                        <FaEdit />
                    </IconButton>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner >
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>Update Data</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <Field.Root invalid={itemName.length == 0} marginBottom={'2vh'}>
                                    <Field.Label>Item Name</Field.Label>
                                    <Input placeholder="Enter your item name" size="xl" value={itemName} onChange={(event) => setItemName(event.target.value)} />
                                    <Field.ErrorText>This field is required</Field.ErrorText>
                                </Field.Root>
                                <Field.Root invalid={itemCost == ""} marginBottom={'2vh'}>
                                    <Field.Label>Item Cost</Field.Label>
                                    <Input placeholder="Enter your item cost" size="xl" value={itemCost} onChange={negativeValueCheck2} />
                                    <Field.ErrorText>Only Positive Numbers</Field.ErrorText>
                                </Field.Root>
                                <Field.Root invalid={otherCostName.length == 0} marginBottom={'2vh'}>
                                    <Field.Label>Other Cost Name</Field.Label>
                                    <Input placeholder="'Shipping'" size="xl" value={otherCostName} onChange={(event) => setOtherCostName(event.target.value)} />
                                    <Field.ErrorText>This field is required</Field.ErrorText>
                                </Field.Root>
                                <Field.Root invalid={otherCostAmount == ""} marginBottom={'2vh'}>
                                    <Field.Label>Other Cost Amount</Field.Label>
                                    <Input placeholder="'20'" size="xl" value={otherCostAmount} onChange={negativeValueCheck1} />
                                    <Field.ErrorText>Only Positive Numbers</Field.ErrorText>
                                    <Button alignSelf='center' marginTop={10} onClick={update} loading={updateLoading}>Update</Button>
                                </Field.Root>

                            </Drawer.Body>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        )
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
                                {}
                                <Button loading={DelLoading} loadingText="Deleting..." onClick={deleteData}>Delete</Button>
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
                        {drawer()}
                        <Text fontSize={'2.5vh'} fontWeight={'bold'}>{mergedobj.name}</Text>
                    </Wrap>
                </Skeleton>
                <Skeleton height="6" width="100" loading={loading}>
                    <Text fontSize={'2vh'}>{formatCurrency(mergedobj.cost)}
                        <Button
                            aria-label="Delete item"
                            loading={DelLoading}
                            onClick={deleteData}
                            variant="ghost"
                        >
                            <TiDelete colorScheme="red"/>
                        </Button>
                    </Text>
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
