
# Programme de formation Docker — Format 2 jours

## Public visé
Développeurs, administrateurs systèmes, ingénieurs DevOps, étudiants en informatique.

## Prérequis
* Bases Linux / ligne de commande
* Notions réseau
* Connaissances en développement (souhaitées)

## Objectifs pédagogiques
À l’issue de la formation, les participants seront capables de :
* Comprendre les principes de la conteneurisation
* Utiliser Docker en environnement de développement
* Créer et optimiser des images
* Déployer une application multi-conteneurs
* Appliquer les bonnes pratiques essentielles

## Jour 1 — Fondamentaux et Prise en Main (8 h)

### Module 1 — Introduction à Docker (2 h)

#### Contenus
* Virtualisation vs conteneurisation
* Architecture Docker
* Concepts clés : image, conteneur, registre
* Cas d’usage en entreprise

#### Objectif
Comprendre l’écosystème Docker et ses enjeux.

### Module 2 — Commandes Essentielles (2 h)

#### Contenus
* Installation et configuration
* Commandes principales :
    * docker run, ps, stop, rm
    * images, pull, exec, logs
* Gestion du cycle de vie
* Publication de ports

#### Travaux pratiques
* Lancement d’un serveur web
* Manipulation de conteneurs
* Accès interactif

### Module 3 — Création d’Images (Dockerfile) (2 h)

#### Contenus
* Structure d’un Dockerfile
* Instructions principales :
    * FROM, RUN, COPY, CMD, ENTRYPOINT
* Build d’images
* Gestion du cache

#### Bonnes pratiques
* Images légères
* Multi-stage build
* Organisation des couches

#### Travaux pratiques
* Création d’une image applicative
* Optimisation de la taille

### Module 4 — Données et Réseaux (2 h)

#### Contenus
* Volumes et bind mounts
* Persistance des données
* Réseaux Docker (bridge, DNS interne)
* Communication inter-conteneurs

#### Travaux pratiques
* Base de données persistante
* Connexion application / base

## Jour 2 — Applications Multi-Services et Production (7 h)

### Module 5 — Docker Compose (2 h)

#### Contenus
* Architecture multi-conteneurs
* Structure du fichier docker-compose.yml
* Services, réseaux, volumes
* Variables d’environnement

#### Travaux pratiques
* Déploiement d’une application Web + DB
* Gestion du cycle de vie d’une stack

### Module 6 — Sécurité et Bonnes Pratiques (1 h 30)

#### Contenus
* Choix des images officielles
* Gestion des utilisateurs
* Secrets et variables sensibles
* .dockerignore
* Versioning et tagging

#### Travaux pratiques
* Sécurisation d’une image
* Audit basique

### Module 7 — Docker en Environnement de Production (1 h 30)

#### Contenus
* Registres publics et privés
* Publication d’images
* Sauvegarde et restauration
* Logs et supervision
* Notions de CI/CD avec Docker

#### Travaux pratiques
* Push vers un registre
* Déploiement sur serveur distant (simulation)

### Module 8 — Mini-Projet de Synthèse (2 h)

#### Objectif
Mettre en œuvre l’ensemble des compétences acquises.

#### Contenus
* Conteneurisation d’une application complète
* Orchestration avec Docker Compose
* Documentation du projet

#### Livrables
* Dockerfile(s)
* docker-compose.yml
* Guide de déploiement

## Méthodes pédagogiques
* Apports théoriques ciblés
* Démonstrations en direct
* Travaux pratiques guidés
* Étude de cas réel
* Projet final

## Modalités d’évaluation
* Exercices pratiques
* Validation du mini-projet
* QCM de fin de formation

## Moyens pédagogiques
* Support de cours numérique
* Environnement de TP
* Dépôt Git d’exemples
* Fiches pratiques (cheatsheets)
