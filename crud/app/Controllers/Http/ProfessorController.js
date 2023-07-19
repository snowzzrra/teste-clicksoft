'use strict'
const Professor = use("App/Models/Professor");

class ProfessorController {
  async index ({ request, response, view }) {
    const professores = await Professor.all();
    return professores;
  }
  async store ({ request, response }) {
    const data = request.only(["nome", "email", "matricula", "dataNasc"]);
    const professor = await Professor.create(data);
    return professor;
  }
  async update ({ params, request, response }) {
    const professor = await Professor.findOrFail(params.id);
    const data = request.only(["nome", "email", "matricula", "dataNasc"]);

    professor.merge(data);
    await professor.save();

    return professor;
  }
  async destroy ({ params, request, response }) {
    const professor = await Professor.findOrFail(params.id);
    await professor.delete();
  }
}

module.exports = ProfessorController
