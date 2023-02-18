using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDChamaAi.Models
{
    public class Usuario
    {
        public int PessoaId { get; set; }

        public string Nome  { get; set; }

        public int Sobrenome { get; set; }

        public string Profissao { get; set; }
    }
}