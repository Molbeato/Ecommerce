import { axiosInstance } from "../../api/axiosInstance"

export const getUser = async (token) => {
    try {
        const res = await axiosInstance.get('users', {
            headers: { Authorization: `Bearer ${token}` }
        })

        return res.data;
    } catch (error) {
        if (error.response) throw error.response.data;
        else throw new Error('Something went wrong with the user')
    };
};