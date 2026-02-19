import { GetListParams, GetListResponse, BaseRecord, DataProvider } from '@refinedev/core';

// Line 2 (import dataProvider) ko delete kar dein

export const dataProvider: DataProvider = {
    getList: async <TData extends BaseRecord = BaseRecord>({ 
        resource 
    }: GetListParams): Promise<GetListResponse<TData>> => {
        
        if (resource === 'subjects') {
            return {
                data: [
                    {
                        id: 1,
                        code: "CS-101",
                        name: "Computer Science",
                        department: "IT",
                        description: "Introduction to fundamental concepts of computing."
                    },
                    {
                        id: 2,
                        code: "MATH-202",
                        name: "Advanced Calculus",
                        department: "Mathematics",
                        description: "Study of limits, derivatives, and integrals of functions."
                    },
                    {
                        id: 3,
                        code: "PHY-301",
                        name: "Quantum Physics",
                        department: "Science",
                        description: "Exploration of physical phenomena at microscopic scales."
                    }
                ] as any,
                total: 3,
            };
        }

        return {
            data: [],
            total: 0,
        };
    },

    getOne: async () => { throw new Error("Not implemented") },
    getApiUrl: () => "",
    // Refine ko kabhi kabhi in empty methods ki bhi zaroorat hoti hai errors hatane ke liye:
    create: async () => { throw new Error("Not implemented") },
    update: async () => { throw new Error("Not implemented") },
    deleteOne: async () => { throw new Error("Not implemented") },
};