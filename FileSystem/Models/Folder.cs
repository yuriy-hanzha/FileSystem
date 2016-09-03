using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FileSystem.Models
{
    public class Folder
    {
        public string Path { get; set; }
        public IEnumerable<string> Files { get; set; }
        public IEnumerable<string> Directories { get; set; }
    }
}