import React from 'react';
import { X, Moon, Sun, Check, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeModal = ({ isOpen, onClose }) => {
    const { isDarkMode, toggleTheme, currentThemeColor, changeThemeColor } = useTheme();

    if (!isOpen) return null;

    const colorOptions = [
        { name: 'Sky Blue', value: '#66CCFF' }, // Default
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Emerald', value: '#10B981' },
        { name: 'Rose', value: '#F43F5E' },
        { name: 'Amber', value: '#F59E0B' },
        { name: 'Cyan', value: '#06B6D4' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`
        w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform scale-100 animate-in zoom-in-95 duration-200
        ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}
      `}>
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                            <Palette size={20} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                        </div>
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Theme Settings</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">

                    {/* Dark Mode Toggle */}
                    <div className="space-y-4">
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Appearance</h4>
                        <div className={`
              p-1 rounded-xl flex items-center gap-1 border
              ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}
            `}>
                            <button
                                onClick={() => isDarkMode && toggleTheme()}
                                className={`
                  flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all
                  ${!isDarkMode
                                        ? 'bg-white shadow-sm text-gray-800'
                                        : 'text-gray-400 hover:text-gray-200'}
                `}
                            >
                                <Sun size={18} />
                                Light
                            </button>
                            <button
                                onClick={() => !isDarkMode && toggleTheme()}
                                className={`
                  flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all
                  ${isDarkMode
                                        ? 'bg-gray-700 shadow-sm text-white'
                                        : 'text-gray-500 hover:text-gray-700'}
                `}
                            >
                                <Moon size={18} />
                                Dark
                            </button>
                        </div>
                    </div>

                    {/* Color Palette */}
                    <div className="space-y-4">
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Brand Color</h4>
                        <div className="grid grid-cols-3 gap-3">
                            {colorOptions.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => changeThemeColor(color.value)}
                                    className={`
                     relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                     ${currentThemeColor === color.value
                                            ? `border-[${color.value}] bg-[${color.value}]/10`
                                            : isDarkMode ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'}
                   `}
                                    style={{ borderColor: currentThemeColor === color.value ? color.value : undefined }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full shadow-sm"
                                        style={{ backgroundColor: color.value }}
                                    ></div>
                                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{color.name}</span>

                                    {currentThemeColor === color.value && (
                                        <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm">
                                            <Check size={10} style={{ color: color.value }} strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className={`p-6 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-gray-50'}`}>
                    <button
                        onClick={onClose}
                        className={`w-full py-3 rounded-xl font-bold text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all`}
                        style={{ backgroundColor: currentThemeColor }}
                    >
                        Done
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ThemeModal;
