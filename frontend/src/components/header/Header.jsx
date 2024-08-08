import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../context/slices/authSlice";
import Search from "../search/Search";
const Header = () => {
    let dispatch = useDispatch()
    return (
        <header className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky top-0 left-0">
            <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 gap-3">
                <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
                </Link>
                <Search />
                <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to={"/login"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                        </li>
                        <li>
                            <Link to={"/profile"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</Link>
                        </li>
                        <li>
                            <button onClick={() => dispatch(logout())} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Log out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
