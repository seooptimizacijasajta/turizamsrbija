"use client";
import { Kind } from "@/lib/types";
import { useLang } from "@/lib/i18n";

type Block = { h?: string; p: string };
const C: Record<Kind, { sr: Block[]; en: Block[] }> = {
  mountain: {
    sr: [
      { h: "Planine Srbije — vazduh, sneg i mir na dohvat ruke", p: "Planine u Srbiji su celogodišnja destinacija: zimi skijanje i sankanje, leti planinarenje, vožnja bicikla i beg od vrućine. Od Kopaonika i Zlatibora, preko Stare planine i Tare, do Divčibara i Goča — svaka ima svoj karakter, a smeštaj na planini birate po ceni, lokaciji i sadržaju." },
      { h: "Najpoznatije planine i kada ići", p: "Kopaonik je najveći ski-centar sa preko 55 km staza i pouzdanim snegom od decembra do aprila. Zlatibor i Tara su omiljeni za leto, čist vazduh i porodični odmor, dok Stara planina (Babin Zub) i Divčibare nude kraće redove i niže cene. Apartmane, vile i etno domaćinstva uporedite po terminu i broju osoba." },
      { h: "Smeštaj na planini bez provizije", p: "Pregledajte ponudu iznad, sačuvajte favorite i pošaljite upit direktno vlasniku. Bez posrednika i skrivenih troškova — cenu i termin dogovarate sa domaćinom, a tačnu lokaciju vidite na mapi u svakom oglasu." },
    ],
    en: [
      { h: "Mountains of Serbia — fresh air, snow and quiet within reach", p: "Serbia's mountains are a year-round destination: skiing and sledding in winter, hiking, cycling and an escape from the heat in summer. From Kopaonik and Zlatibor, through Stara Planina and Tara, to Divčibare and Goč — each has its own character, and you choose mountain accommodation by price, location and amenities." },
      { h: "The best-known mountains and when to go", p: "Kopaonik is the largest ski resort with over 55 km of slopes and reliable snow from December to April. Zlatibor and Tara are favourites for summer, clean air and family holidays, while Stara Planina (Babin Zub) and Divčibare offer shorter queues and lower prices. Compare apartments, villas and ethno homesteads by dates and number of guests." },
      { h: "Mountain accommodation with no commission", p: "Browse the listings above, save favourites and send your enquiry straight to the owner. No middlemen and no hidden costs — you arrange price and dates with the host, and see the exact location on the map in every listing." },
    ],
  },
  lake: {
    sr: [
      { h: "Jezera Srbije — odmor uz vodu za svaki ukus", p: "Od Srebrnog jezera, „srpskog mora\", preko Palića i Perućca, do Vlasinskog i Zlatarskog — jezera u Srbiji nude kupanje, ribolov, vožnju čamcem i miran porodični odmor. Smeštaj uz jezero birate po blizini plaže, ceni i sadržaju, a sezona kupanja traje od juna do početka septembra." },
      { h: "Gde na kupanje, a gde u ribolov", p: "Srebrno jezero i Palić imaju uređene plaže i vodene sportove, idealne za porodice. Za pecanje su poznata Vlasinsko, Zlatarsko i Perućačko jezero, gde je potrebna dozvola lokalnih udruženja. Mir i netaknutu prirodu potražite na Zaovinskom i Borskom jezeru." },
      { h: "Apartmani i vile uz jezero", p: "Uporedite apartmane, vile i etno domaćinstva na obali, sačuvajte favorite i javite se vlasniku preko forme. Bez provizije za gosta — termin i cenu dogovarate direktno, a lokaciju vidite na mapi." },
    ],
    en: [
      { h: "Lakes of Serbia — a waterside holiday for every taste", p: "From Silver Lake, the 'Serbian sea', through Palić and Perućac, to Vlasina and Zlatar — Serbia's lakes offer swimming, fishing, boating and quiet family holidays. You choose lakeside accommodation by beach proximity, price and amenities, and the swimming season runs from June to early September." },
      { h: "Where to swim and where to fish", p: "Silver Lake and Palić have organised beaches and water sports, ideal for families. Vlasina, Zlatar and Perućac lakes are known for fishing, where a permit from local associations is required. For peace and untouched nature, head to Zaovine and Bor lakes." },
      { h: "Apartments and villas by the lake", p: "Compare apartments, villas and ethno homesteads on the shore, save favourites and contact the owner through the form. No guest commission — you arrange dates and price directly, and see the location on the map." },
    ],
  },
  spa: {
    sr: [
      { h: "Banje Srbije — lečenje, opuštanje i wellness", p: "Banje u Srbiji spajaju lekovitu termomineralnu vodu, vrhunsku medicinu i wellness sadržaje. Vrnjačka, Soko, Banja Koviljača, Prolom, Niška i Banja Vrujci samo su deo bogate ponude. Smeštaj u banji birate po blizini izvora i bazena, ceni i programima oporavka." },
      { h: "Koju banju izabrati", p: "Vrnjačka Banja je najveća i najposećenija, sa razvijenom ponudom za sve uzraste. Prolom i Soko banja poznate su po lečenju, Banja Koviljača po sumpornoj vodi i parku, a Banja Vrujci po termalnim bazenima na sat vožnje od Beograda — idealna za vikend i porodični odmor." },
      { h: "Rezervacija smeštaja u banji", p: "Pregledajte ponudu, sačuvajte favorite i pošaljite upit direktno vlasniku, bez provizije i skrivenih troškova. Mnogi nude i polupansion, pa proverite šta je uključeno u opisu svakog oglasa." },
    ],
    en: [
      { h: "Spas of Serbia — treatment, relaxation and wellness", p: "Serbia's spas combine healing thermo-mineral water, excellent medicine and wellness facilities. Vrnjačka, Soko, Banja Koviljača, Prolom, Niška and Banja Vrujci are just part of a rich offer. You choose spa accommodation by proximity to springs and pools, price and recovery programmes." },
      { h: "Which spa to choose", p: "Vrnjačka Banja is the largest and most visited, with facilities for all ages. Prolom and Soko Banja are known for treatment, Banja Koviljača for sulphur water and its park, and Banja Vrujci for thermal pools an hour from Belgrade — ideal for a weekend and family break." },
      { h: "Booking spa accommodation", p: "Browse the offer, save favourites and send your enquiry straight to the owner, with no commission or hidden costs. Many also offer half-board, so check what is included in each listing's description." },
    ],
  },
  ethno: {
    sr: [
      { h: "Etno sela Srbije — tradicija, mir i domaća kuhinja", p: "Etno sela i seoska domaćinstva čuvaju duh stare Srbije: brvnare, ognjišta, domaću hranu i autentičan doživljaj sela. Drvengrad na Mokroj Gori, Sirogojno, Gostoljublje i druga vode vas u prirodu, daleko od gradske vreve, idealno za vikend i porodični odmor." },
      { h: "Šta nudi seoski turizam", p: "Pored smeštaja u brvnarama i etno kućama, mnoga domaćinstva nude domaću rakiju, sir i kajmak, jahanje, ribolov i obilazak okoline. Ovo je odmor za one koji žele mir, čist vazduh i autentičnu gostoljubivost domaćina." },
      { h: "Smeštaj u etno selu", p: "Uporedite domaćinstva, sačuvajte favorite i javite se vlasniku direktno, bez provizije. Termin i cenu dogovarate sa domaćinom, a tačnu lokaciju i okolinu vidite na mapi u svakom oglasu." },
    ],
    en: [
      { h: "Ethno villages of Serbia — tradition, calm and home cooking", p: "Ethno villages and rural homesteads preserve the spirit of old Serbia: log cabins, hearths, home-cooked food and an authentic village experience. Drvengrad on Mokra Gora, Sirogojno and others take you into nature, far from the city bustle, ideal for a weekend and family holiday." },
      { h: "What rural tourism offers", p: "Beyond accommodation in log cabins and ethno houses, many homesteads offer homemade rakija, cheese and kajmak, horse riding, fishing and tours of the surroundings. This is a holiday for those who want quiet, clean air and the genuine hospitality of the hosts." },
      { h: "Accommodation in an ethno village", p: "Compare homesteads, save favourites and contact the owner directly, with no commission. You arrange dates and price with the host, and see the exact location and surroundings on the map in every listing." },
    ],
  },
  stay: {
    sr: [
      { h: "Smeštaj u Srbiji — hoteli i privatni apartmani", p: "Na jednom mestu uporedite hotele, apartmane, vile i etno domaćinstva širom Srbije. Bilo da putujete na planinu, jezero, u banju ili grad, smeštaj birate po lokaciji, ceni, kapacitetu i sadržaju, sa tačnom lokacijom na mapi i fotografijama u svakom oglasu." },
      { h: "Kako izabrati pravi smeštaj", p: "Filtrirajte po tipu i mestu, pogledajte ocene i recenzije gostiju, pa uporedite cene. Apartman sa kuhinjom je isplativiji za porodice i duži boravak, dok hoteli nude punu uslugu. Sačuvajte favorite klikom na srce i lako se vratite na njih." },
      { h: "Rezervacija bez provizije", p: "Upit šaljete direktno vlasniku preko forme — bez posrednika, bez skrivenih troškova i bez obavezne online uplate. Termin i način plaćanja dogovarate sa domaćinom." },
    ],
    en: [
      { h: "Accommodation in Serbia — hotels and private apartments", p: "Compare hotels, apartments, villas and ethno homesteads across Serbia in one place. Whether you travel to the mountains, a lake, a spa or a city, you choose accommodation by location, price, capacity and amenities, with an exact map location and photos in every listing." },
      { h: "How to choose the right place", p: "Filter by type and place, check ratings and guest reviews, then compare prices. An apartment with a kitchen is better value for families and longer stays, while hotels offer full service. Save favourites with the heart icon and return to them easily." },
      { h: "Booking with no commission", p: "Send your enquiry straight to the owner through the form — no middlemen, no hidden costs and no mandatory online payment. You arrange dates and payment method with the host." },
    ],
  },
};

export default function SectionSEO({ kind }: { kind: Kind }) {
  const { lang } = useLang();
  const blocks = C[kind]?.[lang === "en" ? "en" : "sr"];
  if (!blocks) return null;
  return (
    <section className="section"><div className="container" style={{ maxWidth: 820 }}>
      <div className="prose">
        {blocks.map((b, i) => (
          <div key={i}>{i === 0 ? <h2>{b.h}</h2> : <h3>{b.h}</h3>}<p>{b.p}</p></div>
        ))}
      </div>
    </div></section>
  );
}
