import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        cover: "",
    })

    const navigate = useNavigate()
    // Form Input Handle
    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
    }
    console.log(book);

    // Form SubmintEvent
    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/books', book);
            navigate("/")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="mx-auto max-h-screen px-4 py-16 sm:px-6 lg:px-8  bg-gray-50 bg-opacity-10">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-yellow-600 sm:text-3xl">
                        Add New Book
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
                        dolores deleniti inventore quaerat mollitia?
                    </p>

                    <form
                        action=""
                        className="mt-6 mb-0 space-y-4 rounded-lg p-4 bg-black text-gray-600 bg-opacity-30 shadow-lg sm:p-6 lg:p-8"
                    >
                        <p className="text-center text-lg font-medium">Fill The Details</p>
                        {/* Book Title Input */}
                        <div>
                            <label className="sr-only">Book Title</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter the book title"
                                    name="title"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/* Book Description Input */}
                        <div>
                            <label className="sr-only">Book Description</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter the book short description"
                                    name="desc"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Book Cover */}
                        <div>
                            <label className="sr-only">Cover</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Cover Image"
                                    name="cover"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            className="block w-full rounded-lg bg-yellow-600 px-5 py-3 text-sm font-medium text-black"
                            onClick={handleClick}

                        >
                            Submit
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Go Back ?
                            <Link to="/"> Cancel</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Add