"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    useComboboxAnchor,
    ComboboxValue,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput
} from "@/components/ui/combobox";
import {
    Field,
    FieldDescription, 
    FieldGroup, 
    FieldLabel 
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SchoolClass } from "@/hooks/useClasses";
import { Button } from "@/components/ui/button";
import { ID, tablesDB } from "@/lib/appwrite";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ANNOUNCEMENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_ANNOUNCEMENTS_TABLE_ID!;

const roles: string[] = [
    "student",
    "teacher",
    "parent"
];

interface Props {
    classes: SchoolClass[]
};

export function AnnouncementForm({ classes }: Props) {
    const anchorClasses = useComboboxAnchor();
    const anchorRoles = useComboboxAnchor();
    const [classValue, setClassValue] = React.useState<string[]>([]);
    const [targetValue, setTargetValue] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(false);
    const { user } = useAuth();

    const classIds = classes.map(c => c.$id);

    const handlePost = async(event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const promise = tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: ANNOUNCEMENTS_TABLE_ID,
            rowId: ID.unique(),
            data: {
                title: formData.get("title") as string,
                content: formData.get("content") as string,
                targetRoles: targetValue,
                targetClasses: classValue,
                author: user?.id
            }
        });

        promise.then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });

        setOpen(false);
    }

    return (
        <Dialog modal={false} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus /> New Announcement</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handlePost}>
                    <DialogHeader>
                        <DialogTitle>Post an announcement</DialogTitle>
                        <DialogDescription>
                            Compose and post an announcement using the form below.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input id="title" name="title" placeholder="New Announcement" />
                        </Field>
                        <Field>
                            <FieldLabel>Content</FieldLabel>
                            <Textarea id="content" name="content" placeholder="Type your announcement here." />
                        </Field>
                        <Separator />
                        <Field>
                            <FieldLabel>Target Roles</FieldLabel>
                            <FieldDescription>
                                Please select the roles this announcement targets.
                            </FieldDescription>
                            <Combobox
                                multiple
                                items={roles}
                                value={targetValue}
                                onValueChange={setTargetValue}
                            >
                                <ComboboxChips ref={anchorRoles}>
                                    <ComboboxValue>
                                        {targetValue.map((item) => (
                                            <ComboboxChip key={item}>{item}</ComboboxChip>
                                        ))}
                                    </ComboboxValue>
                                    <ComboboxChipsInput placeholder="Select Roles" />
                                </ComboboxChips>
                                <ComboboxContent anchor={anchorRoles}>
                                    <ComboboxEmpty>No roles found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem key={item} value={item}>
                                                {item}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </Field>
                        <Field>
                            <FieldLabel>Target Classes</FieldLabel>
                            <FieldDescription>
                                Please select the classes this announcement targets. Note that only the above selected roles who are a part of the following classes will be able to see this announcement.
                            </FieldDescription>
                            <Combobox
                                multiple
                                items={classIds}
                                value={classValue}
                                onValueChange={setClassValue}
                            >
                                <ComboboxChips ref={anchorClasses}>
                                    <ComboboxValue>
                                        {classValue.map((item) => (
                                            <ComboboxChip key={item}>{item}</ComboboxChip>
                                        ))}
                                    </ComboboxValue>
                                    <ComboboxChipsInput placeholder="Select Classes" />
                                </ComboboxChips>
                                <ComboboxContent anchor={anchorClasses}>
                                    <ComboboxEmpty>No classes found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem key={item} value={item}>
                                                {item}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="destructive">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Post announcement</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}