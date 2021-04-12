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
    public class ClubController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Club
        public IQueryable<Club> GetClub()
        {
            return db.Club;
        }

        [HttpGet]
        [Route("api/ClubM/{id}")]
        [ResponseType(typeof(Club))]
        public IQueryable<Club> GetClubM(int id)
        {

            return db.Club.Where(i => i.MedecinID == id);
        }

        // PUT: api/Club/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClub(int id, Club club)
        {

            if (id != club.ClubID)
            {
                return BadRequest();
            }

            db.Entry(club).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClubExists(id))
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

        // POST: api/Club
        [ResponseType(typeof(Club))]
        public IHttpActionResult PostClub(Club club)
        {
          

            db.Club.Add(club);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = club.ClubID }, club);
        }

        // DELETE: api/Club/5
        [ResponseType(typeof(Club))]
        public IHttpActionResult DeleteClub(int id)
        {
            Club club = db.Club.Find(id);
            if (club == null)
            {
                return NotFound();
            }

            db.Club.Remove(club);
            db.SaveChanges();

            return Ok(club);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClubExists(int id)
        {
            return db.Club.Count(e => e.ClubID == id) > 0;
        }
    }
}