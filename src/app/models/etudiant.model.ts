export interface Etudiant {
  matricule: string;
  nom: string;
  prenom: string;
  classe: {
    id: number;
    libelle: string;
    filiere: string;
    niveau: number;
  };
}