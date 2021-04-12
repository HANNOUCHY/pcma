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

namespace PCMA.App_Start
{
    public class Comp_ClubController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Comp_Club
        public IQueryable<Comp_Club> GetComp_Club()
        {
            return db.Comp_Club;
        }

        // GET: api/Comp_Club/5
     
        // PUT: api/Comp_Club/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComp_Club(int id, Comp_Club comp_Club)
        {
            

            if (id != comp_Club.Comp_ClubID)
            {
                return BadRequest();
            }

            db.Entry(comp_Club).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Comp_ClubExists(id))
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

        // POST: api/Comp_Club
        [ResponseType(typeof(Comp_Club))]
        public IHttpActionResult PostComp_Club(Comp_Club comp_Club)
        {
            

            db.Comp_Club.Add(comp_Club);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = comp_Club.Comp_ClubID }, comp_Club);
        }

        // DELETE: api/Comp_Club/5
        [ResponseType(typeof(Comp_Club))]
        public IHttpActionResult DeleteComp_Club(int id)
        {
            Comp_Club comp_Club = db.Comp_Club.Find(id);
            if (comp_Club == null)
            {
                return NotFound();
            }

            db.Comp_Club.Remove(comp_Club);
            db.SaveChanges();

            return Ok(comp_Club);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Comp_ClubExists(int id)
        {
            return db.Comp_Club.Count(e => e.Comp_ClubID == id) > 0;
        }
    }
}