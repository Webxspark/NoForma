import StatusBadge from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ROUTES } from '@/constants/routes';
import AdminLayout from '@/layouts/admin-layout';
import { SharedData } from '@/types';
import { IMom, TUtilStatus } from '@/types/shared';
import { Head, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import 'github-fork-ribbon-css/gh-fork-ribbon.css';
import { Clock } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

const Index = () => {
    const { moms, flash } = usePage<SharedData & { moms: IMom[] }>().props;
    const [showPreview, setShowPreview] = useState<boolean | IMom>(false);
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash?.success);
        }

        if (flash?.error) {
            toast.error(flash?.error);
        }
    }, [flash]);
    const handleUpdateSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (showPreview && typeof showPreview === 'object') {
            const data = new FormData();
            data.append('status', showPreview.status);
            data.append('id', showPreview.id.toString());
            // Assuming you have an API endpoint to update the mom status
            router.post(route('moms.updateStatus'), data, {
                onSuccess: () => {
                    setShowPreview(false);
                    router.reload();
                },
                onError: (error) => {
                    console.error(error);
                },
            });
        }
    };
    return (
        <AdminLayout
            breadcrumbs={[
                {
                    title: 'Dashboard',
                    href: ROUTES.dashboard,
                },
                {
                    title: 'Session Insights',
                    href: ROUTES.moms,
                },
            ]}
        >
            <Head title={'Session Insights'} />
            <div className={'flex items-center justify-between'}>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Session Insights</h1>
            </div>
            <div className={'grid gap-4 md:grid-cols-2 lg:grid-cols-3'}>
                {moms.map((mom, index) => (
                    <Card className={'w-full'} key={index}>
                        <CardHeader>
                            <div className={'flex items-start justify-between'}>
                                <div className={'flex flex-col gap-2'}>
                                    <CardTitle>{mom.client.name}</CardTitle>
                                    <CardDescription className={'flex items-center gap-1'}>
                                        <Clock className={'size-4'} /> <span className={'font-semibold dark:text-gray-200'}>Last interaction:</span>{' '}
                                        {dayjs(mom.updated_at).format('DD MMMM YYYY')}
                                    </CardDescription>
                                </div>
                                <div>
                                    <StatusBadge text={mom.status} />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            {mom.requirements.length > 100 ? mom.requirements.substring(0, 100) + '... ' : mom.requirements}
                            <CardAction>
                                <Button onClick={() => setShowPreview(mom)} className={'mt-4 w-full'}>
                                    View Details
                                </Button>
                            </CardAction>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Dialog open={showPreview as boolean} onOpenChange={() => setShowPreview(false)}>
                <DialogContent className={'lg:min-w-4xl'}>
                    <DialogHeader className={'flex flex-col items-start justify-between gap-2'}>
                        <DialogTitle>Session Details with {(showPreview as IMom)?.client?.name}</DialogTitle>
                    </DialogHeader>
                    <div className={'max-h-96 overflow-y-scroll'}>
                        <Table>
                            <TableCaption className={''}>
                                <form onSubmit={handleUpdateSubmit} className={'flex items-center justify-start gap-2 pr-3'}>
                                    <Select
                                        value={(showPreview as IMom)?.status}
                                        onValueChange={(value) => {
                                            if (showPreview && typeof showPreview === 'object') {
                                                setShowPreview({
                                                    ...showPreview,
                                                    status: value as TUtilStatus,
                                                });
                                            }
                                        }}
                                    >
                                        <SelectTrigger className={'w-48'}>
                                            <SelectValue placeholder={'Status'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={'new'}>
                                                <Badge variant={'default'}>New</Badge>
                                            </SelectItem>
                                            <SelectItem value={'followed-up'}>
                                                <Badge variant={'destructive'}>Followed-up</Badge>
                                            </SelectItem>
                                            <SelectItem value={'in-progress'}>
                                                <Badge variant={'outline'}>In Progress</Badge>
                                            </SelectItem>
                                            <SelectItem value={'completed'}>
                                                <Badge variant={'secondary'}>Completed</Badge>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button>Update</Button>
                                </form>
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Props</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(showPreview as IMom).map(([key, value], index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1})</TableCell>
                                        <TableCell className={'capitalize'}>{key.replace(/_/g, ' ')}</TableCell>
                                        <TableCell className={'break-words whitespace-pre-wrap'}>
                                            {typeof value === 'string' ? (
                                                value
                                            ) : (
                                                <pre className={'break-words whitespace-pre-wrap'}>{JSON.stringify(value, null, 2)}</pre>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default Index;
