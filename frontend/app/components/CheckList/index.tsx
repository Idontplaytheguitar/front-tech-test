import { Text } from "@/app/components/Text";

const CheckMarkLight = ({ className }: { className: string }) => {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#001B38" />
    <path d="M16.6663 9.5L10.2497 15.9167L7.33301 13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
}

const CheckMarkDarkViolet = ({ className }: { className: string }) => {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#E2DCF6" />
    <path d="M16.6663 9.5L10.2497 15.9167L7.33301 13" stroke="#001B38" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
}

// Pass an ID from the CMS to avoid generating a unique key. 
export type TextItemWithId = {
  id: string;
  text: string;
}

export type CheckListProps = {
  items: TextItemWithId[];
}

const CheckList = ({ items }: CheckListProps) => {
  return <div className="space-y-xl">
    {items.map((item) => (
      <div key={item.id} className="flex items-center gap-s">
        <CheckMarkLight className="hidden visible-light-theme-only" />
        <CheckMarkDarkViolet className="hidden visible-dark-theme-only" />
        <Text type="p2" className="text-primary">{item.text}</Text>
      </div>
    ))}
  </div>
};

export { CheckList };
