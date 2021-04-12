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
    public class ActionController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Action
        public IQueryable<PCMA.Models.Action> GetAction()
        {
            return db.Action;
        }

        // GET: api/Action/5
        [ResponseType(typeof(PCMA.Models.Action))]
        public IQueryable GetAction(int id)
        {
           


            return db.Action.Where(i => i.DossierID == id);
        }

        // PUT: api/Action/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAction(int id, PCMA.Models.Action action)
        {
           

            if (id != action.ActionID)
            {
                return BadRequest();
            }

            db.Entry(action).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActionExists(id))
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

        // POST: api/Action
        [ResponseType(typeof(PCMA.Models.Action))]
        public IHttpActionResult PostAction(PCMA.Models.Action action)
        {
            

            db.Action.Add(action);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = action.ActionID }, action);
        }

        // DELETE: api/Action/5
        [ResponseType(typeof(PCMA.Models.Action))]
        public IHttpActionResult DeleteAction(int id)
        {
            /*  PCMA.Models.Action action = db.Action.SingleOrDefault(x => x.DossierID == id);
              if (action == null)
              {
                  return NotFound();
              }*/
      

db.Action.Where(p => p.DossierID == id).ToList().ForEach(p => db.Action.Remove(p));

            //db.Action.RemoveRange(db.Action.Where(x => x.DossierID == id));

          //  db.Action.Where(i => i.DossierID == id);
          //  db.Action.Remove(action);
            db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ActionExists(int id)
        {
            return db.Action.Count(e => e.ActionID == id) > 0;
        }
    }
}