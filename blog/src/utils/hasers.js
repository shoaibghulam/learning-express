import bcrypt from 'bcrypt';
export const hasherPassword = (password)=>  bcrypt.hashSync(password,10);
export const hasherPasswordVerifer = async(password)=>  await bcrypt.compare(password,hasherPassword);