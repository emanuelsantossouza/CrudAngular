using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using CrudApi.Context;
using CrudApi.Models;

namespace CrudApi.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]

    public class PessoasController : ControllerBase
    {
        private readonly Contexto _contexto;

        public PessoasController(Contexto contexto)
        {
            _contexto = contexto;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> PegarTodosAsync() { 
            return await _contexto.Pessoas.ToListAsync();
        }

        [HttpGet("{pessoaId}")]
        public async Task<ActionResult<Pessoa>> PegarPessoaPeloIdAsync(int pessoaId){
            Pessoa pessoa = await _contexto.Pessoas.FindAsync(pessoaId);

            if (pessoa == null)
                return NotFound();

            return Ok(pessoa);
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> SalvarPessoaAsync(Pessoa pessoa){
            await _contexto.Pessoas.AddAsync(pessoa);
            await _contexto.SaveChangesAsync();
            
            return Ok();
        }    

        [HttpPut]
        public async Task<ActionResult> AtualizarPessoaAsync(Pessoa pessoa)
        {
            _contexto.Pessoas.Update(pessoa);
            await  _contexto.SaveChangesAsync();

            return Ok();
         }

        [HttpDelete("{pessoaId}")]
        public async Task<ActionResult> ExcluirPessoaAsync(int pessoaId){
            Pessoa pessoa = await _contexto.Pessoas.FindAsync(pessoaId);
            _contexto.Remove(pessoa);
            await _contexto.SaveChangesAsync();

            return NoContent();
        }
      
    }
}