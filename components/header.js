import { useAuth } from '../lib/use-auth';
import { useRouter } from 'next/router';

const Header = ({username}) => {

    const auth = useAuth();
    const router = useRouter();

    return (
        <div className="bg-blue-100 p-12 flex pt-6 pb-14 -mb-12">
            <div className="flex my-auto place-items-center">
                <div className="font-light text-2xl">UTD Levels.FYI</div>
            </div>
            <div className="inline-block ml-auto mr-0 flex gap-4 align-middle">
                <div className="my-auto px-2">
                    {username}
                </div>
                <button onClick={() => {
                    auth.signout().then(_ => router.push("/"));
                }} className="px-4 py-2 bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-200 rounded-xl">Sign out
                </button>
            </div>
        </div>
    )
}

export default Header;