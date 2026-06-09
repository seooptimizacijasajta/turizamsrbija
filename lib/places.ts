// Belgrade city municipalities (opštine grada Beograda)
export const BELGRADE_MUNICIPALITIES = [
  "Stari grad", "Vračar", "Savski venac", "Novi Beograd", "Zemun", "Palilula",
  "Voždovac", "Zvezdara", "Čukarica", "Rakovica", "Surčin", "Grocka",
  "Mladenovac", "Obrenovac", "Lazarevac", "Sopot", "Barajevo",
];

// Municipalities & cities of Serbia (opštine i gradovi)
export const SERBIA_MUNICIPALITIES = [
  "Beograd", ...BELGRADE_MUNICIPALITIES.map((m) => `Beograd — ${m}`),
  "Novi Sad", "Niš", "Kragujevac", "Subotica", "Zrenjanin", "Pančevo", "Čačak",
  "Kraljevo", "Novi Pazar", "Leskovac", "Smederevo", "Valjevo", "Kruševac",
  "Vranje", "Šabac", "Užice", "Sombor", "Požarevac", "Pirot", "Zaječar",
  "Kikinda", "Sremska Mitrovica", "Jagodina", "Vršac", "Bor", "Prokuplje",
  "Loznica", "Sremski Karlovci", "Inđija", "Stara Pazova", "Ruma", "Šid",
  "Apatin", "Bačka Palanka", "Bačka Topola", "Bečej", "Vrbas", "Kula",
  "Senta", "Ada", "Kanjiža", "Odžaci", "Bač", "Beočin", "Titel", "Žabalj",
  "Temerin", "Sečanj", "Nova Crnja", "Žitište", "Nova Varoš", "Priboj",
  "Prijepolje", "Sjenica", "Tutin", "Raška", "Vrnjačka Banja", "Trstenik",
  "Aleksandrovac", "Brus", "Ćićevac", "Varvarin", "Paraćin", "Ćuprija",
  "Despotovac", "Svilajnac", "Rekovac", "Aranđelovac", "Topola", "Rača",
  "Batočina", "Lapovo", "Knić", "Gornji Milanovac", "Lučani", "Ivanjica",
  "Arilje", "Požega", "Bajina Bašta", "Kosjerić", "Čajetina", "Sokobanja",
  "Knjaževac", "Boljevac", "Negotin", "Kladovo", "Majdanpek", "Žagubica",
  "Petrovac na Mlavi", "Malo Crniće", "Veliko Gradište", "Golubac", "Kučevo",
  "Smederevska Palanka", "Velika Plana", "Mladenovac", "Lebane", "Bojnik",
  "Medveđa", "Vlasotince", "Crna Trava", "Surdulica", "Vladičin Han",
  "Bosilegrad", "Bujanovac", "Preševo", "Trgovište", "Bela Palanka",
  "Babušnica", "Dimitrovgrad", "Gadžin Han", "Doljevac", "Merošina",
  "Ražanj", "Aleksinac", "Svrljig", "Kuršumlija", "Blace", "Žitorađa",
  "Bojnik", "Ljig", "Mionica", "Lajkovac", "Ub", "Osečina", "Vladimirci",
  "Koceljeva", "Bogatić", "Krupanj", "Ljubovija", "Mali Zvornik",
  "Irig", "Pećinci", "Opovo", "Kovačica", "Kovin", "Alibunar", "Plandište",
  "Bela Crkva", "Vrbas", "Mali Iđoš", "Srbobran", "Čoka", "Novi Bečej",
  "Novi Kneževac",
].sort((a, b) => a.localeCompare(b, "sr"));

