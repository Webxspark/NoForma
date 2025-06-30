import { Badge } from '@/components/ui/badge';

const StatusBadge = ({text}: {text: string}) => {
    return (
        <Badge
            className={'capitalize'}
            variant={
                text === 'new'
                    ? 'default'
                    : text === 'followed-up'
                        ? 'destructive'
                        : text === 'in-progress'
                            ? 'outline'
                            : 'secondary'
            }
        >
            {text.replace('-', ' ')}
        </Badge>
    );
};

export default StatusBadge;
