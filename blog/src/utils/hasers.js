import bcrypt from 'bcrypt';
export const hasherPassword = (password)=>  bcrypt.hashSync(password,10);