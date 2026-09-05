/**
 * The gallery. Every description below was written after looking at the
 * photograph it belongs to — nothing is captioned from its filename.
 * Credits and licences come verbatim from the Wikimedia Commons record
 * for each file (see public/art/credits.json).
 */

export interface Piece {
  file: string;
  geez: string;
  title: string;
  place: string;
  body: string;
  credit: string;
  ratio: string;
  group: 'painting' | 'architecture' | 'manuscript' | 'metalwork' | 'living';
}

export const PIECES: Piece[] = [
  // ── wall painting ──
  {
    file: 'ceiling-angels.jpg', group: 'painting',
    geez: 'ኪሩቤል', title: 'The ceiling of winged faces', place: 'Debre Berhan Selassie, Gondar · c. 1690',
    body:
      'A hundred and thirty-five cherub faces in courses across the whole ceiling, each ' +
      'painted by hand and no two quite alike. Ethiopian painters make the eyes enormous ' +
      'deliberately: attention is the subject.',
    credit: 'Rod Waddington · CC BY-SA 2.0', ratio: '4 / 3',
  },
  {
    file: 'gondar-wall.jpg', group: 'painting',
    geez: 'ግድግዳ ሥዕል', title: 'A painted doorway', place: 'Debre Berhan Selassie, Gondar',
    body:
      'The arch of an inner door, painted over every surface — figures ranked in registers ' +
      'above and beside the opening, so that passing through it means passing through the ' +
      'company of the saints.',
    credit: 'Chuck Moravec · CC BY 2.0', ratio: '4 / 3',
  },
  {
    file: 'ura-painting.jpg', group: 'painting',
    geez: 'ኡራ ኪዳነ ምሕረት', title: 'Wall paintings at Ura Kidane Mehret', place: 'Zege peninsula, Lake Tana',
    body:
      'A church that carries the same name as this parish — the Covenant of Mercy. Scene ' +
      'after scene runs round the sanctuary wall in unbroken registers, with the Theotokos ' +
      'and Child repeated along the upper band.',
    credit: 'Bernard Gagnon · CC BY-SA 3.0', ratio: '4 / 3',
  },
  {
    file: 'icon-4.jpg', group: 'painting',
    geez: 'ወላዲተ አምላክ', title: 'The Theotokos among the saints', place: 'Ethiopia',
    body:
      'A painted interior wall. The Mother of God in her blue mantle at the centre, with ' +
      'ranks of saints and a scene of martyrdom to either side — the whole wall readable ' +
      'as a page.',
    credit: 'Felitsata · CC BY-SA 4.0', ratio: '4 / 3',
  },
  {
    file: 'icon-2.jpg', group: 'painting',
    geez: 'መጋረጃ', title: 'Behind the curtain', place: 'Ethiopia',
    body:
      'Painted panels flanking the heavy curtain that veils the sanctuary. The curtain is ' +
      'drawn back only at particular moments of the Liturgy, and closed again after.',
    credit: 'Felitsata · CC BY-SA 4.0', ratio: '3 / 4',
  },
  {
    file: 'icon-3.jpg', group: 'painting',
    geez: 'ቅዱሳን በተርታ', title: 'Saints in register', place: 'Ethiopia',
    body:
      'Figures ranked in rows, each identified by an inscription in Ge’ez beside the head. ' +
      'The righteous face outward; the wicked are turned in profile.',
    credit: 'Felitsata · CC BY-SA 4.0', ratio: '3 / 4',
  },
  {
    file: 'icon-1.jpg', group: 'painting',
    geez: 'ሥዕለ ግድግዳ', title: 'A painted wall', place: 'Ethiopia',
    body:
      'Registers of narrative painting carried right up to the roof beams. Ethiopian ' +
      'churches leave very little surface unpainted.',
    credit: 'Felitsata · CC BY-SA 4.0', ratio: '3 / 4',
  },

  // ── architecture ──
  {
    file: 'bete-giyorgis-sunset.jpg', group: 'architecture',
    geez: 'ቤተ ጊዮርጊስ', title: 'Bete Giyorgis at sunset', place: 'Lalibela, Amhara · c. 1200',
    body:
      'A church in the shape of a Greek cross, cut downward out of solid rock — roof first, ' +
      'then walls, then the interior. There is no masonry anywhere in it. It was subtracted, ' +
      'not built.',
    credit: 'Thomas Fuhrmann · CC BY-SA 4.0', ratio: '4 / 3',
  },
  {
    file: 'bete-giyorgis.jpg', group: 'architecture',
    geez: 'ውቅር', title: 'The roof, from above', place: 'Lalibela, Amhara',
    body:
      'The cross cut into the roof, level with the surrounding ground. The whole church sits ' +
      'in a pit quarried out around it — one of eleven at Lalibela, joined by tunnels and ' +
      'trenches, made to stand as a new Jerusalem when the old one had become unreachable.',
    credit: 'Bernard Gagnon · CC BY-SA 3.0', ratio: '4 / 3',
  },
  {
    file: 'ura-exterior.jpg', group: 'architecture',
    geez: 'ክብ ቤተ ክርስቲያን', title: 'A round church', place: 'Ura Kidane Mehret, Lake Tana',
    body:
      'The circular plan with a conical roof, indigenous to Ethiopia and standard since the ' +
      'sixteenth century: three concentric rings around a square sanctuary at the centre.',
    credit: 'Bernard Gagnon · CC BY-SA 3.0', ratio: '4 / 3',
  },
  {
    file: 'ura-interior.jpg', group: 'architecture',
    geez: 'ቅኔ ማሕሌት', title: 'The outer ambulatory', place: 'Ura Kidane Mehret, Lake Tana',
    body:
      'The qene mahlet — the outermost ring, walled in timber, where the congregation stands ' +
      'and the debtera sing the office. The painted sanctuary is the drum of masonry within.',
    credit: 'Indrik myneur · CC BY 2.0', ratio: '4 / 3',
  },
  {
    file: 'gondar-interior.jpg', group: 'architecture',
    geez: 'ደብረ ብርሃን ሥላሴ', title: 'Debre Berhan Selassie', place: 'Gondar, Amhara · 17th century',
    body:
      'A rectangular stone church of the Gondarine period, plain and low from outside, and ' +
      'painted over every interior surface within — including the ceiling of winged faces.',
    credit: 'Chuck Moravec · CC BY 2.0', ratio: '4 / 3',
  },

  // ── manuscript ──
  {
    file: 'manuscript-18c.jpg', group: 'manuscript',
    geez: 'ውድቀተ አዳም', title: 'The Fall', place: 'Ethiopia · 18th century',
    body:
      'An open codex: Ge’ez text above and below, and between them Adam and Eve at the tree ' +
      'with the serpent coiled in its branches. Written on parchment prepared from goatskin, ' +
      'in two inks — black for the text, red for the names of God and the section openings.',
    credit: 'Public domain', ratio: '3 / 4',
  },
  {
    file: 'manuscript-zechariah.jpg', group: 'manuscript',
    geez: 'ብሥራተ ዘካርያስ', title: 'The annunciation to Zechariah', place: 'British Library Add. MS 59874',
    body:
      'The angel appearing to Zechariah at the altar of incense, from an Ethiopic Bible. The ' +
      'Ethiopic canon runs to eighty-one books and alone preserves Enoch and Jubilees entire.',
    credit: 'Public domain', ratio: '3 / 4',
  },
  {
    file: 'manuscript-traditional.jpg', group: 'manuscript',
    geez: 'ገድለ ሰማዕት', title: 'A martyrdom before the king', place: 'Ethiopia',
    body:
      'A crowned king enthroned, an executioner with a curved sword, and the heads of the ' +
      'martyrs ranked along the foot of the panel — every one of them painted full-face, ' +
      'because they are the righteous. Set within a plain red frame.',
    credit: 'Public domain', ratio: '1 / 1',
  },

  // ── metalwork ──
  {
    file: 'cross-walters.jpg', group: 'metalwork',
    geez: 'መስቀል', title: 'Processional cross', place: 'Ethiopia · Walters Art Museum',
    body:
      'Cast in one piece by the lost-wax method, then pierced and chased. The interlace has ' +
      'no beginning and no end, which is the whole argument.',
    credit: 'Anonymous, Ethiopia · Public domain', ratio: '3 / 4',
  },
  {
    file: 'cross-detail.jpg', group: 'metalwork',
    geez: 'የእጅ መስቀል', title: 'A hand cross, engraved', place: 'Ethiopia',
    body:
      'The flat plate form of hand cross, engraved with lines of Ge’ez and a row of standing ' +
      'figures beneath. It is held out to the faithful to be kissed, and used to bless.',
    credit: 'A. Davey · CC BY 2.0', ratio: '1 / 1',
  },
  {
    file: 'cross-lalibela.jpg', group: 'metalwork',
    geez: 'የላሊበላ መስቀል', title: 'The Lalibela cross', place: 'Lalibela, Amhara',
    body:
      'A seven-kilogram processional cross, the most famous single object in the Ethiopian ' +
      'Church. It was stolen in 1997 and recovered in 2001.',
    credit: 'Valentin Lavrinenko · CC BY-SA 3.0', ratio: '3 / 4',
  },

  // ── the living church ──
  {
    file: 'procession.jpg', group: 'living',
    geez: 'ሰልፍ', title: 'The umbrellas come out', place: 'Gondar',
    body:
      'The fringed ceremonial umbrellas are not shade. They mark what is beneath them as ' +
      'holy, and they only appear when the tabot does.',
    credit: 'Brian Dell · CC0', ratio: '4 / 3',
  },
  {
    file: 'timkat.jpg', group: 'living',
    geez: 'ጉባኤ', title: 'A great assembly', place: 'Ethiopia',
    body:
      'A deacon in white looks down over a hillside packed with the faithful. Ethiopian ' +
      'feasts are kept outdoors because no building has ever been large enough.',
    credit: 'Eyasusetegn · CC BY-SA 4.0', ratio: '4 / 3',
  },
  {
    file: 'priest-cross.jpg', group: 'living',
    geez: 'ካህን', title: 'A priest with an icon', place: 'Ethiopia',
    body:
      'In full vestments — the embroidered cope and the coloured stole — holding a painted ' +
      'icon of the Saviour before the sanctuary curtain.',
    credit: 'Chuck Moravec · CC BY 2.0', ratio: '3 / 4',
  },
  {
    file: 'priest-tigray.jpg', group: 'living',
    geez: 'አረጋዊ ካህን', title: 'A priest of Tigray', place: 'Tigray',
    body:
      'The turban and the shamma. Priests in the rural north are often also the schoolmasters, ' +
      'the scribes, and the only people for a day’s walk who can read Ge’ez.',
    credit: 'Rod Waddington · CC BY-SA 2.0', ratio: '3 / 4',
  },
];

export const GROUPS = [
  { key: 'painting',     geez: 'ሥዕል',            en: 'Painting' },
  { key: 'architecture', geez: 'ሕንፃ',            en: 'Architecture' },
  { key: 'manuscript',   geez: 'ብራና',            en: 'Manuscripts' },
  { key: 'metalwork',    geez: 'ብረት ሥራ',         en: 'Metalwork' },
  { key: 'living',       geez: 'ሕያው ቤተ ክርስቲያን', en: 'The living Church' },
] as const;
