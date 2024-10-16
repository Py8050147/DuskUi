import { useMutation } from "@tanstack/react-query";
import { createAddress } from "./https/api";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Use navigate

const Address = () => {
    const navigate = useNavigate(); // Initialize useNavigate for redirection
    const streetRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const postalCodeRef = useRef(null);
    const phoneRef = useRef(null);

    const mutation = useMutation({
        mutationFn: createAddress,
        onSuccess: (data) => {
            console.log("Address created:", data?.data?.data);
            navigate(`/address/${data?.data?.data?._id}`); // Redirect to the new address page after success
        },
        onError: (error) => {
            console.error("Error creating address:", error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        const street = streetRef.current?.value;
        const city = cityRef.current?.value;
        const state = stateRef.current?.value;
        const postalCode = postalCodeRef.current?.value;
        const phone = phoneRef.current?.value;

        // Check if all fields are filled
        if (!street || !city || !state || !postalCode || !phone) {
            return alert("Please fill out all fields");
        }

        // Create the address object to send
        const addressData = {
            street,
            city,
            state,
            postalCode,
            phone,
        };

        mutation.mutate(addressData); // Call the mutation function to create the address
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="address">Street</label>
                    <input
                        type="text"
                        name="Address"
                        ref={streetRef}
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        name="city"
                        ref={cityRef}
                    />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input 
                        type="text" 
                        name="state" 
                        id="state" 
                        ref={stateRef}
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input 
                        type="number" 
                        name="postalCode" 
                        id="postalCode" 
                        ref={postalCodeRef}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        ref={phoneRef}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button> {/* No Link here */}
                </div>
            </form>
        </div>
    );
};

export default Address;
