export const dynamic = "force-static";
export const revalidate = 86400;

const BODY = `# Turizam Srbija

> Trojezični (srpski / engleski / nemački) turistički portal Srbije. Na jednom mestu: destinacije, smeštaj, direktorijum turističkih firmi, domaći proizvodi i informacije o turističkim vaučerima. Domen: https://turizamsrbija.com

Ključne činjenice:
- Jezici: srpski (/), engleski (/en), nemački (/de). Svaka strana ima ekvivalent na sva tri jezika (hreflang).
- Za goste je portal besplatan; rezervacija ide preko forme za upit na stranici smeštaja (nema obavezne online uplate).
- Vlasnici se besplatno registruju i sami dodaju smeštaj; proviziju plaćaju tek kada im se dovedu gosti ("plaćanje po rezultatu").
- Kontakt: info@turizamsrbija.com, Viber/WhatsApp +381 64 4598778.

## Destinacije i smeštaj
- [Planine](https://turizamsrbija.com/planine): Kopaonik, Zlatibor, Tara, Stara planina, Divčibare, Goč
- [Jezera](https://turizamsrbija.com/jezera): Srebrno jezero, Palić, Perućac, Vlasina, Zlatar, Gazivode
- [Banje](https://turizamsrbija.com/banje): Vrnjačka Banja, Sokobanja, Banja Koviljača, Niška Banja, Prolom, Ribarska, Banja Vrujci
- [Etno sela](https://turizamsrbija.com/etno-sela): Drvengrad/Mokra Gora, Sirogojno, Tršić, Latkovac, Moravski Konaci
- [Sav smeštaj](https://turizamsrbija.com/smestaj): hoteli, vile, privatni apartmani širom Srbije
- [Apartmani Beograd](https://turizamsrbija.com/apartmani-beograd): po naseljima (Vračar, Novi Beograd, Zemun, Stari grad…) i strukturi (studio, jednosobni, dvosobni…)

## Firme (direktorijum turističkih usluga)
- [Sve firme](https://turizamsrbija.com/firme): turističke agencije, rent-a-car, vodiči i ture, transferi/aerodrom, restorani, suveniri, putno osiguranje, iznajmljivanje opreme — filtrirano po gradu

## Domaći proizvodi i vaučeri
- [Pijaca](https://turizamsrbija.com/pijaca): med, sir, rakija, vino, rukotvorine — direktno od proizvođača
- [Turistički vaučeri](https://turizamsrbija.com/vauceri): kako iskoristiti državne vaučere i pronaći smeštaj koji ih prima

## Vodiči i informacije
- [Blog / vodiči](https://turizamsrbija.com/blog): detaljni vodiči o destinacijama i gradovima Srbije
- [Vodič za vlasnike](https://turizamsrbija.com/vodic-za-vlasnike): kako oglasiti smeštaj
- [Oglašavanje](https://turizamsrbija.com/oglasavanje): baneri, izdvajanje, PR članci
- [Kontakt](https://turizamsrbija.com/kontakt) · [O nama](https://turizamsrbija.com/o-nama)
- [Sitemap](https://turizamsrbija.com/sitemap.xml)
`;

export function GET() {
  return new Response(BODY, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
