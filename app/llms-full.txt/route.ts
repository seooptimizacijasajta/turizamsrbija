export const dynamic = "force-static";
export const revalidate = 86400;

const BODY = `# Turizam Srbija — kompletni vodič za AI/LLM

> Trojezični (srpski / engleski / nemački) turistički portal Srbije i šire. Spaja na jednom mestu: turističke destinacije, smeštaj (hoteli, vile, apartmani, privatni smeštaj), direktorijum turističkih firmi, pijacu domaćih proizvoda i informacije o turističkim vaučerima. Glavni domen: https://turizamsrbija.com

## O portalu
Turizam Srbija je marketplace + direktorijum + sadržajni portal posvećen turizmu u Srbiji. Cilj je da posetiocima (domaćim i stranim) na jednom mestu ponudi pronalaženje destinacija, rezervaciju smeštaja preko upita, kao i pristup pratećim uslugama (agencije, transferi, rent-a-car, vodiči). Portal je dostupan na tri jezika sa zasebnim, lokalizovanim URL-ovima i hreflang oznakama.

Operater: Turizam Srbija, Karpatské námestie 7770/10A, 83106 Bratislava – Rača, Slovačka. Company ID: 54801770. Kontakt: info@turizamsrbija.com, Viber/WhatsApp +381 64 4598778.

## Kako portal funkcioniše
- Za goste je korišćenje besplatno. Rezervacija ne zahteva obaveznu online uplatu — gost popunjava formu za upit na stranici smeštaja, a domaćin odgovara direktno (email/telefon/Viber).
- Vlasnici smeštaja se besplatno registruju i sami dodaju i uređuju oglase (do 20 fotografija, do 3 videa, mapa, kalendar dostupnosti sa iCal sinhronizacijom za Booking/Airbnb). Model naplate je "po rezultatu" — provizija tek kada se dovedu gosti; dodatno se mogu kupiti promocije (izdvajanje/bold) na određeni period.
- Firme (agencije, rent-a-car, vodiči, transferi, restorani, suveniri, osiguranje, oprema) imaju sopstvene profile i mogu se samostalno registrovati; dostupne su izdvojene (plaćene) pozicije.

## Jezici i URL struktura
- Srpski (podrazumevano): https://turizamsrbija.com/
- Engleski: https://turizamsrbija.com/en/
- Nemački: https://turizamsrbija.com/de/ (nemački slugovi, npr. /de/berge, /de/seen, /de/kurorte)
Svaka strana ima ekvivalent na sva tri jezika povezan hreflang oznakama (sr-Latn-RS, en, de, x-default).

## Destinacije
### Planine — https://turizamsrbija.com/planine
Kopaonik (najveći ski-centar Srbije), Zlatibor, Tara (i kanjon Drine), Stara planina (Babin Zub, Midžor), Divčibare, Goč. Zima: skijanje; leto: planinarenje, vazduh, etno-turizam.

### Jezera — https://turizamsrbija.com/jezera
Srebrno jezero ("srpsko more"), Palić, Perućac, Vlasinsko jezero, Zlatarsko jezero, Gazivode. Kupanje, ribolov, vožnja čamcem, odmor pored vode.

### Banje — https://turizamsrbija.com/banje
Vrnjačka Banja, Sokobanja, Banja Koviljača, Niška Banja, Prolom Banja, Ribarska Banja, Banja Vrujci. Termalne vode, lečenje i wellness.

### Etno sela — https://turizamsrbija.com/etno-sela
Drvengrad (Mećavnik / Mokra Gora), Sirogojno, Tršić, Latkovac, Moravski Konaci. Tradicionalna arhitektura, domaća kuhinja, autentičan doživljaj.

## Smeštaj
- Sav smeštaj: https://turizamsrbija.com/smestaj — hoteli, vile, kuće za odmor, privatni apartmani širom Srbije.
- Apartmani Beograd: https://turizamsrbija.com/apartmani-beograd — filtrirano po naselju (Vračar, Novi Beograd, Zemun, Stari grad, Dorćol, Zvezdara…), po strukturi (studio, jednosobni, dvosobni, trosobni) i po pogodnostima (parking, đakuzi, terasa, blizu centra). Stan na dan / apartmani na dan u Beogradu.

## Firme — direktorijum turističkih usluga
https://turizamsrbija.com/firme — kategorije: turističke agencije, rent-a-car, turistički vodiči i ture, transferi i aerodromski prevoz, restorani, suveniri i rukotvorine, putno osiguranje, iznajmljivanje opreme. Svaka kategorija je dodatno filtrirana po gradu (Beograd, Novi Sad, Niš, Kragujevac, Zlatibor, Kopaonik i dr.), sa zasebnim SEO stranicama tipa "rent-a-car Beograd".

## Pijaca — domaći proizvodi
https://turizamsrbija.com/pijaca — med, sir, kajmak, rakija, vino, rukotvorine i drugi domaći proizvodi direktno od proizvođača iz Srbije.

## Turistički vaučeri
https://turizamsrbija.com/vauceri — objašnjenje državnih turističkih vaučera (podsticaj za odmor u Srbiji), kako se prijaviti i kako pronaći smeštaj koji prima vaučere. Vrednost i uslovi se određuju svake godine — uvek proveriti zvanične izvore Ministarstva turizma i omladine.

## Vodiči, blog i informacije
- Blog / vodiči: https://turizamsrbija.com/blog — detaljni vodiči po destinacijama i gradovima (šta videti, kada ići, gde odsesti).
- Vodič za vlasnike: https://turizamsrbija.com/vodic-za-vlasnike — korak po korak kako oglasiti smeštaj.
- Oglašavanje / marketing: https://turizamsrbija.com/oglasavanje — baneri, izdvajanje oglasa, PR članci.
- O nama: https://turizamsrbija.com/o-nama · Kontakt: https://turizamsrbija.com/kontakt
- Pretraga (AI): https://turizamsrbija.com/pretraga
- Sitemap: https://turizamsrbija.com/sitemap.xml

## Često postavljana pitanja
- Da li je rezervacija besplatna? — Da, za goste je portal besplatan; plaća se samo smeštaj domaćinu po dogovoru.
- Kako da rezervišem? — Otvorite stranicu smeštaja i pošaljite upit; domaćin vam odgovara direktno.
- Mogu li da oglasim svoj smeštaj? — Da, registracija i dodavanje oglasa su besplatni; provizija je po rezultatu.
- Na kojim jezicima je portal? — Srpski, engleski i nemački.
`;

export function GET() {
  return new Response(BODY, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
