using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CRUDChamaAi.Models
{
    public class Context : DbContext
    {
        DbSet<Usuario> ?Usuarios { get; set ;}

        public Context(DbContextOptions<Context> opcoes) :base(opcoes)
        {


        }
    }
}