import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteBlog from "../../components/modal/DeleteBlog";
import EditBlog from "../../components/modal/EditBlog";
import { useDeleteBlogMutation, useGetBlogByIdQuery } from "../../context/api/blogsApi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoHeartCircleSharp } from "react-icons/io5";

const SingleRout = () => {
  const { id } = useParams();
  const { data } = useGetBlogByIdQuery(id);
  const [deleteUser, { isSuccess }] = useDeleteBlogMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    scroll(0, 0);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      navigate("/");
    }
  }, [isSuccess]);

  const handleDelete = async () => {
    if (userIdToDelete) {
      await deleteUser(userIdToDelete);
    }
  };

  return (
    <>
      <section className="min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center bg-gray-200 rounded-lg border border-gray-300 p-4">

            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{data?.payload?.title}</h1>
              <p className="text-lg text-gray-700"><span className="font-semibold">Username:</span> {data?.payload?.description}</p>
              <p className="text-lg text-gray-700"><span className="font-semibold">Password:</span> {data?.payload?.category}</p>
              <p className="text-lg text-gray-700"><span className="font-semibold">Gender:</span> {data?.payload?.author}</p>
              <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400 flex items-center gap-2"><MdOutlineRemoveRedEye /> {data?.payload?.views}</p>
              <p className="mb-5 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400 flex items-center gap-2"><IoHeartCircleSharp />{data?.payload?.likes}</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setEditUser(data?.payload)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Edit
                </button>
                <button
                  onClick={() => {
                    setUserIdToDelete(id);
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeleteBlog
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
      <EditBlog editUser={editUser} setEditUser={setEditUser} />
    </>
  );
};

export default SingleRout;
