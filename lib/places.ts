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
