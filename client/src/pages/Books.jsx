import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:3000/books")
                // console.log(res);
                setBooks(res.data);


            } catch (err) {
                console.log(err);
            }
        }

        fetchAllBooks();
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/books/${id}`)
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className='text-6xl font-extrabold text-center mx-auto'>Books</h1>

            <div className="books container mx-auto grid transform grid-cols-1 gap-y-10 p-10 duration-500 md:p-20 lg:grid-cols-2 2xl:grid-cols-6">
                {/* for each book inside this array */}
                {books.map(book => (
                    <div className="book bg-gray-600 bg-opacity-10 max-w-sm transform mx-4 cursor-pointer shadow-md duration-300 hover:shadow-xl" key={book.id}>
                        {book.cover && <img className='h-48 w-full transform transition delay-50 duration-300 hover:scale-105 border-none' src={book.cover} alt="" />}
                        <div className='my-auto p-2 pb-8'>
                            <h1 className="text-md font-semibold text-gray-200">{book.title}</h1>
                            <p className="mb-5 text-xm leading-relaxed text-gray-500">{book.desc}</p>
                            {/* <span>{book.price}</span> */}
                            <div className='flex justify-between align-bottom items-baseline'>
                                {/* Delete */}
                                <button className="group cursor-pointer text-red-500 transition duration-300 ease-in-out hover:text-red-700" onClick={() => handleDelete(book.id)}> Delete
                                    <span aria-hidden="true" className="inline-block translate-x-0 transition-transform duration-200 ease-in-out group-hover:translate-x-1">→</span>
                                </button>
                                {/* Update */}
                                <button className="group cursor-pointer text-gray-100 transition duration-300 ease-in-out hover:text-white"> <Link to={`/update/${book.id}`}>Update</Link>

                                    <span aria-hidden="true" className="inline-block translate-x-0 transition-transform duration-200 ease-in-out group-hover:translate-x-1">→</span>
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className='flex justify-center'><button className="flex items-center justify-center gap-2 rounded-xl border-4 border-black bg-yellow-600 px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-yellow-500"><Link to="/add" >Add New Book</Link></button></div>
        </div>

    )
}

export default Books
