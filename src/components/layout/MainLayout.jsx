import { Topbar } from './Topbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children, menuItems = [], title = 'CRM Dashboard' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 flex flex-col">
        <Topbar title={title} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
