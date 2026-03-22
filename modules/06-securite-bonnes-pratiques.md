---
transition: slide-left
title: Sécurité et bonnes pratiques
layout: section
---

# Module 6 - Sécurité et bonnes pratiques

---
level: 2
---

# Objectifs du module

- Réduire les risques de sécurité dans les images
- Adopter des pratiques de build robustes
- Gérer les secrets sans fuite
- Standardiser le versioning des images

---
level: 2
---

# Choisir ses images

- Préférer les images officielles et maintenues
- Vérifier la date de mise à jour
- Éviter `latest` en production
- Scanner les vulnérabilités avant publication

---
level: 2
---

# Principe du moindre privilège

- Éviter l'utilisateur root dans le conteneur
- Déclarer un utilisateur dédié
- Limiter les capabilities Linux si besoin
- Rendre le système de fichiers en lecture seule quand possible

---
level: 2
---

# Secrets et données sensibles

- Ne jamais stocker de secret dans le Dockerfile
- Utiliser des variables d'environnement ou un gestionnaire de secrets
- Exclure les fichiers sensibles via `.dockerignore`
- Tourner régulièrement les credentials

---
level: 2
---

# Hygiène des dépôts

- Fichier `.dockerignore` minimal :

```txt
.git
node_modules
.env
*.log
```

- Images taggées : `app:1.4.2`, `app:2026-03-06`
- Politique de versions claire en équipe

---
level: 2
---

# TP 6 - Durcir une image

- Prendre un Dockerfile existant
- Ajouter un utilisateur non root
- Ajouter/améliorer `.dockerignore`
- Rebuilder et vérifier le comportement applicatif

```bash
docker build -t secure-app:1.0 .
docker run --rm secure-app:1.0 id
```

---
level: 2
transition: slide-right
---

# Débrief et validation

- Quels sont les 3 risques majeurs à corriger en priorité ?
- Pourquoi l'utilisateur non root est-il critique ?
- Quelle règle simple évite le plus de fuites de secrets ?
