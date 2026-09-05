/**
 * parish.ts — everything the site knows about this particular church.
 *
 * Facts confirmed from public records are marked (confirmed). Everything else
 * is a considered placeholder for the parish office to replace — those are
 * marked `TODO` so they can be found in one search.
 */

export const PARISH = {
  name: 'Hamere Noah Kidane Mihret',
  nameFull: 'Hamere Noah Kidane Mihret Ethiopian Orthodox Tewahedo Church',
  geez: 'ሐመረ ኖኅ ኪዳነ ምሕረት',
  geezFull: 'ሐመረ ኖኅ ኪዳነ ምሕረት የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን',
  city: 'Sioux Falls',
  state: 'South Dakota',

  // (confirmed) — public listings
  address: {
    street: '1609 W 11th Street',
    city: 'Sioux Falls',
    state: 'SD',
    zip: '57104',
    get full() { return `${this.street}, ${this.city}, ${this.state} ${this.zip}`; },
    maps: 'https://maps.google.com/?q=1609+W+11th+St,+Sioux+Falls,+SD+57104',
  },
  phone: '(605) 838-6273',           // (confirmed)
  phoneHref: 'tel:+16058386273',
  email: 'office@hamerenoah.org',    // TODO — parish office to confirm

  patron: {
    geez: 'ኪዳነ ምሕረት',
    tr: 'Kidane Mihret',
    en: 'The Covenant of Mercy',
    feastEth: 'Yekatit 16',
    feastGeez: 'የካቲት ፲፮',
    feastGreg: 'February 23',
  },

  diocese: 'Ethiopian Orthodox Tewahedo Church — Archdiocese of the United States of America',
} as const;

/* ── the name, unfolded ─────────────────────────────────────────────── */

export const NAME_MEANING = [
  {
    geez: 'ሐመረ ኖኅ',
    tr: 'Hamere Noah',
    en: 'The Ark of Noah',
    body:
      'ሐመር is a ship, and Hamere Noah is the Ark — one of the oldest names the ' +
      'Church gives herself. Outside the vessel the waters rose; inside it, every ' +
      'living thing was carried through. The Fathers read the Ark as the Church ' +
      'and the flood as the world, and so a parish that takes this name is saying ' +
      'plainly what it is for.',
  },
  {
    geez: 'ኪዳነ ምሕረት',
    tr: 'Kidane Mihret',
    en: 'The Covenant of Mercy',
    body:
      'The covenant Our Lord swore to His mother: that whoever calls on her name, ' +
      'or gives alms in her memory — even a cup of cold water — will find mercy. ' +
      'The Church keeps that promise on Yekatit 16, and again on the sixteenth of ' +
      'every month of the year.',
  },
] as const;

/* ── the order of the week ──────────────────────────────────────────── */

export interface ServiceEntry {
  day: string;
  dayGeez: string;
  title: string;
  geez: string;
  from: string;          // "6:30 PM" — parsed for the Ethiopian clock reading
  toLabel?: string;
  note: string;
  kind: 'liturgy' | 'prayer' | 'class' | 'fast';
}

// TODO — parish office: confirm every time below before publishing.
export const SERVICES: ServiceEntry[] = [
  { day: 'Saturday', dayGeez: 'ቅዳሜ', title: 'Wazema — Vespers of the Lord’s Day', geez: 'ውዳሴ ወዜማ',
    from: '5:00 PM', note: 'The evening office that opens Sunday. Sung, not read.', kind: 'prayer' },
  { day: 'Sunday', dayGeez: 'እሑድ', title: 'Kidase — the Divine Liturgy', geez: 'ቅዳሴ',
    from: '6:00 AM', toLabel: '10:30 AM',
    note: 'Matins, then the Liturgy. Communion is given to those who have kept the fast and been to confession.', kind: 'liturgy' },
  { day: 'Sunday', dayGeez: 'እሑድ', title: 'Sunday School', geez: 'ሰንበት ትምህርት ቤት',
    from: '11:00 AM', toLabel: '12:30 PM',
    note: 'Children and youth. Ge’ez reading, church history, and zema, taught in Amharic and English.', kind: 'class' },
  { day: 'Wednesday', dayGeez: 'ረቡዕ', title: 'Evening Prayer', geez: 'የሠርክ ጸሎት',
    from: '6:30 PM', note: 'A fast day. Prayer, and teaching for adults after.', kind: 'prayer' },
  { day: 'Friday', dayGeez: 'ዓርብ', title: 'Prayer of the Cross', geez: 'የመስቀል ጸሎት',
    from: '6:30 PM', note: 'A fast day, kept in memory of the Crucifixion.', kind: 'fast' },
  { day: 'Monthly · 16th', dayGeez: '፲፮', title: 'Kidane Mihret — our patronal commemoration', geez: 'ኪዳነ ምሕረት',
    from: '6:00 AM', note: 'Kept every month, and kept greatly in Yekatit.', kind: 'liturgy' },
];

/* ── the seven sacraments ───────────────────────────────────────────── */

