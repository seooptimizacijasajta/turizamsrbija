"use client";
import { useLang } from "@/lib/i18n";
import FaqAccordion from "./FaqAccordion";
import type { Faq } from "@/lib/faq";

const FAQ_SR: Faq[] = [
  { q: "Koliko koštaju apartmani u Beogradu?", a: "Cena zavisi od lokacije, veličine i sezone. Studio apartman na dan obično ide od 25 do 45 evra, dok prostraniji stanovi za četiri i više osoba koštaju 50 do 90 evra po noći. Apartmani u strogom centru i na Vračaru su nešto skuplji, a na Novom Beogradu i Zemunu se često nađu povoljnije ponude." },
  { q: "Koja je najbolja opština za smeštaj u Beogradu?", a: "Za prvi dolazak i obilazak grada najpraktičniji su Stari grad i Vračar — pešačite do Knez Mihailove, Skadarlije i Hrama Svetog Save. Novi Beograd je idealan za poslovne goste (blizu Sava centra i Arene) i za one kojima treba parking, a Zemun za miran boravak uz Dunav." },
  { q: "Mogu li da iznajmim apartman u Beogradu na jedan dan?", a: "Da. Većina vlasnika izdaje apartmane na dan ili za kratak boravak, što je fleksibilnije i najčešće povoljnije od hotela. Minimalan broj noćenja se razlikuje od ponude do ponude i naveden je u opisu svakog apartmana." },
  { q: "Ima li apartmana blizu aerodroma i autobuske stanice?", a: "Ima. Za aerodrom Nikola Tesla najbliži su apartmani na Novom Beogradu i Surčinu, a za novu autobusku i železničku stanicu (Blok 42) takođe Novi Beograd. Sve lokacije možete videti na mapi unutar svakog oglasa." },
  { q: "Da li je za rezervaciju potrebna online uplata?", a: "Nije obavezna. Upit šaljete direktno vlasniku preko forme na stranici apartmana, a način plaćanja se dogovarate međusobno. Nema skrivenih troškova ni provizije za gosta." },
  { q: "Da li su apartmani u Beogradu pogodni za porodice i duži boravak?", a: "Jesu. Apartman sa sopstvenom kuhinjom i više soba je udobniji i isplativiji od hotela za porodice, kao i za poslovni boravak duži od nekoliko dana. Mnogi nude i besplatan parking, Wi-Fi i veš mašinu." },
];

const FAQ_EN: Faq[] = [
  { q: "How much do apartments in Belgrade cost?", a: "Prices depend on location, size and season. A studio per night usually ranges from 25 to 45 euros, while larger apartments for four or more guests cost 50 to 90 euros. Apartments in the very centre and on Vračar are a little pricier, while New Belgrade and Zemun often offer better value." },
  { q: "Which is the best district to stay in Belgrade?", a: "For a first visit and sightseeing, Stari Grad and Vračar are the most convenient — you can walk to Knez Mihailova, Skadarlija and the Temple of Saint Sava. New Belgrade is ideal for business travellers (near Sava Centar and the Arena) and for those needing parking, while Zemun is great for a quiet stay along the Danube." },
  { q: "Can I rent an apartment in Belgrade for a single day?", a: "Yes. Most owners rent apartments per day or for short stays, which is more flexible and usually cheaper than a hotel. The minimum number of nights varies and is stated in each apartment's description." },
  { q: "Are there apartments near the airport and bus station?", a: "Yes. The closest apartments to Nikola Tesla Airport are in New Belgrade and Surčin, and the same area serves the new bus and railway station (Blok 42). You can see every location on the map within each listing." },
  { q: "Is online payment required to book?", a: "No. You send your enquiry directly to the owner through the form on the apartment page, and you arrange payment between yourselves. There are no hidden fees or guest commission." },
  { q: "Are Belgrade apartments suitable for families and longer stays?", a: "Yes. An apartment with its own kitchen and several rooms is more comfortable and cost-effective than a hotel for families, and for business stays of more than a few days. Many also offer free parking, Wi-Fi and a washing machine." },
];

