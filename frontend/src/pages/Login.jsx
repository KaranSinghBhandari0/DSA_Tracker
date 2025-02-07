import React, { useContext, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AppContext } from '../context/AppContext';

const Login = () => {
    const { login, loading } = useContext(AppContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center mx-auto w-[90%] max-w-sm">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                            {showPassword ? (
                                <Eye
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                    size={20}
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <EyeOff
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                    size={20}
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full h-12 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center font-semibold"
                    >
                        {loading ? <Spinner /> : "Login"}
                    </button>
                </form>
                <p className='text-sm text-stone-500 text-center mt-5'>
                    Don't have an account ? 
                    <Link className='text-blue-500 ml-2' to='/signup'>
                        Signup
                    </Link> 
                </p>
            </div>
        </div>
    );
};

export default Login;
