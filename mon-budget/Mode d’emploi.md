# Budget Perso — Budget, Dépenses & Épargne

Ouvrez **Budget Perso.html** avec votre navigateur habituel. L’application fonctionne sans installation et sans connexion Internet. Son interface est entièrement en français ; la devise initiale est le FCFA (XOF).

## Pour commencer

1. Dans **Paramètres**, renseignez votre solde courant initial, sa date et votre épargne initiale globale. L’épargne n’est pas comprise dans le solde courant.
2. Dans **Mes revenus**, ajoutez votre salaire et vos autres sources. Distinguez les revenus reçus des revenus attendus.
3. Dans **Mon budget**, fixez votre enveloppe mensuelle et vos limites par catégorie. La somme des limites ne doit pas dépasser l’enveloppe totale.
4. Dans **Mes dépenses**, ajoutez vos dépenses payées et les factures prévues.
5. Dans **Mon épargne**, définissez vos objectifs puis enregistrez chaque versement. Un montant initial d’objectif décrit sa progression ; il ne s’ajoute pas une seconde fois à l’épargne initiale globale.

Le bouton **Explorer un exemple fictif** présente six mois d’exemple. La démonstration est séparée de vos données personnelles. **Quitter** restaure votre espace.

## Vos chiffres

- **Revenus totaux** : revenus reçus dans le mois. Les revenus attendus sont indiqués séparément.
- **Dépenses totales** : dépenses payées du mois.
- **Épargne du mois** : versements réellement effectués, hors dépenses.
- **Solde courant** : montant courant initial + revenus reçus − dépenses payées − versements d’épargne, depuis la date initiale jusqu’à la fin du mois sélectionné.
- **Solde disponible** : solde courant − dépenses prévues − versements d’épargne prévus du mois. Les revenus attendus ne l’augmentent pas.
- **Taux d’épargne** : versements effectués / revenus reçus du mois.
- **Budget restant** : enveloppe du mois − dépenses payées et prévues.
- **Transfert interne** : mouvement neutre entre vos comptes courants. Pour alimenter l’épargne, choisissez le type « Épargne ».

Les montants sont calculés en centièmes entiers afin d’éviter les erreurs d’arrondi courantes. Les montants négatifs, les dates impossibles et les doublons exacts sont refusés. Les saisies acceptent la virgule et les espaces français.

## Historique, calendrier et récurrences

Changer de mois conserve les mouvements et ne crée aucune opération. Un nouveau mois reprend les enveloppes du dernier mois antérieur déjà préparé.

Pour préparer des paiements récurrents, utilisez **Récurrences** ou **Préparer les récurrences**. Les occurrences sont ajoutées au statut prévu. Répéter l’action ne crée pas de doublons. Les fréquences hebdomadaire, mensuelle, trimestrielle et annuelle sont prises en charge. Vérifiez les dates et montants avant de marquer une occurrence comme effectuée.

Les graphiques se recalculent à chaque modification. Survolez-les pour afficher les montants. Sélectionnez une catégorie dans la légende du graphique circulaire pour filtrer ses dépenses.

## Analyses et simulations

Les analyses sont des règles locales fondées sur vos saisies. Elles distinguent constats calculés, estimations et suggestions. Elles ne consultent pas vos comptes bancaires et ne peuvent pas savoir si un abonnement vous est réellement inutile.

La capacité d’épargne estimée préserve toutes les dépenses engagées et votre marge de sécurité. Le montant recommandé est plafonné par votre objectif mensuel ; si cet objectif est nul, le pourcentage du salaire principal reçu sert de repère.

Le simulateur modifie uniquement ses hypothèses : hausse du salaire principal, revenu supplémentaire, réduction des dépenses, épargne envisagée et achat ponctuel. Les projections supposent des montants constants, sans rendement, sans inflation et sans retrait. Elles ne sont pas garanties.

L’évaluation financière utilise quatre critères affichés : dépenses couvertes, réserve indicative de trois mois de dépenses essentielles, obligations financières au plus égales à 30 % des revenus et versements d’épargne sur deux mois consécutifs. Ces repères descriptifs ne constituent pas une vérification de solvabilité.

## Sauvegarder, importer et exporter

- **Paramètres → Sauvegarder en JSON** : copie complète des mouvements, budgets, objectifs, catégories et préférences.
- **Importer des données** : restaure un JSON après confirmation, ou ajoute les mouvements d’un CSV compatible. Une restauration JSON remplace l’espace ; une copie de l’ancien espace est téléchargée avant remplacement.
- **Modèle CSV** : fournit les en-têtes attendus. Les montants sont positifs ; la colonne Type détermine leur rôle. Les doublons sont ignorés lors d’un import CSV. Les devises différentes sont refusées. Les objectifs mentionnés doivent déjà exister.
- **Exporter en CSV** : crée un fichier compatible avec Excel. Sur les pages de mouvements, l’export respecte les filtres et le mois affichés. Dans les paramètres, il exporte tout l’historique. L’export natif XLSX n’est pas proposé.
- **Rapports → Imprimer / PDF** : ouvre la boîte d’impression du navigateur. Choisissez « Enregistrer au format PDF ».

Changer la devise modifie l’unité affichée sans convertir les valeurs ; une confirmation le rappelle.

## Conservation des données

Les données sont enregistrées dans le stockage local de votre navigateur. Il n’y a ni synchronisation entre appareils, ni serveur de données, ni connexion bancaire. La conservation des fichiers HTML locaux varie selon le navigateur : utilisez le même navigateur et conservez le fichier au même endroit. Évitez la navigation privée et sauvegardez régulièrement en JSON. Si le navigateur refuse le stockage local, un message vous invite à exporter vos données.

Le fichier autonome ne charge aucune ressource externe. Aucune donnée financière réelle n’est préremplie.

## Vérification effectuée

Les contrôles portent sur les calculs financiers, les doublons, les dates, les récurrences, les reports de solde, les sauvegardes, les graphiques et les dix vues à vide ou avec démonstration. La vérification visuelle dans le navigateur n’a pas pu aboutir dans l’environnement de création ; le rendu sur votre appareil reste à confirmer.
