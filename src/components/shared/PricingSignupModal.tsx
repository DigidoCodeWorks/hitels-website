import { useEffect, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const ENDPOINT = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT;

// Custom event name Pricing.astro's plain <script> dispatches when a card's
// CTA button is clicked — this island has no other way to hear about a click
// on markup rendered outside of it.
const OPEN_EVENT = 'open-pricing-modal';

function Field({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <label htmlFor={id} className="font-body font-medium text-body-sm text-navy">
        {label}
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

export default function PricingSignupModal() {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState('');
  const [name, setName] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [email, setEmail] = useState('');
  // Honeypot — same silent-drop pattern as ContactForm.tsx.
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    const handleOpen = (e: Event) => {
      setPlan((e as CustomEvent<{ plan: string }>).detail?.plan ?? '');
      setStatus('idle');
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    setName('');
    setHotelName('');
    setEmail('');
    setCompany('');
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      body.append('plan', plan);

      // Same Apps Script Web App as ContactForm.tsx — the "plan" field
      // present here (and absent from the contact form) is what tells
      // doPost() to email the sales inbox instead of logging a sheet row.
      // mode: 'no-cors' -- see the matching comment in ContactForm.tsx;
      // Apps Script never sends Access-Control-Allow-Origin, so without
      // this every submission throws here even when it actually went
      // through.
      await fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body });

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4"
      onClick={close}
    >
      <div
        className="flex flex-col gap-6 items-start w-full max-w-[420px] bg-background rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {status === 'success' ? (
          <div className="flex flex-col gap-2 items-center text-center w-full py-8">
            <p className="font-heading text-h5 text-navy w-full">Thanks for reaching out</p>
            <p className="font-body font-normal text-body-md text-gray w-full">We'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-start w-full">
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

            <Field id="name" label="Name" placeholder="Full name" required value={name} onChange={setName} />
            <Field id="hotelName" label="Hotel name" placeholder="Hotel name" value={hotelName} onChange={setHotelName} />
            <Field id="email" label="Email" type="email" placeholder="jon@hotel.is" required value={email} onChange={setEmail} />

            <div className="flex flex-col gap-2 items-start w-full">
              <label htmlFor="plan" className="font-body font-medium text-body-sm text-navy">
                Plan
              </label>
              <input
                id="plan"
                name="plan"
                type="text"
                readOnly
                value={plan}
                className="font-body font-normal text-body-md text-navy bg-light-gray rounded-lg p-4 w-full outline-none cursor-not-allowed"
              />
            </div>

            {status === 'error' && (
              <p className="font-body font-normal text-body-sm text-red-600 w-full">
                Something went wrong sending your submission. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-yellow text-navy hover:bg-brand hover:text-background flex items-center justify-center rounded-lg border-2 border-transparent transition-colors duration-300 px-5 py-3 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="font-body font-medium text-body-md whitespace-nowrap">
                {status === 'submitting' ? 'Submitting…' : 'Submit'}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
