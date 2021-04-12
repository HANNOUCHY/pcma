using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using PCMA.Models;

namespace PCMA.Controllers
{
    public class FileController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/File
        public IQueryable<PCMA.Models.File> GetFile()
        {
            return db.File;
        }

        // GET: api/File/5
        [ResponseType(typeof(PCMA.Models.File))]
        public IHttpActionResult GetFile(int id)
        {
            PCMA.Models.File file = db.File.Find(id);
            if (file == null)
            {
                return NotFound();
            }

            return Ok(file);
        }

        // PUT: api/File/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFile(int id, PCMA.Models.File file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != file.FileID)
            {
                return BadRequest();
            }

            db.Entry(file).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FileExists(id))
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

        // POST: api/File

        [HttpPost]
        [Route("api/File")]
        public HttpResponseMessage PostFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0) { 
            foreach (string fl in httpRequest.Files)
            {
                //Upload Image
                var postedFile = httpRequest.Files["file"];
                //Create custom filename
                imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(200).ToArray()).Replace(" ", "-");
                imageName = imageName  + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
                postedFile.SaveAs(filePath);
            }

}
           

            return response;
        }

       

        // DELETE: api/File/5
        [ResponseType(typeof(PCMA.Models.File))]
        public IHttpActionResult DeleteFile(int id)
        {
            PCMA.Models.File file = db.File.Find(id);
            if (file == null)
            {
                return NotFound();
            }

            db.File.Remove(file);
            db.SaveChanges();

            return Ok(file);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FileExists(int id)
        {
            return db.File.Count(e => e.FileID == id) > 0;
        }
    }
}