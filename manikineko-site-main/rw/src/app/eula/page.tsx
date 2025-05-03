import { Metadata } from 'next'
import Link from 'next/link'
import { NavButton } from '../../components/nav-button'

export const metadata: Metadata = {
  title: 'EULA',
  description: 'End User License Agreement for Manikineko.nl services',
}

export default function EULA() {
  return (
    <div className="rounded-lg bg-gray-800/50 p-6 shadow-lg border border-gray-700">
      <h1 className="text-4xl font-bold mb-6">EULA</h1>
      <div className="space-y-4">
        <h2 className="text-xl mb-4">TL;DR:</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>We reserve the right to edit this agreement.</li>
          <li>Third-party services may be used, and data may be shared.</li>
          <li>Our software is provided &quot;as is&quot;, without warranty.</li>
          <li>We are not responsible for user-created content.</li>
          <li>Allowed mods should not provide unfair advantages.</li>
          <li>Hacking and cheating are prohibited.</li>
          <li>Respect for others is required; discriminatory behavior is not tolerated.</li>
          <li>Disallowed activities lead to service termination.</li>
          <li>We may retain and share data as outlined in the privacy policy.</li>
          <li>Message content may be used for auto-moderation.</li>
          <li>Rules for working with us are outlined.</li>
          <li>Do not use our service for anything discriminatory.</li>
          <li>GDPR notice for data removal.</li>
        </ul>
        <div className="mt-6">
          <NavButton href="/full-eula" className="text-mint hover:underline">
            Click here to Read the EULA fully
          </NavButton>
        </div>
      </div>
    </div>
  )
}

