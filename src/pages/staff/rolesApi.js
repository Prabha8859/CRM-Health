import axiosInstance from '../../store/services/axiosInstance';

// Get all roles
export const getAllRoles = async () => {
  try {
    console.log('Fetching all roles...'); // Log before call
    const response = await axiosInstance.get('/roles/');
    console.log('API Response (getAllRoles):', response.data); // Log response data
    return response.data;
  } catch (error) {
    console.error('API Error (getAllRoles):', error); // Log error
    throw error.response?.data || error.message;
  }
};

// Get role by ID
export const getRoleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new role
export const createRole = async (data) => {
  try {
    const response = await axiosInstance.post('/roles/', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update role
export const updateRole = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/roles/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete role
export const deleteRole = async (id) => {
  try {
    const response = await axiosInstance.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
