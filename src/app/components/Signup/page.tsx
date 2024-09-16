"use client"
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { userSignup } from "@/app/utils/userSignup";

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');
    const router = useRouter();

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setResponse('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await userSignup({ firstname, lastname, email, password });
            setResponse(response.message ?? 'Account created successfully');
            setTimeout(() => router.push('/components/login'), 1500); // Redirect to login after success
        } catch (error) {
            const message = (error as Error).message;
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex w-full max-w-4xl h-full bg-white rounded-none shadow-lg overflow-hidden">
                {/* Left side image */}
                <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/ladyjustice.jpeg')" }}>
                </div>
                {/* Right side form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Create an account</h2>
                    <form onSubmit={handleSignup} className="space-y-3">
                        <div>
                            <label htmlFor="firstname" className="block text-gray-700 font-medium mb-1 text-sm">Firstname:</label>
                            <input
                                id="firstname"
                                type="text"
                                placeholder="Enter firstname"
                                required
                                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500 text-xs"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setFirstname(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block text-gray-700 font-medium mb-1 text-sm">Lastname:</label>
                            <input
                                id="lastname"
                                type="text"
                                placeholder="Enter lastname"
                                required
                                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500 text-xs"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setLastname(event.target.value)}
                            />
                        </div>
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
                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1 text-sm">Confirm Password:</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                required
                                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500 text-xs"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-green-700 text-white font-medium py-2 rounded shadow hover:bg-green-800 focus:outline-none text-xs ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Create an account'}
                        </button>
                        {response && <p className="mt-2 text-green-500 text-center text-xs">{response}</p>}
                        {error && <p className="mt-2 text-red-500 text-center text-xs">{error}</p>}
                    </form>
                    <div className="text-center mt-2">
                        <p className="text-xs">or</p>
                        <p className="mt-2 text-xs">Already have an account?<a href="/components/login" className="text-green-700 hover:underline">Sign In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
