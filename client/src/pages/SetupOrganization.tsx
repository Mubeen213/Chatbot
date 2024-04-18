

// private static final String API_KEY = "api_key";
// private static final String OPENAI_ORGANIZATION_KEY = "openai_organization_key";

import {ActionFunction, Form, redirect} from "react-router-dom";
import {FormInput} from "@/components/FormInput.tsx";
import {customFetch} from "@/utils/customFetch.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

export const action: ActionFunction = async ({request}) : Promise<Response | null> => {

    try {
        const formData = await request.formData();
        console.log(formData);
        const data = Object.fromEntries(formData);
        await customFetch.post('/api/v1/auth/setup', data);
        return redirect('/')
    } catch (err) {
        let msg = err instanceof AxiosError ? err.response?.data?.msg : 'Setup failed';
        toast.error(msg)
    }
    return null
}

export const SetupOrganization = () => {

    return (
        <main className= ''>
            <Form method='POST' className= 'form bg-white'>
                <header className='text-center pt-8'>
                    <h1 className='text-3xl mb-6 font-md tracking-tight'>Welcome, Please provide the details below to
                        continue</h1>
                </header>
                <FormInput name='orgName' type='text' label='Organization name' placeholder='Give name for your organization'/>
                <FormInput name='openAIOrganizationKey' type='password' label='Open AI organization key' placeholder='Enter OpenAI organization key'/>
                <FormInput name='openAIAPIKey' type='password' label='Open AI key' placeholder='Enter OpenAI API Key'/>
                <button className= 'btn btn-block'>setup</button>
            </Form>
        </main>
    )
}