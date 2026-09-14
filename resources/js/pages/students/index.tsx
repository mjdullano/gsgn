import { Form, Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Student = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    program: string;
    gender: string;
    birthday: string;
    year_level: number;
};

type StudentsIndexProps = {
    students: Student[];
};

export default function StudentsIndex({ students }: StudentsIndexProps) {
    return (
        <>
            <Head title="Students" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Students</h1>
                    <p className="text-muted-foreground">Manage your student records.</p>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-background dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 bg-muted/40 dark:border-sidebar-border">
                            <tr>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Program</th>
                                <th className="px-4 py-3 font-medium">Year level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-8 text-center text-muted-foreground" colSpan={4}>
                                        No students found.
                                    </td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr
                                        className="border-b border-sidebar-border/50 last:border-0 dark:border-sidebar-border/70"
                                        key={student.id}
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {student.first_name} {student.last_name}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">{student.email}</td>
                                        <td className="px-4 py-3">{student.program}</td>
                                        <td className="px-4 py-3">{student.year_level}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-background p-5 dark:border-sidebar-border">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold">Add student</h2>
                        <p className="text-sm text-muted-foreground">Create a new student record.</p>
                    </div>

                    <Form action="/students" method="post" className="grid gap-4 md:grid-cols-2">
                        {({ processing, errors }) => (
                            <>
                                <StudentField label="First name" name="first_name" error={errors.first_name} />
                                <StudentField label="Last name" name="last_name" error={errors.last_name} />
                                <StudentField label="Email" name="email" type="email" error={errors.email} />
                                <StudentField label="Program" name="program" error={errors.program} />
                                <StudentField label="Gender" name="gender" error={errors.gender} />
                                <StudentField label="Birthday" name="birthday" type="date" error={errors.birthday} />
                                <StudentField label="Year level" name="year_level" type="number" min={1} max={12} error={errors.year_level} />
                                <div className="flex items-end md:justify-end">
                                    <Button type="submit" disabled={processing} className="w-full md:w-auto">
                                        {processing && <Spinner />}
                                        Add student
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

function StudentField({
    label,
    name,
    error,
    type = 'text',
    min,
    max,
}: {
    label: string;
    name: string;
    error?: string;
    type?: string;
    min?: number;
    max?: number;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>
            <Input id={name} name={name} type={type} min={min} max={max} required aria-invalid={Boolean(error)} />
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

StudentsIndex.layout = {
    breadcrumbs,
};
