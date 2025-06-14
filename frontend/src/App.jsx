import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaServer, FaDownload, FaUserPlus, FaNewspaper, FaDiscord } from "react-icons/fa";

export default function App() {
  const [status, setStatus] = useState("Checking...");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  const checkServerStatus = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/server-status", {
        method: "GET",
        headers: { "Accept": "application/json" },
        // Set a timeout to avoid long waits if server is down
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (!response.ok) {
        throw new Error("Server returned error status");
      }
      
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error("Server status check failed:", error);
      setStatus("Offline");
    }
  };
  
  // Check immediately on component mount
  checkServerStatus();
  
  // Set up periodic checking every 30 seconds
  const intervalId = setInterval(checkServerStatus, 30000);
  
  // Clean up interval on component unmount
  return () => clearInterval(intervalId);
}, []);

  const handleRegister = async () => {
    if (!username || !password) {
      setRegisterMessage("Please fill in both username and password.");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setRegisterMessage(data.message);
    } catch (error) {
      setRegisterMessage("Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200 font-sans">
    {/* Hero Section with Parallax Effect */}
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <img
          src="/images/hero-background.jpg"
          alt="Ultima Online landscape"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80";
          }}
        />
      </div>

        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-7xl font-black tracking-wide text-yellow-400 drop-shadow-[0_0_15px_rgba(255,223,71,0.9)] mb-4 font-[Cinzel]">
              Ultima Online
            </h1>
            <h2 className="text-5xl md:text-6xl font-black tracking-wide text-yellow-400 drop-shadow-[0_0_15px_rgba(255,223,71,0.9)] mb-6 font-[Cinzel]">
              Shattered Realms
            </h2>
            <p className="text-gray-200 italic tracking-wide text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A premium UO experience crafted by fans, for fans.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
              <motion.a 
                href="#download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaDownload /> Get Started
              </motion.a>
              <motion.a 
                href="#register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-gray-800 text-yellow-400 border-2 border-yellow-400 font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaUserPlus /> Create Account
              </motion.a>
            </div>
            
            <div className="mt-16">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-lg text-lg tracking-wide ${
                  status === "Online"
                    ? "bg-green-700 text-green-100 shadow-green-600/70"
                    : "bg-red-800 text-red-300 shadow-red-700/70"
                }`}
              >
                <FaServer className="animate-pulse" /> Server Status: {status}
              </span>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <a href="#about" className="text-yellow-400 hover:text-yellow-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        {/* About Section */}
        <motion.section 
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">About Our Realm</h2>
            <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-gray-700 hover:border-yellow-500 transition-all duration-500">
              <p className="mb-6 leading-relaxed text-lg">
                Experience <span className="font-bold text-yellow-300">Ultima Online</span> like never before.
                Our custom server delivers the classic gameplay you love with modern enhancements
                and a dedicated community.
              </p>
              <p className="mb-8 leading-relaxed text-lg">
                We focus on balance, fairness, and regular content updates to ensure
                a premium gaming experience for both veterans and newcomers alike.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✦</span>
                  <span><span className="font-semibold text-yellow-300">3x skill gain</span> and <span className="font-semibold text-yellow-300">2x loot</span> rates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✦</span>
                  <span>Weekly events and community gatherings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✦</span>
                  <span>Custom dungeons and unique boss encounters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✦</span>
                  <span>Player-driven economy with balanced crafting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✦</span>
                  <span>Active staff and zero tolerance for cheating</span>
                </li>
              </ul>
            </div>
            
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/gameplay.jpg" 
                alt="Ultima Online gameplay" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xl font-bold text-yellow-300">Join over 1,000 active players</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Downloads Section */}
        <motion.section 
          id="download"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Getting Started</h2>
            <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-gray-700 hover:border-yellow-500 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-300">Download & Install</h3>
                <ol className="space-y-6 text-lg">
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</span>
                    <div>
                      <p className="mb-2">Download our custom client package:</p>
                      <motion.a 
                        href="#" 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
                      >
                        <FaDownload /> Download Client (1.2 GB)
                      </motion.a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</span>
                    <div>
                      <p>Extract the files to your preferred location</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</span>
                    <div>
                      <p>Run the installer and follow the on-screen instructions</p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-300">System Requirements</h3>
                <div className="space-y-4 text-lg">
                  <div>
                    <p className="font-semibold text-yellow-200">Minimum:</p>
                    <ul className="list-disc list-inside pl-4 text-gray-300">
                      <li>Windows 7/8/10/11</li>
                      <li>2GB RAM</li>
                      <li>DirectX 9.0c compatible graphics</li>
                      <li>2GB free disk space</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-200">Recommended:</p>
                    <ul className="list-disc list-inside pl-4 text-gray-300">
                      <li>Windows 10/11</li>
                      <li>4GB RAM</li>
                      <li>DirectX 11 compatible graphics</li>
                      <li>4GB free disk space</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold mb-4 text-yellow-300">Need Help?</h4>
              <p className="text-gray-300">
                Visit our <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">installation guide</a> or 
                join our <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">Discord community</a> for assistance.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Register Section */}
        <motion.section 
          id="register"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Create Your Account</h2>
            <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-gray-700 hover:border-yellow-500 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">Join Our Community</h3>
              <p className="mb-6 leading-relaxed text-lg">
                Creating an account is quick and free. Your journey in the Shattered Realms begins here.
              </p>
              <p className="mb-6 leading-relaxed text-lg">
                By registering, you'll gain access to:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✦</span>
                  <span>Character creation and progression</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✦</span>
                  <span>Community forums and events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✦</span>
                  <span>Guild membership opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✦</span>
                  <span>Regular content updates and expansions</span>
                </li>
              </ul>
              <div className="p-4 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg">
                <p className="text-yellow-200 text-sm">
                  <strong>Note:</strong> We will never share your information with third parties. 
                  Please use a unique password that you don't use elsewhere.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-10 shadow-xl border border-gray-700 hover:border-yellow-500 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 text-yellow-300 text-center">Register Now</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="username" className="block text-yellow-200 mb-2 font-medium">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Choose a unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-3 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 shadow-sm"
                    required
                    spellCheck="false"
                    autoComplete="username"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-yellow-200 mb-2 font-medium">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-3 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 shadow-sm"
                    required
                    autoComplete="new-password"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Minimum 8 characters recommended
                  </p>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold py-4 rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition duration-300 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <FaUserPlus /> Create Account
                    </>
                  )}
                </motion.button>
              </form>
              
              {registerMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-lg ${registerMessage.includes('success') ? 'bg-green-900 bg-opacity-50 border border-green-700 text-green-200' : 'bg-red-900 bg-opacity-50 border border-red-700 text-red-200'}`}
                >
                  <p className="text-center font-medium">
                    {registerMessage}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* News Section */}
        <motion.section 
          id="news"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Latest News</h2>
            <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-yellow-500 transition-all duration-500 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="/images/news1.jpg" 
                  alt="New dungeon" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80";
                  }}
                />
                <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 px-3 py-1 font-bold text-sm">
                  NEW
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="font-bold text-yellow-300 text-xl mb-3">Patch 1.1 Released</h3>
                <p className="text-gray-300 mb-4">
                  Our latest update brings new dungeons, bug fixes, and crafting improvements. 
                  Explore the Caverns of Despair and face the new boss: The Forgotten King.
                </p>
              </div>
              <div className="p-6 pt-0">
                <a href="#" className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1">
                  Read full patch notes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-yellow-500 transition-all duration-500 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/news2.jpg" 
                  alt="Community event" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80";
                  }}
                />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="font-bold text-yellow-300 text-xl mb-3">Weekend Event: Dragon Hunt</h3>
                <p className="text-gray-300 mb-4">
                  Join us this weekend for a server-wide dragon hunt! Increased spawn rates and special rewards for all participants.
                </p>
              </div>
              <div className="p-6 pt-0">
                <a href="#" className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1">
                  Event details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-yellow-500 transition-all duration-500 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/news3.jpg" 
                  alt="Guild wars" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80";
                  }}
                />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="font-bold text-yellow-300 text-xl mb-3">Guild Wars Season 2</h3>
                <p className="text-gray-300 mb-4">
                  The second season of Guild Wars begins next month. Prepare your guild for battle and compete for the ultimate prize.
                </p>
              </div>
              <div className="p-6 pt-0">
                <a href="#" className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1">
                  Registration info
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-800 text-yellow-400 border-2 border-yellow-400 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
            >
              <FaNewspaper /> View All News
            </motion.a>
          </div>
        </motion.section>

        {/* Community Section */}
        <motion.section 
          id="community"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Join Our Community</h2>
            <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-gray-700 hover:border-yellow-500 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-300">Connect With Us</h3>
                <p className="mb-8 leading-relaxed text-lg">
                  Shattered Realms is more than just a game - it's a thriving community of passionate players.
                  Join us on Discord, follow our social media, and become part of our growing family.
                </p>
                <div className="space-y-6">
                  <motion.a 
                    href="#"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-4 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 w-full"
                  >
                    <FaDiscord className="text-2xl" /> Join Our Discord
                  </motion.a>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.a 
                      href="#"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </motion.a>
                    
                    <motion.a 
                      href="#"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a94da] text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </motion.a>
                    
                    <motion.a 
                      href="#"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#e50000] text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
                    </motion.a>
                    
                    <motion.a 
                      href="#"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 bg-[#6441A4] hover:bg-[#5a3a94] text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                      </svg>
                      Twitch
                    </motion.a>
                  </div>
                </div>
              </div>
              
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/community.jpg" 
                  alt="Community gathering" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xl font-bold text-yellow-300">Weekly community events</p>
                  <p className="text-gray-300">Join us every Saturday at 8PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          id="faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Frequently Asked Questions</h2>
            <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-gray-700 hover:border-yellow-500 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">Is the server free to play?</h3>
                  <p className="text-gray-300">
                    Yes, Shattered Realms is completely free to play. We operate solely on donations and have no pay-to-win mechanics.
                  </p>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">How often do you update the server?</h3>
                  <p className="text-gray-300">
                    We release major updates monthly and smaller patches weekly. Our development team is constantly working on new content.
                  </p>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">Can I transfer characters from other servers?</h3>
                  <p className="text-gray-300">
                    Currently, we don't support character transfers. Everyone starts fresh to maintain game balance.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">What makes your server unique?</h3>
                  <p className="text-gray-300">
                    Our custom content, balanced gameplay, and active community management set us apart. We've created unique dungeons and quests you won't find elsewhere.
                  </p>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">How can I report bugs or issues?</h3>
                  <p className="text-gray-300">
                    You can report bugs through our Discord server or in-game using the /report command. Our team addresses issues promptly.
                  </p>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">Can I join the staff team?</h3>
                  <p className="text-gray-300">
                    We occasionally open applications for staff positions. Active community members with a positive history are given priority.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-300 mb-4">
                Have more questions? Reach out to us on Discord or check our comprehensive guide.
              </p>
              <motion.a 
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-800 text-yellow-400 border-2 border-yellow-400 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
              >
                View Full FAQ
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Ultima Online: Shattered Realms</h3>
              <p className="text-gray-400 mb-4">
                A premium UO experience crafted by fans, for fans.
              </p>
              <p className="text-gray-500 text-sm">
                Ultima Online is a registered trademark of Electronic Arts Inc. This is a fan project not affiliated with EA.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-yellow-300">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">About</a></li>
                <li><a href="#download" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Download</a></li>
                <li><a href="#register" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Register</a></li>
                <li><a href="#news" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">News</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Forums</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-yellow-300">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Beginner's Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Skill Calculator</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">World Map</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Item Database</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Item Database</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Monster Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-yellow-300">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Code of Conduct</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">DMCA</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; 2025 Ultima Online: Shattered Realms — Crafted with passion by the community.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <motion.a 
        href="#"
        className="fixed bottom-8 right-8 bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </motion.a>
    </div>
  );
}
