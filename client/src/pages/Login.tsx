import {SentenceGenerator} from "@/components/SentenceGenerator.tsx";
import {useEffect, useState} from "react";
import {customFetch} from "@/utils/customFetch.ts";
import {TokenUser} from "@/interfaces/User.ts";
import {AxiosResponse} from "axios";


interface OauthAppDetails {
    GOOGLE_CLIENT_ID: string,
    REDIRECT_URL: string,
    AUTHORIZATION_URL: string,
    SCOPE: string
}


export const Login = () => {

    const [oauthParams, setOauthParams] = useState<OauthAppDetails | null>(null)
    const getOauthParams = async () => {
        try {
            const response: AxiosResponse = await customFetch<OauthAppDetails>('/api/v1/auth/OauthAppDetails');
            setOauthParams(response.data.OauthAppDetails);
        } catch (error) {
            console.error('Error fetching OauthAppDetails:', error);
            throw error;
        }
    }

    useEffect(() => {
        getOauthParams();
    }, []);

    const handleSSO = async () => {
        if (!oauthParams) {
            return
        }
        window.location.href = `${oauthParams.AUTHORIZATION_URL}?response_type=code` +
            `&client_id=${oauthParams.GOOGLE_CLIENT_ID}` +
            `&redirect_uri=${oauthParams.REDIRECT_URL}` +
            `&scope=${oauthParams.SCOPE}`
    }

    const handleGoogleCallback = async () => {
        try {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const code = urlSearchParams.get('code')
            if (code) {
                const response: AxiosResponse = await customFetch<TokenUser>(`/api/v1/auth/oauth/callback?code=${code}`)
                const {user} = response.data
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user))
                    user.organization ? window.location.href = '/' : window.location.href = '/setup'
                }
            }
        }catch (e) {
            console.log(e)
            window.location.href = '/login'
        }
    }

    useEffect(() => {
        handleGoogleCallback()
    }, [])

    return (
        <main
            className='grid h-screen w-screen md:grid-cols-2'>
            <section className='relative bg-blue-950 hidden md:flex justify-center flex-col p-4'>
                <nav className='absolute left-0 top-8 px-6 text-2xl font-bold text-custom-color'>
                    <h1>OpenAI API Playground</h1>
                </nav>
                <SentenceGenerator/>
            </section>
            <section className='bg-black flex flex-col justify-center items-center h-screen md:h-auto md:min-h-screen md:flex md:flex-col md:justify-center md:items-center pt-6 px-8'>
                <h2 className='text-center text-3xl text-white font-bold mb-8 md:mb-4'>Get started</h2>
                <div className='flex flex-col sm:flex-row gap-4 w-2/4'>
                    <button className='btn btn-block' onClick={handleSSO}>Login</button>
                    <button className='btn btn-block bg-blue-500 text-white' onClick={handleSSO}>Sign up</button>
                </div>
            </section>

        </main>
    )
}