//------------------------------------------------------------------------------
// <auto-generated>
//     Ce code a été généré à partir d'un modèle.
//
//     Des modifications manuelles apportées à ce fichier peuvent conduire à un comportement inattendu de votre application.
//     Les modifications manuelles apportées à ce fichier sont remplacées si le code est régénéré.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PCMA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Joueur
    {
        public int JoueurID { get; set; }
        public string NomJoueur { get; set; }
        public string PrenomJoueur { get; set; }
        public string EmailJoueur { get; set; }
        public string GsmJoueur { get; set; }
        public Nullable<System.DateTime> DatenJoueur { get; set; }
        public string PosteJoueur { get; set; }
        public string LateralisationJoueur { get; set; }
        public Nullable<int> ClubID { get; set; }
        public string PhotoJoueur { get; set; }
    }
}
