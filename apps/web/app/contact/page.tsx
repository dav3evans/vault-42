import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, ContactItem, FaqAccordion, InquiryForm } from "@vault42/ui";
import { siteContact } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Location, directions, FAQs and how to get in touch with Vault 42.",
};

const faqs = [
  {
    question: "What age is laser tag suitable for?",
    answer: "Laser tag is suitable for ages 7 and up. Younger Explorers can join the Wasteland Warriors Kids Club sessions, which run every Saturday and Sunday at 10:20 AM.",
  },
  {
    question: "Do I need to book in advance?",
    answer: "We recommend booking or calling ahead to guarantee your slot, especially for weekends, parties and group bookings.",
  },
  {
    question: "Can I book a mixed laser tag and axe throwing session?",
    answer: "Yes — the Skull Temple party package combines both. Outside of parties, get in touch and we'll see what we can put together.",
  },
  {
    question: "Is there parking on site?",
    answer: "Yes, free parking is available directly outside the venue at Closers Business Centre.",
  },
];

export default function ContactPage() {
  const mapQuery = encodeURIComponent(siteContact.address);

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        heading={
          <>
            Get in touch with <Accent>Vault 42</Accent>
          </>
        }
        description="Questions about a booking, a corporate event or anything else — here's every way to reach us."
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16 lg:grid-cols-[1fr_1fr]">
        <Panel innerClassName="p-0" accentTop={false}>
          <iframe
            title="Vault 42 location map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full min-h-[320px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-5 text-[#f4e8af]">
            Contact & location
          </Heading>
          <div className="grid gap-3.5">
            <ContactItem label="Phone" href={siteContact.phoneHref}>
              {siteContact.phone}
            </ContactItem>
            <ContactItem label="Email" href={siteContact.emailHref}>
              {siteContact.email}
            </ContactItem>
            <ContactItem label="Address">{siteContact.address}</ContactItem>
          </div>
        </Panel>
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-2">
        <div>
          <Heading as="h2" size="card" className="mb-5">
            Frequently asked questions
          </Heading>
          <FaqAccordion items={faqs} />
        </div>
        <Panel>
          <Heading as="h2" size="card" className="mb-5 text-[#f4e8af]">
            Send an enquiry
          </Heading>
          <InquiryForm
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "message", label: "Message", type: "textarea", required: true },
            ]}
            submitLabel="Send Enquiry"
          />
        </Panel>
      </section>
    </>
  );
}
