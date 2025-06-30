import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { ReactNode } from 'react';
interface AdminLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}
const AdminLayout = ({ children, breadcrumbs, ...props }: AdminLayoutProps) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs} {...props}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">{children}</div>
        </AppLayout>
    );
};

export default AdminLayout;