export const SACRAMENTS = [
  { geez: 'ጥምቀት', tr: 'Timqet', en: 'Baptism',
    body: 'Boys on the fortieth day, girls on the eightieth — the child is immersed three times and named. Adults are received after instruction.' },
  { geez: 'ሜሮን', tr: 'Meron', en: 'Chrismation',
    body: 'Anointing with holy myron, given together with baptism. The seal of the Holy Spirit.' },
  { geez: 'ንስሓ', tr: 'Nisiha', en: 'Confession',
    body: 'Made to one’s father-confessor. The ordinary preparation before approaching the chalice.' },
  { geez: 'ቁርባን', tr: 'Qurban', en: 'Holy Communion',
    body: 'The Body and Blood of Our Lord, received fasting. The centre of everything else on this page.' },
  { geez: 'ተክሊል', tr: 'Teklil', en: 'Holy Matrimony',
    body: 'The crowning of husband and wife. Arranged with the priest well in advance, with counsel beforehand.' },
  { geez: 'ክህነት', tr: 'Kihinet', en: 'Holy Orders',
    body: 'The ordination of deacons and priests, conferred by the bishop of the archdiocese.' },
  { geez: 'ቀንዲል', tr: 'Qendil', en: 'Anointing of the Sick',
    body: 'Prayer and oil for the sick, the aged, and the dying — at home or in hospital. Call the priest at any hour.' },
] as const;

/* ── the three chambers of an Ethiopian church ──────────────────────── */

export const CHAMBERS = [
  {
    geez: 'ቅኔ ማሕሌት',
    tr: 'Qene Mahlet',
    en: 'The Place of Chant',
    role: 'Outer ring',
    body:
      'The outermost ring, where the debtera stand with prayer-staff, sistrum and ' +
      'drum and sing the office. Everyone stands here — this is where the whole ' +
      'congregation gathers, and where the visitor is most welcome.',
    temple: 'answering to the outer court of the Temple',
  },
  {
    geez: 'ቅድስት',
    tr: 'Qeddest',
    en: 'The Holy Place',
    role: 'Middle ring',
    body:
      'The middle ring, where the faithful who have prepared themselves come ' +
      'forward to receive Holy Communion. Men to one side, women to the other, ' +
      'as they have stood for sixteen centuries.',
    temple: 'answering to the Holy Place',
  },
  {
    geez: 'መቅደስ',
    tr: 'Meqdes',
    en: 'The Holy of Holies',
    role: 'Inner sanctuary',
    body:
      'The innermost chamber, where the tabot rests — the tablet of the covenant, ' +
      'consecrated by the bishop, without which no building is a church at all. ' +
      'Only ordained priests may enter. It is opened to the sight of the people ' +
      'once a year, at Timket, when the tabot is carried out to the water.',
    temple: 'answering to the Holy of Holies, where the Ark stood',
  },
] as const;

/* ── St Yared and the three modes ───────────────────────────────────── */

export const MODES = [
  { geez: 'ግዕዝ', tr: 'Ge’ez', en: 'the plain mode',
    body: 'Grave, level, unhurried. The everyday mode of the office, and the ground the other two are measured against.' },
  { geez: 'ዕዝል', tr: 'Ezil', en: 'the mode of mourning',
    body: 'Slow and deep. Sung in Lent, on Good Friday, and at funerals.' },
  { geez: 'አራራይ', tr: 'Araray', en: 'the mode of gladness',
    body: 'Light and quick, sung at the great feasts — the Nativity, Timket, Fasika.' },
] as const;

/* ── ministries ─────────────────────────────────────────────────────── */

export const MINISTRIES = [
  { geez: 'ሰንበት ትምህርት ቤት', tr: 'Sunday School', en: 'Children & Youth',
    body: 'Ge’ez letters, the life of Christ, the saints, and zema. Taught in Amharic and English so that children born here keep both.',
    icon: 'book' },
  { geez: 'ማኅሌት', tr: 'Mahlet', en: 'Chant & Choir',
    body: 'The zema of St Yared, learned by ear as it always has been. Rehearsal before each great feast.',
    icon: 'drum' },
  { geez: 'ሰበካ ጉባኤ', tr: 'Sebeka Gubae', en: 'Parish Council',
    body: 'Elected members of the congregation who hold the building, the accounts, and the practical care of the parish.',
    icon: 'scroll' },
  { geez: 'ማኅበረ ቅዱሳን', tr: 'Mahibere Kidusan', en: 'Young Adults',
    body: 'Study, service, and fellowship for young adults — the generation that will carry this parish next.',
    icon: 'star' },
  { geez: 'የሴቶች ማኅበር', tr: 'Yesetoch Mahiber', en: 'Women’s Fellowship',
    body: 'The women who feed the parish at every feast, visit the sick, and hold the household of the church together.',
    icon: 'hands' },
  { geez: 'ቀብርና ተዝካር', tr: 'Qeber & Tezkar', en: 'Burial & Memorial',
    body: 'The parish stands with a family at a death: the funeral, the prayers of the fortieth day, and the annual tezkar.',
    icon: 'cross' },
] as const;

/* ── image credits ──────────────────────────────────────────────────── */

export interface Credit { file: string; title: string; license: string; artist: string; source: string }
