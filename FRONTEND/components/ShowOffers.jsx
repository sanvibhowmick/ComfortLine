import { useState } from 'react';
import { Calendar, ChevronRight, MapPin, Clock, User, Search, Tag, Percent, ArrowLeft } from 'lucide-react';

export default function ComfortlineOffers() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [email, setEmail] = useState("");
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };
  
  const offers = [
    {
      id: 1,
      title: "Early Bird Special",
      description: "Book your trip 30 days in advance and save 20% on any route",
      discount: "20%",
      validUntil: "June 30, 2025",
      code: "EARLYBIRD20",
      imageBg: "bg-green-900",
      popular: true
    },
    {
      id: 2,
      title: "Weekend Getaway",
      description: "All weekend trips at a special price. Perfect for short breaks!",
      discount: "$15 OFF",
      validUntil: "August 15, 2025",
      code: "WEEKEND15",
      imageBg: "bg-green-800"
    },
    {
      id: 3,
      title: "Group Travel Discount",
      description: "Groups of 4 or more get 25% off the total fare",
      discount: "25%",
      validUntil: "December 31, 2025",
      code: "GROUP25",
      imageBg: "bg-green-900",
      popular: true
    },
    {
      id: 4,
      title: "Student Discount",
      description: "Show your valid student ID and get special student rates",
      discount: "15%",
      validUntil: "Ongoing",
      code: "STUDENT15",
      imageBg: "bg-green-800"
    },
    {
      id: 5,
      title: "Loyalty Program",
      description: "Earn points on every trip and redeem them for free travel",
      discount: "Points System",
      validUntil: "Ongoing",
      code: "Join online",
      imageBg: "bg-green-900"
    }
  ];

  return (
    <div className="font-sans min-h-screen bg-green-950">
      {/* Back to Dashboard Link */}
      <div className="bg-green-950 text-white p-4 border-b border-green-800">
        <div className="container mx-auto px-4">
          <a href="#" className="flex items-center text-green-400 hover:text-green-300 transition duration-300">
            <ArrowLeft className="mr-2" size={18} />
            <span>Back to Dashboard</span>
          </a>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8" id="main-offers">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-green-400 text-center mb-8">Current Promotions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map(offer => (
              <div key={offer.id} className="bg-green-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border border-green-700">
                <div className={`${offer.imageBg} p-6 relative`}>
                  <div className="flex justify-between">
                    <Tag className="w-12 h-12 text-green-400"/>
                    <div className="bg-green-950 text-green-400 font-bold px-4 py-1 rounded-full text-lg">
                      {offer.discount}
                    </div>
                  </div>
                  {offer.popular && (
                    <div className="absolute top-0 left-0 bg-yellow-500 text-green-950 px-4 py-1 rounded-br-lg text-sm font-medium">
                      Popular
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-green-300">{offer.title}</h3>
                  <p className="text-green-100 mb-4">{offer.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-green-300">
                      <Calendar className="inline-block w-4 h-4 mr-1" />
                      Valid until: {offer.validUntil}
                    </div>
                  </div>
                  
                  <div className="bg-green-800 p-3 rounded-lg mb-4 flex items-center justify-between">
                    <span className="font-medium text-green-200">Code: {offer.code}</span>
                    <button className="text-green-400 hover:text-green-300">
                      Copy
                    </button>
                  </div>
                  
                  <button 
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition duration-300 font-medium"
                    onClick={() => setSelectedOffer(offer)}
                  >
                    Book with this offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* How it works */}
        <div className="my-12 bg-green-900 p-8 rounded-xl border border-green-700">
          <h2 className="text-2xl font-semibold text-green-300 text-center mb-8">How to Redeem Your Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-green-800 p-6 rounded-lg shadow border-l-4 border-green-400">
              <div className="inline-flex items-center justify-center bg-green-700 text-green-300 w-12 h-12 rounded-full mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2 text-green-300">1. Select Your Trip</h3>
              <p className="text-green-100">Choose your destination and travel dates on our booking page</p>
            </div>
            
            <div className="bg-green-800 p-6 rounded-lg shadow border-l-4 border-green-400">
              <div className="inline-flex items-center justify-center bg-green-700 text-green-300 w-12 h-12 rounded-full mb-4">
                <Percent size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2 text-green-300">2. Enter Promo Code</h3>
              <p className="text-green-100">Apply the promo code during the checkout process</p>
            </div>
            
            <div className="bg-green-800 p-6 rounded-lg shadow border-l-4 border-green-400">
              <div className="inline-flex items-center justify-center bg-green-700 text-green-300 w-12 h-12 rounded-full mb-4">
                <ChevronRight size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2 text-green-300">3. Enjoy Your Savings</h3>
              <p className="text-green-100">Complete your booking and enjoy your discounted travel experience</p>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div id="newsletter" className="bg-green-800 text-white p-8 rounded-xl border border-green-700">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-300">Get Exclusive Offers</h2>
            <p className="mb-6 text-green-100">Subscribe to our newsletter and be the first to receive exclusive deals and promotions</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg text-green-950 bg-green-100 placeholder-green-700"
                value={email}
                onChange={handleEmailChange}
              />
              <button 
                onClick={handleSubscribe}
                className="bg-yellow-500 hover:bg-yellow-400 text-green-950 font-medium px-6 py-3 rounded-lg transition duration-300"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 text-green-300">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="my-12">
          <h2 className="text-2xl font-semibold text-green-300 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-800 p-6 rounded-lg shadow border-t-2 border-green-400">
              <h3 className="text-lg font-medium mb-2 text-green-300">Can I combine multiple offers?</h3>
              <p className="text-green-100">No, promotional offers cannot be combined with other discounts or special rates.</p>
            </div>
            
            <div className="bg-green-800 p-6 rounded-lg shadow border-t-2 border-green-400">
              <h3 className="text-lg font-medium mb-2 text-green-300">Do offers apply to all routes?</h3>
              <p className="text-green-100">Most offers are valid on all routes, but some may have exceptions. Please check the specific terms of each offer.</p>
            </div>
            
            <div className="bg-green-800 p-6 rounded-lg shadow border-t-2 border-green-400">
              <h3 className="text-lg font-medium mb-2 text-green-300">How do I apply a promo code?</h3>
              <p className="text-green-100">During the checkout process, you'll find a field where you can enter your promotional code.</p>
            </div>
            
            <div className="bg-green-800 p-6 rounded-lg shadow border-t-2 border-green-400">
              <h3 className="text-lg font-medium mb-2 text-green-300">Are offers refundable?</h3>
              <p className="text-green-100">Trips booked with promotional offers follow our standard cancellation policy, though some special deals may have different terms.</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <div className="bg-green-950 text-green-400 p-6 text-center border-t border-green-800">
        <p>&copy; {new Date().getFullYear()} ComfortLine Bus Services</p>
      </div>
    </div>
  );
}