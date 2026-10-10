# Ce qu'il reste à remplir dans le portfolio

Deux repères à chercher (Ctrl+F) dans `public/api/projects.json` :

- **`XX`** = une URL à remplacer
- **`YYYY`** = un chemin d'image à remplacer

Tant qu'une image vaut `YYYY`, le site affiche l'icône ronde du type de projet à la place : rien n'est cassé, c'est juste moins joli. Un lien `XX`, en revanche, mène à une page d'erreur : **à remplir avant de mettre en ligne.**

---

## 1. Les liens (XX) : à remplir en priorité

| Projet | Champ | Quoi mettre |
|---|---|---|
| AML Sentinel | `links` > "View Code" > `url` | `https://github.com/roderick-darell/aml-sentinel` (une fois le dépôt créé) |
| Health Fraud Radar | `links` > "View Code" > `url` | `https://github.com/roderick-darell/health-fraud-radar` (une fois le dépôt créé) |
| Paris 2024 Football Simulator | `links` > "Live Demo" > `url` | L'adresse de la démo en ligne (GitHub Pages par exemple). S'il n'y en a pas, **supprime tout le bloc** `{ "text": "Live Demo", "url": "XX" }` et la virgule qui le précède. |

Crée les deux dépôts sur GitHub **avant** de publier, même vides avec seulement le README : un recruteur qui clique sur un lien mort décroche tout de suite.

---

## 2. Les images (YYYY)

Chaque projet a deux images :

- **`icon`** : petite icône à gauche du titre. Fichier carré, 64 x 64 px, format `.png` ou `.ico`, dans `public/img/icon/`.
- **`snapshot`** : capture affichée dans la fenêtre de détail. Format paysage (environ 1200 x 750 px), en `.webp` ou `.jpg`, dans `public/img/snapshot/`.

Dans le JSON, écris le chemin **sans** `public/` devant. Exemple : `"snapshot": "img/snapshot/aml-sentinel.webp"`.

| Projet | `icon` (suggestion de nom) | `snapshot` (quoi capturer) |
|---|---|---|
| AML Sentinel | `img/icon/aml.png` | En attendant les résultats : le schéma d'architecture du README. Plus tard : l'écran d'investigation Streamlit avec le graphe d'un compte. |
| Health Fraud Radar | `img/icon/health.png` | En attendant : le schéma d'architecture du README. Plus tard : le classement des professionnels dans l'application Streamlit. |
| ChurnGuard AI | `img/icon/ai.png` | Le tableau de bord ou un message de rétention généré (version showcase, données factices). |
| Mushroom KNN Classifier | `img/icon/ml.png` | La matrice de confusion ou un graphique d'exploration. |
| Optimisation AMPL | `img/icon/opt.png` | Un extrait du modèle AMPL ou le résultat du solveur. |
| Vélos en libre-service | `img/icon/bike.png` | Le diagramme de classes UML. |
| Arès Demeter | `img/icon/game.png` | Une capture d'une partie en cours. |
| Cahier des charges fonctionnel | `img/icon/lock.png` | Une image neutre (cadenas, document flouté). Pas d'extrait réel, le document est confidentiel. |
| Paris 2024 Football Simulator | `img/icon/football.png` | Le tableau du tournoi après une simulation. |

Astuce : pour le schéma d'architecture, GitHub affiche le diagramme Mermaid du README. Une capture d'écran de ce rendu suffit.

Aucune de ces images n'existait dans le dépôt : les anciens chemins (`churnguard.webp`, `ml.ico`, etc.) pointaient vers des fichiers absents, c'est pour ça qu'ils sont maintenant en `YYYY`.

---

## 3. Un texte provisoire déjà en ligne

Dans **ChurnGuard AI**, le champ `details` contient encore :

> Projet IA complet, du cadrage métier à la mise en production. [...etc, le reste de ta description...]

Ce texte s'affiche tel quel sur ton site actuel. Remplace-le par ta vraie description (le constat, ce que tu as construit, le résultat chez PrestiLife). Tu peux utiliser `\n\n` pour sauter une ligne entre deux paragraphes : c'est maintenant pris en compte dans la fenêtre de détail.

---

## 4. Au fil des deux projets

- **`"status": "En cours"`** sur AML Sentinel et Health Fraud Radar : remplace par `"Terminé"` à la fin, ou supprime la ligne pour retirer le badge orange.
- **Résultats chiffrés** : dès que tu mesures quelque chose (par exemple « X % d'alertes en moins à rappel égal »), ajoute-le à la fin de la `description` du projet. C'est ce qui donne le plus de poids à la carte.
- **Compétences** (`public/api/metadata.json`) : la catégorie « En cours d'acquisition (projets 2026) » regroupe dbt, Airflow, Neo4j, Kafka, etc. Déplace chaque outil vers sa vraie catégorie seulement quand tu l'as réellement utilisé dans un des projets.

---

## 5. À vérifier de ton côté

- **Intitulé du master** : le site disait à la fois « parcours IA » et « parcours Data et IA ». J'ai écrit simplement « Master Informatique ». Ajoute le parcours exact une fois ta demande de changement de parcours tranchée.
- **Balises `<head>` de `index.html`** : la description pour Google parle encore de « Master IA » et d'« alternance rentrée 2026 ». À mettre à jour en même temps que le point précédent.
- **Type « data » pour Optimisation AMPL** : c'est de la recherche opérationnelle plus que de la data. Si tu préfères le classer dans « Autre projet », remplace `"type": "data"` par `"type": "dev"`.
