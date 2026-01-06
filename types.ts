export enum PrincipleType {
  SRP = 'SRP',
  OCP = 'OCP',
  LSP = 'LSP',
  ISP = 'ISP',
  DIP = 'DIP',
}

export interface LearnMoreLink {
  title: string;
  url: string;
  description: string;
}

export interface PrincipleData {
  id: PrincipleType;
  title: string;
  subtitle: string;
  officialDef: string;
  whyItMatters: string;
  pupAnalogy: string;
  pragmaticHint: string;
  visualSummary: string;
  signsOfFailure: string[];
  learnMoreLinks: LearnMoreLink[];
  pupIcon: string;
  pupName: string;
  color: string;
  bgLight: string;
  borderColor: string;
}

export interface Task {
  id: string;
  description: string;
  requiredRole: 'Police' | 'Fire' | 'Pilot' | 'Construction';
}

export interface Pup {
  name: string;
  role: 'Police' | 'Fire' | 'Pilot' | 'Construction';
  color: string;
}
