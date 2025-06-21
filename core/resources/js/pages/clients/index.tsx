import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { ROUTES } from '@/constants/routes';
import AdminLayout from '@/layouts/admin-layout';
import { SharedData } from '@/types';
import { IClient } from '@/types/shared';
import { Head, router, usePage } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import error from 'eslint-plugin-react/lib/util/error';
const Clients = () => {
    const { clients, flash } = usePage<SharedData & { clients: IClient[] }>().props;
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash?.success);
        }

        if (flash?.error) {
            toast.error(flash?.error);
        }
    }, [flash]);
    console.log(clients);

    function handleDelete(id: number) {
        if(confirm('Are you sure you want to delete this client?')) {
            router.delete(`${ROUTES.clients}/${id}`, {
                onSuccess: () => {
                    router.reload()
                },
                onError: (error) => {
                    console.error(error);
                }
            })
        }
    }

    return (
        <AdminLayout
            breadcrumbs={[
                { title: 'Dashboard', href: ROUTES.dashboard },
                { title: 'Clients', href: ROUTES.clients },
            ]}
        >
            <Head title={'Clients'} />
            <div className={'flex items-center justify-between'}>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Clients</h1>
                <Button onClick={() => router.visit(`${ROUTES.clients}/create`)}>Add New</Button>
            </div>
            <Table>
                <TableRow>
                    <TableHead className={'w-20'}>S.No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact Information</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quick Actions</TableHead>
                </TableRow>
                <TableBody>
                    {clients.map((value, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1})</TableCell>
                            <TableCell>{value.name}</TableCell>
                            <TableCell>{value.company}</TableCell>
                            <TableCell className={'justify-center-center flex h-full flex-col'}>
                                <a href={`mailto:${value.email}`} target={'_blank'} className={'font-semibold hover:underline'}>
                                    {value.email}
                                </a>
                                <a href={`tel:${value.phone}`} className={'hover:underline'}>
                                    {value.phone}
                                </a>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    className={'capitalize'}
                                    variant={
                                        value.status === 'new'
                                            ? 'default'
                                            : value.status === 'followed-up'
                                              ? 'destructive'
                                              : value.status === 'in-progress'
                                                ? 'outline'
                                                : 'secondary'
                                    }
                                >
                                    {value.status.replace('-', ' ')}
                                </Badge>
                            </TableCell>
                            <TableCell className={'flex items-center gap-2'}>
                                <Button onClick={() => router.visit(`${ROUTES.clients}/${value.id}/edit`)} size={null} variant={'ghost'} className={'p-1 px-2'}>
                                    <Edit />
                                </Button>
                                <Button onClick={() => handleDelete(value.id)} size={null} variant={'destructive'} className={'p-1 px-2'}>
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AdminLayout>
    );
};

export default Clients;
