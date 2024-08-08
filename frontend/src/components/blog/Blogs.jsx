import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import female from "../../assets/female.webp";
import male from "../../assets/male.svg";
import { FiArrowRight } from "react-icons/fi";
import Pagination from '@mui/material/Pagination';
import { MdOutlineCreateNewFolder, MdOutlineRemoveRedEye } from "react-icons/md";
import { IoHeartCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useGetBlogsQuery } from '../../context/api/blogsApi';

const limit = 3;

const Users = ({ setIsOpen }) => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetBlogsQuery({ page, limit });
    console.log(data);

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (data?.totalCount) {
            setTotalPages(Math.max(1, Math.ceil(data.totalCount / limit)));
        }
    }, [data]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading users.</p>;

    return (
        <section>
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl mt-5 font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">Blogs</h1>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Add Blog <MdOutlineCreateNewFolder />
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {data?.payload?.length ? (
                        data?.payload?.map((blog) => (
                            <div key={blog?._id} className="flex items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex w-60 h-60 items-center justify-center p-4  overflow-hidden">
                                    <img className="w-full h-full" src={blog?.gender === "male" ? male : female} alt={`${blog?.title}`} />
                                </div>
                                <div className="p-4">
                                    <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{`${blog?.title}`}</h3>
                                    <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400">{blog?.description}</p>
                                    <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400">{blog?.category}</p>
                                    <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400">{blog?.author}</p>
                                    <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400 flex items-center gap-2"><MdOutlineRemoveRedEye /> {blog?.views}</p>
                                    <p className="mb-5 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400 flex items-center gap-2"><IoHeartCircleSharp />{blog?.likes}</p>
                                    <div className="flex items-center justify-between">
                                        <Link to={`/single-route/${blog?._id}`} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Read more <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
                <div className="flex justify-center mt-3">
                    <Pagination count={totalPages} page={page} onChange={handleChange} />
                </div>
            </div>
        </section>
    );
};

Users.propTypes = {
    setIsOpen: PropTypes.func.isRequired
};

export default Users;
