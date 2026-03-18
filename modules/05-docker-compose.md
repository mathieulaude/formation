---
transition: slide-left
---

# Module 5 - Docker Compose (2 h)

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

# Structure minimale compose

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
POSTGRES_PASSWORD=secret
APP_PORT=8080
```

---
level: 2
---

# TP 5 - Application Web + DB

- Écrire un `docker-compose.yml` avec 2 services
- Ajouter un volume de persistance pour la DB
- Lancer la stack et vérifier l'accès web
- Arrêter, relancer, vérifier que les données restent

```bash
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

---
level: 2
---

# Débrief et validation

- Quels gains concrets de Compose pour une équipe ?
- Quelle différence entre image et service ?
- Quand utiliser `down -v` et quand l'éviter ?
