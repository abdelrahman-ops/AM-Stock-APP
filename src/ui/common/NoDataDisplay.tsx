import React from 'react'
import { FiBarChart2 } from 'react-icons/fi'

const NoDataDisplay = () => {
  return (

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-2xl mx-auto mt-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <FiBarChart2 className="text-yellow-600 text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-yellow-800 mt-4">No Market Data</h3>
                        <p className="text-yellow-600 mt-2">
                            Currently there are no stocks available. Please check back later.
                        </p>
                    </div>
                </div>
  )
}

export default NoDataDisplay