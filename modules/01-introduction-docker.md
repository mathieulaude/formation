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

# L'analogie du conteneur maritime

<div class="flex justify-center">
  <div class="grid grid-cols-3 gap-4">
    <div v-click><img src="../img/conteneur1.png" class="h-48 object-cover rounded" /></div>
    <div v-click><img src="../img/conteneur2.png" class="h-48 object-cover rounded" /></div>
    <div v-click><img src="../img/conteneur3.png" class="h-48 object-cover rounded" /></div>
  </div>
</div>

---
level: 2
---

# L'analogie du conteneur maritime

- **Standardisation** : tous les conteneurs ont la même taille (20 ou 40 pieds) → toute application rentre dans la même boîte Docker
- **Portabilité** : un conteneur passe du cargo au train au camion sans être ouvert → une image Docker s'exécute pareil sur laptop / CI/CD / prod
- **Isolation** : le contenu d'un conteneur ne pollue pas les autres → les conteneurs partagent l'OS mais ont leurs librairies
- **Densité** : 100+ conteneurs sur un bateau → 100+ conteneurs sur un serveur, bien utilisées les ressources
- **Reproductibilité** : même contenu, même trajet, même résultat → même image, même runtime, même comportement partout


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


<div class="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
  <strong>💡 Note :</strong> Les conteneurs favorisent l'approche <strong>cattle</strong> : jetable, reproductible, scalable
</div>

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

# Avantages de Docker

- **Pour le développement** : environnement portable, exécution locale isolée, partage simplifié via registre d'images
- **Pour les opérations** : cohérence inter-environnements, déploiements plus rapides, sécurité et scalabilité améliorées
- **Pour l'architecture** : microservices facilités, meilleure densification des ressources, réduction des coûts d'infrastructure

<br>
<div class="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
  <strong>💡 Build / Ship / Run</strong> : un même artefact du poste dev jusqu'à la production.
</div>

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

# Qu'est-ce qu'un conteneur ?

- **Un fichier de description/génération** : le `Dockerfile` permet de construire l'image de façon reproductible.
- **Un objet stockable et versionné** : l'image peut être taggée (`app:1.0`) et publiée dans un registre.
- **Une version précise de l'application** : code, dépendances et configuration runtime sont figés dans l'image.
- **Un processus isolé et autosuffisant** : le conteneur embarque ses bibliothèques et s'exécute dans un environnement dédié.
- **Une identité réseau** : il peut exposer des ports et communiquer via un réseau Docker (nom DNS interne, IP, service).
- **Un cycle de vie maîtrisé** : on crée, exécute, arrête et recrée rapidement le conteneur sans dérive de configuration.

<div class="bg-blue-100 border-l-4 border-blue-500 p-4 rounded mt-4">
	<strong>💡 En résumé :</strong> une image est le modèle, le conteneur est son instance en cours d'exécution.
</div>



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
- Tag : version d'une image (ex : `nginx:1.27`)
- Conteneur : instance en exécution d'une image
- <v-click at="1">Registre : dépôt d'images (public ou privé)</v-click>

```mermaid
flowchart LR
	DEV["Développeur"] -->|docker build| IMG["Image versionnée\nnginx:1.27"]
	IMG -->|docker run| CTR["Conteneur\ninstance en exécution"]

	classDef model fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#000
	classDef runtime fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
	classDef registry fill:#fff9c4,stroke:#f57f17,stroke-width:2px,color:#000

	class IMG model
	class CTR runtime
```

<div v-click at="1">

```mermaid
flowchart LR
	IMG["Image versionnée\nnginx:1.27"] -->|docker push| REG["Registre\nDocker Hub / privé"]
	REG -->|docker pull| HOST["Hôte Docker"]
	HOST -->|docker run| CTR["Conteneur\ninstance en exécution"]

	classDef model fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#000
	classDef runtime fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
	classDef registry fill:#fff9c4,stroke:#f57f17,stroke-width:2px,color:#000

	class IMG model
	class CTR runtime
	class REG registry
```

</div>

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
