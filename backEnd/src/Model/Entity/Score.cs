using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace backEnd.src.Model.Entity;

[Table("scores")]
public class Score {
	[Key]
	public int Session { get; set; }
	public string UserId { get; set; }
	public string UserName { get; set; }
	public int Points { get; set; }

}
