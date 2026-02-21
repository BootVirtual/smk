"use client";

import * as React from "react";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    useComboboxAnchor,
    ComboboxValue,
    ComboboxChip
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

const roles: string[] = [
    "student",
    "teacher",
    "parent"
];

interface Props {
    classes: SchoolClass[]
};

export function AnnouncementForm({ classes }: Props) {
    const anchor = useComboboxAnchor();

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Post an announcement</DialogTitle>
                <DialogDescription>
                    Compose and post an announcement using the form below.
                </DialogDescription>
            </DialogHeader>
            <FieldGroup>
                <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input id="title" placeholder="New Announcement" />
                </Field>
                <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea id="content" placeholder="Type your announcement here." />
                </Field>
                <Separator />
                <Field>
                    <FieldLabel>Target Roles</FieldLabel>
                    <FieldDescription>
                        Please select the roles this announcement targets.
                    </FieldDescription>
                    <Combobox
                        items={roles}
                    >
                        <ComboboxInput placeholder="Select Roles" />
                        <ComboboxContent>
                            <ComboboxEmpty>No roles found.</ComboboxEmpty>
                            <ComboboxList>
                                {(roles) => (
                                    <ComboboxItem key={roles} value={roles}>
                                        {roles}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>
                <Field>
                    <FieldLabel>Target Classes</FieldLabel>
                    <FieldDescription>
                        Please select the classes this announcement targets. Please note that only the above selected roles who are a part of the following classes will be able to see this announcement.
                    </FieldDescription>
                    <Combobox
                        multiple
                        items={classes}
                        itemToStringValue={(c: SchoolClass) => c.$id}

                    >
                        <ComboboxValue>
                            {(values) => (
                                <React.Fragment>
                                    {values.map((value: string) => (
                                        <ComboboxChip key={value}>{value}</ComboboxChip>
                                    ))}
                                </React.Fragment>
                            )}
                        </ComboboxValue>
                        <ComboboxContent>
                            <ComboboxEmpty>No classes found.</ComboboxEmpty>
                            <ComboboxList>
                                {(classes) => (
                                    <ComboboxItem key={classes.$id} value={classes}>
                                        {classes.$id} - ({classes.headTeacherFullName})
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
        </DialogContent>
    )
}