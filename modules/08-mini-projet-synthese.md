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
---

# Checklist finale

- [ ] Image < 200 MB (alpine base, RUN optimisé)
- [ ] Dockerfile : user non-root + HEALTHCHECK
- [ ] .dockerignore : complet (node_modules, .env, .git, etc)
- [ ] docker-compose : depends_on + wait policy
- [ ] Volumes : persistance DB + init.sql
- [ ] Réseau : DB isolée
- [ ] Secrets : secrets en .env
- [ ] App : validation env + error codes + SIGTERM handler
- [ ] Restart policies définies
- [ ] Logging : accessible via `docker compose logs`

<!-- RÉPONSES ATTENDUES

### DOCKERFILE (8 bugs)
1. **Image de base (node:25)** → Utiliser node:25-alpine (80 MB vs 400 MB)
2. **RUN split** → RUN apt-get update && apt-get install -y curl (même couche, cache cohérent)
3. **Pas d'user** → RUN groupadd -r appuser && useradd -r -g appuser appuser + USER appuser
4. **Pas de .dockerignore** → Ajouter node_modules, .git, .gitignore, coverage, tests, .vscode, .env, etc
5. **COPY . .** → Après RUN npm install, ou mieux : COPY package* ./ puis RUN npm ci --omit=dev
6. **npm install non optimisé** → npm ci --omit=dev (copier package.json AVANT le code)
7. **Pas de HEALTHCHECK** → HEALTHCHECK --interval=30s CMD curl -f http://localhost:3000/health || exit 1
8. **Pas d'ENTRYPOINT** → Ajouter ENTRYPOINT ["node"] CMD ["server.js"]

### DOCKER-COMPOSE (12 bugs)
1. **Pas de depends_on** → Ajouter depends_on: { db: { condition: service_healthy } }
2. **Port mal exposé** → Changer "3000:8000" en "3000:3000"
3. **Env vars en dur** → Créer .env et utiliser env_file: .env
4. **Pas de volume app** → Volumes pour logs ou config si nécessaire
5. **Pas de restart policy** → Ajouter restart: unless-stopped
6. **Pas de health check** → Ajouter healthcheck sous web service
7. **DB exposée** → Ne PAS exposer 5432 ou mettre en variable d'env optionnelle
8. **Secrets en dur** → Password en .env, jamais en dur
9. **Pas de volume PG** → Ajouter volumes: { postgres_data: { driver: local } } et lier à db
10. **Port PG ouvert** → Retirer ports: 5432:5432 pour les envs prod (internal only)
11. **Réseau non contrôlé** → Backend réseau OK, être explicite
12. **Pas de volumes section** → Ajouter volumes: { postgres_data: null } pour named volume

### DOCKER-COMPOSE détail fix :
```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      db:
        condition: service_healthy
    env_file: .env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - backend

  db:
    image: postgres:18.3
    env_file: .env
    restart: unless-stopped
    networks:
      - backend
    volumes:
      - postgres_data:/var/lib/postgresql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  backend:
    driver: bridge

volumes:
  postgres_data:
    driver: local
```

### APPLICATION (9 bugs)
1. **Pas de validation env** → if (!process.env.DB_HOST) throw new Error('DB_HOST required')
2. **Pas de timeout** → Pool { connectionTimeoutMillis: 5000, idleTimeoutMillis: 30000 }
3. **Pas d'init BD** → init.sql monté automatiquement par PG via POSTGRES_INITDB_ARGS ou volume
4. **Pas de gestion erreur** → try/catch sur toutes routes
5. **Status 200 en erreur** → res.status(500).json({ ... }) au lieu de res.json(...)
6. **Pas de logging** → Ajouter console.log ou morgan middleware
7. **Pas de validation input** → if (!content || content.trim() === '') return res.status(400)...
8. **Pas de graceful shutdown** → process.on('SIGTERM', () => { pool.end(); server.close(); })
9. **Pas de vérif DB startup** → pool.query('SELECT 1') au app.listen()

### .DOCKERIGNORE (incomplet)
Ajouter : node_modules/, .git/, .gitignore, .env, .env.*, coverage/, tests/, .vscode/, .DS_Store, npm-debug.log, yarn-error.log

### .ENV (absent)
Créer src/tp8/.env avec :
```
DB_HOST=db
DB_PORT=5432
DB_NAME=appdb
DB_USER=appuser
DB_PASSWORD=secure_password_change_me
PORT=3000
```

### Checklist Débogage Stratégique
- `docker compose logs -f web` : voir crashs applicatifs
- `docker compose exec db psql -U appuser -d appdb -c "SELECT * FROM app_data;"` : vérifier BD
- `docker compose exec web curl http://localhost:3000/health` : test internal connectivity
- `docker images` : vérifier taille image (doit être < 200 MB après optimisation)
- `docker compose down -v && docker compose up` : vérifier persistance après redémarrage

-->

---
level: 2
transition: slide-right
---

# Débrief et validation

- Quels bugs vous ont pris le plus de temps ?
- Comment aviez-vous débuggé (logs ? docker exec ?) ?
- Quels sont les 3 pièges à éviter en production ?

