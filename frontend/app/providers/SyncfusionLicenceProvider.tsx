'use client'

import { registerLicense } from '@syncfusion/ej2-base'

// 🔑 BURAYA kendi license key'in
const key = process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE

if (key) {
  registerLicense(key)
} else {
  console.error('Syncfusion license key not found')
}

export default function SyncfusionLicenceProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}