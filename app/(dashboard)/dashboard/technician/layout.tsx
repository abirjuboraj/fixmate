import { requireRole } from "@/lib/server"

const TechnicianLayout = async({children}: {children: React.ReactNode}) => {
    await requireRole("admin")
    return children;
}

export default TechnicianLayout;