export const userSignup = async (userData: { firstname: string; lastname: string; email: string; password: string; role: string }) => {
    try {
        const baseUrl = process.env.BASE_URL || 'http://localhost:8000'; // Use environment variable or fallback to localhost
        const response = await fetch(`${baseUrl}/api/signup/`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: userData.firstname, // Ensure field names match backend expectations
                last_name: userData.lastname,
                email: userData.email,
                password: userData.password,
                role: userData.role,  // Make sure this field is included and valid
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Full response from server:', text);
            throw new Error(`Failed to create account: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during signup:', error);
        throw new Error((error as Error).message || 'Something went wrong');
    }
};
