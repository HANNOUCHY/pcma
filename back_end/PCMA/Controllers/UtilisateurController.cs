using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PCMA.Models;

namespace PCMA.Controllers
{
    public class UtilisateurController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Utilisateur
        public IQueryable<Utilisateur> GetUtilisateur()
        {
            return db.Utilisateur;
        }

        [HttpGet]
        [Route("api/UtilisateurP/{id}")]
        [ResponseType(typeof(Utilisateur))]
        public IQueryable<Utilisateur> GetUtilisateurP(int id)
        {

            return db.Utilisateur.Where(i => i.ProfilUtilisateur == id);
        }

        // GET: api/Utilisateur/5
        [ResponseType(typeof(Utilisateur))]
        public IHttpActionResult GetUtilisateur(int id)
        {
            Utilisateur utilisateur = db.Utilisateur.Find(id);
            if (utilisateur == null)
            {
                return NotFound();
            }

            return Ok(utilisateur);
        }

        // PUT: api/Utilisateur/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUtilisateur(int id, Utilisateur utilisateur)
        {
           

            if (id != utilisateur.UtilisateurID)
            {
                return BadRequest();
            }

            db.Entry(utilisateur).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UtilisateurExists(id))
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

        // POST: api/Utilisateur
        [ResponseType(typeof(Utilisateur))]
        [AllowAnonymous]
        public IHttpActionResult PostUtilisateur(Utilisateur utilisateur)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser() { UserName = utilisateur.EmailUtilisateur, Email = utilisateur.EmailUtilisateur };
            user.FirstName = utilisateur.PrenomUtilisateur;
            user.LastName = utilisateur.NomUtilisateur;
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 3
            };
            manager.Create(user, string.Format(utilisateur.MdpUtilisateur));
            Console.WriteLine(user.Id);
            utilisateur.IdChar = user.Id;

            db.Utilisateur.Add(utilisateur);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = utilisateur.UtilisateurID }, utilisateur);
        }


        [HttpGet]
        [Route("api/GetUserClaimsB")]
        public IHttpActionResult GetUserClaimsB()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            var idchar = identityClaims.FindFirst("IdChar").Value;
            IEnumerable<Claim> claims = identityClaims.Claims;

            var user = db.Utilisateur.FirstOrDefault(i => i.IdChar == idchar);
            var club = db.Club.FirstOrDefault(i => i.AJoueurID == user.UtilisateurID);
            var clubname = "";
            var idclub = 0;
            if (club is null)
            {
                idclub = 0;
            }
            else
            {
                idclub = club.ClubID;
                clubname = club.NomClub;
            }
            Console.WriteLine();
            Utilisateur model = new Utilisateur()
            {
                NomUtilisateur = user.NomUtilisateur,
                EmailUtilisateur = identityClaims.FindFirst("Email").Value,
                PrenomUtilisateur = user.PrenomUtilisateur,
                GsmUtilisateur = identityClaims.FindFirst("LastName").Value,
                LoggedOn = identityClaims.FindFirst("LoggedOn").Value,
                IdChar = identityClaims.FindFirst("IdChar").Value,
                ProfilUtilisateur = user.ProfilUtilisateur,
                UtilisateurID = user.UtilisateurID,
                ClubID = idclub,
                ClubName = clubname
            };
            return Ok(model);
        }



        [HttpGet]
        [Route("api/GetUserClaims")]
        public IHttpActionResult GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            var idchar = identityClaims.FindFirst("IdChar").Value;
            IEnumerable<Claim> claims = identityClaims.Claims;
          
            var user = db.Utilisateur.FirstOrDefault(i => i.IdChar == idchar);
            var club = db.Club.FirstOrDefault(i => i.MedecinID == user.UtilisateurID);
            var idclub=0;
            var clubname = "";
            if (club is null)
            {
                idclub = 0;
            }
            else
            {
                idclub = club.ClubID;
                clubname = club.NomClub;
            }
            Console.WriteLine();
            Utilisateur model = new Utilisateur()
            {
                NomUtilisateur = user.NomUtilisateur,
                EmailUtilisateur = identityClaims.FindFirst("Email").Value,
                PrenomUtilisateur = user.PrenomUtilisateur,
                GsmUtilisateur = identityClaims.FindFirst("LastName").Value,
                LoggedOn = identityClaims.FindFirst("LoggedOn").Value,
                IdChar = identityClaims.FindFirst("IdChar").Value,
                ProfilUtilisateur = user.ProfilUtilisateur,
                UtilisateurID = user.UtilisateurID,
                ClubID = idclub,
                ClubName = clubname
            };
            return Ok(model);
        }
        [HttpGet]
        [Route("api/GetUserString/{id}")]
        public string GetStringUtilisateur(int id)
        {
            var user = db.Utilisateur.FirstOrDefault(i => i.UtilisateurID == id);
            return user.NomUtilisateur;
        }
        [HttpGet]
        [Route("api/GetUserProfil/{idchar}")]
        [ResponseType(typeof(Utilisateur))]
        public IHttpActionResult GetUserProfil(string idchar)
        {
           

             return Ok(db.Utilisateur.Where(i => i.IdChar == idchar));
        }
        // DELETE: api/Utilisateur/5
        [ResponseType(typeof(Utilisateur))]
        public IHttpActionResult DeleteUtilisateur(int id)
        {
            Utilisateur utilisateur = db.Utilisateur.Find(id);
            if (utilisateur == null)
            {
                return NotFound();
            }

            db.Utilisateur.Remove(utilisateur);
            db.SaveChanges();

            return Ok(utilisateur);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UtilisateurExists(int id)
        {
            return db.Utilisateur.Count(e => e.UtilisateurID == id) > 0;
        }
    }
}