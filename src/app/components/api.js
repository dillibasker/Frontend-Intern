import axios from 'axios';

// Function to fetch doctors with optional filters
export const fetchDoctors = async (filters = {}) => {
  try {
    // Convert filters object to query string
    const queryParams = new URLSearchParams();
    
    // Add each filter to query params if it exists
    if (filters.specialty) queryParams.append('specialty', filters.specialty);
    if (filters.minExperience) queryParams.append('minExperience', filters.minExperience);
    if (filters.maxFee) queryParams.append('maxFee', filters.maxFee);
    if (filters.language) queryParams.append('language', filters.language);
    if (filters.onlineConsult !== undefined) queryParams.append('onlineConsult', filters.onlineConsult);
    if (filters.hospitalVisit !== undefined) queryParams.append('hospitalVisit', filters.hospitalVisit);
    
    const queryString = queryParams.toString();
    const response = await axios.get(`/api/doctors${queryString ? `?${queryString}` : ''}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch doctors');
  }
};

// Function to add a new doctor
export const addDoctor = async (doctorData) => {
  try {
    const response = await axios.post('/api/add/doctors', doctorData);
    return response.data;
  } catch (error) {
    console.error('Error adding doctor:', error);
    throw new Error(error.response?.data?.message || 'Failed to add doctor');
  }
};

