import { Label } from '@/components/ui/label'
import { KpiType } from '@/utils/types'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AddUserToKpi from './add_users';
import EditUserKpi from './edit_kpi';

const Kpi = ({ kpi }: { kpi: KpiType }) => {
    return (
        <div className="border p-2 flex flex-col gap-3">
                                <AddUserToKpi kpi_id={kpi.id}/>

            <div className="lg:px-10 pt-3">
                <div className="flex flex-col gap-5 bg-accent/25 p-5 rounded-lg">
                    <KpiItem label="name" value={kpi.name} />
                    <KpiItem label="measurement" value={kpi.measurement} />
                    <KpiItem label="review duration" value={kpi.review_duration} />
                    <KpiItem label="target" value={kpi.target} />
                    <KpiItem label="weight" value={`${kpi.weight.toString()} %`} />
                    <KpiItem label="created at" value={kpi.created_at.slice(0, 10)} />
                    <KpiItem label="updated at" value={kpi.updated_at.slice(0, 10)} />
                </div>
            </div>
            {kpi.users.length > 0 ?
                <div className="flex flex-col">
                    <Label className="text-muted-foreground">Allocated users</Label>
                    <Table>
                        <TableCaption>List of users {kpi.users.length} </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S/N</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>actual</TableHead>
                                <TableHead>weight</TableHead>
                                <TableHead>edit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kpi.users.map((user, index) => {
                                return (
                                    <TableRow key={`${kpi.id}-${user.id}`}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-medium">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user.email}
                                        </TableCell>
                                        <TableCell>
                                            {user.pivot?.actual??"-"}
                                        </TableCell>
                                        <TableCell>
                                            {user.pivot?.review === null?"-": `${user.pivot.review} %`}

                                        </TableCell>
                                        <TableCell>
                                            <EditUserKpi
                                            username={user.email} 
                                            user_id={user.id}
                                            kpi_id={kpi.id}
                                            review={user.pivot.review??undefined}
                                            actual={user.pivot.actual?.toString()??undefined}

                                            />
                                            
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
                : <Label className="text-muted-foreground">no employees in {kpi.name}</Label>
            }
        </div>
    )
}

export default Kpi

function KpiItem({ label, value }: { label: string, value: string }) {
    return <div className="flex justify-between items-center border-b">
        <Label className="text-muted-foreground">{label}</Label>
        <Label className="text-muted-foreground  max-w-[50%]">{value}</Label>
    </div>
}
