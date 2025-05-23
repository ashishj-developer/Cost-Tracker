import { Input, Button, HStack, Field } from "@chakra-ui/react"
import { useState } from "react";

const AddItemForm = () => {
    const [item, setItem] = useState("");



    return (
        <form>
            <h1>Enter details</h1>
            <HStack gap="10" width="full">
                <Field.Root required>
                    <Field.Label>
                        Item Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="Laptop" variant="subtle" />
                </Field.Root>
                <Field.Root required>
                    <Field.Label>
                        Cost <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="1200" variant="outline" />
                </Field.Root>
            </HStack>
            <HStack gap="10" width="full">
                <Field.Root required>
                    <Field.Label>
                        otherCosts Description <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="Laptop" variant="subtle" />
                </Field.Root>
                <Field.Root required>
                    <Field.Label>
                        Amount <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="1200" variant="outline" />
                </Field.Root>
            </HStack>
            <Button type="submit">Add Item</Button>
        </form>
    );
}

export default AddItemForm;