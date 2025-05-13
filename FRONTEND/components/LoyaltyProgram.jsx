import React, { useState, useEffect } from "react";
import "./LoyaltyProgram.css";

const LoyaltyProgram = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [activeTab, setActiveTab] = useState('rewards');

  
  useEffect(() => {
    // Simulate fetching loyalty data
    setTimeout(() => {
      const mockUserData = {
        points: 3500,
        tier: "Gold",
        nextTier: "Platinum",
        pointsToNextTier: 1500,
        joinDate: "2023-05-15",
        pointsHistory: [
          { id: 1, activity: "Paris Trip", points: 750, date: "March 15, 2024" },
          { id: 2, activity: "Tokyo Trip", points: 1200, date: "December 18, 2024" },
          { id: 3, activity: "Referral Bonus", points: 500, date: "February 2, 2025" },
          { id: 4, activity: "App Engagement", points: 50, date: "April 20, 2025" },
          { id: 5, activity: "Booking Anniversary", points: 1000, date: "May 1, 2025" }
        ]
      };
      
      const mockRewards = [
        {
          id: "reward-1",
          name: "Free Hotel Night",
          pointsCost: 5000,
          description: "Redeem for a complimentary night at any of our partner hotels worldwide.",
          category: "hotel",
          image: "H"
        },
        {
          id: "reward-2",
          name: "Airport Lounge Access",
          pointsCost: 2000,
          description: "One-time access to premium airport lounges at major international airports.",
          category: "airport",
          image: "L"
        },
        {
          id: "reward-3",
          name: "Luggage Upgrade",
          pointsCost: 3500,
          description: "Premium travel luggage from top brands.",
          category: "merchandise",
          image: "S"
        },
        {
          id: "reward-4",
          name: "Flight Upgrade",
          pointsCost: 4500,
          description: "Upgrade your seat on your next flight booking.",
          category: "flight",
          image: "F"
        },
        {
          id: "reward-5",
          name: "$50 Travel Credit",
          pointsCost: 2500,
          description: "Credit applied to your next booking.",
          category: "credit",
          image: "$"
        }
      ];
      
      setUserData(mockUserData);
      setRewards(mockRewards);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleBackToDashboard = () => {
    onNavigate && onNavigate("/dashboard");
  };

  const calculateProgressPercentage = () => {
    if (!userData) return 0;
    const totalPointsNeeded = 5000; // Gold to Platinum
    const currentProgress = totalPointsNeeded - userData.pointsToNextTier;
    return (currentProgress / totalPointsNeeded) * 100;
  };

  const handleRedeemReward = (rewardId) => {
    console.log(`Redeeming reward: ${rewardId}`);
    // In a real app, this would open a confirmation modal or navigate to a redemption page
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your loyalty program details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 md:p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBackToDashboard}
          className="mr-4 text-blue-600 hover:underline flex items-center"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Loyalty Program</h1>
      </div>

      {/* Loyalty Status Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-bold">🏆</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userData.tier} Member</h2>
                <p className="text-blue-100">Member since {new Date(userData.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Your Points: <span className="font-bold">{userData.points.toLocaleString()}</span></span>
                <span>{userData.pointsToNextTier.toLocaleString()} points to {userData.nextTier}</span>
              </div>
              <div className="w-full bg-blue-900 rounded-full h-3">
                <div 
                  className="bg-yellow-400 h-3 rounded-full" 
                  style={{ width: `${calculateProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:text-right">
            <button 
              onClick={() => onNavigate && onNavigate("/book")}
              className="px-6 py-2 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition-colors"
            >
              Earn More Points
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'rewards' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('rewards')}
          >
            Available Rewards
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'history' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Points History
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'tiers' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('tiers')}
          >
            Membership Tiers
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'rewards' && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Rewards Available</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map(reward => (
                  <div key={reward.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium mr-3">
                        {reward.image}
                      </div>
                      <h4 className="font-semibold">{reward.name}</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-800">{reward.pointsCost.toLocaleString()} points</span>
                      <button
                        onClick={() => handleRedeemReward(reward.id)}
                        disabled={userData.points < reward.pointsCost}
                        className={`px-4 py-2 rounded-md text-sm ${
                          userData.points >= reward.pointsCost
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {userData.points >= reward.pointsCost ? 'Redeem' : 'Not Enough Points'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Points History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-gray-50 text-left text-gray-700 font-medium">Activity</th>
                      <th className="py-3 px-4 bg-gray-50 text-left text-gray-700 font-medium">Date</th>
                      <th className="py-3 px-4 bg-gray-50 text-right text-gray-700 font-medium">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userData.pointsHistory.map(item => (
                      <tr key={item.id}>
                        <td className="py-3 px-4 text-gray-800">{item.activity}</td>
                        <td className="py-3 px-4 text-gray-600">{item.date}</td>
                        <td className="py-3 px-4 text-right font-medium text-green-600">+{item.points}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="py-3 px-4 font-medium">Total</td>
                      <td></td>
                      <td className="py-3 px-4 text-right font-bold">{userData.points.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tiers' && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Membership Tiers</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-300 pl-4 py-2">
                  <h4 className="text-lg font-medium text-gray-800 mb-1">Bronze</h4>
                  <p className="text-gray-600 mb-2">0 - 1,999 points</p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Basic booking discounts</li>
                    <li>Email updates on special offers</li>
                    <li>Points for every booking</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-600 pl-4 py-2">
                  <h4 className="text-lg font-medium text-gray-800 mb-1">Gold <span className="ml-2 py-1 px-2 bg-yellow-100 text-yellow-800 rounded text-xs">Your current tier</span></h4>
                  <p className="text-gray-600 mb-2">2,000 - 4,999 points</p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Priority customer service</li>
                    <li>Free checked bag on flights</li>
                    <li>Room upgrades when available</li>
                    <li>10% bonus points on all bookings</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-400 pl-4 py-2">
                  <h4 className="text-lg font-medium text-gray-800 mb-1">Platinum <span className="ml-2 py-1 px-2 bg-blue-100 text-blue-800 rounded text-xs">Next tier</span></h4>
                  <p className="text-gray-600 mb-2">5,000 - 9,999 points</p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Dedicated concierge service</li>
                    <li>Free flight upgrades when available</li>
                    <li>Late checkout guaranteed</li>
                    <li>25% bonus points on all bookings</li>
                    <li>Annual free hotel night</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <h4 className="text-lg font-medium text-gray-800 mb-1">Diamond</h4>
                  <p className="text-gray-600 mb-2">10,000+ points</p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>VIP airport services</li>
                    <li>Guaranteed room availability</li>
                    <li>50% bonus points on all bookings</li>
                    <li>Annual companion ticket</li>
                    <li>Premium lounge access worldwide</li>
                    <li>Special event invitations</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Frequently Asked Questions</h3>
        <div className="space-y-3">
          <details className="bg-white p-3 rounded-md">
            <summary className="font-medium cursor-pointer">How do I earn points?</summary>
            <div className="mt-2 text-gray-600">
              You earn points for every booking you make through our platform. The amount of points depends on the type and value of your booking. You can also earn bonus points through promotions, referrals, and engagement with our app.
            </div>
          </details>
          <details className="bg-white p-3 rounded-md">
            <summary className="font-medium cursor-pointer">When do my points expire?</summary>
            <div className="mt-2 text-gray-600">
              Points expire 24 months after they were earned if there is no account activity. Any booking or redemption extends all your points for another 24 months.
            </div>
          </details>
          <details className="bg-white p-3 rounded-md">
            <summary className="font-medium cursor-pointer">How do I redeem my rewards?</summary>
            <div className="mt-2 text-gray-600">
              Simply browse the available rewards in your account, select the one you want to redeem, and follow the prompts to complete the redemption process. Rewards will be applied automatically to your next eligible booking.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;