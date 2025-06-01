import { motion } from 'framer-motion';
import { FiArrowUpRight, FiTrendingUp, FiShield, FiPieChart, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import { FaRegLightbulb, FaRegHandshake } from 'react-icons/fa';
import { RiStockLine } from 'react-icons/ri';
import { useThemeStore } from '../stores/ThemeContext';
// import { useStocksStore } from '../stores/stock.store';

const HomePage = () => {
    const { theme } = useThemeStore();
    // const { stocks } = useStocksStore();
    const isDark = theme === 'dark';
    
    const stockData = [
        {
            symbol: 'COMI.CA',
            name: 'Commercial International Bank',
            price: 78.25,
            change: 1.25,
            percentChange: 1.63,
        },
        {
            symbol: 'EFIC.CA',
            name: 'EFG Hermes Holding',
            price: 18.9,
            change: -0.35,
            percentChange: -1.82,
        },
        {
            symbol: 'ORAS.CA',
            name: 'Orascom Construction',
            price: 45.6,
            change: 0.8,
            percentChange: 1.79,
        }
    ];

    const features = [
        {
            icon: <FiTrendingUp className="text-2xl" />,
            title: "Real-time Data",
            description: "Get live EGX stock prices with minimal delay"
        },
        {
            icon: <FiShield className="text-2xl" />,
            title: "Secure Trading",
            description: "Bank-level security for all your transactions"
        },
        {
            icon: <FiPieChart className="text-2xl" />,
            title: "Portfolio Tracking",
            description: "Monitor all your investments in one place"
        },
        {
            icon: <FiDollarSign className="text-2xl" />,
            title: "Low Fees",
            description: "Competitive rates for Egyptian investors"
        }
    ];

    // Background and text colors based on theme
    const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-50';
    const textClass = isDark ? 'text-gray-100' : 'text-[#471069]';
    const secondaryTextClass = isDark ? 'text-gray-300' : 'text-gray-600';
    const cardBgClass = isDark ? 'bg-gray-800' : 'bg-white';
    const sectionBgClass = isDark ? 'bg-gray-800' : 'bg-gray-100';

    return (
        <div className={`min-h-screen ${bgClass}`}>
            {/* Hero Section */}
            <div className={`relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className={`text-4xl md:text-6xl font-bold ${textClass} mb-6`}>
                                Invest in the <span className="bg-gradient-to-r from-[#30c5d2] to-[#471069] bg-clip-text text-transparent">AM</span>
                                Stock Way
                            </h1>
                            <p className={`mt-6 text-xl md:text-2xl ${secondaryTextClass} max-w-3xl mx-auto`}>
                                Your gateway to the Egyptian Stock Market. Simple, secure, and designed for everyone.
                            </p>
                            <div className="mt-10 flex justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                                >
                                    Get Started
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-8 py-3 ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'} font-medium rounded-lg shadow-md transition-colors`}
                                >
                                    Learn More
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-full ${isDark ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50' : 'bg-gradient-to-r from-blue-50/50 to-gray-50/50'}`}></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full">
                        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-l from-gray-800/50 to-transparent' : 'bg-gradient-to-l from-blue-50/50 to-transparent'}`}></div>
                    </div>
                </div>
            </div>

            {/* Market Overview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold ${textClass}`}>EGX Market Overview</h2>
                    <p className={`mt-4 text-lg ${secondaryTextClass} max-w-2xl mx-auto`}>
                        Stay updated with key stocks from the Egyptian Exchange
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stockData.map((stock, index) => (
                        <motion.div
                            key={stock.symbol}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`${cardBgClass} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow`}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className={`text-lg font-semibold ${textClass}`}>{stock.symbol}</h3>
                                        <p className={`text-sm ${secondaryTextClass}`}>{stock.name}</p>
                                    </div>
                                    <RiStockLine className="text-2xl text-blue-600" />
                                </div>
                                <div className="mt-6">
                                    <p className={`text-2xl font-bold ${textClass}`}>EGP {stock.price.toFixed(2)}</p>
                                    <div className={`mt-2 flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {stock.change >= 0 ? (
                                            <FiArrowUpRight className="mr-1" />
                                        ) : (
                                            <FiArrowUpRight className="mr-1 transform rotate-180" />
                                        )}
                                        <span>{stock.change.toFixed(2)} ({stock.percentChange.toFixed(2)}%)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className={`${sectionBgClass} py-16`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold ${textClass}`}>Why Choose AMStock?</h2>
                        <p className={`mt-4 text-lg ${secondaryTextClass} max-w-2xl mx-auto`}>
                            We're revolutionizing how Egyptians invest in the stock market
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03 }}
                                className={`${cardBgClass} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
                            >
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className={`text-lg font-semibold ${textClass} mb-2`}>{feature.title}</h3>
                                <p className={secondaryTextClass}>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Us */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={`text-3xl font-bold ${textClass} mb-6`}>
                            About <span className="bg-gradient-to-r from-[#30c5d2] to-[#471069] bg-clip-text text-transparent">AM</span>Stock
                        </h2>
                        <p className={`text-lg ${secondaryTextClass} mb-6`}>
                            AMStock was born from a vision to democratize access to the Egyptian stock market. 
                            We believe every Egyptian should have the tools and knowledge to grow their wealth 
                            through smart investments.
                        </p>
                        <p className={`text-lg ${secondaryTextClass} mb-6`}>
                            Our platform combines cutting-edge technology with deep market expertise to provide 
                            a seamless investing experience tailored for Egyptian investors.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                                <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white"></div>
                                <div className="w-10 h-10 rounded-full bg-red-200 border-2 border-white"></div>
                                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white"></div>
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${textClass}`}>Abdelrahman & Mohamed</p>
                                <p className={`text-xs ${secondaryTextClass}`}>Co-founders</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className={`${isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-gray-100'} rounded-2xl p-8 shadow-inner`}
                    >
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg text-blue-600">
                                    <FaRegLightbulb className="text-xl" />
                                </div>
                                <div className="ml-4">
                                    <h3 className={`text-lg font-medium ${textClass}`}>Our Vision</h3>
                                    <p className={`mt-1 ${secondaryTextClass}`}>
                                        To empower every Egyptian with the tools for financial growth through accessible stock market investing.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg text-red-600">
                                    <FiBarChart2 className="text-xl" />
                                </div>
                                <div className="ml-4">
                                    <h3 className={`text-lg font-medium ${textClass}`}>Our Mission</h3>
                                    <p className={`mt-1 ${secondaryTextClass}`}>
                                        Simplify the complex world of stock trading while maintaining the highest standards of security and transparency.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-gray-100 p-3 rounded-lg text-gray-600">
                                    <FaRegHandshake className="text-xl" />
                                </div>
                                <div className="ml-4">
                                    <h3 className={`text-lg font-medium ${textClass}`}>Our Mentor</h3>
                                    <p className={`mt-1 ${secondaryTextClass}`}>
                                        Guided by Eng. Islam Thabet, whose expertise in technology has been instrumental in shaping AMStock.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Investment Journey?</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Join thousands of Egyptians who are taking control of their financial future with AMStock.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-xl hover:bg-gray-100 transition-colors"
                        >
                            Create Free Account
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;