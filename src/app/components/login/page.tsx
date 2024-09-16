"use client"
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { userLogin } from "@/app/utils/userLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setResponse('');
        try {
            const response = await userLogin({ email, password });
            setResponse(response.message ?? 'Successful login');
            setTimeout(() => router.push('/components/posts'), 1500); // Redirect after login
        } catch (error) {
            const message = (error as Error).message;
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex w-full max-w-4xl h-full bg-white shadow-lg overflow-hidden">
                {/* Left side image */}
                <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/ladyjustice.jpeg')" }}>
                </div>
                {/* Right side form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Sign In</h2>
                    <form onSubmit={handleLogin} className="space-y-3">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">Email:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                required
                                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500 text-xs"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-sm">Password:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                required
                                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500 text-xs"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-green-700 text-white font-medium py-2 rounded shadow hover:bg-green-800 focus:outline-none text-xs ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                        {response && <p className="mt-2 text-green-500 text-center text-xs">{response}</p>}
                        {error && <p className="mt-2 text-red-500 text-center text-xs">{error}</p>}
                    </form>
                    <div className="text-center mt-3">
                        <p className="text-xs">or</p>
                        <button className="w-full flex justify-center items-center bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded shadow hover:bg-gray-100 focus:outline-none text-xs mt-2">
                            <img src="/google-icon.png" alt="Google Icon" className="w-5 h-5 mr-2" />
                            Sign In with Google
                        </button>
                        <p className="mt-2 text-xs">Don't have an account? <a href="/components/Signup" className="text-green-700 hover:underline">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
