import { useState, useMemo } from 'react';

const useInsurancePlans = () => {
    const [plans, setPlans] = useState([
        { id: 1, name: 'Gold Health Plan', provider: 'LIC', coverage: '$500,000', duration: '1 Year', status: 'Active', code: 'INS-101', premium: '$250/mo' },
        { id: 2, name: 'Silver Life Cover', provider: 'HDFC', coverage: '$200,000', duration: '2 Years', status: 'Active', code: 'INS-102', premium: '$150/mo' },
        { id: 3, name: 'Basic Medical', provider: 'SBI', coverage: '$100,000', duration: '1 Year', status: 'Inactive', code: 'INS-103', premium: '$80/mo' },
        { id: 4, name: 'Family Shield', provider: 'ICICI', coverage: '$1,000,000', duration: '3 Years', status: 'Active', code: 'INS-104', premium: '$400/mo' },
        { id: 5, name: 'Senior Citizen Care', provider: 'Star Health', coverage: '$300,000', duration: '1 Year', status: 'Active', code: 'INS-105', premium: '$200/mo' },
        { id: 6, name: 'Accident Guard', provider: 'Bajaj Allianz', coverage: '$50,000', duration: '1 Year', status: 'Inactive', code: 'INS-106', premium: '$50/mo' },
        { id: 7, name: 'Child Future Plan', provider: 'LIC', coverage: '$1,500,000', duration: '10 Years', status: 'Active', code: 'INS-107', premium: '$100/mo' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    const handleSort = (value) => {
        if (!value) {
            setSortConfig({ key: '', direction: '' });
            return;
        }
        const [key, direction] = value.split('-');
        setSortConfig({ key, direction });
    };

    const filteredPlans = useMemo(() => {
        return plans.filter(plan => {
            const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                plan.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                plan.code.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All' || plan.status === statusFilter;
            return matchesSearch && matchesStatus;
        }).sort((a, b) => {
            if (!sortConfig.key) return 0;

            const getValue = (item, key) => {
                let val = item[key];
                if (typeof val === 'string') {
                    if (val.includes('$')) {
                        return parseFloat(val.replace(/[^0-9.-]+/g, ''));
                    }
                }
                return val;
            };

            const aVal = getValue(a, sortConfig.key);
            const bVal = getValue(b, sortConfig.key);

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [plans, searchTerm, statusFilter, sortConfig]);

    const addPlan = (newPlan) => {
        const planWithId = {
            ...newPlan,
            id: plans.length + 1,
            code: `INS-${100 + plans.length + 1}`
        };
        setPlans(prev => [...prev, planWithId]);
    };

    const updatePlan = (updatedPlan) => {
        setPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    };

    const deletePlan = (id) => {
        setPlans(prev => prev.filter(p => p.id !== id));
    };

    return {
        plans,
        filteredPlans,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        sortConfig,
        handleSort,
        addPlan,
        updatePlan,
        deletePlan
    };
};

export default useInsurancePlans;
