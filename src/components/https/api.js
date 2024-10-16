import axios from "axios";


// const api = axios.create({
//     baseURL: '/api',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true 
// })


export const login = async (data) =>
    await axios.post('/api/v2/users/login', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true

    })



export const register = async (data) =>
    await axios.post('/api/v2/users/register', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

export const getcurrentUser = async () =>
    await axios.get('/api/v2/users/getCurrentUser', {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

export const changePassword = async (passwordData) =>
    await axios.post('/api/v2/users/change-password', passwordData, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

export const updateAccount = async (data) =>
    await axios.post('/api/v2/users/updateAccount', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        // withCredentials: true
    })

export const uploadProduct = async(formData) => {
   return await axios.post('/api/v2/products', formData, {
        headers: {
            // 'Content-Type': 'application/json',
            // "Content-Encoding": 'mul',
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    })
}

export const getAllProduct = async() => {
   const response = await axios.get('/api/v2/products', {
        headers: {
            // 'Content-Type': 'application/json',
            // "Content-Encoding": 'mul',
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    })
    // console.log(response)
    return response.data; 
}



export const getProductById = async (productId) => {
    try {
      const response = await axios.get('/api/v2/products', {
        params: { ID: productId }
      });
    //   console.log('API response:', response.data); // Log the actual response data
      return response.data.data; // Access the data correctly
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  };
//     

  // For updating a product (with or without image)
  export const updateProduct = async ({ productId, formData }) => {
    const response = await axios.patch(`/products/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
};


export const createAddress = async (data) =>
    await axios.post('/api/v2/addresses', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

      
// export const getAddress = async(addressId) => {
//   const response = await axios.get('/api/v2/addresses', {
//     params: {
//         ID: addressId
//       },
//        withCredentials: true
//    })
//    // console.log(response)
//    return response.data;
// }
export const getAddressId = async (addressId) => {
    const response = await axios.get('/api/v2/addresses', {
        params: {
          ID: addressId
      },
    withCredentials: true
  });
  console.log(response.data)
  return response.data;
};

export const getAddress = async () => {
      await axios.get('/api/v2/addresses')
  }



export const createOrder = async (orderData) => {
    const response = await axios.post('/api/v2/orders', orderData, {
        headers: {
'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    console.log(response.data)
    return response.data
  }