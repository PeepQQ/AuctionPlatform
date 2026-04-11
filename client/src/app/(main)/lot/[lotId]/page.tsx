import { LotPageLayout, LotPagePictures, LotPageSidePanel, LotPageContent } from "@/widgets/lotPage";
import { apiBaseUrl } from "@/shared/config";
import type { Lot } from "@/entities/lot";

export default async function LotPage({ params }: {
    params: Promise<{[key: string]: string | undefined}>
}) {
    const { lotId } = await params
    const res = await fetch(`${apiBaseUrl}/lots/getLotById?lotId=${lotId}`);
    const lot = await res.json() as Lot;

    if(!lot?.id) {
        return <p>Лот не найден</p>
    }

    return (
        <LotPageLayout
            pictures={
                <LotPagePictures 
                    pictures={lot.pictures}
                />
            }
            sidePanel={<LotPageSidePanel lot={lot} />}
        >
            <LotPageContent lotId={lot.id}/>
        </LotPageLayout>
    )
}