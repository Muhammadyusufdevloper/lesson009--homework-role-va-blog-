import { useState } from "react";
import BlogsUser from "../../components/modal/BlogUser"
import Users from "../../components/blog/Blogs"

const Home = () => {
    const [isOpen, setIsOpen] = useState(null);
    return (
        <>
            <Users setIsOpen={setIsOpen} isOpen={isOpen} />
            <BlogsUser setIsOpen={setIsOpen} isOpen={isOpen} />
        </>
    )
}

export default Home