---
transition: slide-left
title: Introduction à Docker
layout: section
---

# Module 1 — Introduction à Docker

---
level: 2
---

# Objectifs du module

- Comprendre pourquoi Docker existe
- Distinguer machine virtuelle et conteneur
- Connaître les concepts : image, conteneur, registre

---
level: 2
---

# Pourquoi Docker ?

- "Ça marche sur ma machine" est un problème classique
- Docker encapsule l'application + ses dépendances
- Même environnement en local, en test et en production
- Démarrage rapide et isolation des services

---
level: 2
---

# L'analogie du conteneur maritime

- Avant : chaque marchandise transportée différemment (fragile, vrac, liquide…)
- Après : tout rentre dans un **conteneur standardisé**, quel que soit le contenu
- Docker applique la même idée au logiciel : **Build, Ship, Run**
- Un conteneur = un objet unique, versionné, portable, autosuffisant

---
level: 2
---

# Pet vs Cattle

| | Pet (animal de compagnie) | Cattle (bétail) |
|---|---|---|
| **Identité** | Nom unique (db-prod-01) | Numéro (instance-3472) |
| **Panne** | On le soigne, on le répare | On le remplace |
| **Mise à jour** | En place, avec précaution | On détruit et recrée |
| **Scaling** | Vertical (+ de CPU/RAM) | Horizontal (+ d'instances) |

- Les conteneurs favorisent l'approche **cattle** : jetable, reproductible, scalable

---
level: 2
---

# Le lead time infrastructure a toujours diminué

```mermaid
%%{init: {'theme': 'forest'}}%%
timeline
	title Temps de mise à disposition
	1990-2000 : Data Center
	          : 6 mois — commande matérielle, rack, câblage
	2000-2005 : Machines virtuelles
	          : 1 semaine — provisionning via hyperviseur
	2005-2010 : Cloud commercial
	          : 1 jour — instance à la demande (AWS, GCP…)
	2013+ : Conteneurs
	      : quelques secondes — docker run
```

---
level: 2
---

# Historique et genèse de Docker

<div style="height: 400px; display: flex; align-items: center;">

```mermaid {scale: 0.5}
%%{init: {'theme': 'forest'}}%%
timeline
	title Genèse de Docker
	1979 : chroot (Unix)
	     : Isolation d'un processus dans un filesystem
	2000-2008 : namespaces + cgroups
	          : Briques noyau des conteneurs modernes
	2008 : LXC
	     : Premiers conteneurs Linux « système »
	2013 : Docker par dotCloud
	     : Solomon Hykes simplifie l'expérience développeur
	2014 : libcontainer
	     : Docker remplace LXC par son propre runtime
	2015 : OCI (Open Container Initiative)
	     : Standardisation des formats d'image et runtime
	2016 : containerd + runc + Kubernetes
	     : Écosystème d'orchestration cloud-native
	2024 : Docker Desktop + Compose
	     : Référence DX dans les stacks modernes
```

</div>


---
level: 2
---

# Origines noyau Linux 
<br>

Docker réutilise :

- `namespaces` : isolent PID, réseau, points de montage, IPC, hostname et utilisateurs
- `cgroups` : limitent et mesurent CPU, mémoire, I/O
- Union filesystem (`overlay2`) : empilement de couches d'image, rapide et économe
- Capacités Linux + seccomp : réduction de la surface d'attaque côté runtime

<br>
<div class="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
  <strong>💡 Note :</strong> Docker n'a pas inventé les briques noyau, il a simplifié l'expérience développeur
</div>

---
level: 2
---

# Concurrents et alternatives

- Historiques : LXC/LXD, OpenVZ
- Runtime/CLI modernes : Podman, CRI-O, containerd (`ctr`, `nerdctl`)
- Initiative abandonnée mais marquante : rkt (CoreOS)
- Concurrence indirecte : VM (VMware, VirtualBox) et approches PaaS

---
level: 2
layout: two-cols-header
---

# VM vs Conteneur

:: left ::

- VM : 
  - un OS complet par machine virtuelle
  - plus lourde
  - isolation forte

::right::
- Conteneur : 
  - partage le noyau de l'OS hôte
  - plus léger
  - plus rapide à lancer

---
level: 2
layout: two-cols
---

# VM vs Conteneur

```mermaid
flowchart TD
	subgraph LEFT["3 Apps = 3 VM = 3 noyaux"]
		direction TB
		subgraph VM1["VM 1"]
			VA1["App A"]
			VK1["Noyau Linux"]
		end
		subgraph VM2["VM 2"]
			VA2["App B"]
			VK2["Noyau Linux"]
		end
		subgraph VM3["VM 3"]
			VA3["App C"]
			VK3["Noyau Linux"]
		end
		LHV["Hyperviseur"]
		LHW["Serveur physique"]
		VM1 & VM2 & VM3 --> LHV --> LHW
	end

	style VM1 fill:#f5d6cc,stroke:#e74c3c
	style VM2 fill:#f5d6cc,stroke:#e74c3c
	style VM3 fill:#f5d6cc,stroke:#e74c3c
	style VK1 fill:#e74c3c,color:#fff
	style VK2 fill:#e74c3c,color:#fff
	style VK3 fill:#e74c3c,color:#fff
```
::right::

<div v-click>

```mermaid {scale: 0.5}
flowchart TD
	subgraph RIGHT["3 Apps = 1 VM = 1 noyau"]
		direction TD
		subgraph RVM["VM unique"]
			subgraph C1["Conteneur 1"]
				CA1["App A"]
			end
			subgraph C2["Conteneur 2"]
				CA2["App B"]
			end
			subgraph C3["Conteneur 3"]
				CA3["App C"]
			end
			CENG["Docker Engine"]
			CK["Noyau Linux"]
			C1 & C2 & C3 --> CENG --> CK
		end
		RHV["Hyperviseur"]
		RHW["Serveur physique"]
		RVM --> RHV --> RHW
	end

	style RVM fill:#f5d6cc,stroke:#e74c3c
	style C1 fill:#fdebd0,stroke:#e67e22
	style C2 fill:#fdebd0,stroke:#e67e22
	style C3 fill:#fdebd0,stroke:#e67e22
	style CK fill:#e74c3c,color:#fff
	style CENG fill:#27ae60,color:#fff
```

</div>

---
level: 2
layout: two-cols
---

# VM vs Conteneur


```mermaid {scale: 0.5}
flowchart TD
	subgraph LEFT["3 Apps = librairies et noyau partagés"]
		direction TB
		subgraph VM1["VM"]
			VA1["App A"]
			VA2["App B"]
			VA3["App C"]
			L["Librairies système"]
			VK1["Noyau Linux"]
		end
		LHV["Hyperviseur"]
		LHW["Serveur physique"]
		VM1 --> LHV --> LHW
		VA1 & VA2 & VA3 -.-> L
	end

	style VM1 fill:#f5d6cc,stroke:#e74c3c
	style VK1 fill:#e74c3c,color:#fff
```

::right::

<div v-click>

```mermaid {scale: 0.45}
flowchart TD
	subgraph RIGHT["3 Apps = librairies dédiées ET 1 seul noyau"]
		direction TD
		subgraph RVM["VM unique"]
			subgraph C1["Conteneur 1"]
				CA1["App A"] -.-> LA["Librairies A"]
			end
			subgraph C2["Conteneur 2"]
				CA2["App B"] -.-> LB["Librairies B"]
			end
			subgraph C3["Conteneur 3"]
				CA3["App C"] -.-> LC["Librairies C"]
			end
			CENG["Docker Engine"]
			CK["Noyau Linux"]
			C1 & C2 & C3 --> CENG --> CK
		end
		RHV["Hyperviseur"]
		RHW["Serveur physique"]
		RVM --> RHV --> RHW
	end

	style RVM fill:#f5d6cc,stroke:#e74c3c
	style C1 fill:#fdebd0,stroke:#e67e22
	style C2 fill:#fdebd0,stroke:#e67e22
	style C3 fill:#fdebd0,stroke:#e67e22
	style CK fill:#e74c3c,color:#fff
	style CENG fill:#27ae60,color:#fff
```
</div>

---
level: 2
---

# Avantages pour les développeurs

- Environnement d'exécution **portable** : même objet en dev, test, prod
- Bibliothèques et design **standardisés** (images officielles, Dockerfile)
- Facilité pour lancer une app **isolée** localement : tests rapides
- Partage simplifié via un **registre d'images**
- Philosophie **Build / Ship / Run**

---
level: 2
---

# Avantages pour les opérateurs

- **Cohérence** garantie entre les environnements
- Cycle de vie applicatif amélioré : **déploiements plus rapides**
- Sécurité renforcée (isolation, images signées, scanning)
- **Stateless** par défaut, avec possibilité de persistance
- Scalabilité facilitée, surtout avec un orchestrateur (Kubernetes)

---
level: 2
---

# Avantages pour les architectes

- Architecture **microservices** facilitée : 1 conteneur = 1 responsabilité
- **Densification** du système : plus d'apps sur moins de machines
- Réduction du **coût d'infrastructure**
- Flexibilité accrue avec un orchestrateur (placement, scaling, résilience)

---
level: 2
---

# Inconvénients et limites

- **Courbe d'apprentissage** : nouvel écosystème à maîtriser (images, réseau, volumes…)
- Les architectures d'hébergement sont **fondamentalement différentes** des VM
- Plus de liberté = **plus de responsabilité** pour les développeurs
- Sécurité : le **noyau est partagé** — isolation moins forte qu'une VM
- Applications stateful (bases de données) : nécessite une attention particulière

---
level: 2
---

# Qu'est-ce qu'un conteneur Linux ?

```mermaid {scale: 0.5}
flowchart LR
	subgraph HW["Matériel"]
		direction TD
		DRIVERS["Drivers"]
	end
	subgraph KERNEL["Noyau Linux"]
		direction TD
		NS["Namespaces\n(isolation PID, réseau, mount, IPC, user)"]
		CG["cgroups\n(limites CPU, mémoire, I/O)"]
		SEC["SELinux / AppArmor\n(politiques de sécurité)"]
	end
	subgraph CONTAINERS["Conteneurs"]
		CT1["Conteneur 1"]
		CT2["Conteneur 2"]
		CT3["Conteneur 3"]
	end
	MGMT["Interface de gestion\n(Docker Engine / containerd)"]

	CONTAINERS --> MGMT --> KERNEL
	
	NS -.-> CONTAINERS
	CG -.-> CONTAINERS
	SEC -.-> CONTAINERS
	KERNEL --> HW

	style KERNEL fill:#27ae60,color:#fff
	style NS fill:#2ecc71,color:#fff
	style CG fill:#2ecc71,color:#fff
	style SEC fill:#2ecc71,color:#fff
```

---
level: 2
---

# Architecture Docker

- Docker Engine : moteur qui crée et exécute les conteneurs
- Docker CLI : commande `docker` pour piloter le moteur
- Docker Hub/Registry : stockage et distribution d'images
- Dockerfile : recette de fabrication d'une image

```mermaid
flowchart LR
	subgraph CLIENT["Client"]
		CLI["Docker CLI\n(docker build, run, push …)"]
		DF["Dockerfile"]
	end

	subgraph HOST["Host (Docker daemon)"]
		DAEMON["Docker Engine\n(dockerd)"]
		RUNTIME["containerd + runc"]
		IMAGES["Images locales"]
		CONTAINERS["Conteneurs"]
	end

	subgraph REGISTRY["Registry"]
		REG["Docker Hub / Registry privé"]
	end

	CLI -->|API REST| DAEMON
	DF -->|docker build| DAEMON
	DAEMON --> RUNTIME
	DAEMON --> IMAGES
	RUNTIME -->|crée| CONTAINERS
	DAEMON -->|pull / push| REG
```

---
level: 2
---

# Concepts clés

- Image : modèle en lecture seule
- Conteneur : instance en exécution d'une image
- Registre : dépôt d'images (public ou privé)
- Tag : version d'une image (ex : `nginx:1.27`)

---
level: 2
---

# TP 1 - Première exécution Docker

- Objectif : lancer un premier conteneur sans coder
- Commandes :

```bash
docker run --name hello-container hello-world
docker ps -a
docker rm hello-container
```

- Observation attendue : message de bienvenue Docker et cycle de vie du conteneur

---
level: 2
transition: slide-right
---

# Débrief et validation

- Pouvez-vous expliquer la différence image/conteneur ?
- Pourquoi un conteneur démarre plus vite qu'une VM ?
- Quelle est la valeur d'un registre dans un projet équipe ?
