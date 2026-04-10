import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
const Header = ({ openSideBar, setOpenSideBar }: any) => {
    return (
        <div className="justify-between transition-all w-full h-15 bg-gray-920 border-amber-50 shadow-2xl shadow-blue-500/10 flex items-center px-5 text-white">
            <div className="flex items-center gap-10 h-full">
                <Link to={"/home"}>
                    <div className="flex items-end cursor-pointer active:opacity-80">
                        <img src="/logo-w.png" alt="" className="h-10" />
                        <h1 className="text-3xl font-semibold">ion AI</h1>
                    </div>
                </Link>
                <div className="h-full flex items-center">
                    <Link to={"/info"} className="h-full"><button className="cursor-pointer font-mono uppercase h-full">Thông tin</button></Link>
                </div>
            </div>

            <div className="flex items-center gap-10 h-full">
                <button className="transition-all py-2 px-3 text-center rounded-[10px] border cursor-pointer bg-gray-200/30 hover:bg-gray-50/20">Đăng nhập</button>
                <Menu className="cursor-pointer transition-all hover:opacity-80 active:opacity-70" onClick={() => setOpenSideBar(!openSideBar)}/>
            </div>
        </div>
    )
}

export default Header