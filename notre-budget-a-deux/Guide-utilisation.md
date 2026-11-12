# Notre Budget à Deux — Finances, Projets & Épargne

Une application en français pour suivre les finances du couple, répartir les charges et préparer les projets communs.

## Démarrer

1. Ouvrez **Notre-Budget-a-Deux.html** dans un navigateur récent, par exemple Chrome, Edge ou Firefox. Aucune installation n’est nécessaire. Gardez le même fichier et le même navigateur pour retrouver vos données locales.
2. Dans **Notre profil**, indiquez vos prénoms, vos revenus mensuels prévus, votre devise et votre mode de gestion. Le mode initial est « Finances mixtes » et la devise initiale est le FCFA (XOF).
3. Choisissez une répartition des charges : à parts égales, au prorata des revenus ou selon des pourcentages personnalisés.
4. Enregistrez les revenus effectivement reçus dans **Nos revenus**. Les revenus prévus du profil ne sont pas automatiquement comptabilisés.
5. Ajoutez vos dépenses et vos versements. Le statut « Prévu » permet d’anticiper les échéances ; « Confirmé » intègre le mouvement aux calculs.
6. Définissez vos enveloppes dans **Notre budget**, puis vos objectifs dans **Notre épargne** ou **Nos projets**.

L’espace démarre sans données financières. **Explorer la démo** ouvre des exemples fictifs en mémoire. La démonstration ne remplace pas vos données. **Revenir à mes données** recharge votre espace. Les modifications de démonstration disparaissent lorsque vous la quittez ou actualisez la page.

## Les espaces

| Espace | Utilisation |
| --- | --- |
| Tableau de bord | Neuf indicateurs, six visualisations, filtres et derniers mouvements. |
| Notre profil | Noms, prévisions de revenus, devise, objectifs, mode de gestion et visibilité. |
| Nos revenus | Plusieurs sources, fréquence, historique et comparaison des revenus. |
| Dépenses communes | Saisie, modification, suppression, recherche et filtres des mouvements communs. |
| Dépenses personnelles | Espaces individuels, avec détails masqués par défaut. |
| Répartition des charges | Parts attendues, paiements, compte commun et transfert de régularisation. |
| Notre budget | Enveloppes mensuelles, sous-catégories, alertes et report facultatif. |
| Notre épargne / Nos projets | Objectifs communs et personnels, versements, progression et dates estimées. |
| Calendrier | Dates ponctuelles ou mensuelles, mouvements prévus et dates cibles des objectifs. |
| Simulateur | Revenus différents, perte d’un revenu, réduction des charges et financement d’un projet. |
| Analyses | Calculs, comparaisons, projections et suggestions explicitement identifiés. |
| Rapports | Bilan en dix parties, comparaisons mensuelles et annuelles, impression PDF. |
| Paramètres | Sauvegarde JSON, restauration, CSV, catégories et thème. |

Le choix du mode de gestion exprime votre organisation. Les espaces personnels et communs restent accessibles dans chaque mode. Changer de mode ne déplace ni ne supprime les transactions. La propriété, le payeur et la méthode de répartition de chaque mouvement restent explicites.

## Comprendre les calculs

**Revenus** : uniquement les revenus confirmés du mois sélectionné.

**Dépenses** : dépenses de consommation et intérêts/frais confirmés. Le capital remboursé est une sortie de trésorerie suivie séparément.

**Épargne mensuelle** : versements d’épargne confirmés du mois. Le solde initial d’un objectif n’est ni un revenu ni un versement du mois.

**Solde disponible** = revenus encaissés − dépenses payées − capital remboursé − versements d’épargne. Il s’agit du résultat des mouvements du mois, pas d’un solde bancaire : aucun solde initial de compte courant n’est saisi.

**Taux d’épargne** = versements d’épargne du mois ÷ revenus encaissés du mois. Avec zéro revenu, l’interface affiche 0 % et ne divise pas par zéro.

Les transferts internes et les remboursements entre partenaires ne créent ni revenu ni dépense supplémentaire. Pour rembourser une avance commune, saisissez un **Remboursement entre partenaires**, pas une nouvelle dépense.

Le budget global de décaissements additionne le budget commun, les deux budgets personnels et le report positif éventuel. Le budget d’épargne est suivi à part. Les budgets par catégorie détaillent le budget commun : ils ne s’y ajoutent pas une seconde fois.

Le report facultatif correspond à l’enveloppe globale non utilisée du mois précédent, après dépenses et capital, avec ses éventuels reports précédents. Un dépassement ne crée pas de report négatif. Le début du suivi délimite le calcul historique.

## Répartir les charges

- **À parts égales** : 50 % chacun.
- **Au prorata** : revenus réellement encaissés par chacun dans le mois. Si aucun revenu n’est saisi, les revenus prévus du profil servent de base. Si les deux bases sont nulles, le calcul utilise 50 / 50.
- **Personnalisée** : vous fixez la part du partenaire 1 ; la part du partenaire 2 est le complément à 100 %.

Chaque charge peut suivre l’accord du couple ou une méthode indépendante. Une modification de l’accord recalcule les mouvements associés à « Accord du couple », y compris les mois passés ; utilisez une méthode explicite sur les anciennes charges si vous voulez figer leur répartition.

La part du premier partenaire est arrondie à l’unité monétaire ; celle du second est calculée par différence. Le total reste égal au montant de la charge.

