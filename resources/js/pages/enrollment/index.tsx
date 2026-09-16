import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

export default function EnrollmentIndex() {
    return (
        <>
            <Head title="Enrollment" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Enrollment
                    </h1>
                    <p className="text-muted-foreground">
                        Manage student enrollment records.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-background p-6 dark:border-sidebar-border">
                    <p className="text-sm text-muted-foreground">
                        No enrollment records found.
                    </p>
                </div>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Enrollment',
        href: '/enrollment',
    },
];

EnrollmentIndex.layout = {
    breadcrumbs,
};

