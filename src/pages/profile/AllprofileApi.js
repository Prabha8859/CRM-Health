import axiosInstance from '../../store/services/axiosInstance';

/**
 * Fetches a staff member's profile by their ID.
 *
 * @param {string} id The ID of the staff member (e.g., "STF7790").
 * @returns {Promise<object>} A promise that resolves to the staff member's profile data.
 */
export const getStaffProfile = async (id) => {
    try {
        const response = await axiosInstance.get(`/staff/getstaff/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching staff profile for id ${id}:`, error);
        throw error;
    }
};

/**
 * Updates a staff member's profile.
 *
 * @param {string} id The ID of the staff member.
 * @param {object} data The data to update.
 * @returns {Promise<object>} A promise that resolves to the updated profile data.
 */
export const updateStaffProfile = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/staff/updatestaff/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating staff profile for id ${id}:`, error);
        throw error;
    }
};

/**
 * Registers a new staff member.
 *
 * @param {FormData} data The staff data including image.
 * @returns {Promise<object>} A promise that resolves to the registered staff data.
 */
export const registerStaff = async (data) => {
    try {
        const response = await axiosInstance.post(`/staff/registerstaff`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error(`Error registering staff:`, error);
        throw error;
    }
};