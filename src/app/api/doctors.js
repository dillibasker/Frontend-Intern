import axios from 'axios';

// Define your backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Forward any query parameters
        const queryParams = new URLSearchParams(req.query).toString();
        const response = await axios.get(`${API_URL}/doctors${queryParams ? `?${queryParams}` : ''}`);
        
        res.status(200).json(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(error.response?.status || 500).json({
          message: error.response?.data?.message || 'Error fetching doctors',
        });
      }
      break;
      
    case 'POST':
      try {
        const response = await axios.post(`${API_URL}/doctors`, req.body);
        res.status(201).json(response.data);
      } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(error.response?.status || 500).json({
          message: error.response?.data?.message || 'Error adding doctor',
        });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}