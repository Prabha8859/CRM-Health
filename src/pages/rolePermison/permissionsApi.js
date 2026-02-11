import axiosInstance from '../../store/services/axiosInstance';

export const getAllPermissions = async () => {
    const response = await axiosInstance.get('/permissions/');
    return response.data;
};

export const getPermissionsForRole = async (roleId) => {
    if (!roleId) return [];
    try {
        const response = await axiosInstance.get(`/permissions/role/${roleId}`);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error(`Failed to get permissions for role ${roleId}:`, error);
        return [];
    }
};

export const assignPermissionToRole = async (data) => {
    const response = await axiosInstance.post('/permissions/assign', data);
    return response.data;
};

export const removePermissionFromRole = async (data) => {
    const response = await axiosInstance.post('/permissions/remove', data);
    return response.data;
};