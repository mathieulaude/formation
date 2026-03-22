---
transition: slide-left
title: Docker en environnement de production
layout: section
---

# Module 7 - Docker en environnement de production

---
level: 2
---

# Objectifs du module

- Comprendre la publication d'images vers un registre
- Organiser déploiement, logs et sauvegardes
- Introduire les bases CI/CD avec Docker
- Identifier les points de vigilance en production

---
level: 2
---

# Registres d'images

- Public : Docker Hub, GHCR
- Privé : registre interne entreprise
- Commandes clés :

```bash
docker login
docker tag app:1.0 registry.example.com/app:1.0
docker push registry.example.com/app:1.0
```

---
level: 2
---

# Stratégie de déploiement

- Versionner chaque image de façon immutable
- Éviter d'écraser un tag existant
- Utiliser des variables d'environnement par environnement
- Prévoir un rollback rapide vers version précédente

---
level: 2
---

# Logs, supervision, santé

- Collecter stdout/stderr des conteneurs
- Centraliser les logs (ELK, Loki, etc.)
- Ajouter des `HEALTHCHECK` sur les services critiques
- Surveiller CPU, mémoire et redémarrages

---
level: 2
---

# Sauvegarde et restauration

- Sauvegarder les volumes de données régulièrement
- Tester la restauration, pas seulement la sauvegarde
- Documenter la procédure d'urgence
- Définir un objectif RPO/RTO simple

---
level: 2
---

# Notions CI/CD avec Docker

- Build image à chaque merge principal
- Scanner les vulnérabilités avant push
- Publier vers registre de confiance
- Déployer automatiquement sur environnement cible

---
level: 2
---

# TP 7 - Push et déploiement simulé

- Tagger une image locale
- Pousser vers un registre de test (ou simulation locale)
- Lancer la nouvelle version sur une machine cible de TP
- Vérifier la disponibilité applicative

---
level: 2
transition: slide-right
---

# Débrief et validation

- Pourquoi un tag immutable simplifie le rollback ?
- Quels indicateurs de santé suivre en premier ?
- Quelle est la différence entre sauvegarde et restauration testée ?
