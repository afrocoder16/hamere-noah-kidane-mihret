/**
 * ethiopic.ts — the Bahire Hasab (ባሕረ ሐሳብ, "sea of computation")
 *
 * The reckoning that the Ethiopian Orthodox Tewahedo Church has used since
 * antiquity to fix the calendar: thirteen months, the Paschalion that governs
 * every movable feast and fast, the monthly commemorations of the saints, and
 * the hours of the day counted from dawn.
 *
 * Everything here is pure arithmetic — no data is fetched, nothing is guessed.
 */

/* ─────────────────────────  months & numerals  ───────────────────────── */

export const MONTHS = [
  { n: 1,  geez: 'መስከረም', tr: 'Meskerem', days: 30 },
  { n: 2,  geez: 'ጥቅምት',  tr: 'Tikimt',   days: 30 },
  { n: 3,  geez: 'ኅዳር',   tr: 'Hidar',    days: 30 },
  { n: 4,  geez: 'ታኅሣሥ',  tr: 'Tahsas',   days: 30 },
  { n: 5,  geez: 'ጥር',    tr: 'Tir',      days: 30 },
  { n: 6,  geez: 'የካቲት',  tr: 'Yekatit',  days: 30 },
  { n: 7,  geez: 'መጋቢት',  tr: 'Megabit',  days: 30 },
  { n: 8,  geez: 'ሚያዝያ',  tr: 'Miyazya',  days: 30 },
  { n: 9,  geez: 'ግንቦት',  tr: 'Ginbot',   days: 30 },
  { n: 10, geez: 'ሰኔ',    tr: 'Sene',     days: 30 },
  { n: 11, geez: 'ሐምሌ',   tr: 'Hamle',    days: 30 },
  { n: 12, geez: 'ነሐሴ',   tr: 'Nehase',   days: 30 },
  { n: 13, geez: 'ጳጉሜን',  tr: 'Pagume',   days: 5 },
] as const;

export const WEEKDAYS = [
  { geez: 'እሑድ',   tr: 'Ehud',      en: 'Sunday' },
  { geez: 'ሰኞ',    tr: 'Segno',     en: 'Monday' },
  { geez: 'ማክሰኞ',  tr: 'Maksegno',  en: 'Tuesday' },
  { geez: 'ረቡዕ',   tr: 'Rob',       en: 'Wednesday' },
  { geez: 'ሐሙስ',   tr: 'Hamus',     en: 'Thursday' },
  { geez: 'ዓርብ',   tr: 'Arb',       en: 'Friday' },
  { geez: 'ቅዳሜ',   tr: 'Kidame',    en: 'Saturday' },
] as const;

/** Ge'ez numerals: ፩ ፪ ፫ … built from units, tens, and ፻ (hundred). */
const GEEZ_UNITS = ['', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'];
const GEEZ_TENS  = ['', '፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺'];

export function toGeez(n: number): string {
  if (n <= 0) return '';
  if (n >= 100) {
    const hundreds = Math.floor(n / 100);
    const rest = n % 100;
    const prefix = hundreds === 1 ? '' : toGeez(hundreds);
    return prefix + '፻' + (rest ? toGeez(rest) : '');
  }
  return GEEZ_TENS[Math.floor(n / 10)] + GEEZ_UNITS[n % 10];
}

/* ─────────────────────────  calendar conversion  ───────────────────────── */

const JD_EPOCH_AMETE_MIHRET = 1723856;
const mod = (a: number, b: number) => ((a % b) + b) % b;

export function gregorianToJDN(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return (
    d + Math.floor((153 * mm + 2) / 5) + 365 * yy +
    Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045
  );
}

export function jdnToGregorian(jdn: number): { y: number; m: number; d: number } {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const dd = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * dd) / 4);
  const mm = Math.floor((5 * e + 2) / 153);
  return {
    d: e - Math.floor((153 * mm + 2) / 5) + 1,
    m: mm + 3 - 12 * Math.floor(mm / 10),
    y: 100 * b + dd - 4800 + Math.floor(mm / 10),
  };
}

export interface EthDate { year: number; month: number; day: number }

export function ethiopicToJDN(y: number, m: number, d: number): number {
  return JD_EPOCH_AMETE_MIHRET + 365 + 365 * (y - 1) + Math.floor(y / 4) + 30 * m + d - 31;
}

