import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout';
import { DashboardPage } from './components/dashboard';
import InsuranceDashboard from './pages/insurance/Insurance';
import InsuranceList from './components/insurance/InsuranceList';

import Claims from './pages/insurance/Claims';
import Renewals from './pages/insurance/Renewals';
import InsuranceCompanies from './pages/insurance/InsuranceCompanies';
import InsuranceReports from './pages/insurance/InsuranceReports';
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffList from './pages/staff/StaffList';
import Roles from './pages/staff/Roles';
import Departments from './pages/staff/Departments';
import ActivityLogs from './pages/staff/ActivityLogs';
import { menuItems } from './constants/routes';
import {
    RolePermissionDashboard,
    RolesList,
    CreateRole,
    PermissionMatrix,
    AssignRole
} from './pages/rolePermison/index';
import TeamsDashboard from './pages/teams/TeamsDashboard';
import TeamsList from './pages/teams/TeamsList';
import CreateTeam from './pages/teams/CreateTeam';
import TeamDetails from './pages/teams/TeamDetails';
import TeamActivity from './pages/teams/TeamActivity';
import EmployeeDashboard from './pages/employees/EmployeeDashboard';
import EmployeeList from './pages/employees/EmployeeList';
import AddEmployee from './pages/employees/AddEmployee';
import EmployeeDetails from './pages/employees/EmployeeDetails';
import EmployeeActivity from './pages/employees/EmployeeActivity';
import TeamAssignmentPage from './pages/employees/TeamAssignmentPage';
import Login from './auth/login';

const AppRouter = ({ isAuthenticated, onLogin, onLogout }) => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Login Route */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Login onLogin={onLogin} />
                        )
                    }
                />

                {/* Authenticated Routes */}
                {isAuthenticated ? (
                    <Route
                        path="/*"
                        element={
                            <MainLayout menuItems={menuItems} title="CRM Dashboard" onLogout={onLogout}>
                                <Routes>
                                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                    <Route path="/dashboard" element={<DashboardPage />} />
                                    <Route path="/insurance" element={<InsuranceDashboard />} />
                                    <Route path="/insurance/list" element={<InsuranceList />} />
                                    <Route path="/insurance/claims" element={<Claims />} />
                                    <Route path="/insurance/renewals" element={<Renewals />} />
                                    <Route path="/insurance/companies" element={<InsuranceCompanies />} />
                                    <Route path="/insurance/reports" element={<InsuranceReports />} />
                                    {/* Staff Routes */}
                                    <Route path="/staff" element={<StaffDashboard />} />
                                    <Route path="/staff/list" element={<StaffList />} />
                                    <Route path="/staff/roles" element={<Roles />} />
                                    <Route path="/staff/departments" element={<Departments />} />
                                    <Route path="/staff/logs" element={<ActivityLogs />} />
                                    {/* Teams Routes */}
                                    <Route path="/teams" element={<TeamsDashboard />} />
                                    <Route path="/teams/list" element={<TeamsList />} />
                                    <Route path="/teams/create" element={<CreateTeam />} />
                                    <Route path="/teams/edit/:id" element={<CreateTeam />} />
                                    <Route path="/teams/details/:id" element={<TeamDetails />} />
                                    <Route path="/teams/activity" element={<TeamActivity />} />

                                    {/* Employee Routes */}
                                    <Route path="/employees" element={<EmployeeDashboard />} />
                                    <Route path="/employees/list" element={<EmployeeList />} />
                                    <Route path="/employees/add" element={<AddEmployee />} />
                                    <Route path="/employees/details/:id" element={<EmployeeDetails />} />
                                    <Route path="/employees/activity" element={<EmployeeActivity />} />
                                    <Route path="/employees/assignments" element={<TeamAssignmentPage />} />

                                    {/* Role & Permission Routes */}
                                    <Route path="/rolepermison" element={<RolePermissionDashboard />} />
                                    <Route path="/rolepermison/list" element={<RolesList />} />
                                    <Route path="/rolepermison/create" element={<CreateRole />} />
                                    <Route path="/rolepermison/edit/:id" element={<CreateRole />} />
                                    <Route path="/rolepermison/matrix" element={<PermissionMatrix />} />
                                    <Route path="/rolepermison/assign" element={<AssignRole />} />

                                    {/* Catch-all for authenticated users */}
                                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                                </Routes>
                            </MainLayout>
                        }
                    />
                ) : (
                    /* If not authenticated, any other path redirects to the login page. */
                    <Route path="*" element={<Navigate to="/login" replace />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
