'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from '@/hooks/useApi';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface UserForm {
    name: string;
    email: string;
    message: string;
}

export default function ContactForm() {
    const [users, setUsers] = useLocalStorage<UserForm[]>('users', []);
    const [showForm, setShowForm] = useState(false);

    const { values, handleChange, reset } = useForm<UserForm>({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Thêm user mới vào localStorage
        const newUser = { ...values };
        setUsers([...users, newUser]);

        // Reset form
        reset();
        setShowForm(false);

        alert('Form submitted successfully!');
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📋</span>
                        Contact Form Demo
                    </CardTitle>
                    <CardDescription>
                        Ví dụ về form management với custom hooks và localStorage
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        variant={showForm ? "outline" : "default"}
                    >
                        {showForm ? 'Hide Form' : 'Show Form'}
                    </Button>

                    {showForm && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name *</label>
                                <Input
                                    name="name"
                                    value={values.name}
                                    onChange={(e) => handleChange('name' as keyof UserForm, e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email *</label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={(e) => handleChange('email' as keyof UserForm, e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message *</label>
                                <textarea
                                    name="message"
                                    value={values.message}
                                    onChange={(e) => handleChange('message' as keyof UserForm, e.target.value)}
                                    placeholder="Enter your message"
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                            </div>

                            <div className="flex space-x-2">
                                <Button type="submit">Submit</Button>
                                <Button type="button" variant="outline" onClick={reset}>Reset</Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>

            {users.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">📊</span>
                            Submitted Data
                        </CardTitle>
                        <CardDescription>
                            {users.length} submissions saved in localStorage
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {users.slice(-3).map((user, index) => (
                                <div key={index} className="p-4 bg-muted rounded-lg border">
                                    <p className="text-sm"><strong>Name:</strong> {user.name}</p>
                                    <p className="text-sm"><strong>Email:</strong> {user.email}</p>
                                    <p className="text-sm"><strong>Message:</strong> {user.message}</p>
                                </div>
                            ))}
                            {users.length > 3 && (
                                <p className="text-sm text-muted-foreground">
                                    ... and {users.length - 3} more submissions
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
