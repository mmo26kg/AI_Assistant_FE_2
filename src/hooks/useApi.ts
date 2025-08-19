import { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

// Custom Hook để fetch data
export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

// Custom Hook để quản lý form
export function useForm<T>(initialValues: T) {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (name: keyof T, value: any) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const reset = () => {
        setValues(initialValues);
    };

    return {
        values,
        handleChange,
        reset
    };
}
