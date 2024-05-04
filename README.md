<p align="center"><img src="https://www.groupeactual.eu/img/front/logo-actual-agencemploi.png" width="400" alt="Laravel Logo"></p>

<p align="center">
<a href="https://github.com/Sebastien-Lampazona/test-tech-actual/workflows/tests/badge.svg/actions"><img src="https://github.com/Sebastien-Lampazona/test-tech-actual/workflows/tests/badge.svg/workflows/tests/badge.svg" alt="Build Status"></a>
</p>

## Informations techniques

Lien du diagramme de base de données : https://dbdiagram.io/d/Test-Tech-Actual-663213bb5b24a634d03d4e11

<iframe width="560" height="315" src='https://dbdiagram.io/e/663213bb5b24a634d03d4e11/663215ab5b24a634d03d6ca2'> </iframe>

## Utilisation du projet

Dans un soucis de rapidité de test pour le group Actual, j'ai suivis le dossier `public/build` ( normalement on ne devrait pas mais ça évite d'avoir à recompiler )

### Prérequis :
- Un serveur MYSQL en état de marche
- Php en CLI installé sur la machine

### Installation du projet
Pour lancer le projet il suffit simplement de faire les commandes suivantes :

```sh
composer install
php artisan migrate --seed # et de répondre oui quand il demandera de créer la BDD si elle n'existe pas déjà
```
### Lancement du projet

Pour lancer le back il suffit de faire la commande suivante :
```sh
php artisan serve
```

Le front étant compilé, il devrait directement s'afficher.

Normalement tout sera opérationnel directement sur l'URL http://localhost:8000

## Lancement des tests Back

Les tests back utilisent leurs propre base de donnée SQLite afin de pouvoir faire des tests fonctionnels sur un jeu de données "seedés".

Pour éxecuter les tests back il faut faire la commande suivante :
```sh
php artisan test
```
Ils tournent en général autour des 2 secondes.

## Execution de la commande permettant de lister les candidats en fin de mission

La commande possède un argument de date optionnel. Il représente la date de fin de mission, si il n'est pas fournis, on prend la date du jour.

```sh
php artisan app:candidats-end-assigment {date?}
````

![image](https://github.com/Sebastien-Lampazona/test-tech-actual/assets/2599774/0a9efa1f-bc78-426f-bd35-2d403dafdbb1)
