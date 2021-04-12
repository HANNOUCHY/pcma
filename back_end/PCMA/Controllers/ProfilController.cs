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
    public class ProfilController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Profil
        public IQueryable<Profil> GetProfil()
        {
            return db.Profil;
        }

       

        // PUT: api/Profil/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProfil(int id, Profil profil)
        {
           

            if (id != profil.ProfilID)
            {
                return BadRequest();
            }

            db.Entry(profil).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfilExists(id))
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

        // POST: api/Profil
        [ResponseType(typeof(Profil))]
        public IHttpActionResult PostProfil(Profil profil)
        {
           

            db.Profil.Add(profil);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = profil.ProfilID }, profil);
        }

        // DELETE: api/Profil/5
        [ResponseType(typeof(Profil))]
        public IHttpActionResult DeleteProfil(int id)
        {
            Profil profil = db.Profil.Find(id);
            if (profil == null)
            {
                return NotFound();
            }

            db.Profil.Remove(profil);
            db.SaveChanges();

            return Ok(profil);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProfilExists(int id)
        {
            return db.Profil.Count(e => e.ProfilID == id) > 0;
        }
    }
}