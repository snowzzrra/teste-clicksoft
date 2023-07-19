'use strict'
const Sala = use("App/Models/Sala");

class SalaController {
  async index ({ request, response, view }) {
    const salas = await Sala.all();
    return salas;
  }

  async store ({ request, response }) {
    const data = request.only(["numeroSala", "capacidadeMax", "podeAlocarAluno"]);
    const sala = await Sala.create(data);
    return sala;
  }

  async update ({ params, request, response }) {
    const sala = await Sala.find(params.id);
    if (!sala){
      return { message: 'Sala não encontrada.' }
    }

    const data = request.only(["numeroSala", "capacidadeMax", "podeAlocarAluno"]);

    sala.merge(data);
    await sala.save();

    return sala;
  }

  async destroy ({ params, request, response }) {
    const sala = await Sala.find(params.id);
    if (!sala){
      return { message: 'Sala não encontrada.' }
    }

    await sala.delete();
    return { message: 'Sala deletada com sucesso.'}
  }

  async show ({ params, request, response, view }) {
    const sala = await Sala.find(params.id);
    if (!sala){
      return { message: 'Sala não encontrada.' }
    }
    
    return sala;
  }

  async listAlunos ({ params, request, response, view }) {
    const sala = await Sala.find(params.id);
    if (!sala){
      return { message: 'Sala não encontrada.' }
    }
    
    const alunos = await sala.alunos().fetch()
    return alunos
  }
}

module.exports = SalaController
