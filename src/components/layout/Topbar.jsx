import { LayoutDashboard, ChevronDown, Search, Bell } from 'lucide-react';

export const Topbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#03045E] via-[#0077B6] to-[#00B4D8] shadow-xl border-b-4 border-[#CAF0F8]/30 sticky top-0 z-30">
      <div className="px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CAF0F8] to-[#90E0EF] flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <LayoutDashboard className="text-[#03045E]" size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
                <p className="text-xs text-[#CAF0F8] font-medium">CRM Management System</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search..."
                className="w-72 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-[#CAF0F8] focus:outline-none focus:border-[#CAF0F8] focus:bg-white/20 transition-all duration-300"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CAF0F8]" size={20} />
            </div>

            {/* Notifications */}
            <button className="relative p-3 rounded-xl bg-white/10 hover:bg-white/20 border-2 border-transparent hover:border-white/30 transition-all duration-300 group">
              <Bell className="text-[#CAF0F8] group-hover:text-white transition-colors" size={22} strokeWidth={2.5} />
              <span className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-[#03045E] animate-pulse"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-transparent hover:border-white/30 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CAF0F8] to-[#90E0EF] flex items-center justify-center font-black text-[#03045E] shadow-lg group-hover:scale-110 transition-transform duration-300">
                AS
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-white">Admin User</p>
                <p className="text-xs text-[#CAF0F8]">Super Admin</p>
              </div>
              <ChevronDown size={18} className="text-[#CAF0F8] group-hover:text-white transition-colors" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};