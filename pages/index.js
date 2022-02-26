import firebase from '../lib/firebase';
import nookies from "nookies";
import {auth} from "../lib/firebaseAdmin";
import {useRouter} from 'next/router'
import { useState } from 'react';


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
    const [imageId, setImageId] = useState(0);
    const images = [
        "https://docs.microsoft.com/en-us/power-bi/consumer/media/end-user-dashboards/power-bi-dashboard.png",
        "https://www.logianalytics.com/dashboarddesignguide/wp-content/uploads/2015/09/Chapter-6-Flat-Design.png",
        "https://luna1.co/26100b.png"
    ]

    return (
        <div className="grid grid-cols-2 h-screen">
            <div className="p-4 h-full flex align-middle">
                <div className="m-auto flex flex-col">
                    <div className="font-medium text-3xl mb-4">
                        UTD Levels
                    </div>
                    <div className="font-light mb-8">
                        See salary information exclusive for UTD students!
                    </div>
                    <div className="w-full flex flex-row justify-center cursor-pointer px-8 py-4 font-bold rounded-full hover:bg-gray-100 shadow-md border-gray-300 border-2 focus:outline-none" onClick={() => {
                        var provider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth()
                            .signInWithPopup(provider)
                            .then((result) => {
                                console.log(result.user);
                                router.push("/dashboard")
                            }).catch((error) => {
                            console.error(error);
                        });
                    }}>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/google-1772223-1507807.png" width={24} className="mr-4"/>
                        Sign in with Google
                    </div>
                </div>
            </div>
            <div className="mx-auto flex flex-col text-center bg-indigo-600 w-full p-16">
                <div className="flex flex-col flex-grow bg-white rounded-3xl">
                    <div className="flex flex-grow p-12">
                        <img className="object-cover rounded-lg" src={images[imageId]}/>
                    </div>
                    <div className="p-4 mb-4 tracking-widest flex flex-row mx-auto gap-8">
                        {images.map((item, idx) =>
                            <div onClick={(e) => {setImageId(idx)}}
                            className={"cursor-pointer bg-blue-200 bg-blue-300 rounded-full w-8 h-8 " + (imageId === idx ? "border-2 border-blue-500" : "")}>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
