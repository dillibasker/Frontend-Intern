import { useState, useEffect } from 'react';
import { fetchDoctors } from './api';
import Image from 'next/image';

export default function DoctorListing() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    hospitalVisit: null,
    onlineConsult: null,
    experience: [],
    fees: [],
    language: []
  });

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        // Convert UI filters to API filters
        const apiFilters = {
          onlineConsult: filters.onlineConsult,
          hospitalVisit: filters.hospitalVisit,
          minExperience: filters.experience.length > 0 ? Math.min(...filters.experience) : undefined,
          maxFee: filters.fees.length > 0 ? Math.max(...filters.fees) : undefined,
          language: filters.language.length > 0 ? filters.language[0] : undefined
        };
        
        const data = await fetchDoctors(apiFilters);
        setDoctors(data.doctors || []);
      } catch (error) {
        console.error('Error loading doctors:', error);
        // Handle error state or notification
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [filters]);

  // Function to update filters
  const updateFilter = (category, value, isActive) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      // Handle special filter types
      if (category === 'hospitalVisit' || category === 'onlineConsult') {
        newFilters[category] = isActive;
        return newFilters;
      }
      
      // Handle array-based filters (experience, fees, language)
      if (Array.isArray(newFilters[category])) {
        if (isActive) {
          // Add to array if not already present
          if (!newFilters[category].includes(value)) {
            newFilters[category] = [...newFilters[category], value];
          }
        } else {
          // Remove from array
          newFilters[category] = newFilters[category].filter(item => item !== value);
        }
      }
      
      return newFilters;
    });
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setFilters({
      hospitalVisit: null,
      onlineConsult: null,
      experience: [],
      fees: [],
      language: []
    });
  };

  return (
    <div className="w-full">
      {/* Doctor listing content here - reuse the UI from the main component */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor._id} className="bg-white p-6 border rounded-md">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-20 mr-6 flex-shrink-0 mb-4 md:mb-0">
                    <Image
                      src={doctor.profileImage || "https://via.placeholder.com/80"}
                      alt={doctor.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-2">
                      <div>
                        <div className="flex items-center">
                          <h2 className="text-xl font-bold mr-2">Dr. {doctor.name}</h2>
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                          </svg>
                        </div>
                        <p className="text-gray-600 mb-1">{doctor.specialty}</p>
                        <div className="flex items-center">
                          <span className="text-blue-600 font-medium mr-2">{doctor.experience} YEARS</span>
                          <span className="mx-2">•</span>
                          <span className="text-blue-600 font-medium">{doctor.qualification}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {doctor.isDoctor && (
                          <div className="inline-block bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded mb-2">
                            DOCTOR OF THE HOUR
                          </div>
                        )}
                        <div className="text-2xl font-bold">₹{doctor.consultationFee}</div>
                      </div>
                    </div>
                    <div className="text-gray-600 mb-4">{doctor.hospital || 'Apollo 24|7 Virtual Clinic'} - {doctor.location}</div>
                    <div>
                      <button className="w-full md:w-auto py-3 px-6 bg-blue-50 text-blue-600 font-medium rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Consult Online
                        {doctor.availability && (
                          <span className="ml-2 text-sm">Available in {doctor.availability} minutes</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 border rounded-md text-center">
              <p className="text-gray-600">No doctors found. Please try different filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}