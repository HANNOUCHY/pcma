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
    
    public partial class Confirmation
    {
        public int ConfirmationID { get; set; }
        public Nullable<int> DossierID { get; set; }
        public Nullable<int> UtilisateurID { get; set; }
        public string Confirmation1 { get; set; }
        public Nullable<System.DateTime> DateConfirmation { get; set; }
    }
}
