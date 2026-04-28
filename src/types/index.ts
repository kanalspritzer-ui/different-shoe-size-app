export type Benutzer = {
  id: number;
  email: string;
  vorname: string;
  nachname: string;
  schuhgroesseLinks: string;
  schugroesseRechts: string;
  anrede?: string;
  strasse?: string;
  postleitzahl?: string;
  ort?: string;
};

export type RegistrationData = {
  anrede: string;
  vorname: string;
  nachname: string;
  strasse: string;
  postleitzahl: string;
  ort: string;
  email: string;
  passwort: string;
  schuhgroesseLinks: string;
  schugroesseRechts: string;
};

export type LoginResponse = {
  message: string;
  benutzer: Benutzer;
};

export type MatchResponse = {
  matchCount: number;
};
