# Utilisez une image de base Node.js
FROM node:20

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Commande par défaut pour démarrer l'application
CMD ["node", "index.js"]