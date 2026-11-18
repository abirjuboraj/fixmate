import { requireRole } from "@/lib/server"

const CustomerLayout = async({children}: {children: React.ReactNode}) => {
    await requireRole("admin")
    return children;
}

export default CustomerLayout;