export function jdnToEthiopic(jdn: number): EthDate {
  const r = mod(jdn - JD_EPOCH_AMETE_MIHRET, 1461);
  const n = mod(r, 365) + 365 * Math.floor(r / 1460);
  return {
    year:  4 * Math.floor((jdn - JD_EPOCH_AMETE_MIHRET) / 1461) + Math.floor(r / 365) - Math.floor(r / 1460),
    month: Math.floor(n / 30) + 1,
    day:   mod(n, 30) + 1,
  };
}

export const toEthiopic = (date: Date): EthDate =>
  jdnToEthiopic(gregorianToJDN(date.getFullYear(), date.getMonth() + 1, date.getDate()));

export function fromEthiopic(e: EthDate): Date {
  const g = jdnToGregorian(ethiopicToJDN(e.year, e.month, e.day));
  return new Date(g.y, g.m - 1, g.d);
}

/** Pagume carries a sixth day in the year before a Gregorian leap year. */
export const isEthiopicLeap = (year: number) => mod(year, 4) === 3;

export function formatEth(e: EthDate, style: 'geez' | 'tr' | 'both' = 'both'): string {
  const m = MONTHS[e.month - 1];
  if (style === 'geez') return `${m.geez} ${e.day} ቀን ${e.year} ዓ.ም.`;
  if (style === 'tr') return `${m.tr} ${e.day}, ${e.year} E.C.`;
  return `${m.geez} ${toGeez(e.day)} — ${m.tr} ${e.day}, ${e.year} E.C.`;
}

/* ─────────────────────────  the hours of the day  ─────────────────────────
 * Ethiopian time counts from dawn: 6:00 AM is "1 o'clock in the morning."
 * The clock turns twice — ጠዋት/ከሰዓት by day, ማታ/ለሊት by night.
 */

/** Parse a label like "6:30 PM" or "6:00 AM" into 24-hour parts. */
export function parseClock(label: string): { h: number; m: number } {
  const m = /^(\d{1,2})(?::(\d{2}))?\s*([AaPp])/.exec(label.trim());
  if (!m) return { h: 0, m: 0 };
  let h = Number(m[1]) % 12;
  if (m[3].toLowerCase() === 'p') h += 12;
  return { h, m: Number(m[2] ?? 0) };
}

/** The Ethiopian reading of a label like "6:30 PM" — minutes carried through. */
export function ethiopianClockOf(label: string) {
  const { h, m } = parseClock(label);
  return toEthiopianClock(h, m);
}

export function toEthiopianClock(h24: number, min = 0) {
  const h = mod(h24 - 6, 12) || 12;
  let period: string, periodEn: string;
  if (h24 >= 6 && h24 < 12)       { period = 'ጠዋት';  periodEn = 'morning'; }
  else if (h24 >= 12 && h24 < 18) { period = 'ከሰዓት'; periodEn = 'afternoon'; }
  else if (h24 >= 18 && h24 < 24) { period = 'ማታ';   periodEn = 'evening'; }
  else                            { period = 'ለሊት';  periodEn = 'night'; }
  return { hour: h, minute: min, period, periodEn,
           text: `${h}:${String(min).padStart(2, '0')} ${period}` };
}

/* ─────────────────────────  the Paschalion  ─────────────────────────
 * Fasika is fixed by the Julian computus the Church has always kept.
 * Every movable feast and fast is measured out from it in days —
 * the "tewsak" (ተውሳክ), the appointed increment.
 */

export function fasika(gYear: number): Date {
  const a = mod(gYear, 4), b = mod(gYear, 7), c = mod(gYear, 19);
  const d = mod(19 * c + 15, 30);
  const e = mod(2 * a + 4 * b - d + 34, 7);
  const t = d + e + 114;
  const jMonth = Math.floor(t / 31);
  const jDay = mod(t, 31) + 1;
  // Julian → Gregorian: 13 days through 2099.
  const jdn = gregorianToJDN(gYear, jMonth, jDay) + 13;
  const g = jdnToGregorian(jdn);
  return new Date(g.y, g.m - 1, g.d);
}

const addDays = (d: Date, n: number) => {
  const x = new Date(d); x.setDate(x.getDate() + n); return x;
};

export interface Observance {
  key: string;
  geez: string;
  tr: string;
  en: string;
  date: Date;
  kind: 'feast' | 'fast' | 'fast-start' | 'patronal';
  rank?: 'great' | 'major' | 'minor';
  note?: string;
}

