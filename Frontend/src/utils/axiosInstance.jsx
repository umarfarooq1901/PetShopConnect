import axios from "axios";


// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
});




export default axiosInstance




// Creating an Axios Instance:

// axios.create() is a method provided by Axios to create a reusable instance with predefined settings.
// This instance, axiosInstance, is configured with some default options, making it easier to use throughout your application without needing to re-specify these settings every time.
// Base URL:

// The baseURL is set to http://localhost:5000/api, which is likely your backend server's address. This base URL will be prefixed to all the API routes used with this instance.
// For example, if you use axiosInstance.get('/products'), the full URL would become http://localhost:5000/api/products.
// This makes it easier to change the base URL (e.g., to a production server) in one place instead of in every request.
// Headers:

// The headers object defines default HTTP headers that will be included in every request made with axiosInstance.
// Here, it specifies 'Content-Type': 'application/json', which tells the server that the body of requests will be in JSON format.
// When the backend sees this header, it knows to parse the incoming data as JSON.
// This is particularly important for POST, PUT, or PATCH requests, where you send data in JSON format to the server (e.g., when adding or updating resources).
// Why Use axiosInstance
// Using an axiosInstance with preset configurations:

// Keeps code DRY (Don't Repeat Yourself): You don’t need to set the base URL and headers repeatedly in each API call.
// Simplifies Changes: If the API URL or default headers change, you only need to update this single file.
// Consistency: Ensures that every request shares the same configuration by default, reducing the chances of mistakes.