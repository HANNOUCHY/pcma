using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PCMA.Models;

namespace PCMA.Controllers
{
    public class JoueurController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Joueur
        public IQueryable<Joueur> GetJoueur()
        {
            return db.Joueur;
        }
        [HttpGet]
        [Route("api/JoueurM/{id}")]
        [ResponseType(typeof(Joueur))]
        public IQueryable<Joueur> GetJoueurM(int id)
        {

            return db.Joueur.Where(i => i.ClubID == id);
        }
        // GET: api/Joueur/5
        // GET: api/Joueur/5
        [ResponseType(typeof(Joueur))]
        public IHttpActionResult GetJoueur(int id)
        {
            Joueur Joueur = db.Joueur.Find(id);
            if (Joueur == null)
            {
                return NotFound();
            }

            return Ok(Joueur);
        }

        // PUT: api/Joueur/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutJoueur(int id, Joueur joueur)
        {
           
            if (id != joueur.JoueurID)
            {
                return BadRequest();
            }

            db.Entry(joueur).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JoueurExists(id))
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

        // POST: api/Joueur
        [ResponseType(typeof(Joueur))]
        public IHttpActionResult PostJoueur(Joueur joueur)
        {
        
            db.Joueur.Add(joueur);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = joueur.JoueurID }, joueur);
        }

        // DELETE: api/Joueur/5
        [ResponseType(typeof(Joueur))]
        public IHttpActionResult DeleteJoueur(int id)
        {
            Joueur joueur = db.Joueur.Find(id);
            if (joueur == null)
            {
                return NotFound();
            }

            db.Joueur.Remove(joueur);
            db.SaveChanges();

            return Ok(joueur);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JoueurExists(int id)
        {
            return db.Joueur.Count(e => e.JoueurID == id) > 0;
        }
    }
}