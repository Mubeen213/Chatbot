import bcrypt from "bcryptjs";

export const hashString = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedValue = await bcrypt.hash(password, salt)
    return hashedValue;
}

export const validatePassword = async (password, hashedPassword) => {

    return await bcrypt.compare(password, hashedPassword)
}