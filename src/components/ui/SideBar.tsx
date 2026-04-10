import { Link } from "react-router-dom"

const SideBar = () => {
    return (
        <div className="w-80 h-[fit] fixed right-0 bg-gray-800 top-16.25 text-white max-h-[90%]">
            <h1 className="indent-5 pr-10 py-1.5 ml-3 border-b w-fit">Các loại Tracker</h1>
            <Link to="/"><button className="transition-all cursor-pointer px-5 py-4 hover:bg-gray-700 w-full text-start text-[17px]">Meme Tracker</button></Link>
            <button className="transition-all cursor-pointer px-5 py-4 hover:bg-gray-700 w-full text-start text-[17px]">3D Model Tracker</button>
            <h1 className="indent-5 pr-10 py-1.5 ml-3 border-b w-fit">Khác</h1>
            <button className="transition-all cursor-pointer px-5 py-4 hover:bg-gray-700 w-full text-start text-[17px]">Cài đặt</button>
            <button className="transition-all cursor-pointer px-5 py-4 hover:bg-gray-700 w-full text-start text-[17px]">Tài liệu</button>
        </div>
    )
}

export default SideBar