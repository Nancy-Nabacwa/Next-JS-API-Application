


"use client"
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { userLogin } from "@/app/utils/userLogin";

const Login = () => {
    const [username, setUserName] = useState("");
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
            const response = await userLogin({ username, password });
            setResponse(response.message ?? 'Successful login');
            setTimeout(() => router.push('/components/posts'), 1500);
        } catch (error) {
            const message = (error as Error).message;
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
            <form className="w-full max-w-[80rem] bg-slate-[200] shadow-md rounded-lg p-10" onSubmit={handleLogin}>
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h2>
                <div className="mb-6">
                    <label htmlFor="username" className="block text-gray-700 text-lg font-bold mb-2">
                        Username
                    </label>
                    <input 
                        id="username"
                        placeholder="Enter username" 
                        type="text" 
                        required 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
                        Password
                    </label>
                    <input 
                        id="password"
                        placeholder="Enter password" 
                        type="password" 
                        required 
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 text-lg"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </div>
                {response && <p className="mt-4 text-green-500 text-lg">{response}</p>}
                {error && <p className="mt-4 text-red-500 text-lg">{error}</p>}
            </form>
        </div>
    )
}

export default Login;