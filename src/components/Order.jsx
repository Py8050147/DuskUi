import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; // Import Stripe elements
import { createOrder, getProductById, getcurrentUser, getAddressId } from './https/api';

const Order = () => {
  const stripe = useStripe();  // Initialize Stripe
  const elements = useElements(); // Initialize Stripe Elements

  const { productId } = useParams(); 
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState('');

  const passedProduct = location.state?.product || null;

  // Fetch product data
  const { data: fetchedProduct, error: productError, isLoading: productLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });

  const product = passedProduct || fetchedProduct;

  // Fetch current user data
  const { data: user, error: userError, isLoading: userLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getcurrentUser,
  });

  // Fetch the user's addresses
  const { data: addresses, error: addressError, isLoading: addressLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddressId,
  });

  // Handle order creation
  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      alert('Order placed successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to place order');
    },
  });

  // Loading and error handling
  if (productLoading || userLoading || addressLoading) return <div>Loading...</div>;
  if (productError || userError || addressError) return <div>Error loading data</div>;
  if (!product) return <div>No product data found.</div>;

  const totalPrice = product.price * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!quantity || !selectedAddress || !user?.data?.data?._id) {
      alert('All fields (quantity, address, and customer) are required.');
      return;
    }

    // Validate Stripe Elements (CardElement)
    if (!stripe || !elements) {
      alert('Stripe has not loaded yet.');
      return;
    }

    // Create a Payment Method using the card details entered in CardElement
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card', // Corrected: 'type' should be a string
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    // Create order data object
    const orderData = {
      orderPrice: totalPrice,
      orderItems: [{ productId: product._id, quantity }],
      address: selectedAddress, // Pass the selected address ID
      customer: user?.data?.data?._id, // Pass the correct user ID
      paymentMethodId: paymentMethod.id, // Stripe Payment Method ID
    };

    // Trigger order creation and payment
    mutation.mutate(orderData);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Order {product.name}</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 mt-6 border border-gray-200">
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Select Address</label>
          <select
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          >
            <option value="" disabled>Select an address</option>
            {addresses?.data?.map((address) => (
              <option key={address._id} value={address._id}>
                {address.street}, {address.city}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Total Price</label>
          <input
            type="text"
            value={`$${totalPrice.toFixed(2)}`}
            readOnly
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Payment Information</label>
          <div className="w-full px-4 py-2 border rounded-md border-gray-300">
            <CardElement />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded-md">
          Place Order & Pay
        </button>
      </form>
    </div>
  );
};

export default Order;
