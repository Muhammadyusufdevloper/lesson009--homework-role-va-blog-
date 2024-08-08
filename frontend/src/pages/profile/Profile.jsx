import { IoPersonCircleOutline, IoMaleOutline, IoFemaleOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoPersonOutline, IoCalendarOutline } from "react-icons/io5";
import { useGetProfileQuery } from "../../context/api/profileApi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaUser, FaUserEdit } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

const Profile = () => {
    const { data } = useGetProfileQuery();
    const user = data?.payload;

    const genderIcon = user?.gender === "male" ? <IoMaleOutline className="text-xl" /> : <IoFemaleOutline className="text-xl" />;
    const statusIcon = user?.isActive ? <IoCheckmarkCircleOutline className="text-green-500 text-xl" /> : <IoCloseCircleOutline className="text-red-500 text-xl" />;

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8 text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full flex gap-10 relative">
                <div>
                    <div className="flex items-center justify-center mb-6">
                        <IoPersonCircleOutline className="text-7xl text-white" />
                    </div>
                    <h2 className="text-3xl text-center font-semibold mb-2">{user?.fname} {user?.lname}</h2>
                </div>
                <div className="grid grid-cols-2 gap-x-10  ">
                    <div className="flex items-center space-x-2">
                        <IoPersonOutline className="text-xl" />
                        <span className="text-gray-400">Username: </span>
                        <span>{user?.username}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {genderIcon}
                        <span className="text-gray-400">Gender: </span>
                        <span>{user?.gender}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {statusIcon}
                        <span className="text-gray-400">Status: </span>
                        <span>{user?.isActive ? "Active" : "Inactive"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {
                            user?.role === "admin" ? <MdOutlineAdminPanelSettings className="text-xl" /> : user?.role === "user" ? <FaUser className="text-xl" /> : <MdOutlineAdminPanelSettings className="text-xl" />
                        }
                        <span className="text-gray-400">Role: </span>
                        <span>{user?.role}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IoCalendarOutline className="text-xl" />
                        <span className="text-gray-400">Last Created: </span>
                        <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IoCalendarOutline className="text-xl" />
                        <span className="text-gray-400">Last Updated: </span>
                        <span>{new Date(user?.updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <button className="absolute top-3 right-4 w-10 h-10 flex items-center justify-center  bg-gray-700 hover:bg-gray-600 transition-all text-white rounded-lg"><FaUserEdit /></button>
            </div>
            <div className="bg-gray-800 p-4 max-w-96 rounded-lg shadow-lg mt-3 relative">
                <h2 className="text-2xl  font-semibold mb-2">Parol:</h2>
                <p className="text-xl font-semibold mb-2">••••••••••••••</p>
                <button className="absolute top-3 right-4 w-8 h-8 flex items-center justify-center  bg-gray-700 hover:bg-gray-600 transition-all text-white rounded-lg"><AiFillEdit /></button>
            </div>
        </div>
    );
};

export default Profile;
