import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout';
import { DashboardPage } from './components/dashboard';
import InsuranceDashboard from './pages/insurance/Insurance';
import InsuranceList from './components/insurance/InsuranceList';
import AssignPolicy from './components/insurance/AssignPolicy';
import Claims from './pages/insurance/Claims';
import Renewals from './pages/insurance/Renewals';
import InsuranceCompanies from './pages/insurance/InsuranceCompanies';
import InsuranceReports from './pages/insurance/InsuranceReports';
import { menuItems } from './constants/routes';
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffList from './pages/staff/StaffList';
import Roles from './pages/staff/Roles';
import Departments from './pages/staff/Departments';
import ActivityLogs from './pages/staff/ActivityLogs';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainLayout menuItems={menuItems} title="CRM Dashboard">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/insurance" element={<InsuranceDashboard />} />
          <Route path="/insurance/list" element={<InsuranceList />} />
          <Route path="/insurance/assign" element={<AssignPolicy />} />
          <Route path="/insurance/claims" element={<Claims />} />
          <Route path="/insurance/renewals" element={<Renewals />} />
          <Route path="/insurance/companies" element={<InsuranceCompanies />} />
          <Route path="/insurance/reports" element={<InsuranceReports />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/staff/list" element={<StaffList />} />
          <Route path="/staff/roles" element={<Roles />} />
          <Route path="/staff/departments" element={<Departments />} />
          <Route path="/staff/logs" element={<ActivityLogs />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
