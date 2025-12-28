import bcrypt from "bcryptjs"

const saltRound = 15;
export const hashPassword = (plainPassword) =>{
    return bcrypt.hashSync(plainPassword,saltRound)
}

export const comaparePassword = (plainPassword,hashPassword) =>{
    return bcrypt.compareSync(plainPassword,hashPassword);
}