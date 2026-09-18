import { useEffect, useRef, useState } from 'react';

export interface Country {
  name: string;
  iso2: string; // ISO 3166-1 alpha-2
  dialCode: string; // E.164 calling code, e.g. "+354"
}

// A flag emoji is just two Unicode Regional Indicator Symbols, each offset
// from its ASCII letter by the same fixed constant -- 0x1F1E6 minus the code
// point of 'A'. No image asset or lookup table to keep in sync.
function flagEmoji(iso2: string): string {
  return String.fromCodePoint(
    ...iso2.toUpperCase().split('').map((c) => 127397 + c.charCodeAt(0)),
  );
}

// Hitels is based in Iceland -- default to it rather than "first in the list".
export const DEFAULT_COUNTRY_ISO2 = 'IS';

// Alphabetical by name, not reshuffled to put the default first.
export const COUNTRIES: Country[] = [
  { name: 'Afghanistan', iso2: 'AF', dialCode: '+93' },
  { name: 'Albania', iso2: 'AL', dialCode: '+355' },
  { name: 'Algeria', iso2: 'DZ', dialCode: '+213' },
  { name: 'Andorra', iso2: 'AD', dialCode: '+376' },
  { name: 'Angola', iso2: 'AO', dialCode: '+244' },
  { name: 'Argentina', iso2: 'AR', dialCode: '+54' },
  { name: 'Armenia', iso2: 'AM', dialCode: '+374' },
  { name: 'Australia', iso2: 'AU', dialCode: '+61' },
  { name: 'Austria', iso2: 'AT', dialCode: '+43' },
  { name: 'Azerbaijan', iso2: 'AZ', dialCode: '+994' },
  { name: 'Bahamas', iso2: 'BS', dialCode: '+1' },
  { name: 'Bahrain', iso2: 'BH', dialCode: '+973' },
  { name: 'Bangladesh', iso2: 'BD', dialCode: '+880' },
  { name: 'Barbados', iso2: 'BB', dialCode: '+1' },
  { name: 'Belarus', iso2: 'BY', dialCode: '+375' },
  { name: 'Belgium', iso2: 'BE', dialCode: '+32' },
  { name: 'Belize', iso2: 'BZ', dialCode: '+501' },
  { name: 'Benin', iso2: 'BJ', dialCode: '+229' },
  { name: 'Bhutan', iso2: 'BT', dialCode: '+975' },
  { name: 'Bolivia', iso2: 'BO', dialCode: '+591' },
  { name: 'Bosnia and Herzegovina', iso2: 'BA', dialCode: '+387' },
  { name: 'Botswana', iso2: 'BW', dialCode: '+267' },
  { name: 'Brazil', iso2: 'BR', dialCode: '+55' },
  { name: 'Brunei', iso2: 'BN', dialCode: '+673' },
  { name: 'Bulgaria', iso2: 'BG', dialCode: '+359' },
  { name: 'Burkina Faso', iso2: 'BF', dialCode: '+226' },
  { name: 'Burundi', iso2: 'BI', dialCode: '+257' },
  { name: 'Cambodia', iso2: 'KH', dialCode: '+855' },
  { name: 'Cameroon', iso2: 'CM', dialCode: '+237' },
  { name: 'Canada', iso2: 'CA', dialCode: '+1' },
  { name: 'Cape Verde', iso2: 'CV', dialCode: '+238' },
  { name: 'Central African Republic', iso2: 'CF', dialCode: '+236' },
  { name: 'Chad', iso2: 'TD', dialCode: '+235' },
  { name: 'Chile', iso2: 'CL', dialCode: '+56' },
  { name: 'China', iso2: 'CN', dialCode: '+86' },
  { name: 'Colombia', iso2: 'CO', dialCode: '+57' },
  { name: 'Comoros', iso2: 'KM', dialCode: '+269' },
  { name: 'Costa Rica', iso2: 'CR', dialCode: '+506' },
  { name: 'Croatia', iso2: 'HR', dialCode: '+385' },
  { name: 'Cuba', iso2: 'CU', dialCode: '+53' },
  { name: 'Cyprus', iso2: 'CY', dialCode: '+357' },
  { name: 'Czech Republic', iso2: 'CZ', dialCode: '+420' },
  { name: 'Denmark', iso2: 'DK', dialCode: '+45' },
  { name: 'Djibouti', iso2: 'DJ', dialCode: '+253' },
  { name: 'Dominica', iso2: 'DM', dialCode: '+1' },
  { name: 'Dominican Republic', iso2: 'DO', dialCode: '+1' },
  { name: 'Ecuador', iso2: 'EC', dialCode: '+593' },
  { name: 'Egypt', iso2: 'EG', dialCode: '+20' },
  { name: 'El Salvador', iso2: 'SV', dialCode: '+503' },
  { name: 'Equatorial Guinea', iso2: 'GQ', dialCode: '+240' },
  { name: 'Eritrea', iso2: 'ER', dialCode: '+291' },
  { name: 'Estonia', iso2: 'EE', dialCode: '+372' },
  { name: 'Eswatini', iso2: 'SZ', dialCode: '+268' },
  { name: 'Ethiopia', iso2: 'ET', dialCode: '+251' },
  { name: 'Fiji', iso2: 'FJ', dialCode: '+679' },
  { name: 'Finland', iso2: 'FI', dialCode: '+358' },
  { name: 'France', iso2: 'FR', dialCode: '+33' },
  { name: 'Gabon', iso2: 'GA', dialCode: '+241' },
  { name: 'Gambia', iso2: 'GM', dialCode: '+220' },
  { name: 'Georgia', iso2: 'GE', dialCode: '+995' },
  { name: 'Germany', iso2: 'DE', dialCode: '+49' },
  { name: 'Ghana', iso2: 'GH', dialCode: '+233' },
  { name: 'Greece', iso2: 'GR', dialCode: '+30' },
  { name: 'Grenada', iso2: 'GD', dialCode: '+1' },
  { name: 'Guatemala', iso2: 'GT', dialCode: '+502' },
  { name: 'Guinea', iso2: 'GN', dialCode: '+224' },
  { name: 'Guinea-Bissau', iso2: 'GW', dialCode: '+245' },
  { name: 'Guyana', iso2: 'GY', dialCode: '+592' },
  { name: 'Haiti', iso2: 'HT', dialCode: '+509' },
  { name: 'Honduras', iso2: 'HN', dialCode: '+504' },
  { name: 'Hong Kong', iso2: 'HK', dialCode: '+852' },
  { name: 'Hungary', iso2: 'HU', dialCode: '+36' },
  { name: 'Iceland', iso2: 'IS', dialCode: '+354' },
  { name: 'India', iso2: 'IN', dialCode: '+91' },
  { name: 'Indonesia', iso2: 'ID', dialCode: '+62' },
  { name: 'Iran', iso2: 'IR', dialCode: '+98' },
  { name: 'Iraq', iso2: 'IQ', dialCode: '+964' },
  { name: 'Ireland', iso2: 'IE', dialCode: '+353' },
  { name: 'Israel', iso2: 'IL', dialCode: '+972' },
  { name: 'Italy', iso2: 'IT', dialCode: '+39' },
  { name: 'Ivory Coast', iso2: 'CI', dialCode: '+225' },
  { name: 'Jamaica', iso2: 'JM', dialCode: '+1' },
  { name: 'Japan', iso2: 'JP', dialCode: '+81' },
  { name: 'Jordan', iso2: 'JO', dialCode: '+962' },
  { name: 'Kazakhstan', iso2: 'KZ', dialCode: '+7' },
  { name: 'Kenya', iso2: 'KE', dialCode: '+254' },
  { name: 'Kiribati', iso2: 'KI', dialCode: '+686' },
  { name: 'Kuwait', iso2: 'KW', dialCode: '+965' },
  { name: 'Kyrgyzstan', iso2: 'KG', dialCode: '+996' },
  { name: 'Laos', iso2: 'LA', dialCode: '+856' },
  { name: 'Latvia', iso2: 'LV', dialCode: '+371' },
  { name: 'Lebanon', iso2: 'LB', dialCode: '+961' },
  { name: 'Lesotho', iso2: 'LS', dialCode: '+266' },
  { name: 'Liberia', iso2: 'LR', dialCode: '+231' },
  { name: 'Libya', iso2: 'LY', dialCode: '+218' },
  { name: 'Liechtenstein', iso2: 'LI', dialCode: '+423' },
  { name: 'Lithuania', iso2: 'LT', dialCode: '+370' },
  { name: 'Luxembourg', iso2: 'LU', dialCode: '+352' },
  { name: 'Macau', iso2: 'MO', dialCode: '+853' },
  { name: 'Madagascar', iso2: 'MG', dialCode: '+261' },
  { name: 'Malawi', iso2: 'MW', dialCode: '+265' },
  { name: 'Malaysia', iso2: 'MY', dialCode: '+60' },
  { name: 'Maldives', iso2: 'MV', dialCode: '+960' },
  { name: 'Mali', iso2: 'ML', dialCode: '+223' },
  { name: 'Malta', iso2: 'MT', dialCode: '+356' },
  { name: 'Marshall Islands', iso2: 'MH', dialCode: '+692' },
  { name: 'Mauritania', iso2: 'MR', dialCode: '+222' },
  { name: 'Mauritius', iso2: 'MU', dialCode: '+230' },
  { name: 'Mexico', iso2: 'MX', dialCode: '+52' },
  { name: 'Micronesia', iso2: 'FM', dialCode: '+691' },
  { name: 'Moldova', iso2: 'MD', dialCode: '+373' },
  { name: 'Monaco', iso2: 'MC', dialCode: '+377' },
  { name: 'Mongolia', iso2: 'MN', dialCode: '+976' },
  { name: 'Montenegro', iso2: 'ME', dialCode: '+382' },
  { name: 'Morocco', iso2: 'MA', dialCode: '+212' },
  { name: 'Mozambique', iso2: 'MZ', dialCode: '+258' },
  { name: 'Myanmar', iso2: 'MM', dialCode: '+95' },
  { name: 'Namibia', iso2: 'NA', dialCode: '+264' },
  { name: 'Nauru', iso2: 'NR', dialCode: '+674' },
  { name: 'Nepal', iso2: 'NP', dialCode: '+977' },
  { name: 'Netherlands', iso2: 'NL', dialCode: '+31' },
  { name: 'New Zealand', iso2: 'NZ', dialCode: '+64' },
  { name: 'Nicaragua', iso2: 'NI', dialCode: '+505' },
  { name: 'Niger', iso2: 'NE', dialCode: '+227' },
  { name: 'Nigeria', iso2: 'NG', dialCode: '+234' },
  { name: 'North Korea', iso2: 'KP', dialCode: '+850' },
  { name: 'North Macedonia', iso2: 'MK', dialCode: '+389' },
  { name: 'Norway', iso2: 'NO', dialCode: '+47' },
  { name: 'Oman', iso2: 'OM', dialCode: '+968' },
  { name: 'Pakistan', iso2: 'PK', dialCode: '+92' },
  { name: 'Palau', iso2: 'PW', dialCode: '+680' },
  { name: 'Panama', iso2: 'PA', dialCode: '+507' },
  { name: 'Papua New Guinea', iso2: 'PG', dialCode: '+675' },
  { name: 'Paraguay', iso2: 'PY', dialCode: '+595' },
  { name: 'Peru', iso2: 'PE', dialCode: '+51' },
  { name: 'Philippines', iso2: 'PH', dialCode: '+63' },
  { name: 'Poland', iso2: 'PL', dialCode: '+48' },
  { name: 'Portugal', iso2: 'PT', dialCode: '+351' },
  { name: 'Qatar', iso2: 'QA', dialCode: '+974' },
  { name: 'Romania', iso2: 'RO', dialCode: '+40' },
  { name: 'Russia', iso2: 'RU', dialCode: '+7' },
  { name: 'Rwanda', iso2: 'RW', dialCode: '+250' },
  { name: 'Saint Kitts and Nevis', iso2: 'KN', dialCode: '+1' },
  { name: 'Saint Lucia', iso2: 'LC', dialCode: '+1' },
  { name: 'Saint Vincent and the Grenadines', iso2: 'VC', dialCode: '+1' },
  { name: 'Samoa', iso2: 'WS', dialCode: '+685' },
  { name: 'San Marino', iso2: 'SM', dialCode: '+378' },
  { name: 'Sao Tome and Principe', iso2: 'ST', dialCode: '+239' },
  { name: 'Saudi Arabia', iso2: 'SA', dialCode: '+966' },
  { name: 'Senegal', iso2: 'SN', dialCode: '+221' },
  { name: 'Serbia', iso2: 'RS', dialCode: '+381' },
  { name: 'Seychelles', iso2: 'SC', dialCode: '+248' },
  { name: 'Sierra Leone', iso2: 'SL', dialCode: '+232' },
  { name: 'Singapore', iso2: 'SG', dialCode: '+65' },
  { name: 'Slovakia', iso2: 'SK', dialCode: '+421' },
  { name: 'Slovenia', iso2: 'SI', dialCode: '+386' },
  { name: 'Solomon Islands', iso2: 'SB', dialCode: '+677' },
  { name: 'Somalia', iso2: 'SO', dialCode: '+252' },
  { name: 'South Africa', iso2: 'ZA', dialCode: '+27' },
  { name: 'South Korea', iso2: 'KR', dialCode: '+82' },
  { name: 'South Sudan', iso2: 'SS', dialCode: '+211' },
  { name: 'Spain', iso2: 'ES', dialCode: '+34' },
  { name: 'Sri Lanka', iso2: 'LK', dialCode: '+94' },
  { name: 'Sudan', iso2: 'SD', dialCode: '+249' },
  { name: 'Suriname', iso2: 'SR', dialCode: '+597' },
  { name: 'Sweden', iso2: 'SE', dialCode: '+46' },
  { name: 'Switzerland', iso2: 'CH', dialCode: '+41' },
  { name: 'Syria', iso2: 'SY', dialCode: '+963' },
  { name: 'Taiwan', iso2: 'TW', dialCode: '+886' },
  { name: 'Tajikistan', iso2: 'TJ', dialCode: '+992' },
  { name: 'Tanzania', iso2: 'TZ', dialCode: '+255' },
  { name: 'Thailand', iso2: 'TH', dialCode: '+66' },
  { name: 'Timor-Leste', iso2: 'TL', dialCode: '+670' },
  { name: 'Togo', iso2: 'TG', dialCode: '+228' },
  { name: 'Tonga', iso2: 'TO', dialCode: '+676' },
  { name: 'Trinidad and Tobago', iso2: 'TT', dialCode: '+1' },
  { name: 'Tunisia', iso2: 'TN', dialCode: '+216' },
  { name: 'Turkey', iso2: 'TR', dialCode: '+90' },
  { name: 'Turkmenistan', iso2: 'TM', dialCode: '+993' },
  { name: 'Tuvalu', iso2: 'TV', dialCode: '+688' },
  { name: 'Uganda', iso2: 'UG', dialCode: '+256' },
  { name: 'Ukraine', iso2: 'UA', dialCode: '+380' },
  { name: 'United Arab Emirates', iso2: 'AE', dialCode: '+971' },
  { name: 'United Kingdom', iso2: 'GB', dialCode: '+44' },
  { name: 'United States', iso2: 'US', dialCode: '+1' },
  { name: 'Uruguay', iso2: 'UY', dialCode: '+598' },
  { name: 'Uzbekistan', iso2: 'UZ', dialCode: '+998' },
  { name: 'Vanuatu', iso2: 'VU', dialCode: '+678' },
  { name: 'Vatican City', iso2: 'VA', dialCode: '+379' },
  { name: 'Venezuela', iso2: 'VE', dialCode: '+58' },
  { name: 'Vietnam', iso2: 'VN', dialCode: '+84' },
  { name: 'Yemen', iso2: 'YE', dialCode: '+967' },
  { name: 'Zambia', iso2: 'ZM', dialCode: '+260' },
  { name: 'Zimbabwe', iso2: 'ZW', dialCode: '+263' },
];

