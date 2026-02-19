import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb';
import { ListView } from '@/components/refine-ui/views/list-view';
import React, { useState } from 'react';
import { Input, Select, SelectContent, SelectTrigger,SelectValue, SelectItem,Department_Options,} from '@/components/refine-ui';
import {Search} from "lucide-react";
import { CreateButton,} from "@refinedev/antd";
import { DataTable } from '@/components/refine-ui/data-table/data-table';
// list.tsx mein ye wala import karein
import { useTable } from "@refinedev/react-table";
import { Subject } from '@/Types'; // Agar folder ka naam 'types' hai
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from "@/components/ui/badge";



function Subjectslist() {
    const [searchQuery, setSearchQuery] = useState("");
    const[selecteddepartment,setSelectedDepartment] = useState("all");  
    const departmentFilter = selecteddepartment !== "all" ? [{ field: "department", operator: "eq" as const, value: selecteddepartment }] : [];
 const searchfilters = searchQuery ? [{ field: "name", operator: "contains" as const, value: searchQuery }] : [];
const subjectTable = useTable<Subject>({
     columns: useMemo<ColumnDef<Subject>[]>(() => [
       { 
    id: "code",
    accessorKey: "code",
    size: 100,
    header: () => <p className="column-title ml-2">Code</p>,
    // Is niche wali line ko change karein
    cell: ({ getValue }) => (
        <Badge variant="outline" className="text-black border-black">
            {getValue<string>()}
        </Badge>
    )
},
        { id: "name",
             accessorKey: "name",
             size:200,
             header:() => <p className="column-title ml-2">Name</p>,
             cell:({getValue}) =><span className="text-foreground">{getValue<string>()}</span>,
             filterFn:"includesString"},
            {
                id:"department",
                accessorKey:"department",
                size:150,
                header:() => <p className="column-title ">Department</p>,
                cell:({getValue}) =><Badge variant="secondary">{getValue<string>()}</Badge>
            },
            {
                id:"description",
                accessorKey:"description",
                size:300,
                header:() => <p className="column-title ">Description</p>,
                cell:({getValue}) =><span className="truncate line-clamp-2">{getValue<string>()}</span>
            }
], [] ) ,
    refineCoreProps: { 
        resource: "subjects",
        pagination: {
            pageSize: 10,
            mode: "server"},
            filters: {
                permanent: [...departmentFilter, ...searchfilters],
            },
            sorters:{
                initial: [ { field: "id", order: "desc" as const }]
            },
        }

            
    
});

return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title">Subjects List</h1>
            <div className='into-row'>
                <p>quick access to essential metrics and insights</p>
                <div className="action-row">
                    <div className="search-field">
                        <p>Create Subject</p>
                        <Search className="search-icon" />
                        <Input
                            type="text"
                            placeholder="Search by name.."
                            className='pl-10 w-full'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}/>
                        
                    </div>
                    <div className='flex gap-2 w-full sm:w-auto'>
                        <Select value={selecteddepartment}
                        onValueChange={setSelectedDepartment}
                                >
                                    <SelectTrigger>
                                       < SelectValue placeholder ="filter by department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            all departments
                                        </SelectItem>
                                        {Department_Options.map((department) => (
                                            <SelectItem key={department.value} value={department.value}>
                                                {department.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                           
                        </Select>
                        <CreateButton />
                    </div>
                </div>
            </div>
            <DataTable table={subjectTable}/>
        </ListView>
    );
}

export default Subjectslist;
