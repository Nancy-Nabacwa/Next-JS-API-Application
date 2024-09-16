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
            setTimeout(() => router.push('/login'), 1500); // Redirect to login after success
        } catch (error) {
            const message = (error as Error).message;
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
            <form className="w-full max-w-[80rem] bg-slate-[200] shadow-md rounded-lg p-10" onSubmit={handleSignup}>
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign Up</h2>
                <div className="mb-6">
                    <label htmlFor="firstname" className="block text-gray-700 text-lg font-bold mb-2">
                        Firstname
                    </label>
                    <input 
                        id="firstname"
                        placeholder="Enter firstname" 
                        type="text" 
                        required 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setFirstname(event.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="lastname" className="block text-gray-700 text-lg font-bold mb-2">
                        Lastname
                    </label>
                    <input 
                        id="lastname"
                        placeholder="Enter lastname" 
                        type="text" 
                        required 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setLastname(event.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">
                        Email
                    </label>
                    <input 
                        id="email"
                        placeholder="Enter email" 
                        type="email" 
                        required 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
                        Password
                    </label>
                    <input 
                        id="password"
                        placeholder="Enter password" 
                        type="password" 
                        required 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-lg font-bold mb-2">
                        Confirm Password
                    </label>
                    <input 
                        id="confirmPassword"
                        placeholder="Confirm password" 
                        type="password" 
                        required 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 text-lg"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Create Account'}
                    </button>
                </div>
                {response && <p className="mt-4 text-green-500 text-lg">{response}</p>}
                {error && <p className="mt-4 text-red-500 text-lg">{error}</p>}
            </form>
        </div>
    )
}

export default Signup;
