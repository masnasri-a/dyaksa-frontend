
"use client";

import Headers from "../common/header"

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Headers />
            <main>{children}</main>
        </>
    )
}