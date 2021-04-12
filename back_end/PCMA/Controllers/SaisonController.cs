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
    public class SaisonController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Saison
        public IQueryable<Saison> GetSaison()
        {
            return db.Saison;
        }


        // PUT: api/Saison/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSaison(int id, Saison saison)
        {
           

            if (id != saison.SaisonID)
            {
                return BadRequest();
            }

            db.Entry(saison).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaisonExists(id))
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

        // POST: api/Saison
        [ResponseType(typeof(Saison))]
        public IHttpActionResult PostSaison(Saison saison)
        {
          
            db.Saison.Add(saison);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = saison.SaisonID }, saison);
        }

        // DELETE: api/Saison/5
        [ResponseType(typeof(Saison))]
        public IHttpActionResult DeleteSaison(int id)
        {
            Saison saison = db.Saison.Find(id);
            if (saison == null)
            {
                return NotFound();
            }

            db.Saison.Remove(saison);
            db.SaveChanges();

            return Ok(saison);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SaisonExists(int id)
        {
            return db.Saison.Count(e => e.SaisonID == id) > 0;
        }
    }
}