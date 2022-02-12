import React from "react";
import nookies from "nookies";
import {auth} from "../lib/firebaseAdmin";
import useSWR from 'swr';
import {useAuth} from '../lib/use-auth';
import {useRouter} from 'next/router';

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);
        // the user is authenticated
        return {
            props: {},
        };
    } catch (err) {
        // user not logged in
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {}
        };
    }
};

const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
};

const AuthenticatedPage = (props) => {
    const auth = useAuth();
    const router = useRouter();

    return (
        <div className="flex h-screen w-screen">
            <div className="flex w-1/4 bg-gray-200 p-4 align-middle">
                <div>
                    Left
                </div>
                <button onClick={() => {
                    auth.signout().then(_ => router.push("/"));
                }} className="mb-4 mt-auto button px-4 py-2 font-light rounded-2xl bg-red-300 font-bold hover:bg-red-400 shadow-md border-red-500 border-4 focus:outline-none hover:text-white;">Sign out
                </button>
            </div>
            <div className="m-4">Right</div>
        </div>
    );
};

export default AuthenticatedPage;