import { sponsorshipPacket } from './sponsorData'
import './SponsorshipPacketPage.css'

export default function SponsorshipPacketPage() {
  return (
    <main className="sponsorship-packet-page">
      <object
        className="sponsorship-packet-page__pdf"
        data={sponsorshipPacket.pdfUrl}
        type="application/pdf"
        aria-label={sponsorshipPacket.label}
      >
        <p>
          <a href={sponsorshipPacket.pdfUrl}>Open the {sponsorshipPacket.label} (PDF)</a>
        </p>
      </object>
    </main>
  )
}
