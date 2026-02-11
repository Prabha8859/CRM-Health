import axiosInstance from '../store/services/axiosInstance';

export const profileService = {
  fetchProfile: async (userId) => {
    try {
      // Replace with actual API endpoint
      // const response = await axiosInstance.get(`/profile/${userId}`);
      // return response.data;
      
      // MOCK DATA for now
      return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                email: "superadmin@crm.com",
                phone: "+91 98765 43210",
                location: "Headquarters, Mumbai",
                joiningDate: "01 Jan, 2024",
                employeeId: "SA-001",
                clearanceLevel: "Level 5 (Super Admin)",
                // Add more fields as needed
            });
        }, 500);
      });

    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }
};
