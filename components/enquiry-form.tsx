"use client";

import { useState } from "react";
import { ChevronRight, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

const inputClasses =
  "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

export function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const composeMessage = () =>
    [
      `Hi Rainbow Laminates!`,
      ``,
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : null,
      subject ? `Subject: ${subject}` : null,
      ``,
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

  const handleWhatsApp = (event: React.FormEvent) => {
    event.preventDefault();
    window.open(whatsappLink(composeMessage()), "_blank");
  };

  const handleEmail = () => {
    const params = new URLSearchParams({
      subject: subject
        ? `Enquiry: ${subject}`
        : "Enquiry from rainbow-laminates website",
      body: composeMessage(),
    });
    window.location.href = `${site.emailHref}?${params.toString().replace(/\+/g, "%20")}`;
  };

  return (
    <form onSubmit={handleWhatsApp} className="grid gap-6 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label
          htmlFor="enquiry-name"
          className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500"
        >
          Full Name *
        </label>
        <input
          id="enquiry-name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-1">
        <label
          htmlFor="enquiry-phone"
          className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500"
        >
          Phone Number
        </label>
        <input
          id="enquiry-phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+91 XXXXX XXXXX"
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="enquiry-subject"
          className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500"
        >
          Subject *
        </label>
        <select
          id="enquiry-subject"
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={inputClasses}
        >
          <option value="">Select a subject</option>
          <option value="Design / price enquiry">Design / price enquiry</option>
          <option value="Bulk or project order">Bulk or project order</option>
          <option value="Request samples">Request samples</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="enquiry-message"
          className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500"
        >
          Message *
        </label>
        <textarea
          id="enquiry-message"
          rows={5}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us which designs you're interested in, quantities, or anything else…"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
        >
          <MessageCircle className="h-4 w-4" />
          Send via WhatsApp
        </button>
        <button
          type="button"
          onClick={handleEmail}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-stone-800"
        >
          Send via Email
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
