using System;
using System.IO;
using System.Linq;
using System.Web.Http;
using FileSystem.Models;

namespace FileSystem.Controllers
{
    [RoutePrefix("api/Home")]
    public class HomeController : ApiController
    {
        private readonly SizeCount _sizeCount;
        
        public HomeController()
        {
            _sizeCount = new SizeCount();
        }

        // GET api/Home/GetDirectoryEntry
        [HttpGet]
        [Route("GetDirectoryEntry")]
        public IHttpActionResult GetDirectoryEntry(string path)
        {
            var folder = new Folder();

            if (string.IsNullOrEmpty(path))
            {
                folder.Directories = Environment.GetLogicalDrives();
                folder.Path = "";
                return Ok(folder);
            }
            try
            {
                var directory = new DirectoryInfo(path);
                folder.Path = directory.FullName;
                folder.Directories = directory.GetDirectories().Select(d => d.Name).ToList();
                folder.Files = directory.GetFiles().Select(f => f.Name).ToList();
            }
            catch (UnauthorizedAccessException ex)
            {
                return BadRequest("Access denied: " + ex.Message);
            }

            return Ok(folder);
        }

        // GET api/Home/GetFilesCount
        [HttpGet]
        [Route("GetFilesCount")]
        public SizeCount GetFilesCount(string path)
        {
            try
            {
                var dir = new DirectoryInfo(path);

                foreach(var file in dir.GetFiles())
                {
                    if (file.Length >> 20 <= 10) _sizeCount.Small++;
                    else if (file.Length >> 20 > 10 && file.Length >> 20 <= 50) _sizeCount.Middle++;
                    else if (file.Length >> 20 >= 100) _sizeCount.Big++;
                };

                foreach(var d in dir.GetDirectories())
                    GetFilesCount(d.FullName);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return _sizeCount;
        }
    }
}
