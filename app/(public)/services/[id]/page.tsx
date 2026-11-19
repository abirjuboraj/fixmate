
import { notFound } from "next/navigation";
import { getPublicServiceDetails } from "@/lib/api/services";
import { getSession } from "@/lib/server";
import { ServiceDetailItem } from "@/types";
import { ServiceDetailView } from "./_components/service-detail-view";

export default async function ServiceDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // 1. Fetch service data from backend
    let service: ServiceDetailItem | null = null;

    try {
        const result = await getPublicServiceDetails(id);

        service = result?.data ?? null;
    } catch {

        notFound();
    }

    if (
        !service ||
        service.approvalStatus !== "approved" ||
        service.isAvailable !== true
    ) {
        notFound();
    }

    const session = await getSession();

    const userRole = (session?.user?.role as string) ?? null;
    // Session identity for the request modal's read-only Name/Email fields
    const userName = (session?.user?.name as string) ?? "";
    const userEmail = (session?.user?.email as string) ?? "";

    return (
        <ServiceDetailView
            service={service}
            userRole={userRole}
            userName={userName}
            userEmail={userEmail}
            serviceId={id}
        />
    );
}
