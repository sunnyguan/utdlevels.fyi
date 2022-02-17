import React, {useState} from "react";
import nookies from "nookies";
import {auth} from "../lib/firebaseAdmin";
import useSWR from 'swr';
import {useAuth} from '../lib/use-auth';
import {useRouter} from 'next/router';
import Home from "../components/home";
import Header from "../components/header";

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);
        // the user is authenticated
        return {
            props: {cookies: cookies},
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
    const [currentPage, setCurrentPage] = useState("Home");

    const Tab = (tabProps) => {
        return (
            <div>
                <button
                    className="outline-0 font-semibold py-2 px-4 rounded-xl bg-gradient-to-r hover:from-blue-500 hover:to-green-400"
                    onClick={(e) => {
                        setCurrentPage(tabProps.name)
                    }}
                >
                    {tabProps.name}
                </button>
            </div>
        )
    }

    return (
        <div className="flex h-screen w-screen">
            <div className="w-full">
                <Header username={auth.user ? auth.user.displayName : "User"}/>
                <Home />
            </div>
        </div>
    );
};

export default AuthenticatedPage;