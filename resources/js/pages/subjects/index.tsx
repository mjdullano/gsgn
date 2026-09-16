import { Form, Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Subject = {
    id: number;
    code: string;
    name: string;
    units: number;
    semester: string;
};

type SubjectsIndexProps = {
    subjects?: Subject[];
};

export default function SubjectsIndex({ subjects = [] }: SubjectsIndexProps) {
    return (
        <>
            <Head title="Subjects" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Subjects
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your subject records.
                        </p>
                    </div>
                    <Button
                        type="button"
                        onClick={() => {
                            document
                                .getElementById('add-subject-form')
                                ?.scrollIntoView({ behavior: 'smooth' });
                            document.getElementById('code')?.focus();
                        }}
                    >
                        <Plus className="mr-2 size-4" />
                        Add subject
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-background dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 bg-muted/40 dark:border-sidebar-border">
                            <tr>
                                <th className="px-4 py-3 font-medium">
                                    Subject code
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Subject name
                                </th>
                                <th className="px-4 py-3 font-medium">Units</th>
                                <th className="px-4 py-3 font-medium">
                                    Semester
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.length === 0 ? (
                                <tr>
                                    <td
                                        className="px-4 py-8 text-center text-muted-foreground"
                                        colSpan={4}
                                    >
                                        No subjects found.
                                    </td>
                                </tr>
                            ) : (
                                subjects.map((subject) => (
                                    <tr
                                        className="border-b border-sidebar-border/50 last:border-0 dark:border-sidebar-border/70"
                                        key={subject.id}
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {subject.code}
                                        </td>
                                        <td className="px-4 py-3">
                                            {subject.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {subject.units}
                                        </td>
                                        <td className="px-4 py-3">
                                            {subject.semester}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div
                    id="add-subject-form"
                    className="rounded-xl border border-sidebar-border/70 bg-background p-5 dark:border-sidebar-border"
                >
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold">Add subject</h2>
                        <p className="text-sm text-muted-foreground">
                            Create a new subject record.
                        </p>
                    </div>

                    <Form
                        action="/subjects"
                        method="post"
                        className="grid gap-4 md:grid-cols-2"
                    >
                        {({ processing, errors }) => (
                            <>
                                <SubjectField
                                    label="Subject code"
                                    name="code"
                                    placeholder="e.g. CS101"
                                    error={errors.code}
                                />
                                <SubjectField
                                    label="Subject name"
                                    name="name"
                                    placeholder="e.g. Data Structures & Algorithms"
                                    error={errors.name}
                                />
                                <SubjectField
                                    label="Units"
                                    name="units"
                                    type="number"
                                    min={1}
                                    max={10}
                                    placeholder="e.g. 3"
                                    error={errors.units}
                                />
                                <SubjectField
                                    label="Semester"
                                    name="semester"
                                    placeholder="e.g. 1st Semester"
                                    error={errors.semester}
                                />
                                <div className="flex items-end md:col-span-2 md:justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full md:w-auto"
                                    >
                                        {processing && <Spinner />}
                                        Add subject
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

function SubjectField({
    label,
    name,
    error,
    type = 'text',
    min,
    max,
    placeholder,
}: {
    label: string;
    name: string;
    error?: string;
    type?: string;
    min?: number;
    max?: number;
    placeholder?: string;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                name={name}
                type={type}
                min={min}
                max={max}
                placeholder={placeholder}
                required
                aria-invalid={Boolean(error)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subjects',
        href: '/subjects',
    },
];

SubjectsIndex.layout = {
    breadcrumbs,
};