/** The movable cycle, each offset in days from Fasika. */
export function movableFeasts(gYear: number): Observance[] {
  const p = fasika(gYear);
  const F = (key: string, geez: string, tr: string, en: string, off: number,
             kind: Observance['kind'], rank: Observance['rank'], note?: string): Observance =>
    ({ key, geez, tr, en, date: addDays(p, off), kind, rank, note });

  return [
    F('nenewe',   'ጾመ ነነዌ',      'Tsome Nenewe',    'Fast of Nineveh',        -69, 'fast-start', 'minor', 'Three days, in memory of Jonah’s preaching.'),
    F('abiy',     'ዓቢይ ጾም',      'Abiy Tsom',       'Great Lent begins',      -55, 'fast-start', 'great', 'Fifty-five days — the longest fast of the year.'),
    F('debrezeit','ደብረ ዘይት',     'Debre Zeit',      'Mount of Olives Sunday', -28, 'feast',      'minor', 'Mid-Lent; the Lord’s discourse on the last things.'),
    F('hosanna',  'ሆሳዕና',        'Hosanna',         'Palm Sunday',             -7, 'feast',      'major'),
    F('siklet',   'ስቅለት',        'Siklet',          'Good Friday',             -2, 'fast',       'great', 'Kept in the church from morning until the ninth hour.'),
    F('fasika',   'ትንሣኤ / ፋሲካ',  'Tinsae · Fasika', 'Resurrection — Pascha',    0, 'feast',      'great', 'The feast of feasts. The night vigil ends at cockcrow.'),
    F('rikbe',    'ርክበ ካህናት',    'Rikbe Kahnat',    'Council of the Fathers',  24, 'feast',      'minor'),
    F('erget',    'ዕርገት',        'Erget',           'Ascension',               39, 'feast',      'major'),
    F('peraklit', 'በዓለ ጰራቅሊጦስ', 'Peraklitos',      'Pentecost',               49, 'feast',      'great'),
    F('hawaryat', 'ጾመ ሐዋርያት',   'Tsome Hawaryat',  'Fast of the Apostles',    50, 'fast-start', 'minor', 'Begins the day after Pentecost and runs to Hamle 5.'),
  ];
}

/** Fixed feasts, given in the Ethiopian calendar and resolved per year. */
const FIXED: Array<[number, number, string, string, string, Observance['kind'], Observance['rank'], string?]> = [
  [1,  1,  'እንቁጣጣሽ',        'Enkutatash',       'Ethiopian New Year',           'feast', 'great', 'Meskerem 1 — the rains end and the meskel daisies open.'],
  [1,  17, 'መስቀል',          'Meskel',           'Finding of the True Cross',    'feast', 'great', 'The Demera bonfire is lit on the eve.'],
  [2,  10, 'በዓለ መስቀል',      'Ba’ale Meskel',    'Commemoration of the Cross',   'feast', 'minor'],
  [3,  15, 'ጾመ ነቢያት',       'Tsome Nebiyat',    'Advent Fast begins',           'fast-start', 'major', 'Forty-three days of preparation for the Nativity.'],
  [3,  21, 'ማርያም ጽዮን',      'Mariam Tsion',     'Our Lady of Zion, Axum',       'feast', 'major'],
  [4,  29, 'ልደት / ገና',      'Ledet · Genna',    'Nativity of Our Lord',         'feast', 'great', 'The liturgy begins on the eve and runs through the night.'],
  [5,  11, 'ጥምቀት',          'Timket',           'Theophany — Baptism of Christ','feast', 'great', 'The tabot is carried out in procession to the water.'],
  [5,  12, 'ቃና ዘገሊላ',       'Kana Zegelila',    'Wedding at Cana',              'feast', 'minor'],
  [6,  16, 'ኪዳነ ምሕረት',      'Kidane Mihret',    'The Covenant of Mercy',        'patronal', 'great', 'The patronal feast of this parish — the day Our Lady received the covenant.'],
  [7,  29, 'መድኃኔ ዓለም',      'Medhane Alem',     'Saviour of the World',         'feast', 'major'],
  [8,  23, 'ቅዱስ ጊዮርጊስ',     'Kidus Giorgis',    'St George the Martyr',         'feast', 'major'],
  [9,  1,  'ልደታ ለማርያም',     'Lideta LeMariam',  'Nativity of Our Lady',         'feast', 'major'],
  [10, 30, 'ቅዱስ ዮሐንስ',      'Kidus Yohannes',   'Beheading of St John',         'feast', 'minor'],
  [11, 19, 'ቅዱስ ገብርኤል',     'Kidus Gabriel',    'St Gabriel the Archangel',     'feast', 'major'],
  [12, 1,  'ጾመ ፍልሰታ',       'Tsome Filseta',    'Fast of the Assumption',       'fast-start', 'major', 'Sixteen days kept strictly, in love for the Mother of God.'],
  [12, 16, 'ፍልሰታ ለማርያም',    'Filseta',          'Assumption of Our Lady',       'feast', 'great', 'The falling-asleep and assumption of the Theotokos.'],
];