function ArticleSR() {
  return (
    <section className="section"><div className="container" style={{ maxWidth: 820 }}>
      <div className="prose">
        <h2>Apartmani Beograd — smeštaj u srcu prestonice</h2>
        <p>Tražite <strong>apartmane u Beogradu</strong>? Na jednom mestu pronađite proveren privatni smeštaj — od studio apartmana u centru do prostranih stanova na Novom Beogradu, Vračaru i Zemunu. Bilo da dolazite na vikend, poslovni put, koncert u Areni ili duži boravak, apartman vam nudi privatnost, sopstvenu kuhinju i bolju cenu od hotela. Svaki <strong>apartman Beograd</strong> ima jasan opis, fotografije, tačnu lokaciju na mapi i kontakt vlasnika, bez posrednika i bez provizije za gosta.</p>

        <h3>Apartmani Beograd po opštinama</h3>
        <p>Beograd je grad četvrti sa svojim karakterom. <strong>Apartmani na Vračaru</strong> i u Starom gradu stavljaju vas na korak od Knez Mihailove, Skadarlije, Kalemegdana i Hrama Svetog Save — savršeno za turiste koji žele sve da obiđu pešice. <strong>Apartmani na Novom Beogradu</strong> su izbor poslovnih gostiju i posetilaca sajma, Sava Centra i Štark Arene, sa lakim parkiranjem i brzim dolaskom sa aerodroma. <strong>Apartmani u Zemunu</strong> nude miran boravak uz Dunav, Gardoš i kej, dok Savski venac i Dorćol spajaju centralnu lokaciju sa mirnijim ulicama.</p>

        <h3>Apartmani na dan i kratkoročni najam</h3>
        <p>Većina vlasnika izdaje <strong>apartmane na dan</strong> ili za kraći period, što je idealno za turiste i poslovne goste. <strong>Dnevni najam apartmana u Beogradu</strong> najčešće je povoljniji i fleksibilniji od hotela, posebno za dvoje ili za porodicu. Tražite li <strong>jeftine apartmane u Beogradu</strong>, najviše ćete uštedeti van strogog centra — na Novom Beogradu, Zvezdari ili u Zemunu — uz odličnu povezanost gradskim prevozom.</p>

        <h3>Koliko koštaju apartmani u Beogradu?</h3>
        <p>Cene zavise od lokacije, veličine i sezone. Studio obično košta od 25 do 45 evra po noći, a veći stanovi za četiri i više osoba od 50 do 90 evra. U sezoni manifestacija, dočeka Nove godine i velikih koncerata cene rastu, pa se rana rezervacija isplati. U svakom oglasu vidite cenu, kapacitet i šta je uključeno — Wi-Fi, parking, klima, veš mašina.</p>

        <h3>Kako rezervisati apartman u Beogradu</h3>
        <p>Izaberite apartman koji vam odgovara, pogledajte fotografije i lokaciju na mapi, pa pošaljite upit vlasniku preko forme. Odgovor obično stiže isti dan. Nema obavezne online uplate ni skrivenih troškova — termin i način plaćanja dogovarate direktno sa domaćinom. Tako dobijate <strong>smeštaj u Beogradu</strong> po poštenoj ceni i sa osobom koja stoji iza ponude.</p>

        <h3>Zašto apartman umesto hotela</h3>
        <p>Apartman znači sopstvenu kuhinju, više prostora i privatnost, a uz to često i besplatan parking i niži račun za porodicu ili grupu. Za duži ili poslovni boravak razlika u udobnosti i ceni je velika. Pregledajte ponudu iznad, sačuvajte favorite klikom na srce i uporedite apartmane pre nego što se odlučite.</p>
      </div>
    </div></section>
  );
}

function ArticleEN() {
  return (
    <section className="section"><div className="container" style={{ maxWidth: 820 }}>
      <div className="prose">
        <h2>Belgrade apartments — stay in the heart of the capital</h2>
        <p>Looking for <strong>apartments in Belgrade</strong>? Find verified private accommodation in one place — from studio apartments in the centre to spacious flats in New Belgrade, Vračar and Zemun. Whether you come for a weekend, a business trip, a concert at the Arena or a longer stay, an apartment gives you privacy, your own kitchen and a better price than a hotel. Every Belgrade apartment has a clear description, photos, an exact map location and the owner's contact — no middlemen and no guest commission.</p>

        <h3>Belgrade apartments by district</h3>
        <p>Belgrade is a city of neighbourhoods, each with its own character. Apartments on Vračar and in Stari Grad put you steps from Knez Mihailova, Skadarlija, Kalemegdan and the Temple of Saint Sava — perfect for tourists who want to explore on foot. New Belgrade is the choice of business guests and visitors to the fair, Sava Centar and Štark Arena, with easy parking and a quick airport transfer. Zemun offers a quiet stay along the Danube, Gardoš and the riverbank, while Savski Venac and Dorćol combine a central location with calmer streets.</p>

        <h3>Daily and short-term rentals</h3>
        <p>Most owners rent apartments per day or for short stays, which is ideal for tourists and business travellers. Daily rental in Belgrade is usually cheaper and more flexible than a hotel, especially for two people or a family. If you are after cheap apartments in Belgrade, you will save most outside the very centre — in New Belgrade, Zvezdara or Zemun — with excellent public transport links.</p>

        <h3>How much do Belgrade apartments cost?</h3>
        <p>Prices depend on location, size and season. A studio usually costs 25 to 45 euros per night, and larger flats for four or more guests 50 to 90 euros. During major events, New Year and big concerts prices rise, so booking early pays off. Each listing shows the price, capacity and what is included — Wi-Fi, parking, air conditioning, washing machine.</p>

        <h3>How to book an apartment in Belgrade</h3>
        <p>Choose an apartment that suits you, check the photos and map location, then send an enquiry to the owner through the form. A reply usually arrives the same day. There is no mandatory online payment and no hidden costs — you arrange dates and payment directly with the host. That is how you get accommodation in Belgrade at a fair price, from a real person behind the listing.</p>

        <h3>Why an apartment instead of a hotel</h3>
        <p>An apartment means your own kitchen, more space and privacy, often with free parking and a lower bill for a family or group. For longer or business stays the difference in comfort and price is significant. Browse the listings above, save favourites with the heart icon and compare apartments before you decide.</p>
      </div>
    </div></section>
  );
}

export default function BelgradeSEO() {
  const { lang } = useLang();
  const en = lang !== "sr";
  return (
    <>
      {en ? <ArticleEN /> : <ArticleSR />}
      <FaqAccordion items={en ? FAQ_EN : FAQ_SR} heading={en ? "Belgrade apartments — FAQ" : "Apartmani Beograd — česta pitanja"} />
    </>
  );
}
