# ALTA — Landing Page

Page vitrine pour Alta, l'outil complet de préprod pour les séries animées.

## Aperçu

Site statique bilingue (FR/EN) présentant les fonctionnalités d'Alta :

- **Import scénario** — Import ODF, lecteur structuré 3 colonnes
- **Dépouillement IA** — Annotation automatique par Gemini
- **Storyboard 3D** — Composition de plans avec mannequins, caméra et séquenceur

## Structure

```
index.html          Page unique
css/landing.css     Styles (dark cinematic theme)
js/landing.js       Toggle FR/EN, scroll animations, navbar
img/                Screenshots
```

Pas de build, pas de dépendances, pas de framework. 3 fichiers auteur + images.

## Déploiement

Site statique — ouvrir `index.html` ou servir avec n'importe quel serveur web.

## Développement local

Ouvrir `index.html` directement dans un navigateur (`file://`), ou servir avec n'importe quel serveur statique :

```bash
python3 -m http.server 8080
```

## Licence

Tous droits réservés.
