'use client'

import { registerLicense } from '@syncfusion/ej2-base'

// 🔑 BURAYA kendi license key'in
registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE || '')

export default function SyncfusionLicenceProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}