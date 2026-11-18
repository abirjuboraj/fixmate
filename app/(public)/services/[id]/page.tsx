import { getPublicServiceDetails } from '@/lib/api/services';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const service = await getPublicServiceDetails(id);


    return (
        <div>service detail spage</div>
    )
}
