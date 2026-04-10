const Header = () => {
    return (
        <div className="transition-all w-full h-15 bg-gray-920 border-amber-50 shadow-2xl shadow-blue-500/10 flex items-center px-5 text-white">
            <div className="flex items-center gap-10 h-full">
                <div className="flex items-end cursor-pointer active:opacity-80">
                    <img src="/logo-w.png" alt="" className="h-10" />
                    <h1 className="text-3xl font-semibold">ion AI</h1>
                </div>
                <div className="h-full flex items-center">
                    <h1 className="cursor-pointer font-mono uppercase hover:">Thông tin</h1>

                </div>
            </div>
            <div className=""></div>
        </div>
    )
}

export default Header