import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const Features = () => {
    return (
        <div>
            <motion.div 
                className="absolute bottom-8 left-8 right-8 z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-white mb-4">Powerful Business Dashboard</h2>
            
                <div className="space-y-3">
                    {[
                        "Real-time analytics and reporting",
                        "Comprehensive business metrics",
                        "Intuitive data visualization",
                        "Customizable dashboard views"
                    ].map((feature, index) => (
                    <motion.div 
                        key={feature}
                        className="flex items-center"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 + (index * 0.1), duration: 0.3 }}
                    >
                        <div className="flex-shrink-0 bg-indigo-500 rounded-full p-1 mr-3">
                            <FiCheck className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white/90">{feature}</span>
                    </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Features