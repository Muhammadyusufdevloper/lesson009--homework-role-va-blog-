import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCreateBlogMutation } from '../../context/api/blogsApi';

let initialState = {
    title: '',
    description: '',
    category: '',
    author: '',
    views: '',
    likes: '',
}

const BlogsUser = ({ setIsOpen, isOpen }) => {
    const [formValues, setFormValues] = useState(initialState);
    const [createUser, { isSuccess }] = useCreateBlogMutation()
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    useEffect(() => {
        if (isSuccess) {
            toggleModal()
        }
    }, [isSuccess])
    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(formValues)
    };



    return (
        <>
            {isOpen && (
                <div
                    className="fixed top-0 right-0 left-0 z-40 w-full h-full bg-[#0000001e]"
                    onClick={() => setIsOpen(false)}
                />
            )}
            {isOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    role="dialog"
                    aria-labelledby="modal-title"
                    className="fixed top-0 right-0 left-0 z-50 w-full h-full flex justify-center items-center"
                >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Create User
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={toggleModal}
                                    aria-label="Close modal"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label
                                            htmlFor="fname"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="fname"
                                            id="fname"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Title"
                                            value={formValues.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lname"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name="lname"
                                            id="lname"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Description"
                                            value={formValues.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Username"
                                            value={formValues.category}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Author
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Author"
                                            value={formValues.author}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="gender"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Views
                                        </label>
                                        <input
                                            type="number"
                                            name="gender"
                                            id="gender"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Views"
                                            value={formValues.views}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="budget"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Likes
                                        </label>
                                        <input
                                            type="number"
                                            name="budget"
                                            id="budget"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Likes"
                                            value={formValues.likes}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Update User
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

BlogsUser.propTypes = {
    setIsOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
};

export default BlogsUser;
