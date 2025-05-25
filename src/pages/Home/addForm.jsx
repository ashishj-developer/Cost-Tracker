import { Input, Button, HStack, Field } from "@chakra-ui/react"
import "./addForm.css"; // Assuming you have a CSS file for styling
import { useState } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from 'uuid'; // Importing uuid for unique item IDs

const AddItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState('');
    const [otherCostName, setOtherCostName] = useState('');
    const [otherCostAmount, setOtherCostAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const userId = auth.currentUser.uid;


    const handleSubmit = async () => {
        if (itemName.length === 0 || itemCost === "" || otherCostName.length === 0 || otherCostAmount === "") {
            alert("Please fill all fields correctly.");
            return;
        }
        setLoading(true);

        try {
            const id = uuid(); // Generate a unique ID for the item

            await setDoc(doc(db, `/users/${userId}/items/${id}`), {
                name: itemName,
                cost: parseFloat(itemCost),
            });

            await setDoc(doc(db, `/users/${userId}/otherCosts/${id}`), {
                description: otherCostName,
                amount: parseFloat(otherCostAmount),
            });
            
            // Reset form fields after successful submission
            setItemName('');
            setItemCost('');
            setOtherCostName('');
            setOtherCostAmount('');
            setLoading(false);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const negativeValueCheck1 = (event) => {
        const value = event.target.value;
        if (value >= 0) {
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

    return (
        <div className="add-item-form">
            <h1 className="Enter-details">Enter details</h1>
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
            </Field.Root>
            <Button loading={loading} loadingText="Saving..." onClick={handleSubmit} type="button" marginTop={'5vh'} size={'xl'}>Add Item</Button>
        </div>
    );
}

export default AddItemForm;