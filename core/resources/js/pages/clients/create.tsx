import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ROUTES } from '@/constants/routes';
import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import { Loader, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

export interface ValidationErrors {
    [key: string]: string;
}
const Create = () => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', name);
        data.append('company', company);
        data.append('email', email);
        data.append('phone', phone);
        data.append('status', status);

        router.post(ROUTES.clients, data, {
            onBefore: () => {
                setLoading(true);
                setErrors({}); // Reset errors
            },
            onError: (validationErrors: ValidationErrors) => {
                setErrors(validationErrors);
            },
            onFinish: () => {
                setLoading(false);
            }
        })
    }
    return (
        <AdminLayout
            breadcrumbs={[
                {
                    title: 'Dashboard',
                    href: ROUTES.dashboard,
                },
                {
                    title: 'Clients',
                    href: ROUTES.clients,
                },
                {
                    title: 'New',
                    href: ROUTES.clients,
                },
            ]}
        >
            <Head title={'New Client'} />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">New Client</h1>
            <div className={'flex items-center justify-center'}>
                <form onSubmit={handleFormSubmit} className={'w-full space-y-4 rounded-sm border border-gray-800 p-4 shadow-2xl dark:border-gray-600'}>
                    <div className={'space-y-2'}>
                        <Label htmlFor={'client_name'}>Client Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id={'client_name'}
                            type={'text'}
                            name={'client_name'}
                            maxLength={250}
                            placeholder={'Ex: Alan'}
                        />
                        {errors.name && <p className={'text-sm text-red-500'}>{errors.name}</p>}
                    </div>
                    <div className={'space-y-2'}>
                        <Label htmlFor={'company'}>Company</Label>
                        <Input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            id={'company'}
                            type={'text'}
                            name={'company'}
                            maxLength={250}
                            placeholder={'Ex: Webxspark'}
                        />
                        {errors.company && <p className={'text-sm text-red-500'}>{errors.company}</p>}
                    </div>
                    <div className={'space-y-2'}>
                        <div className={'grid grid-cols-2 gap-2'}>
                            <div>
                                <Label htmlFor={'email'}>Email Address</Label>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id={'email'}
                                    type={'email'}
                                    name={'email'}
                                    maxLength={250}
                                    placeholder={'Ex: email@domain.tld'}
                                />
                                {errors.email && <p className={'text-sm text-red-500'}>{errors.email}</p>}
                            </div>
                            <div>
                                <Label htmlFor={'phone'}>Phone Number</Label>
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    id={'phone'}
                                    type={'tel'}
                                    name={'phone'}
                                    placeholder={'Ex: +91 9176XXXXXX'}
                                />
                                {errors.phone && <p className={'text-sm text-red-500'}>{errors.phone}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={'space-y-2'}>
                        <Label htmlFor={'status'}>Client Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder={'New / Followed-up / In Progress / Completed'} />
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
                        {errors.status && <p className={'text-sm text-red-500'}>{errors.status}</p>}
                    </div>
                    <div className={'flex items-center justify-end'}>
                        <Button disabled={loading}>{(loading && <Loader className={'animate-spin'} />) || <Send />} Submit</Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Create;
