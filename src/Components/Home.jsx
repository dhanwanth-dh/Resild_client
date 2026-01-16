import React from 'react'
import { Link } from 'react-router-dom'
const markInterested = () => {
    if (chrome?.runtime?.sendMessage) {
        chrome.runtime.sendMessage({
            type: "MARK_INTERESTED"
        });
    } else {
        console.error("Chrome extension not available");
    }
};
const logout = () => {
    chrome.storage.local.remove(["isLoggedIn", "user"], () => {
        window.location.reload();
    });
};

const Home = () => {
    return (
        <>
            <div className='z-100 mt-0'>
                <div className='p-5 flex flex-col gap-5 w-80 '>

                    <div className='flex flex-row justify-between gap-10'>
                        <button className='h-10 p-1 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl rounded-tl-3xl border-2 border-black bg-white shadow-xl/60 opacity-90
                        transition duration-100 hover:bg-gray-600'><Link to="/skills">Update skills</Link></button>
                        <button className='h-10 p-1 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl rounded-tl-3xl border-2 border-black bg-white shadow-xl/60 opacity-90
                        transition duration-100 hover:bg-gray-600'>Interested</button>
                    </div>

                    <button className='h-10 p-1 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl rounded-tl-3xl border-2 border-black bg-white shadow-xl/60 opacity-90
                    transition duration-100 hover:bg-gray-600' onClick={markInterested}>Mark interested</button>


                    <button className='h-10 p-1 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl rounded-tl-3xl border-2 border-black bg-white shadow-xl/60 opacity-90
                    transition duration-100 hover:bg-gray-600' onClick={logout}>Logout</button>
                </div>
            </div>
        </>

    )
}

export default Home