export function fixedFeasts(ethYear: number): Observance[] {
  return FIXED.map(([m, d, geez, tr, en, kind, rank, note]) => ({
    key: `${tr.toLowerCase().replace(/\W+/g, '-')}-${ethYear}`,
    geez, tr, en, kind, rank, note,
    date: fromEthiopic({ year: ethYear, month: m, day: d }),
  }));
}

/** Everything falling in the twelve months after `from`, in order. */
export function upcomingObservances(from = new Date(), count = 8): Observance[] {
  const gy = from.getFullYear();
  const ey = toEthiopic(from).year;
  const all = [
    ...movableFeasts(gy), ...movableFeasts(gy + 1),
    ...fixedFeasts(ey),   ...fixedFeasts(ey + 1),
  ];
  const start = new Date(from); start.setHours(0, 0, 0, 0);
  return all
    .filter((o) => o.date >= start)
    .sort((a, b) => +a.date - +b.date)
    .slice(0, count);
}

/* ─────────────────────────  the monthly commemorations  ─────────────────────────
 * Every day of every Ethiopian month keeps its own remembrance. The 16th is
 * Kidane Mihret — which is why this parish keeps a monthly feast as well as
 * the great one in Yekatit.
 */

export const MONTHLY: Record<number, { geez: string; tr: string; en: string }> = {
  1:  { geez: 'ልደታ ለማርያም',        tr: 'Lideta',          en: 'Nativity of Our Lady' },
  2:  { geez: 'ታዴዎስ',             tr: 'Tadewos',         en: 'St Thaddeus the Apostle' },
  3:  { geez: 'በዓታ ለማርያም',        tr: 'Be’ata',          en: 'Presentation of Our Lady' },
  4:  { geez: 'ዮሐንስ ወልደ ነጎድጓድ',   tr: 'Yohannes',        en: 'St John, Son of Thunder' },
  5:  { geez: 'አቡነ ገብረ መንፈስ ቅዱስ', tr: 'Abo',             en: 'Abune Gebre Menfes Kidus' },
  6:  { geez: 'ኢየሱስ',             tr: 'Iyesus',          en: 'Our Lord Jesus' },
  7:  { geez: 'ሥላሴ',              tr: 'Selassie',        en: 'The Holy Trinity' },
  8:  { geez: 'ኪሩቤል',             tr: 'Kirubel',         en: 'The Cherubim' },
  9:  { geez: 'ቶማስ',              tr: 'Tomas',           en: 'St Thomas the Apostle' },
  10: { geez: 'መስቀል',             tr: 'Meskel',          en: 'The Holy Cross' },
  11: { geez: 'ሐና ወኢያቄም',         tr: 'Hanna we-Iyaqem', en: 'Ss Joachim and Anna' },
  12: { geez: 'ቅዱስ ሚካኤል',         tr: 'Mikael',          en: 'St Michael the Archangel' },
  13: { geez: 'እግዚአብሔር አብ',       tr: 'Egziabher Ab',    en: 'God the Father' },
  14: { geez: 'አቡነ አረጋዊ',         tr: 'Abune Aregawi',   en: 'Abune Aregawi' },
  15: { geez: 'ቂርቆስ',             tr: 'Kirkos',          en: 'St Cyriacus' },
  16: { geez: 'ኪዳነ ምሕረት',         tr: 'Kidane Mihret',   en: 'The Covenant of Mercy' },
  17: { geez: 'እስጢፋኖስ',           tr: 'Estifanos',       en: 'St Stephen the Protomartyr' },
  18: { geez: 'ቅዱስ ፊልጶስ',         tr: 'Filipos',         en: 'St Philip the Apostle' },
  19: { geez: 'ቅዱስ ገብርኤል',        tr: 'Gabriel',         en: 'St Gabriel the Archangel' },
  20: { geez: 'ሕንፀተ ቤተ ክርስቲያን',  tr: 'Hintsete Bete',   en: 'Founding of the Church' },
  21: { geez: 'ቅድስት ማርያም',        tr: 'Mariam',          en: 'Our Lady the Theotokos' },
  22: { geez: 'ቅዱስ ኡራኤል',         tr: 'Uraél',           en: 'St Uriel the Archangel' },
  23: { geez: 'ቅዱስ ጊዮርጊስ',        tr: 'Giorgis',         en: 'St George the Martyr' },
  24: { geez: 'አቡነ ተክለ ሃይማኖት',    tr: 'Tekle Haymanot',  en: 'Abune Tekle Haymanot' },
  25: { geez: 'መርቆሬዎስ',           tr: 'Merkorewos',      en: 'St Mercurius' },
  26: { geez: 'ቅዱስ ዮሴፍ',          tr: 'Yosef',           en: 'St Joseph the Betrothed' },
  27: { geez: 'መድኃኔ ዓለም',         tr: 'Medhane Alem',    en: 'The Saviour of the World' },
  28: { geez: 'አማኑኤል',            tr: 'Amanuel',         en: 'Emmanuel' },
  29: { geez: 'በዓለ ወልድ',          tr: 'Ba’ale Wold',     en: 'The Feast of the Son' },
  30: { geez: 'ቅዱስ ዮሐንስ መጥምቅ',    tr: 'Yohannes Metmiq', en: 'St John the Baptist' },
};

