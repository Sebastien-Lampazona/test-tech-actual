# Test technique Actual fullstack
- Le test devra être livré via un repository Github, gitlab ou bitbucket privé.
- Les travaux devront pouvoir être testable sans aucune modification à apporter au code, ni paramétrage et si besoin en suivant pas à pas une documentation.
- Nous vous demandons de réaliser le test en utilisant la dernière version de Laravel et d'intégrer la stack react dans Laravel (grâce à laravel-vite)
- Merci d'utiliser ReactJS dans sa dernière version stable, et de priviliégier les libraries de notre stack: Axios, Tanstack Query, Zustand, Formik, Yup et Material UI. Sinon utilisez la librarie qui vous semble la plus adaptée.
- Veillez à soigner votre historique git, comme s'il s'agissait d'une situation projet réelle.

## Exercices à réaliser

### ACT-R1 - Spécifications de la Stack
Création d'un site factice de gestion de candidats pour une entreprise d'intérim comportant les pages suivantes :
- Page de liste des candidats (homepage) (contenu défini en *ACT-R2*)
- Page de détail d'un candidat (contenu défini en *ACT-R3*)
- Les candidats pourront être associés à des missions.
- Les missions comporterons les informations suivantes : Date de début, Date de fin, Intitulé de poste. Elles seront générées à partir des seeders.

Vous réaliserez le modèle de données en grâce à Laravel et exposerez les routes api nécessaires pour le front. Pour plus de simplicité il **n'est pas nécessaire** de mettre en place une couche d'authentification.

Utilisez des seeders pour remplir la base de données avec les jeux de données qui vous semblent nécessaires.

### ACT-R2 - Page de liste des candidats
Page regroupant l'ensemble des candidats sous forme de liste.

Les éléments de cette liste pourront être modifiés / supprimés par l'utilisateur grâce à un (ou +) bouton d'action rapide.

### ACT-R3 - Page de détail d'un candidat
Mettre en place un formulaire comportant les champs suivants :
- Nom
- Prénom
- Email
- Date de naissance

Un tableau récapitulatif des missions du candidat devra apparaître en bas de page.

Les données de ce formulaire seront issues de l'api et pourront être modifiées grâce au formulaire.

Le candidat pourra être associé à une ou plusieurs missions depuis cette page (Attention au chevauchement des dates)

### ACT-R4 - Tests unitaires et fonctionnels

Réalisez un jeu de tests fonctionnels et unitaires pour le back et le front.

### ACT-R5 - Liste des candidats en fin de mission

Réalisez une commande qui permettra d'afficher la liste des candidats finissant leur mission un jour donné. Le jour sera une option de la commande, la valeur par défaut sera la date du jour.

Le format de sortie sera sous forme de tableau. Prénom Nom, Intitulé et Dates de la mission en cours, Intitulé et dates de la mission à venir.

### ACT-R6 - Bonus
- Les formulaires n'ont pas de bouton "enregistrer", les modifications sont automatiquement envoyée à l'api.
- Sur la page de détail du candidat, remplacer le tableau des missions par un calendrier.
- Le candidat comprendra aussi le champ "Numéro de sécurité sociale", avec une vérification du format du numéro saisi.
