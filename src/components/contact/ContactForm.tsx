import { useState } from 'react';
import { asset } from '../../lib/cdn';
import PhoneNumberField, { DEFAULT_COUNTRY, type Country } from './PhoneNumberField';
import { getStrings, type Locale } from '../../i18n/strings';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const ENDPOINT = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT;

function Field({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  requiredSrOnlyText = ' (required)',
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  requiredSrOnlyText?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 items-start w-full">
      <label htmlFor={id} className="font-body font-medium text-body-sm text-navy">
        {label}
        {required && (
          <>
            <span className="text-red-600" aria-hidden="true"> *</span>
            <span className="sr-only">{requiredSrOnlyText}</span>
          </>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-body font-normal text-body-md text-navy placeholder:text-gray bg-light-gray rounded-lg p-4 w-full outline-none focus:ring-2 focus:ring-navy"
      />
    </div>
  );
}

export default function ContactForm({ lang = 'en' }: { lang?: Locale }) {
  const t = getStrings(lang).contactForm;
  const [name, setName] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: real visitors never see or fill this field (see the input's
    // own styling below). A bot that auto-fills every field in the form will
    // populate it, so a non-empty value here means silently drop the
    // submission instead of sending it — no error shown, so the bot gets no
    // signal that it was caught.
    if (company) {
      setStatus('success');
      return;
    }

    if (!ENDPOINT) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const body = new FormData();
      body.append('name', name);
      body.append('hotelName', hotelName);
      body.append('email', email);
      body.append('phone', phone);
      // Travels as its own field rather than being concatenated onto `phone`
      // so the backend gets both pieces distinctly and can reconstruct the
      // full E.164 number itself if it ever needs to.
      body.append('phone-country-code', phoneCountry.dialCode);
      body.append('message', message);

      // Apps Script web apps don't reliably send CORS headers for
      // non-form-encoded bodies, so this is submitted as FormData (a
      // CORS-safelisted content type) to avoid a failing preflight request.
      // mode: 'no-cors' is required too -- Apps Script never sends
      // Access-Control-Allow-Origin on the response, so without it the
      // browser blocks fetch() from reading the response and this always
      // throws even when the submission actually went through. The
      // tradeoff: the response becomes opaque, so a real backend failure
      // can no longer be distinguished from success client-side.
      await fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body });

      setStatus('success');
      setName('');
      setHotelName('');
      setEmail('');
      setPhone('');
      // phoneCountry is deliberately left alone -- it's a preference the
      // visitor actively set, not typed input that needs clearing.
      setMessage('');
      setCompany('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="flex justify-center px-[100px] max-lg:px-10 max-md:px-4 pt-20 max-lg:pt-14 max-md:pt-10 pb-[112px] max-lg:pb-14 max-md:pb-16 w-full bg-background">
        <div className="flex flex-col gap-2 items-center text-center max-w-[816px] w-full">
          <p className="font-heading text-h5 text-navy w-full">{t.successHeading}</p>
          <p className="font-body font-normal text-body-md text-gray w-full">{t.successBody}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-center px-[100px] max-lg:px-10 max-md:px-4 pt-20 max-lg:pt-14 max-md:pt-10 pb-[112px] max-lg:pb-14 max-md:pb-16 w-full bg-background">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-start w-full max-w-[816px]">
        {/* Honeypot — clipped to 1px (Tailwind's sr-only, chosen over an
            off-screen offset so it can't affect page layout/scroll), not in
            tab order, hidden from screen readers, and left unlabeled so a
            browser autofill won't touch it either. Bots that fill every
            field in a form will fill this one; handleSubmit silently drops
            the submission when it's non-empty. */}
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />
        <div className="flex gap-8 max-md:flex-col items-start w-full">
          <Field id="name" label={t.nameLabel} placeholder={t.namePlaceholder} required requiredSrOnlyText={t.requiredSrOnly} value={name} onChange={setName} />
          <Field id="hotelName" label={t.hotelNameLabel} placeholder={t.hotelNamePlaceholder} value={hotelName} onChange={setHotelName} />
        </div>
        <div className="flex gap-8 max-md:flex-col items-start w-full">
          <Field id="email" label={t.emailLabel} type="email" placeholder={t.emailPlaceholder} required requiredSrOnlyText={t.requiredSrOnly} value={email} onChange={setEmail} />
          <PhoneNumberField
            id="phone"
            label={t.phoneLabel}
            placeholder={t.phonePlaceholder}
            required
            value={phone}
            onChange={setPhone}
            country={phoneCountry}
            onCountryChange={setPhoneCountry}
          />
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <label htmlFor="message" className="font-body font-medium text-body-sm text-navy">
            {t.messageLabel}
            <span className="text-red-600" aria-hidden="true"> *</span>
            <span className="sr-only">{t.requiredSrOnly}</span>
          </label>
          <div className="relative w-full">
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder={t.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="font-body font-normal text-body-md text-navy placeholder:text-gray bg-light-gray rounded-lg p-4 w-full outline-none focus:ring-2 focus:ring-navy resize-y"
            />
            <img src={asset('images/contact/icon-notches.svg')} alt="" loading="lazy" className="absolute bottom-1 right-1 size-3 pointer-events-none" />
          </div>
        </div>

        {status === 'error' && (
          <p className="font-body font-normal text-body-sm text-red-600 w-full">
            {t.error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-navy text-background hover:bg-background hover:text-navy flex gap-3 items-center justify-center rounded-lg border-2 border-transparent hover:border-navy transition-colors duration-300 px-5 py-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="font-body font-medium text-body-md whitespace-nowrap">
            {status === 'submitting' ? t.sending : t.send}
          </span>
        </button>
      </form>
    </section>
  );
}
