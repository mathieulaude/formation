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

- Mobiliser toutes les compétences des 7 modules précédents
- Produire un livrable déployable et documenté
- Travailler en mode équipe avec revues rapides

---
level: 2
---

# Scénario projet

- Contexte : petite application web + base de données
- Attendus : conteneurisation complète et exécution locale
- Contraintes : bonnes pratiques sécurité + persistance
- Travail en binôme recommandé

---
level: 2
---

# Livrables obligatoires

- `Dockerfile` propre et commenté
- `docker-compose.yml` fonctionnel
- Fichier `.dockerignore`
- Guide `README.md` de build, run, stop

---
level: 2
---

# Critères d'évaluation

- Application démarre sans erreur
- Services communiquent correctement
- Données persistantes après redémarrage
- Choix techniques justifiés oralement

---
level: 2
---

# Plan de travail conseillé

- 30 min : conception architecture et fichiers
- 50 min : implémentation et tests fonctionnels
- 20 min : durcissement et optimisation
- 20 min : documentation et démo

---
level: 2
---

# TP 8 - Implémentation guidée

- Étape 1 : Dockerfile applicatif
- Étape 2 : Compose avec service web + DB + volume
- Étape 3 : tests de démarrage et connectivité
- Étape 4 : validation sécurité de base

```bash
docker compose up -d
docker compose ps
docker compose logs --tail=50
docker compose down
```

---
level: 2
---

# Restitution finale

- Démo de 5 minutes par groupe
- Questions/réponses sur les choix techniques
- Feedback immédiat formateur + pairs

---
level: 2
transition: slide-right
---

# Clôture de formation

- Récap des commandes essentielles
- Check-list de démarrage projet Docker
- Ressources pour continuer (docs officielles, labs)
