import { LotPageLayout, LotPagePictures, LotPageSidePanel } from "@/widgets/lotPage";
import { apiBaseUrl } from "@/shared/config";

export default async function LotPage({ params }: {
    params: Promise<{[key: string]: string | undefined}>
}) {
    const { lotId } = await params
    if (!lotId) {
        return <p>Лот не найден</p>
    }
    const res = await fetch(`${apiBaseUrl}/lots/getLotById?lotId=${lotId}`);
    const lot = await res.json();

    console.log(lot);
    return (
        <LotPageLayout
            pictures={
                <LotPagePictures 
                    pictures={lot.pictures}
                />
            }
            sidePanel={<LotPageSidePanel />}
        >
            content
        </LotPageLayout>
    )
}