// src/pages/Login.tsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../stores/auth.store';
import { useThemeStore } from '../stores/ThemeContext';
import { 
    FiMail, FiLock, FiArrowRight, FiLogIn, 
    FiEye, FiEyeOff, FiAlertCircle 
} from 'react-icons/fi';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardPreview from '../components/login/DashboardPreview';
import Features from '../components/login/Features';

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const user = useAuthStore(state => state.user);
    const token = useAuthStore(state => state.token);
    const login = useAuthStore(state => state.login);
    const authError = useAuthStore(state => state.error);
    const loading = useAuthStore(state => state.loading);

    console.log('User after login:', useAuthStore.getState().user);

    const { theme } = useThemeStore();
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
  
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    // Get return URL from query params
    const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/dashboard';

    useEffect(() => {
        if (user && token) {
            navigate(returnUrl, {replace: true});
        }
    }, [user, token, navigate, returnUrl]);

    const onSubmit = async (data: FormData) => {
        await login(data);
        console.log('Token after login:', useAuthStore.getState().token);
        console.log('User after login:', useAuthStore.getState().user);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
        }
    };

    return (
        <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Left Section: Sign In Form */}
        <motion.div 
            className="w-full md:w-1/2 p-8 flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
            className="max-w-md w-full mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            >
            {/* Logo */}
            <motion.div variants={itemVariants}>
                <div className="flex items-center mb-8">
                    <div className={`w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-100'} flex items-center justify-center mr-3`}>
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>AM Stock</span>
                </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants}>
                <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h2>
                <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Sign in to access your dashboard and manage your business.
                </p>
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div 
                className="grid grid-cols-2 gap-4 mb-6"
                variants={itemVariants}
            >
                <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
                >
                    <FaGoogle className="mr-2 text-red-500" />
                    Google
                </motion.button>
                <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
                >
                    <FaApple className={`mr-2  ${theme === 'dark' ? ' text-white hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`} />
                    Apple
                </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div 
                className="relative mb-6"
                variants={itemVariants}
            >
                <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                </div>
                <div className="relative flex justify-center">
                <span className={`px-2 text-sm ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>
                    Or continue with email
                </span>
                </div>
            </motion.div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <motion.div variants={itemVariants}>
                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className={`h-5 w-5 ${errors.email ? 'text-red-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full pl-10 pr-3 py-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : theme === 'dark' ? 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
                    placeholder="your@email.com"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                        },
                    })}
                    />
                </div>
                <AnimatePresence>
                    {errors.email && (
                    <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                    >
                        <FiAlertCircle className="mr-1" /> {errors.email.message}
                    </motion.p>
                    )}
                </AnimatePresence>
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className={`h-5 w-5 ${errors.password ? 'text-red-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`block w-full pl-10 pr-10 py-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : theme === 'dark' ? 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
                    placeholder="••••••••"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                        },
                    })}
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
                    >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>
                <AnimatePresence>
                    {errors.password && (
                    <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                    >
                        <FiAlertCircle className="mr-1" /> {errors.password.message}
                    </motion.p>
                    )}
                </AnimatePresence>
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div 
                className="flex items-center justify-between"
                variants={itemVariants}
                >
                <div className="flex items-center">
                    <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className={`h-4 w-4 rounded ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-indigo-500 focus:ring-indigo-500' : 'border-gray-300 text-indigo-600 focus:ring-indigo-500'}`}
                    />
                    <label htmlFor="remember-me" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Remember me
                    </label>
                </div>
                <div className="text-sm">
                    <Link
                    to="/forgot-password"
                    className={`font-medium ${theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}
                    >
                    Forgot password?
                    </Link>
                </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { y: -2 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'focus:ring-indigo-500' : 'focus:ring-indigo-500'} transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                    <>
                        <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                        </svg>
                        Signing in...
                    </>
                    ) : (
                    <>
                        <motion.span
                        initial={{ x: 0 }}
                        animate={isHovered ? { x: -5 } : { x: 0 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                        className="flex items-center"
                        >
                        <FiLogIn className="mr-2" />
                        Sign In
                        </motion.span>
                        <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                        className="absolute right-6"
                        >
                        <FiArrowRight />
                        </motion.span>
                    </>
                    )}
                </motion.button>
                </motion.div>

                {/* Auth Error */}
                <AnimatePresence>
                {authError && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 rounded-md ${theme === 'dark' ? 'bg-red-900/30 border border-red-800 text-red-200' : 'bg-red-50 border border-red-200 text-red-600'}`}
                    >
                    <div className="flex items-center">
                        <FiAlertCircle className="mr-2 flex-shrink-0" />
                        <span className="text-sm">{authError}</span>
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </form>

            {/* Sign Up Link */}
            <motion.div 
                className={`mt-6 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                variants={itemVariants}
            >
                Don't have an account?{' '}
                <Link
                to="/register"
                className={`font-medium inline-flex items-center ${theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}
                >
                Sign up <FiArrowRight className="ml-1" />
                </Link>
            </motion.div>
            </motion.div>
        </motion.div>

        {/* Right Section: Dashboard Preview */}
        <motion.div 
            className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 flex-col justify-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            {/* Animated background elements */}
            <motion.div 
            className="absolute top-0 left-0 w-full h-full opacity-10"
            animate={{
                background: [
                'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 20%)',
                'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 20%)',
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 20%)',
                ]
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
            }}
            />
            
            {/* Dashboard preview image */}
            <DashboardPreview />
            

            {/* Feature highlights */}
            <Features />
        </motion.div>
        </div>
    );
}