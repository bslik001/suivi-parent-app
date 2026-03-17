# Suivi Académique Parents

Application Angular permettant aux parents de suivre les résultats académiques de leurs enfants via une authentification sécurisée par SMS (OTP).

## Stack

- **Frontend** : Angular 20 (standalone components)
- **Backend** : Spring Boot sur `http://localhost:8080`
- **Auth** : OTP par SMS, token stocké en localStorage

## Fonctionnalités

- Authentification par numéro de téléphone + code OTP (15 min d'expiration)
- Dashboard listant tous les enfants du parent connecté
- Consultation des notes par étudiant
- Téléchargement du bulletin PDF (JasperReports)
- Téléchargement de l'emploi du temps par classe

## Prérequis

- Node.js + Angular CLI
- Backend Spring Boot démarré sur le port 8080 avec CORS autorisé pour `http://localhost:4200`

## Démarrage

```bash
npm install
ng serve
```

Ouvrir `http://localhost:4200` — redirige automatiquement vers `/login`.

## Structure

```
src/app/
├── components/
│   ├── login/          # Authentification OTP
│   ├── dashboard/      # Liste des enfants
│   └── notes-view/     # Notes + téléchargement bulletin
├── services/
│   ├── auth.service.ts     # OTP, session
│   ├── parent.service.ts   # Récupération des enfants
│   └── student.service.ts  # Notes, bulletin PDF
├── models/
│   └── etudiant.model.ts
└── guards/
    └── auth.guard.ts   # Protection des routes
```

## API Backend attendue

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/send-otp` | Envoi du code OTP |
| POST | `/api/auth/verify-otp` | Vérification OTP |
| GET | `/api/parent/tous-mes-enfants/{telephone}` | Liste des enfants |
| GET | `/api/notes/etudiant/{matricule}` | Notes d'un étudiant |
| GET | `/api/report/notes/pdf/{matricule}` | Bulletin PDF |
| GET | `/api/planning/download/{classeId}` | Emploi du temps |