La régularisation porte sur les charges communes **confirmées**, capital et frais inclus. Les charges prévues restent des engagements à venir. Les remboursements déjà enregistrés sont déduits du transfert restant.

Un paiement du **compte commun** couvre les deux parts selon la méthode de la charge et ne génère pas de remboursement entre partenaires. Cette quote-part n’est pas une preuve de financement individuel : les apports effectifs au compte commun peuvent être enregistrés comme transferts internes. L’application ne reconstitue pas un solde bancaire par compte.

Le bouton « Enregistrer la régularisation » ouvre un formulaire prérempli. Il enregistre un mouvement de suivi ; **aucun argent n’est transféré par l’application**.

## Suivre l’épargne

Un objectif comprend un montant cible, un solde initial, une date, une priorité, un versement mensuel prévu et une méthode de contribution indépendante de celle des dépenses.

Le stock d’épargne d’un objectif est son solde initial plus ses versements confirmés, toutes dates confondues. L’affectation d’un versement à un objectif ne le compte pas une seconde fois. Les contributions déjà versées par partenaire excluent le solde initial non attribué.

Les dates estimées supposent un versement mensuel constant, sans rendement, inflation ou imprévu. Elles ne garantissent pas une date de réalisation. Le simulateur n’enregistre aucune transaction et ne modifie pas vos finances.

Supprimer un objectif conserve les versements existants comme épargne sans objectif attribué. Un objectif comportant des versements conserve son espace personnel ou commun ; créez un nouvel objectif pour changer d’espace.

## Échéances et récurrences

Le calendrier affiche les événements et répétitions mensuelles, les mouvements prévus du mois et les échéances des objectifs. Un événement de calendrier ne crée pas de paiement.

Dans les mouvements, **Échéances du mois** crée au statut « Prévu » les occurrences mensuelles manquantes à partir des séries antérieures. Un nouvel appel n’ajoute pas une seconde occurrence pour la même série et le même mois. Le jour est ramené au dernier jour du mois si nécessaire. Confirmez chaque mouvement après son encaissement ou son paiement réel.

L’application n’envoie pas de notification lorsque vous la fermez. Les encours de crédit ne sont pas déduits des échéances : consultez les contrats ou relevés de vos prêteurs pour connaître le capital restant dû.

## Exporter et restaurer

- **Sauvegarde JSON** : export complet, comprenant aussi les détails personnels masqués. La restauration valide le fichier puis demande confirmation avant de remplacer les données de cet espace. Ce format permet de déplacer l’ensemble de l’espace ; il ne fusionne pas deux sauvegardes concurrentes.
- **CSV pour Excel** : transactions du mois et des filtres actifs, séparées par des points-virgules, encodées en UTF-8. Les détails personnels masqués sont exclus. Les textes pouvant être interprétés comme formules sont neutralisés. L’import CSV n’est pas pris en charge ; utilisez une sauvegarde JSON pour restaurer les données.
- **PDF** : dans Rapports, utilisez **Imprimer / PDF**, puis « Enregistrer au format PDF » dans le navigateur. Le navigateur contrôle le dialogue d’impression et ses libellés.

Les justificatifs sont des références textuelles (numéro de facture, emplacement d’un fichier). Aucun justificatif n’est téléversé. Les devises changent l’unité d’affichage sans conversion automatique des montants.

## Confidentialité et limites

Les données sont enregistrées dans **ce navigateur**, sans base partagée, connexion bancaire ou synchronisation entre appareils. Le stockage n’est pas chiffré par l’application. Une publication privée du site protège l’accès à la page hébergée ; elle ne crée pas deux comptes partenaires ni de permissions individuelles sécurisées.

Les détails personnels sont masqués par défaut. Les réglages permettent de partager ou masquer les totaux personnels. Les indicateurs globaux qui permettraient de déduire des montants masqués sont alors également masqués. Le calendrier respecte le masquage des détails personnels.

**Le masquage reste une préférence d’affichage, pas une mesure de sécurité.** Toute personne ayant accès à ce navigateur peut accéder au stockage ou modifier les réglages. Pour des informations sensibles, utilisez des sessions de navigateur distinctes et décidez ensemble de ce que vous partagez.

Le stockage d’un fichier HTML local dépend du navigateur et de l’emplacement du fichier. Une navigation privée, un changement de navigateur, un déplacement du fichier ou un nettoyage des données peut rendre la sauvegarde inaccessible. Exportez régulièrement un JSON. Le site hébergé et le fichier autonome ont des stockages distincts : déplacez les données par export et restauration.

Le thème clair et le thème sombre sont disponibles. L’application fonctionne sur téléphone et ordinateur. Les polices Google Fonts sont facultatives ; une police de remplacement est utilisée hors connexion. Aucune donnée financière n’est transmise au service de polices.

## Vérifications de cette livraison

Les contrôles automatiques ont vérifié les calculs de trésorerie, la séparation des flux, les arrondis de répartition, les remboursements, les paiements du compte commun, l’épargne, les reports de budget, les dates mensuelles et la validation des sauvegardes.

Un contrôle d’exécution a parcouru les 14 vues avec des données vides et de démonstration, puis vérifié la création et la modification de mouvements, les objectifs, les événements, la sauvegarde et le masquage des informations personnelles.

La vérification visuelle dans le navigateur n’a pas pu être réalisée : l’aperçu local était inaccessible dans cet environnement et l’ouverture directe d’un fichier local est interdite par la politique du navigateur de contrôle. L’impression PDF et les téléchargements doivent donc être confirmés dans votre navigateur.
