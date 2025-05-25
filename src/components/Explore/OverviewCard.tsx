import React from 'react'
import { motion } from "framer-motion";

interface OverviewCardProps{
    title: string;
    value: string | number;
    change?: number;
    volume?: number;
    icon: React.ReactNode;
    gradient: string;
}

const OverviewCard = ({title,value,change,volume,icon,gradient,} : OverviewCardProps) => {
  return (
    <motion.div 
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-r ${gradient} rounded-xl p-6 text-white shadow-lg`}
        >
            <div className="flex justify-between items-start">
            <div>
                <p className="text-sm opacity-90">{title}</p>
                <h3 className="text-2xl font-bold mt-1">
                {typeof value === 'number' ? value.toLocaleString() : value}
                </h3>
                {change !== undefined && (
                <p className={`text-sm mt-1 ${
                    change >= 0 ? 'text-green-200' : 'text-red-200'
                }`}>
                    {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                </p>
                )}
                {volume !== undefined && (
                <p className="text-xs opacity-80 mt-1">
                    Vol: {volume.toLocaleString()}
                </p>
                )}
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
                {icon}
            </div>
            </div>
        </motion.div>
  )
}

export default OverviewCard