// Importation du module Mongoose
const mongoose = require('mongoose');

// Création d'un schéma Mongoose pour représenter la structure d'un produit
const Schema = mongoose.Schema;

// Définition du schéma du produit
const productSchema = new Schema({
  // Champ name (nom du produit) avec des contraintes
  name: {
    type: String, // Le type de données est une chaîne de caractères
    required: false, // Champ facultatif (non obligatoire)
  },
  // Champ mail (adresse e-mail) avec des contraintes
  mail: {
    type: String, // Le type de données est une chaîne de caractères
    required: true, // Champ obligatoire
  },
  // Champ depart (lieu de départ) avec des contraintes
  depart: {
    type: String, // Le type de données est une chaîne de caractères
    required: true, // Champ obligatoire
  },
  // Champ car (véhicule) avec des contraintes
  car: {
    type: String, // Le type de données est une chaîne de caractères
    required: true, // Champ obligatoire
  },
  // Champ heure (heure de départ) avec des contraintes
  heure: {
    type: String, // Le type de données est une chaîne de caractères
    required: true, // Champ obligatoire
  },
  // Champ l100 (consommation en litres par 100 km) avec des contraintes
  l100: {
    type: Number, // Le type de données est un nombre (flottant)
    required: true, // Champ obligatoire
  },
  // Champ distance (distance en kilomètres) avec des contraintes
  distance: {
    type: Number, // Le type de données est un nombre (flottant)
    required: true, // Champ obligatoire
  },
  // Champ place (nombre de places disponibles) avec des contraintes
  place: {
    type: Number, // Le type de données est un nombre entier
    required: true, // Champ obligatoire
  },
});

// Exportation du modèle Product basé sur le schéma productSchema
module.exports = mongoose.model('Product', productSchema);
