import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../utils/rbac';

const MockDataContext = createContext(null);

export const MockDataProvider = ({ children }) => {
  // --- 1. System Logs Simulation ---
  const [logs, setLogs] = useState([
    { id: 1, action: "Role Updated", user: "Super Admin", target: "John Doe", type: "warning", time: "2 mins ago", details: "Changed role from Staff to Team Lead" },
    { id: 2, action: "System Login", user: "Sarah Smith", target: "System", type: "success", time: "15 mins ago", details: "Successful authentication via IP 192.168.1.42" },
    { id: 3, action: "Permission Denied", user: "Guest User", target: "/admin/settings", type: "error", time: "1 hour ago", details: "Unauthorized access attempt blocked" },
    { id: 4, action: "New Employee", user: "HR Manager", target: "Mike Ross", type: "info", time: "2 hours ago", details: "Created new employee profile #EMP-004" },
  ]);

  const addLog = (log) => {
    const newLog = {
      id: Date.now(),
      time: "Just now",
      type: "info",
      ...log
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // --- 2. Users Database Simulation ---
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@crm.com", role: ROLES.STAFF, avatar: null },
    { id: 2, name: "Sarah Smith", email: "sarah@crm.com", role: ROLES.ADMIN, avatar: null },
    { id: 3, name: "Mike Ross", email: "mike@crm.com", role: ROLES.TEAM, avatar: null },
    { id: 4, name: "Jessica Pearson", email: "jessica@crm.com", role: ROLES.SUPER_ADMIN, avatar: null },
    { id: 5, name: "Rachel Zane", email: "rachel@crm.com", role: ROLES.EMPLOYEE, avatar: null },
  ]);

  const updateUserRole = (userId, newRole, adminName = "Super Admin") => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        // Create a log entry for this action
        addLog({
          action: "Role Updated",
          user: adminName,
          target: u.name,
          type: "warning",
          details: `Changed role from ${u.role} to ${newRole}`
        });
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  // --- 3. Work Assignments Simulation ---
  const [assignments, setAssignments] = useState([]);

  const assignTask = (task, adminName = "Super Admin") => {
     setAssignments(prev => [...prev, { ...task, id: Date.now(), status: 'Pending' }]);
     addLog({
       action: "Task Assigned",
       user: adminName,
       target: task.assignee,
       type: "success",
       details: `Assigned task: "${task.title}"`
     });
  };

  return (
    <MockDataContext.Provider value={{ 
      logs, addLog, 
      users, updateUserRole, 
      assignments, assignTask 
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
