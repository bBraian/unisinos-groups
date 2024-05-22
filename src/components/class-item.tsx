export function ClassItem({name, key}: any) {
  return (
    <div className="flex flex-col p-4 w-full border-2 border-border rounded-md gap-1 relative hover:bg-accent">
      <div className="inline-flex justify-between">
        <div className="flex flex-row items-center gap-1">
          <h3 className="font-semibold text-lg h-full hover:cursor-pointer hover:text-slate-500">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};
