export type Language = 'en' | 'de';

export interface Translations {
  // Header
  appTagline: string;
  masteryLabel: string;
  masteryBadges: string;
  // Nav section jump labels
  navBrief: string;
  navPlay: string;
  navCode: string;
  // Left panel card titles
  cardMissionSummary: string;
  cardObjective: string;
  cardManual: string;
  cardPupAnalogy: string;
  cardLearnMore: string;
  cardProTip: string;
  cardProTipBy: string;
  cardChief: string;
  // Signs of failure section
  failureTitle: string;
  failureSubOpen: string;
  failureSubClosed: string;
  // Right column sections
  missionTraining: string;
  missionTrainingSubtitle: string;
  masteryEarned: string;
  missionBlueprints: string;
  missionBlueprintsSubtitle: string;
  // Debriefing table
  debriefingTitle: string;
  debriefingSubtitle: string;
  tableColUnit: string;
  tableColSpec: string;
  tableColDeploy: string;
  tableColRisk: string;
  tableColRiskValue: string;
  // Footer
  footerTagline: string;
  footerContribute: string;
  footerInspiredBy: string;
  footerInspiredByLink: string;
  // Language toggle
  toggleLabel: string;
}

const EN: Translations = {
  appTagline: 'Adventure Bay Academy',
  masteryLabel: 'Mastery',
  masteryBadges: 'Badges',
  navBrief: 'Brief',
  navPlay: 'Play',
  navCode: 'Code',
  cardMissionSummary: 'Mission Summary',
  cardObjective: 'Objective',
  cardManual: 'The Manual',
  cardPupAnalogy: 'Pup Analogy',
  cardLearnMore: 'Learn More',
  cardProTip: "Ryder's Pro Tip",
  cardProTipBy: "Ryder's Pro Tip",
  cardChief: 'Chief',
  failureTitle: 'Trouble at the Tower',
  failureSubOpen: 'Trouble Identified!',
  failureSubClosed: 'Detect Bad Smells',
  missionTraining: 'Mission Training',
  missionTrainingSubtitle: 'Interact to earn your badge',
  masteryEarned: 'Mastery Earned',
  missionBlueprints: 'Mission Blueprints',
  missionBlueprintsSubtitle: 'Developer Implementation (PHP)',
  debriefingTitle: 'Mission Debriefing',
  debriefingSubtitle: 'Comparison of specialized units',
  tableColUnit: 'Unit ID',
  tableColSpec: 'Specialization',
  tableColDeploy: 'Deployment',
  tableColRisk: 'Risk',
  tableColRiskValue: 'See Signs of Failure',
  footerTagline: 'No Job is too Big • No Pup is too Small',
  footerContribute: 'Contribute on GitHub',
  footerInspiredBy: "Mission inspired by",
  footerInspiredByLink: "Lars Moelleken's Debriefing",
  toggleLabel: 'DE',
};

const DE: Translations = {
  appTagline: 'Abenteuerbucht Akademie',
  masteryLabel: 'Fortschritt',
  masteryBadges: 'Abzeichen',
  navBrief: 'Überblick',
  navPlay: 'Spielen',
  navCode: 'Code',
  cardMissionSummary: 'Missionszusammenfassung',
  cardObjective: 'Ziel',
  cardManual: 'Das Handbuch',
  cardPupAnalogy: 'Welpen-Analogie',
  cardLearnMore: 'Mehr erfahren',
  cardProTip: 'Ryders Profi-Tipp',
  cardProTipBy: 'Ryders Profi-Tipp',
  cardChief: 'Leiter',
  failureTitle: 'Alarm im Aussichtsturm',
  failureSubOpen: 'Probleme erkannt!',
  failureSubClosed: 'Schlechte Muster erkennen',
  missionTraining: 'Missionstraining',
  missionTrainingSubtitle: 'Interagiere, um dein Abzeichen zu verdienen',
  masteryEarned: 'Abzeichen verdient',
  missionBlueprints: 'Missions-Blaupausen',
  missionBlueprintsSubtitle: 'Entwicklerimplementierung (PHP)',
  debriefingTitle: 'Missions-Nachbesprechung',
  debriefingSubtitle: 'Vergleich der spezialisierten Einheiten',
  tableColUnit: 'Einheit',
  tableColSpec: 'Spezialisierung',
  tableColDeploy: 'Einsatz',
  tableColRisk: 'Risiko',
  tableColRiskValue: 'Warnsignale beachten',
  footerTagline: 'Keine Aufgabe zu groß • Kein Welpe zu klein',
  footerContribute: 'Auf GitHub mitwirken',
  footerInspiredBy: 'Mission inspiriert von',
  footerInspiredByLink: "Lars Moellekens Artikel",
  toggleLabel: 'EN',
};

export const TRANSLATIONS: Record<Language, Translations> = { en: EN, de: DE };
