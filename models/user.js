// Importation du module Mongoose
const mongoose = require('mongoose');

// Création d'un schéma Mongoose pour représenter la structure d'un utilisateur
const Schema = mongoose.Schema;

// Définition du schéma de l'utilisateur
const UserSchema = new Schema({
  // Champ email avec des contraintes
  email: {
    type: String, // Le type de données est une chaîne de caractères
    required: true, // Champ obligatoire
    unique: true, // Les valeurs doivent être uniques
  },
  // Champ password avec des contraintes
  password: {
    type: String, // Le type de données est une chaîne de caractères
    required: true, // Champ obligatoire
  },
  // Champ name avec des contraintes
  name: {
    type: String, // Le type de données est une chaîne de caractères
    required: true, // Champ obligatoire
  },
  // Champ status avec une valeur par défaut
  status: {
    type: String, // Le type de données est une chaîne de caractères
    default: 'I am new!', // Valeur par défaut si non spécifiée
  },
  // Champ posts contenant une liste d'identifiants de documents liés
  posts: [
    {
      type: Schema.Types.ObjectId, // Le type de données est un identifiant d'objet MongoDB
      ref: 'Post', // Référence vers le modèle 'Post'
    },
  ],
});

// Exportation du modèle User basé sur le schéma UserSchema
module.exports = mongoose.model('User', UserSchema);
