import React, { useState, useEffect } from 'react';
import { Bell, Menu, User, Home, Map, Calendar, CreditCard, HelpCircle, LogOut, Settings, ChevronDown, Search } from 'lucide-react';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Sample user data
  const userData = {
    name: "Amanda Peterson",
    email: "amanda.p@example.com",
    memberSince: "May 2023",
    loyaltyPoints: 450,
    upcomingTrips: 2,
    pastTrips: 7
  };

  // Recent trips data
  const recentTrips = [
    { id: 1, from: "Boston", to: "New York", date: "April 28, 2025", status: "Completed", price: "$42.50" },
    { id: 2, from: "New York", to: "Washington DC", date: "May 15, 2025", status: "Upcoming", price: "$65.00" },
    { id: 3, from: "Washington DC", to: "Boston", date: "May 22, 2025", status: "Upcoming", price: "$58.75" }
  ];

  // Special offers
  const specialOffers = [
    { id: 1, title: "25% Off Weekend Trips", validUntil: "May 31, 2025", code: "WEEKEND25" },
    { id: 2, title: "Companion Rides Free", validUntil: "June 15, 2025", code: "BRINGAFRIEND" }
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isMobile = windowWidth <= 768;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={toggleMenu}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800 p-2"
                >
                  <Menu size={24} />
                </button>
              )}
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-green-800">ComfortLine</span>
              </div>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search trips, stations..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-700 focus:border-green-700 sm:text-sm"
                />
              </div>

              <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800">
                <span className="sr-only">View notifications</span>
                <Bell size={20} />
              </button>

              <div className="relative ml-3">
                <div className="flex items-center">
                  <button className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800">
                    <span className="sr-only">Open user menu</span>
                    <div className="bg-green-800 rounded-full p-1">
                      <User size={24} className="text-white" />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">{userData.name}</span>
                    <ChevronDown size={16} className="ml-1 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile profile button */}
            {isMobile && (
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 mr-3">
                  <Bell size={20} />
                </button>
                <div className="bg-green-800 rounded-full p-1">
                  <User size={20} className="text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMenu}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="pt-5 pb-4">
              <div className="px-4 flex items-center justify-between">
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold text-green-800">ComfortLine</span>
                </div>
                <button
                  onClick={toggleMenu}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800"
                >
                  <span className="sr-only">Close sidebar</span>
                  <span className="text-2xl font-medium text-gray-500">&times;</span>
                </button>
              </div>
              <div className="mt-5 px-2 space-y-1">
                <a href="#" className="bg-green-50 text-green-800 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Home size={20} className="mr-4 text-green-800" />
                  Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Calendar size={20} className="mr-4 text-gray-500" />
                  My Trips
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Map size={20} className="mr-4 text-gray-500" />
                  Routes & Schedules
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <CreditCard size={20} className="mr-4 text-gray-500" />
                  Payment Methods
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <HelpCircle size={20} className="mr-4 text-gray-500" />
                  Help & Support
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Settings size={20} className="mr-4 text-gray-500" />
                  Settings
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <LogOut size={20} className="mr-4 text-gray-500" />
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        {!isMobile && (
          <div className="w-64 bg-white border-r border-gray-200 pt-5 pb-4 flex flex-col">
            <div className="flex flex-col flex-grow overflow-y-auto">
              <div className="flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  <a href="#" className="bg-green-50 text-green-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md" onClick={() => setActiveTab('dashboard')}>
                    <Home size={20} className="mr-3 text-green-800" />
                    Dashboard
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md" onClick={() => setActiveTab('trips')}>
                    <Calendar size={20} className="mr-3 text-gray-500" />
                    My Trips
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md" onClick={() => setActiveTab('routes')}>
                    <Map size={20} className="mr-3 text-gray-500" />
                    Routes & Schedules
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md" onClick={() => setActiveTab('payment')}>
                    <CreditCard size={20} className="mr-3 text-gray-500" />
                    Payment Methods
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md" onClick={() => setActiveTab('help')}>
                    <HelpCircle size={20} className="mr-3 text-gray-500" />
                    Help & Support
                  </a>
                </nav>
              </div>
              <div className="mt-auto border-t border-gray-200 px-2 py-4 space-y-1">
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <Settings size={20} className="mr-3 text-gray-500" />
                  Settings
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <LogOut size={20} className="mr-3 text-gray-500" />
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center flex-wrap">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Welcome back, {userData.name}!</h1>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Member since {userData.memberSince} • {userData.loyaltyPoints} Loyalty Points Available
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800">
                    Book a New Trip
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              {/* Upcoming trips */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <Calendar size={24} className="text-green-800" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Trips</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{userData.upcomingTrips}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-green-800 hover:text-green-700">
                      View all trips <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Loyalty Points */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <CreditCard size={24} className="text-green-800" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Loyalty Points</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{userData.loyaltyPoints}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-green-800 hover:text-green-700">
                      Redeem points <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Past trips */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <Map size={24} className="text-green-800" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Completed Trips</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{userData.pastTrips}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-green-800 hover:text-green-700">
                      View trip history <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Trips */}
              <div className="lg:col-span-2">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Recent & Upcoming Trips</h2>
                    <a href="#" className="text-sm font-medium text-green-800 hover:text-green-700">
                      View all
                    </a>
                  </div>
                  <div className="border-t border-gray-200 divide-y divide-gray-200">
                    {recentTrips.map((trip) => (
                      <div key={trip.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {trip.from} to {trip.to}
                            </p>
                            <p className="text-sm text-gray-500">{trip.date}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                trip.status === 'Completed' 
                                  ? 'bg-gray-100 text-gray-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {trip.status}
                            </span>
                            <span className="text-sm font-medium text-gray-900 mt-1">{trip.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {recentTrips.length === 0 && (
                      <div className="px-4 py-8 sm:px-6 text-center">
                        <p className="text-sm text-gray-500">No recent trips found.</p>
                        <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-800 hover:bg-green-700">
                          Plan Your First Trip
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Special Offers */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Special Offers</h2>
                  </div>
                  <div className="border-t border-gray-200 divide-y divide-gray-200">
                    {specialOffers.map((offer) => (
                      <div key={offer.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-gray-900">{offer.title}</p>
                          <p className="text-sm text-gray-500">Valid until {offer.validUntil}</p>
                          <div className="mt-2 flex items-center bg-gray-100 rounded p-2">
                            <code className="text-sm text-gray-800 font-mono">{offer.code}</code>
                            <button className="ml-auto text-xs text-green-800 hover:text-green-700">
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {specialOffers.length === 0 && (
                      <div className="px-4 py-8 sm:px-6 text-center">
                        <p className="text-sm text-gray-500">No special offers available at this time.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h2>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-4 sm:px-6 space-y-3">
                    <a href="#" className="block text-sm font-medium text-green-800 hover:text-green-700">
                      Check trip status
                    </a>
                    <a href="#" className="block text-sm font-medium text-green-800 hover:text-green-700">
                      Download ticket
                    </a>
                    <a href="#" className="block text-sm font-medium text-green-800 hover:text-green-700">
                      Update personal information
                    </a>
                    <a href="#" className="block text-sm font-medium text-green-800 hover:text-green-700">
                      Contact customer support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;