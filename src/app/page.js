"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [code, setCode] = useState(''); // Code input state
    const [output, setOutput] = useState(''); // Output or error state
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleExecuteCode = async (event) => {
        event.preventDefault(); // Prevent page reload on form submit
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/execute', { code });
            console.log("Response:", response.data);
            setOutput(response.data.output); // Display the output in UI
        } catch (error) {
            console.error("Error from backend:", error);
            setOutput(error.response ? error.response.data.error : error.message);
        } finally {
            setIsLoading(false);
        }
    };    
    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <h1>JavaScript Code Compiler</h1>
            <form onSubmit={handleExecuteCode}>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter JavaScript code here..."
                    rows="10"
                    style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                ></textarea>
                <button
                    type="submit"
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Executing...' : 'Run Code'}
                </button>
            </form>
            <div style={{ marginTop: '2rem' }}>
                <h2>Output:</h2>
                <pre
                    style={{
                        background: '#f3f3f3',
                        padding: '1rem',
                        borderRadius: '4px',
                        minHeight: '50px'
                    }}
                >
                    {typeof output === 'object' ? JSON.stringify(output, null, 2) : output || 'No output yet'}
                </pre>
            </div>
        </div>
    );
}
