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
    public class ConfirmationController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Confirmation
        public IQueryable<Confirmation> GetConfirmation()
        {
            return db.Confirmation;
        }

        // GET: api/Confirmation/5
        [ResponseType(typeof(Confirmation))]
        public IHttpActionResult GetConfirmation(int id)
        {
            Confirmation confirmation = db.Confirmation.Find(id);
            if (confirmation == null)
            {
                return NotFound();
            }

            return Ok(confirmation);
        }

        // PUT: api/Confirmation/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutConfirmation(int id, Confirmation confirmation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != confirmation.ConfirmationID)
            {
                return BadRequest();
            }

            db.Entry(confirmation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConfirmationExists(id))
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

        // POST: api/Confirmation
        [ResponseType(typeof(Confirmation))]
        public IHttpActionResult PostConfirmation(Confirmation confirmation)
        {
          

            db.Confirmation.Add(confirmation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = confirmation.ConfirmationID }, confirmation);
        }

        // DELETE: api/Confirmation/5
        [ResponseType(typeof(Confirmation))]
        public IHttpActionResult DeleteConfirmation(int id)
        {
            Confirmation confirmation = db.Confirmation.Find(id);
            if (confirmation == null)
            {
                return NotFound();
            }

            db.Confirmation.Remove(confirmation);
            db.SaveChanges();

            return Ok(confirmation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ConfirmationExists(int id)
        {
            return db.Confirmation.Count(e => e.ConfirmationID == id) > 0;
        }
    }
}