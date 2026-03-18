---
transition: slide-left
layout: section
title: Données et réseaux Docker
---

# Module 4 - Données et réseaux Docker

---
level: 2
---

# Objectifs du module

- Comprendre la persistance des données
- Utiliser volumes et bind mounts
- Créer un réseau Docker applicatif
- Connecter plusieurs conteneurs entre eux

---
level: 2
---

# Persistance des données

- Un conteneur est **éphémère** par nature
- Les données internes disparaissent à la suppression
- Les **volumes** permettent de conserver l'état
- Le stockage doit être pensé dès la conception

---
level: 2
---

# Volumes vs Bind mounts

- Volume : géré par Docker, portable, recommandé en prod
- Bind mount : dossier hôte monté dans le conteneur
- Volume : `-v db_data:/var/lib/postgresql/data`
- Bind mount : `-v $(pwd)/src:/app/src`

---
level: 2
---

# Réseaux Docker

- Réseau par défaut : `bridge`
- Communication entre conteneurs via nom de service
- Isolation logique des applications
- Création réseau dédié :

```bash
docker network create app-net
```

---
level: 2
---

# Types de réseaux Docker

| Type | Cas d'usage | Remarques |
|---|---|---|
| `bridge` | Apps multi-conteneurs sur un seul hôte | Non distribué multi-hôtes |
| `host` | Performance réseau maximale, ports natifs | Moins d'isolation, conflits de ports |
| `none` | Isolation complète sans réseau | Aucun accès externe/interne |
| `overlay` | Services répartis sur plusieurs nœuds | Nécessite Swarm, plus complexe |
| `macvlan` | IP dédiée sur le LAN | Configuration réseau avancée |
| `ipvlan` | Forte densité de conteneurs | Dépend des contraintes infra |

---
level: 2
---

# Exemple app + base

```bash
docker run -d --name db --network app-net -e POSTGRES_PASSWORD=secret postgres:16
docker run -d --name app --network app-net -p 8080:8080 my-app:1.0
```

- L'application peut joindre la base avec l'hôte `db`

---
level: 2
---

# TP 4 - Base de données persistante

- Créer un volume nommé
- Lancer PostgreSQL avec ce volume
- Insérer une donnée de test
- Supprimer/recréer le conteneur et vérifier la persistance

```bash
docker volume create pgdata
docker run -d --name postgres-db -e POSTGRES_PASSWORD=secret -v pgdata:/var/lib/postgresql/data postgres:16
docker volume ls
```

---
level: 2
---

# Débrief et validation

- Quand choisir bind mount plutôt qu'un volume ?
- Pourquoi séparer les réseaux par application ?
- Comment garantir la persistance en cas de recréation du conteneur ?