// Naselja Srbije (gradovi, varoši, sela, turistička mesta) — za autocomplete; slobodan unos je i dalje moguć.
const EXTRA_SETTLEMENTS = [
  // turistička / planinska / banjska mesta
  "Zlatibor","Kopaonik","Tara","Divčibare","Mokra Gora","Sirogojno","Drvengrad","Guča","Mataruška Banja","Bogutovačka Banja",
  "Ribarska Banja","Gamzigradska Banja","Banja Vrujci","Ovčar Banja","Vrnjačka Banja","Sokobanja","Prolom Banja","Lukovska Banja",
  "Jošanička Banja","Niška Banja","Banja Koviljača","Bukovička Banja","Palić","Stara Planina","Goč","Rtanj","Fruška Gora","Avala",
  "Crni Vrh","Rajac","Suvobor","Maljen","Povlen","Zlatar","Murtenica","Golija","Mućanj","Besna Kobila","Vlasina","Đerdap",
  "Donji Milanovac","Tekija","Sremski Karlovci","Vršački Breg","Deliblatska Peščara","Carska Bara","Zasavica",
  // gradovi i veće varoši
  "Beograd","Novi Sad","Niš","Kragujevac","Subotica","Zrenjanin","Pančevo","Čačak","Kraljevo","Novi Pazar","Leskovac","Smederevo",
  "Valjevo","Kruševac","Vranje","Šabac","Užice","Sombor","Požarevac","Pirot","Zaječar","Kikinda","Sremska Mitrovica","Jagodina",
  "Vršac","Bor","Prokuplje","Loznica","Inđija","Stara Pazova","Ruma","Šid","Apatin","Bačka Palanka","Bačka Topola","Bečej","Vrbas",
  "Kula","Senta","Ada","Kanjiža","Odžaci","Bač","Beočin","Titel","Žabalj","Temerin","Nova Varoš","Priboj","Prijepolje","Sjenica",
  "Tutin","Raška","Trstenik","Aleksandrovac","Brus","Paraćin","Ćuprija","Despotovac","Svilajnac","Aranđelovac","Topola","Rača",
  "Batočina","Lapovo","Knić","Gornji Milanovac","Lučani","Ivanjica","Arilje","Požega","Bajina Bašta","Kosjerić","Čajetina",
  "Knjaževac","Negotin","Kladovo","Majdanpek","Petrovac na Mlavi","Veliko Gradište","Golubac","Kučevo","Smederevska Palanka",
  "Velika Plana","Lebane","Vlasotince","Surdulica","Vladičin Han","Bujanovac","Preševo","Bela Palanka","Dimitrovgrad","Aleksinac",
  "Svrljig","Kuršumlija","Blace","Žitorađa","Ljig","Mionica","Lajkovac","Ub","Osečina","Koceljeva","Bogatić","Krupanj","Ljubovija",
  "Mali Zvornik","Irig","Pećinci","Opovo","Kovačica","Kovin","Alibunar","Plandište","Bela Crkva","Srbobran","Novi Bečej","Čoka",
  "Novi Kneževac","Mladenovac","Obrenovac","Lazarevac","Mokrin","Bačko Gradište","Futog","Veternik","Sremska Kamenica","Petrovaradin",
  "Kać","Rakovac","Banoštor","Čortanovci","Beška","Maradik","Krčedin","Golubinci","Šimanovci","Surčin","Dobanovci","Ugrinovci",
  "Vrčin","Grocka","Umčari","Ralja","Sopot","Barajevo","Lazarevac","Stepojevac","Veliki Crljeni","Vreoci","Brzan","Gornji Milanovac",
  "Mrčajevci","Preljina","Atenica","Trbušani","Zablaće","Vrnjci","Novo Selo","Ribnica","Adrani","Vitanovac","Sirča","Roćevići",
  "Drežnik","Perućac","Rastište","Kaluđerske Bare","Mitrovac","Kremna","Vardište","Rožanstvo","Gostilje","Ljubiš","Jablanica",
  "Tršić","Brankovina","Divci","Lelić","Pecka","Krupanj","Zlakusa","Sevojno","Bela Zemlja","Stapari","Kremna","Mačkat","Semegnjevo",
];
export const SERBIA_SETTLEMENTS: string[] = Array.from(new Set([...SERBIA_MUNICIPALITIES, ...EXTRA_SETTLEMENTS])).sort((a, b) => a.localeCompare(b, "sr"));
