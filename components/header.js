import { useAuth } from '../lib/use-auth';
import { useRouter } from 'next/router';

const Header = ({username}) => {

    const auth = useAuth();
    const router = useRouter();

    return (
        <div className="bg-gray-100 p-4 flex">
            <div className="ml-auto mr-0 flex gap-4">
                <div>
                    Friday, October 1st
                </div>
                <div>
                    ☁️73°
                </div>
                <div className="border-l-2 border-gray-600 px-2">
                    {username}
                </div>
                <button onClick={() => {
                    auth.signout().then(_ => router.push("/"));
                }} className="underline text-blue-800">Sign out
                </button>
            </div>
        </div>
    )
}

export default Header;