import type { betsListTHeadItem } from "../config/config";
import type { Bet } from "@/entities/bet";



interface RenderTableTdProps {
    item: betsListTHeadItem;
    bet: Bet;
    className: string;
}

export const renderTableTd = ({
    item,
    bet,
    className
}: RenderTableTdProps) => {


    return (
        <td key={item.id} className={className}>
            {
                item?.parseFn ? 
                    item.parseFn(bet[item.dataKey].toString())
                    : bet[item.dataKey]
            }
        </td>
    )
}