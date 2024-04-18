interface FormInputProps {
    label?: string,
    name: string,
    defaultValue?: string,
    type: string,
    placeholder?: string
}

export const FormInput = ({label, name, defaultValue, type, placeholder}: FormInputProps) => {

    return (
        <div className='form-control form-row'>
            <label className='form-label'>
                <span>{label}</span>
            </label>
            <input
                className='form-input'
                name={name}
                defaultValue={defaultValue}
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}