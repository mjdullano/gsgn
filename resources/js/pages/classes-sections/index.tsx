import { Form, Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type ClassSection = {
    id: number;
    name: string;
    program: string;
    year_level: number;
    room: string;
    schedule: string;
};

type ClassesSectionsIndexProps = {
    classesSections?: ClassSection[];
};

export default function ClassesSectionsIndex({
    classesSections = [],
}: ClassesSectionsIndexProps) {
    return (
        <>
            <Head title="Classes/Sections" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Classes / Sections
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your classes and sections.
                        </p>
                    </div>
                    <Button
                        type="button"
                        onClick={() => {
                            document
                                .getElementById('add-class-section-form')
                                ?.scrollIntoView({ behavior: 'smooth' });
                            document.getElementById('name')?.focus();
                        }}
                    >
                        <Plus className="mr-2 size-4" />
                        Add class / section
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-background dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 bg-muted/40 dark:border-sidebar-border">
                            <tr>
                                <th className="px-4 py-3 font-medium">
                                    Class / Section
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Program
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Year level
                                </th>
                                <th className="px-4 py-3 font-medium">Room</th>
                                <th className="px-4 py-3 font-medium">
                                    Schedule
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {classesSections.length === 0 ? (
                                <tr>
                                    <td
                                        className="px-4 py-8 text-center text-muted-foreground"
                                        colSpan={5}
                                    >
                                        No classes or sections found.
                                    </td>
                                </tr>
                            ) : (
                                classesSections.map((item) => (
                                    <tr
                                        className="border-b border-sidebar-border/50 last:border-0 dark:border-sidebar-border/70"
                                        key={item.id}
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {item.program}
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.year_level}
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.room}
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.schedule}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div
                    id="add-class-section-form"
                    className="rounded-xl border border-sidebar-border/70 bg-background p-5 dark:border-sidebar-border"
                >
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold">
                            Add class / section
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Create a new class or section record.
                        </p>
                    </div>

                    <Form
                        action="/classes-sections"
                        method="post"
                        className="grid gap-4 md:grid-cols-2"
                    >
                        {({ processing, errors }) => (
                            <>
                                <ClassSectionField
                                    label="Class / Section name"
                                    name="name"
                                    placeholder="e.g. BSCS 1-A"
                                    error={errors.name}
                                />
                                <ClassSectionField
                                    label="Program"
                                    name="program"
                                    placeholder="e.g. BS Computer Science"
                                    error={errors.program}
                                />
                                <ClassSectionField
                                    label="Year level"
                                    name="year_level"
                                    type="number"
                                    min={1}
                                    max={12}
                                    placeholder="e.g. 1"
                                    error={errors.year_level}
                                />
                                <ClassSectionField
                                    label="Room"
                                    name="room"
                                    placeholder="e.g. Room 301"
                                    error={errors.room}
                                />
                                <ClassSectionField
                                    label="Schedule"
                                    name="schedule"
                                    placeholder="e.g. MWF 9:00 AM - 10:30 AM"
                                    error={errors.schedule}
                                />
                                <div className="flex items-end md:justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full md:w-auto"
                                    >
                                        {processing && <Spinner />}
                                        Add class / section
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

function ClassSectionField({
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
        title: 'Classes/Sections',
        href: '/classes-sections',
    },
];

ClassesSectionsIndex.layout = {
    breadcrumbs,
};
