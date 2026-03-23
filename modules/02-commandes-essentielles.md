---
transition: slide-left
title: Commandes essentielles Docker
layout: section
---

# Module 2 - Commandes essentielles Docker

---
level: 2
---

# Objectifs du module

- Prendre en main les commandes Docker de base
- Gérer le cycle de vie d'un conteneur
- Lire les logs et entrer dans un conteneur
- Exposer un service sur un port local

---
level: 2
---

# Les commandes à connaître

- `docker pull` : télécharger une image
- `docker images` : lister les images locales
- `docker run` : créer + démarrer un conteneur
- `docker ps` / `docker ps -a` : lister les conteneurs actifs / tous les conteneurs existants
<br><br><br>


```mermaid
flowchart LR
	HUB["🌐 Docker Hub\n(registry distant)"]
	LOCAL["💻 Images locales\n(cache machine)"]
	CTR["📦 Conteneur"]

	HUB -->|docker pull| LOCAL
	LOCAL -->|docker push| HUB
	LOCAL -->|docker run| CTR
```

---
level: 2
---

# Cycle de vie d'un conteneur

<div class="flex justify-center items-center flex-1">

```mermaid {scale: 0.9}
stateDiagram-v2
	[*] --> Created : docker create
	Created --> Running : docker start
	[*] --> Running : docker run
	Running --> Stopped : docker stop
	Running --> Stopped : docker kill
	Stopped --> Running : docker start
	Stopped --> [*] : docker rm
	Running --> Paused : docker pause
	Paused --> Running : docker unpause
```

</div>

---
level: 2
---

# Observer et dépanner

- Lire les journaux : `docker logs <nom>`
- Ouvrir un shell : `docker exec -it <nom> sh`
- Détails techniques : `docker inspect <nom>`
- Suivi ressources : `docker stats`

---
level: 2
---

# Publication de ports

- Format : `-p port_hote:port_conteneur`
- Exemple Web :

```bash
docker run -d --name web-nginx -p 8080:80 nginx:stable
```

- Résultat : application accessible sur `http://localhost:8080`

<br><br>
```mermaid
flowchart LR
  B["🌐 Navigateur\nlocalhost:8080"] -->|port 8080| H["🖥️ Hôte\n(machine locale)"]
  H -->|"-p 8080:80"\ntransfert de port| C["📦 Conteneur\nnginx:stable\n:80"]
```

---
level: 2
---

# Entrer dans un conteneur : `docker exec`

- Ouvre un processus supplémentaire **dans** un conteneur déjà actif
- Ne redémarre pas le conteneur
- Option `-it` : mode interactif avec un terminal (`i` = stdin ouvert, `t` = pseudo-TTY)

```bash
# Ouvrir un shell bash
docker exec -it web-nginx bash

# Lancer une commande ponctuelle
docker exec web-nginx cat /etc/nginx/nginx.conf
```

<br>

```mermaid
flowchart LR
  U["👤 Utilisateur"] -->|"docker exec -it"| D["🐳 Docker Engine"]
  D -->|"nouveau process\ndans le namespace"| C["📦 Conteneur\nen cours d'exécution"]
  C --> SH["💻 Shell\n(bash / sh)"]
```

---
level: 2
---

# TP 2 - Manipuler un serveur web

- Télécharger et lancer Nginx
- Vérifier l'état du conteneur
- Consulter les logs
- Entrer dans le conteneur pour voir les fichiers web

<div v-click>

```bash {none|1|1-2|1-3|1-4|1-5|1-6}{at: '2'}
docker pull nginx:stable
docker run -d --name web-nginx -p 8080:80 nginx:stable
docker ps
docker logs web-nginx
docker exec -it web-nginx sh
$ cat /usr/share/nginx/html/index.html
```

</div>
---
level: 2
transition: slide-right
---

# Débrief et validation

- Quelle commande utilise-t-on pour exposer un port ?
- Quelle différence entre `stop` et `rm` ?
- Pourquoi `exec` est utile en phase de debug ?
- Quel utilisateur est utilisé lors du `exec` ?
- Comment éditer le fichier index.html ?
