import { Skeleton } from "./ui/skeleton";

export function LoadingSkeleton() {
    return (
        <>
            {Array.from({length: 4,}).map((_, index) => (
                <div key={index} className="flex flex-col p-3 w-full border-2 border-border rounded-md gap-1 relative overflow-hidden">
                    <div className="inline-flex justify-between">
                        <div className="flex flex-row items-center gap-1">
                            <Skeleton className="w-16 h-16 rounded-sm mr-2.5" />
                            <div className='flex flex-col gap-3.5'>
                                <Skeleton className="h-6 w-48" />
                                <div className='flex gap-2'>
                                    <Skeleton className="w-7 h-7 rounded-md" />
                                    <Skeleton className="w-7 h-7 rounded-md" />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <Skeleton className='absolute w-2 top-0 right-0 bottom-0 m-2 rounded-[2px]' />
                </div>
            ))}
        </>
    )
}