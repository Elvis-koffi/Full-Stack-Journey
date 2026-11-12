# Notre Budget à Deux

Notre Budget à Deux est une application en français pour suivre un budget de couple, répartir les charges et préparer des projets communs.

## Ouvrir l’application

Depuis le dossier du projet, démarrez un serveur local avec Python 3, puis ouvrez [l’application dans votre navigateur](http://localhost:8000).

```bash
python -m http.server 8000 --directory dist
```

Le serveur local permet au navigateur de charger les modules JavaScript de l’application.

## Fonctionnalités

- Distinguer les opérations personnelles des dépenses communes.
- Calculer la répartition des charges et suivre les échéances récurrentes.
- Visualiser les dépenses mensuelles et suivre les objectifs d’épargne.
- Exporter et restaurer une sauvegarde des données.

Les données sont stockées dans le navigateur utilisé. Une sauvegarde permet de les transférer vers un autre appareil.

Consultez le [guide d’utilisation](Guide-utilisation.md) pour les détails sur la répartition des charges, l’épargne et les sauvegardes.
