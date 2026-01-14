import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase.js"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            alert("Email and password are required")
            return
        }

        try {

            const q = query(
                collection(db, "users"),
                where("email", "==", email)
            )

            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                alert("User not found")
                return
            }

            let userData
            querySnapshot.forEach((doc) => {
                userData = doc.data()
            })
            if (userData.password !== password) {
                alert("Incorrect password")
                return
            }

            alert("Login successful")

            chrome.storage.local.set({
                isLoggedIn: true,
                user: userData
            });


            navigate("/home")

        } catch (error) {
            console.error("Login error:", error)
            alert("Login failed")
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-100 z-100 text-amber-50'>
            <div className='h-[90%] w-[80%] rounded-4xl shadow-xl font-form'>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold text-amber-50">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6">
                        <div className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-amber-5">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="mt-2 block w-full rounded-md px-3 py-1.5 border bg-amber-50 text-black"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-amber-5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-2 block w-full rounded-md px-3 py-1.5 border bg-amber-50 text-black"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={login}
                                className="w-full bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-900"
                            >
                                Sign in
                            </button>

                        </div>

                        <p className="mt-10 text-center text-sm text-amber-50">
                            Not a member?{' '}
                            <Link to="/signup" className="font-semibold text-indigo-700">
                                Sign Up
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
