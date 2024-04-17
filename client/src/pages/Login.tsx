import {SentenceGenerator} from "@/components/SentenceGenerator.tsx";


export const Login = () => {

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
                <div className='flex flex-col sm:flex-row gap-4'>
                    <button className='btn btn-md'>Login</button>
                    <button className='btn btn-md bg-blue-500 text-white'>Sign up</button>
                </div>
            </section>

        </main>
    )
}