using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Web;
using System.Web.Http.Description;
using PCMA.Models;

namespace PCMA.Controllers
{
    public class DossierController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Dossier
        public IList<DossierName> GetDossier()
        {
            var studentList = db.Database
                        .SqlQuery<DossierName>("Select d.DossierID,d.FileDossier,j.NomJoueur,u.NomUtilisateur,c.NomClub,cf.Confirmation from Dossier d,Utilisateur u,Club c,Joueur j,Confirmation cf where d.ClubID=c.ClubID and d.MedecinID=u.UtilisateurID and d.JoueurID=j.JoueurID and cf.ConfirmationID=(select    max(c1.ConfirmationID) from Confirmation c1 where c1.DossierID=d.DossierID  ) ORDER BY d.DossierID desc")
                        .ToList();
            return studentList;

        }
        [HttpGet]
        [Route("api/DossierM/{id}")]
       
        public IList<DossierName> GetDossierM(int id)
        {


            var studentList = db.Database
                        .SqlQuery<DossierName>("Select d.DossierID,d.FileDossier,j.NomJoueur,u.NomUtilisateur,c.NomClub,cf.Confirmation from Dossier d,Utilisateur u,Club c,Joueur j,Confirmation cf where d.ClubID=c.ClubID and d.MedecinID=u.UtilisateurID and d.JoueurID=j.JoueurID and cf.ConfirmationID=(select    max(c1.ConfirmationID) from Confirmation c1 where c1.DossierID=d.DossierID) and d.MedecinID=" + id+ " ORDER BY d.DossierID desc")
                        .ToList();
            return studentList;
        }
        [HttpGet]
        [Route("api/CountCat")]

        public IList<int> GetCountCat()
        {


            var studentList = db.Database
                        .SqlQuery<int>("select max(TabsID) as 'count' from Categorie")
                        .ToList();
            return studentList;
        }
        // GET: api/Dossier/5
        [ResponseType(typeof(Dossier))]
        public IHttpActionResult GetDossier(int id)
        {
            Dossier Dossier = db.Dossier.Find(id);
            if (Dossier == null)
            {
                return NotFound();
            }

            return Ok(Dossier);
        }

        // PUT: api/Dossier/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDossier(int id, Dossier Dossier)
        {


            if (id != Dossier.DossierID)
            {
                return BadRequest();
            }

            db.Entry(Dossier).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DossierExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Dossier
        [ResponseType(typeof(Dossier))]
        public IHttpActionResult PostDossier(Dossier Dossier)
        {
            string imageName = null;

            //Upload Image
            //httpRequest.Files["Image"];
            var postedFile = Dossier.FileDossier;
            //Create custom filename
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile);
            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + imageName);
         //   Dossier.SaveAs(filePath);

            db.Dossier.Add(Dossier);
            db.SaveChanges();
            Confirmation model = new Confirmation()
            {
                DossierID = Dossier.DossierID,
                Confirmation1 = "En attend",
                DateConfirmation = DateTime.Now,
             
            };
            db.Confirmation.Add(model);
            db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = Dossier.DossierID }, Dossier);
        }

        // DELETE: api/Dossier/5
        [ResponseType(typeof(Dossier))]
        public IHttpActionResult DeleteDossier(int id)
        {
            Dossier Dossier = db.Dossier.Find(id);
            if (Dossier == null)
            {
                return NotFound();
            }

            db.Dossier.Remove(Dossier);
            db.SaveChanges();

            return Ok(Dossier);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DossierExists(int id)
        {
            return db.Dossier.Count(e => e.DossierID == id) > 0;
        }
    }
}