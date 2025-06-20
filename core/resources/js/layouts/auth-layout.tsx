import AuthSplitLayout from '@/layouts/auth/auth-split-layout';
import { ReactNode } from 'react';

export default function AuthLayout({ children, title, description, ...props }: { children: ReactNode; title: string; description: string }) {
    return (
        <AuthSplitLayout title={title} description={description} {...props}>
            {children}
        </AuthSplitLayout>
    );
}
