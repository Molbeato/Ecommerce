import { axiosInstance} from "../../api/axiosInstance"

export const login = async ({ email, password }) => {
    try {
        const res = await axiosInstance.post('users/login', { email, password });
        
        return res.data;
    } catch (error) {
        console.error(error)
    }
};