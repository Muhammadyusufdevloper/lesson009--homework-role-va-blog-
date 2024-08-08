import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUpdateBlogMutation } from '../../context/api/blogsApi';

const initialState = {
    title: '',
    description: '',
    category: '',
    author: '',
    views: '',
    likes: '',
};

const EditUser = ({ setEditUser, editUser }) => {
    const [formValues, setFormValues] = useState(initialState);
    const [updateUser, { isSuccess }] = useUpdateBlogMutation();

    useEffect(() => {
        if (editUser) {
            setFormValues(editUser);
        }
    }, [editUser]);

    const toggleModal = () => {
        setEditUser(null);
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
            toggleModal();
        }
    }, [isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editUser) {
            updateUser({ body: formValues, id: editUser._id });
        }
    };

    return (
        <>
            {editUser && (
                <div
                    className="fixed top-0 right-0 left-0 z-40 w-full h-full bg-[#0000001e]"
                    onClick={() => setEditUser(null)}
                />
            )}
            {editUser && (
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
                                    Edit Blog
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
                                            htmlFor="title"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Title"
                                            value={formValues.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Description"
                                            value={formValues.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="category"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            id="category"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Category"
                                            value={formValues.category}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="author"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            name="author"
                                            id="author"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Author"
                                            value={formValues.author}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="views"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Views
                                        </label>
                                        <input
                                            type="number"
                                            name="views"
                                            id="views"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Views"
                                            value={formValues.views}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="likes"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Likes
                                        </label>
                                        <input
                                            type="number"
                                            name="likes"
                                            id="likes"
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
                                        Update Blog
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

EditUser.propTypes = {
    setEditUser: PropTypes.func.isRequired,
    editUser: PropTypes.object
};

export default EditUser;
