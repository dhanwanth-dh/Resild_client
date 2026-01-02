import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";


const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const signup = async (e) => {
        e.preventDefault();   // 🔥 CRITICAL

        if (!username || !email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            await addDoc(collection(db, "users"), {
                username,
                email,
                password,
                createdAt: new Date()
            });

            alert("Signup successful!");
            navigate("/home");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Signup failed");
        }
    };


    return (
        <div className='flex justify-center items-center h-screen w-100 text-amber-50'>
            <div className='h-[90%] w-[80%] rounded-4xl rounded-bl-4xl rounded-tl-4xl shadow-xl/100 font-form'>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-amber-50">
                            Create account
                        </h2>
                    </div>

                    <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-amber-50">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-amber-50">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-amber-50">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={signup}
                                    className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-900"
                                >
                                    Sign up
                                </button>

                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            Already have an account?{' '}
                            <Link to="/*" className="font-semibold text-indigo-700 hover:text-indigo-900">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup