---
transition: slide-left
title: Mini-projet de synthèse
layout: section
---

# Module 8 - Mini-projet de synthèse

---
level: 2
---

# Objectif du module

- Mobiliser toutes les compétences des modules précédents
- Identifier et corriger les dysfonctionnements courants
- Appliquer les bonnes pratiques de sécurité et performance
- Maîtriser le diagnostic et le troubleshooting
- Produire un livrable déployable et documenté

---
level: 2
---

# TP 8

Cloner ou copier les fichiers depuis `src/tp8/` et tenter le démarrage :

```bash
cd src/tp8
docker compose up
```
<br>

### Bugs ou améliorations à détecter

**Dockerfile :** taille d'image, RUN multi-ligne, least privileges, .dockerignore, health check

**Données/Réseau :** volume, exposition réseau, ordre de démarrage, variables d'environnement

**Compose :** dépendances, ports exposés, réseau

**Sécurité :** exécution en root, secrets, validation de la configuration

**Production :** restart policy, graceful shutdown, logging



---
level: 2
transition: slide-right
---

# Débrief et validation

- Quels bugs vous ont pris le plus de temps ?
- Comment aviez-vous débuggé (logs ? docker exec ?) ?
- Quels sont les 3 pièges à éviter en production ?

