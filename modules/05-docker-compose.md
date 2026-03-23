---
transition: slide-left
title: Docker Compose
layout: section
---

# Module 5 - Docker Compose

---
level: 2
---

# Objectifs du module

- Déclarer une application multi-conteneurs
- Comprendre la structure de `docker-compose.yml`
- Lancer/arrêter une stack complète
- Gérer réseaux, volumes et variables d'environnement

---
level: 2
---

# Pourquoi Docker Compose ?

- Évite des commandes `docker run` longues et répétitives
- Décrit l'infra locale en un seul fichier versionné
- Idéal pour le développement et les environnements de test
- Facilite le travail en équipe

---
level: 2
---

# Structure minimale
Un fichier pour les gouverner tous

<div class="yaml-large">

```yaml
services:
  web:
    image: nginx:stable
    ports:
      - "8080:80"
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
```

</div>

<style>
.yaml-large pre.shiki code {
  font-size: 1.15rem !important;
  line-height: 1.6 !important;
}
</style>

---
level: 2
---

# Commandes Compose

- `docker compose up -d` : lancer la stack
- `docker compose ps` : état des services
- `docker compose logs -f` : suivre les logs
- `docker compose down` : arrêter et supprimer

---
level: 2
---

# Variables et fichiers `.env`

- Centraliser la configuration par environnement
- Éviter de hardcoder mots de passe et URLs
- Exemple :

```sh
$ cat .env
POSTGRES_PASSWORD=secret
APP_PORT=8080
```

---
level: 2
---

# TP 5 - Application Web + DB

- Écrire un `docker-compose.yml` avec les 2 services du TP4
- Ajouter un volume de persistance pour la DB
- Lancer la stack et vérifier l'accès web
- Vérifier la persistance de données

```bash
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

---
level: 2
transition: slide-right
---

# Débrief et validation

- Quels gains concrets de Compose pour une équipe ?
- Quelle différence entre image et service ?
- Comment récupérer les données du TP4 ?
- Comment supprimer les données ?