/* ─────────────────────────  is today a fast day?  ───────────────────────── */

export interface FastStatus {
  fasting: boolean;
  geez: string;
  tr: string;
  reason: string;
}

export function fastStatus(date = new Date()): FastStatus {
  const d = new Date(date); d.setHours(0, 0, 0, 0);
  const dow = d.getDay();
  const eth = toEthiopic(d);
  const gy = d.getFullYear();
  const between = (a: Date, b: Date) => d >= a && d <= b;
  const p = fasika(gy);

  // Great Lent — the fifty-five days, Nineveh, and Passion week.
  if (between(addDays(p, -55), addDays(p, -1)))
    return { fasting: true, geez: 'ዓቢይ ጾም', tr: 'Abiy Tsom', reason: 'Great Lent — the fast of fifty-five days.' };
  if (between(addDays(p, -69), addDays(p, -67)))
    return { fasting: true, geez: 'ጾመ ነነዌ', tr: 'Tsome Nenewe', reason: 'The three-day Fast of Nineveh.' };

  // The fifty days of Pascha — no fasting at all, even Wednesday and Friday.
  if (between(p, addDays(p, 49)))
    return { fasting: false, geez: 'ሰሙነ ትንሣኤ', tr: 'Days of the Resurrection', reason: 'The fifty days after Fasika: the fast is loosed, even on Wednesday and Friday.' };

  // Apostles' Fast — Pentecost + 1 through Hamle 5.
  if (between(addDays(p, 50), fromEthiopic({ year: eth.year, month: 11, day: 5 })))
    return { fasting: true, geez: 'ጾመ ሐዋርያት', tr: 'Tsome Hawaryat', reason: 'The Fast of the Apostles.' };

  // Filseta — Nehase 1–16.
  if (eth.month === 12 && eth.day <= 16)
    return { fasting: true, geez: 'ጾመ ፍልሰታ', tr: 'Tsome Filseta', reason: 'The Fast of the Assumption of Our Lady.' };

  // Advent — Hidar 15 through Tahsas 28.
  if ((eth.month === 3 && eth.day >= 15) || eth.month === 4 && eth.day <= 28)
    return { fasting: true, geez: 'ጾመ ነቢያት', tr: 'Tsome Nebiyat', reason: 'The Fast of the Prophets, before the Nativity.' };

  // The weekly fast.
  if (dow === 3 || dow === 5)
    return { fasting: true, geez: 'ጾመ ድኅነት', tr: 'Tsome Dihnet', reason: dow === 3
      ? 'Wednesday — the day the counsel was taken against Our Lord.'
      : 'Friday — the day of the Crucifixion.' };

  return { fasting: false, geez: 'የጾም ቀን አይደለም', tr: 'Not a fast day', reason: 'No fast is appointed today.' };
}

/** The whole picture of a single day, as the Church reckons it. */
export function dayReport(date = new Date()) {
  const eth = toEthiopic(date);
  const month = MONTHS[eth.month - 1];
  const weekday = WEEKDAYS[date.getDay()];
  return {
    gregorian: date,
    eth,
    month,
    weekday,
    geezDay: toGeez(eth.day),
    geezYear: toGeez(eth.year),
    commemoration: MONTHLY[eth.day] ?? null,
    fast: fastStatus(date),
    formatted: formatEth(eth),
  };
}
