import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetSearchBlogQuery } from "../../context/api/blogsApi";

const Search = () => {
    const [search, setSearch] = useState('');
    const { data, isError, isLoading } = useGetSearchBlogQuery({ value: search });

    return (
        <form className="flex-grow relative">
            <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search..."
                className={`w-full p-1.5 outline-none bg-white rounded ${search ? 'rounded-b-none' : ''}`}
                type="text"
                name="search"
                id="search"
            />
            {
                search && (
                    <div className="absolute top-full right-0 w-full bg-gray-800 max-h-[600px] overflow-auto rounded-b">
                        {isLoading && <div className="p-2 text-white">Loading...</div>}
                        {isError && <div className="p-2 text-white">Error fetching data.</div>}
                        {data?.payload?.length > 0 ? (
                            data.payload.map((item) => (
                                <Link
                                    onClick={() => setSearch('')}
                                    key={item._id}
                                    to={`/single-route/${item._id}`}
                                    className="flex items-center gap-2 p-2 cursor-pointer transition-all hover:bg-slate-500"
                                >
                                    <IoSearchOutline className="text-white" />
                                    <h3 className="text-white">{item.title}</h3>
                                </Link>
                            ))
                        ) : (
                            <div className="p-2 text-white">Ma{"'"}lumot topilmadi</div>
                        )}
                    </div>
                )
            }
        </form>
    );
};

export default Search;
