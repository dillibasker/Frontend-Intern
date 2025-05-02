'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Search } from 'lucide-react';

// API functions
const fetchDoctors = async () => {
  try {
    const response = await fetch('https://intern-amoi.onrender.com/api/doctors');
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return { doctors: [] };
  }
};

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    hospitalVisit: true,
    onlineConsult: true,
    experience: [],
    fees: [],
    language: []
  });

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data.doctors || []);
      setLoading(false);
    };

    loadDoctors();
  }, []);

  return (
    <>
      <Head>
        <title>Apollo 24/7 Clone - Doctor Listing</title>
        <meta name="description" content="Consult doctors online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-6">
                
              </div>
              <div className="flex items-center border rounded-md px-3 py-2 cursor-pointer">
                <div className="text-gray-500 mr-2">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">Select Location</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Select Address</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow mx-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search Doctors, Specialities, Conditions etc."
                />
              </div>
            </div>

            <div>
              <button className="inline-flex items-center px-4 py-2 border border-green-700 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Login
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            </div>
          </div>

          <nav className="container mx-auto px-4 py-3 flex items-center space-x-8 overflow-x-auto">
            <Link href="#" className="text-gray-900 font-medium whitespace-nowrap">Medicines</Link>
            <Link href="#" className="text-gray-900 font-medium whitespace-nowrap">Lab Tests</Link>
            <Link href="#" className="text-gray-900 font-medium whitespace-nowrap">Circle Membership</Link>
            <Link href="#" className="text-gray-900 font-medium whitespace-nowrap">Health Records</Link>
            <Link href="#" className="text-gray-900 font-medium whitespace-nowrap">Diabetes Reversal</Link>
            <div className="flex items-center">
              <Link href="#" className="text-gray-900 font-medium whitespace-nowrap">Buy Insurance</Link>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">New</span>
            </div>
          </nav>
        </header>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-2">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="#" className="text-blue-600 hover:text-blue-800">Home</Link>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="#" className="ml-2 text-blue-600 hover:text-blue-800">Doctors</Link>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-gray-500">General Physicians</span>
              </li>
            </ol>
          </nav>
        </div>

        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 bg-white p-4 border rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Clear All</button>
              </div>

              <div className="mb-6">
                <button className="w-full py-2 px-4 border border-blue-600 rounded-md text-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Show Doctors Near Me
                </button>
              </div>

              {/* Mode of Consult */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Mode of Consult</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="hospital-visit"
                      name="hospital-visit"
                      type="checkbox"
                      checked={filters.hospitalVisit}
                      onChange={() => setFilters({...filters, hospitalVisit: !filters.hospitalVisit})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hospital-visit" className="ml-2 block text-sm text-gray-700">
                      Hospital Visit
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="online-consult"
                      name="online-consult"
                      type="checkbox"
                      checked={filters.onlineConsult}
                      onChange={() => setFilters({...filters, onlineConsult: !filters.onlineConsult})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="online-consult" className="ml-2 block text-sm text-gray-700">
                      Online Consult
                    </label>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Experience (In Years)</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="exp-0-5"
                      name="exp-0-5"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="exp-0-5" className="ml-2 block text-sm text-gray-700">
                      0-5
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="exp-6-10"
                      name="exp-6-10"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="exp-6-10" className="ml-2 block text-sm text-gray-700">
                      6-10
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="exp-11-16"
                      name="exp-11-16"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="exp-11-16" className="ml-2 block text-sm text-gray-700">
                      11-16
                    </label>
                  </div>
                </div>
                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  +1 More
                </button>
              </div>

              {/* Fees */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Fees (In Rupees)</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="fee-100-500"
                      name="fee-100-500"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="fee-100-500" className="ml-2 block text-sm text-gray-700">
                      100-500
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="fee-500-1000"
                      name="fee-500-1000"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="fee-500-1000" className="ml-2 block text-sm text-gray-700">
                      500-1000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="fee-1000+"
                      name="fee-1000+"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="fee-1000+" className="ml-2 block text-sm text-gray-700">
                      1000+
                    </label>
                  </div>
                </div>
              </div>

              {/* Language */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Language</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="lang-english"
                      name="lang-english"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="lang-english" className="ml-2 block text-sm text-gray-700">
                      English
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="lang-hindi"
                      name="lang-hindi"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="lang-hindi" className="ml-2 block text-sm text-gray-700">
                      Hindi
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Listing */}
            <div className="w-full md:flex-1 md:ml-6 mt-6 md:mt-0">
              <div className="bg-white p-4 border rounded-md mb-6">
                <h1 className="text-2xl font-bold mb-1">Consult General Physicians Online - Internal Medicine Specialists</h1>
                <p className="text-gray-600">(766 doctors)</p>
                
                <div className="mt-4 flex justify-end">
                  <div className="relative inline-block text-left w-48">
                    <div className="flex items-center justify-between border border-gray-300 rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                      <span>Availability</span>
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

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
  <span className="ml-2 text-sm">
    Available on{" "}
    {Object.entries(doctor.availability)
      .map(([day, time]) => `${day}: ${time}`)
      .join(", ")}
  </span>
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

                  {/* Fallback doctors when API doesn't return data */}
                  {(!doctors || doctors.length === 0) && (
                    <>
                      <div className="bg-white p-6 border rounded-md">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-20 mr-6 flex-shrink-0 mb-4 md:mb-0">
                            <div className="bg-gray-200 rounded-md w-20 h-20"></div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between mb-2">
                              <div>
                                <div className="flex items-center">
                                  <h2 className="text-xl font-bold mr-2">Dr. Liritha C</h2>
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
                                <p className="text-gray-600 mb-1">General Physician/ Internal Medicine Specialist</p>
                                <div className="flex items-center">
                                  <span className="text-blue-600 font-medium mr-2">5 YEARS</span>
                                  <span className="mx-2">•</span>
                                  <span className="text-blue-600 font-medium">MBBS, MD (GENERAL MEDICINE)</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="inline-block bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded mb-2">
                                  DOCTOR OF THE HOUR
                                </div>
                                <div className="text-2xl font-bold">₹429</div>
                              </div>
                            </div>
                            <div className="text-gray-600 mb-4">Apollo 24|7 Virtual Clinic - Telangana Hyderabad</div>
                            <div>
                              <button className="w-full md:w-auto py-3 px-6 bg-blue-50 text-blue-600 font-medium rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Consult Online
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 border rounded-md">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-20 mr-6 flex-shrink-0 mb-4 md:mb-0">
                            <div className="bg-gray-200 rounded-md w-20 h-20"></div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between mb-2">
                              <div>
                                <div className="flex items-center">
                                  <h2 className="text-xl font-bold mr-2">Dr. Chandra Sekhar P</h2>
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
                                <p className="text-gray-600 mb-1">General Practitioner</p>
                                <div className="flex items-center">
                                  <span className="text-blue-600 font-medium mr-2">5 YEARS</span>
                                  <span className="mx-2">•</span>
                                  <span className="text-blue-600 font-medium">MBBS</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold">₹399</div>
                                <div className="text-sm text-orange-600 mt-1">₹60 Cashback</div>
                              </div>
                            </div>
                            <div className="text-gray-600 mb-4">Apollo 24|7 Virtual Clinic - Karnataka, Bangalore</div>
                            <div>
                              <button className="w-full md:w-auto py-3 px-6 bg-blue-50 text-blue-600 font-medium rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Consult Online
                                <span className="ml-2 text-sm">Available in 7 minutes</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Need Help banner */}
          <div className="mt-8 bg-blue-900 rounded-lg p-6 text-white flex flex-col md:flex-row items-center">
            <div className="md:mr-6 mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Need help consult the right doctor?</h3>
              <p>Call +91-8040245807 to book instantly</p>
            </div>
            <div className="md:ml-auto">
              
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

