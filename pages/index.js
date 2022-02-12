import firebase from '../lib/firebase';
import nookies from "nookies";
import {auth} from "../lib/firebaseAdmin";
import {useRouter} from 'next/router'


export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);
        return {
            redirect: {
                permanent: false,
                destination: "/dashboard",
            },
            props: {}
        };
    } catch (err) {
        // user not logged in
        return {props: {}};
    }
}

export default function Home() {

    // const auth = useAuth();
    const router = useRouter();

    return (
        <div class="bg-green-100 h-screen w-screen" style={{
            backgroundImage: "url(" + "https://www.siliconvalley.com/wp-content/uploads/2018/05/sjm-l-jobstheater-0910-31.jpg" + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div class="p-4 backdrop-blur-sm w-1/3 mr-0 ml-auto h-full flex border-l-4 border-green-500 align-middle" style={{
                backdropFilter: "blur(24px)"
            }}>
                <div class="m-auto flex flex-col">
                    <div class="text-center font-bold text-3xl text-green-300 mb-8">
                        Comet Visor
                    </div>
                    <button className="button px-8 py-4 font-light rounded-2xl bg-green-300 font-bold hover:bg-green-400 shadow-md border-green-500 border-4 focus:outline-none hover:text-white;" onClick={() => {
                        var provider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth()
                            .signInWithPopup(provider)
                            .then((result) => {
                                console.log(result.user);
                                router.push("/dashboard")
                            }).catch((error) => {
                            console.error(error);
                        });
                    }}>Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
