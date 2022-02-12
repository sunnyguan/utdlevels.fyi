import React, {useState} from "react";
import nookies from "nookies";
import {auth} from "../lib/firebaseAdmin";
import useSWR from 'swr';
import {useAuth} from '../lib/use-auth';
import {useRouter} from 'next/router';
import Home from "../components/home";
import Accounts from "../components/accounts";
import Informatives from "../components/informatives";
import InvestmentResearch from "../components/investmentResearch";
import Developers from "../components/developers";
import Settings from "../components/settings";
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

    const switchPage = () => {
        switch(currentPage) {
            case 'Home': return <Home />;
            case 'Accounts': return <Accounts />;
            case 'Informatives': return <Informatives />;
            case 'Investment & Research': return <InvestmentResearch />;
            case 'Developers': return <Developers />;
            case 'Settings': return <Settings />;
        }
    }

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
            <div className="flex flex-col w-1/4 bg-gray-200 p-4 align-middle">
                <div className="mx-auto">
                    <div className="font-bold text-2xl mb-8">Comet Visor</div>
                </div>
                <div className="p-2">
                    <Tab name="Home" />
                    <Tab name="Accounts" />
                    <Tab name="Informatives" />
                    <Tab name="Investment & Research" />
                    <Tab name="Developers" />
                    <Tab name="Settings" />
                </div>
                <button onClick={() => {
                    auth.signout().then(_ => router.push("/"));
                }} className="mb-4 mt-auto button px-4 py-2 font-light rounded-2xl bg-red-300 font-bold hover:bg-red-400 shadow-md border-red-500 border-4 focus:outline-none hover:text-white;">Sign out
                </button>
            </div>
            <div className="w-full">
                <Header username={auth.user ? auth.user.displayName : "User"}/>
                {switchPage()}
            </div>
        </div>
    );
};

export default AuthenticatedPage;