export const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.iso2 === DEFAULT_COUNTRY_ISO2)!;

interface PhoneNumberFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  country: Country;
  onCountryChange: (country: Country) => void;
}

export default function PhoneNumberField({
  id,
  label,
  placeholder,
  required = false,
  value,
  onChange,
  country,
  onCountryChange,
}: PhoneNumberFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlighted, setHighlighted] = useState(0);

  const rowRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = COUNTRIES.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.dialCode.includes(q);
  });

  // Reset search/highlight and focus the search box each time the panel opens.
  useEffect(() => {
    if (!open) return;
    setSearch('');
    setHighlighted(0);
    searchRef.current?.focus();
  }, [open]);

  // Clicking outside the trigger+panel closes it.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const selectCountry = (c: Country) => {
    onCountryChange(c);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const match = filtered[highlighted];
      if (match) selectCountry(match);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace(/\D/g, ''));
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    onChange(value + digits);
  };

  return (
    <div className="flex flex-1 flex-col gap-2 items-start w-full">
      <label htmlFor={id} className="font-body font-medium text-body-sm text-navy">
        {label}
      </label>
      <div
        ref={rowRef}
        className="relative flex items-stretch w-full bg-light-gray rounded-lg focus-within:ring-2 focus-within:ring-navy"
      >
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code, currently ${country.name} ${country.dialCode}`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleTriggerKeyDown}
          className="flex items-center gap-2 pl-4 pr-3 py-4 shrink-0 outline-none cursor-pointer"
        >
          <span aria-hidden="true">{flagEmoji(country.iso2)}</span>
          <span className="font-body font-normal text-body-md text-navy">{country.dialCode}</span>
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="size-3 text-gray">
            <path d="M26 12L16 22L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span aria-hidden="true" className="w-px my-2 bg-navy/10" />

        <input
          id={id}
          name={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={handlePhoneChange}
          onPaste={handlePhonePaste}
          className="flex-1 min-w-0 bg-transparent outline-none p-4 font-body font-normal text-body-md text-navy placeholder:text-gray"
        />

        {open && (
          <div
            role="listbox"
            aria-label="Countries"
            className="absolute left-0 top-full mt-2 z-20 w-72 max-h-72 flex flex-col rounded-lg bg-background shadow-lg border border-light-gray overflow-hidden"
          >
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlighted(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search country or code"
              aria-label="Search country or code"
              className="w-full p-3 outline-none border-b border-light-gray font-body font-normal text-body-sm text-navy placeholder:text-gray"
            />
            <div className="overflow-y-auto">
              {filtered.map((c, i) => (
                <button
                  key={c.iso2}
                  type="button"
                  role="option"
                  tabIndex={-1}
                  aria-selected={c.iso2 === country.iso2}
                  onClick={() => selectCountry(c)}
                  className={`flex items-center gap-3 w-full px-3 py-2 text-left cursor-pointer ${
                    i === highlighted ? 'bg-light-gray' : ''
                  }`}
                >
                  <span aria-hidden="true">{flagEmoji(c.iso2)}</span>
                  <span className="font-body font-normal text-body-sm text-navy shrink-0">{c.dialCode}</span>
                  <span className="font-body font-normal text-body-sm text-gray truncate">{c.name}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="p-3 font-body font-normal text-body-sm text-gray">No countries match "{search}"</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
