interface BadgeProps {
  props: {
    badgeStyle: string;
    icon: string;

  },
  amount: number;
}

export function Badge({props, amount} :BadgeProps) {
  return (
    <div className={`relative w-7 h-7 rounded-md flex justify-center items-center ${props.badgeStyle}`}>
      <div className="absolute top-0 left-0 bg-red-600 text-white text-[11px] font-bold flex items-center justify-center rounded-full w-4 h-4 transform -translate-x-1/2 -translate-y-1/2">{amount}</div>
      <img src={props.icon} className="w-5 h-5" alt="" />
    </div>
  );
};
