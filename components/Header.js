function Header({ content, loading }) {
    return (
        <div>
            <h1 className="text-gray-300 text-[1.5rem] md:text-[3rem] mb-3">
                {loading ? ( 
                    <div className="inline-flex items-center">
                        {content} <img className="ml-10 h-10 w-10" src="/loading.gif"/> 
                    </div>
                    ) : ( 
                        content 
                    )}
            </h1>
            <hr className="mb-3 bg-gray-900 border-none h-1 rounded-full" />
        </div>
    )
}

export default Header
