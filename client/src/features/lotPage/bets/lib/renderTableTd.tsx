import type { betsListTHeadItem } from "../config/config";
import type { Bet } from "@/entities/bet";
import { Td } from "@/shared/ui/table";


interface RenderTableTdProps {
    item: betsListTHeadItem;
    bet: Bet;
}

export const renderTableTd = ({
    item,
    bet
}: RenderTableTdProps) => {


    return (
        <Td key={item.id}>
            {
                item?.parseFn ? 
                    item.parseFn(bet[item.dataKey].toString())
                    : bet[item.dataKey]
            }
        </Td>
    )
}