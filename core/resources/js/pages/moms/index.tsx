import React from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { ROUTES } from '@/constants/routes';

const Index = () => {
    return (
        <AdminLayout
            breadcrumbs={[
                {
                    title: "Dashboard",
                    href: ROUTES.dashboard
                },
                {
                    title: "Session Insights",
                    href: ROUTES.moms
                }
            ]}
        >
            Im MoMs
        </AdminLayout>
    );
};

export default Index;
