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
    
    public partial class Action
    {
        public int ActionID { get; set; }
        public Nullable<int> CategorieID { get; set; }
        public Nullable<int> CheckID { get; set; }
        public string ResAction { get; set; }
        public string TextAction { get; set; }
        public Nullable<int> DossierID { get; set; }
    }
}
