const Header = ({username}) => {
    return (
        <div className="bg-gray-100 p-4 flex">
            <div className="ml-auto mr-0 flex gap-4">
                <div>
                    Friday, October 1st
                </div>
                <div>
                    ☁️73°
                </div>
                <div className="border-l-2 border-gray-600 px-4">
                    {username}
                </div>
            </div>
        </div>
    )
}

export default Header;
