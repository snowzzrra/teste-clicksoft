'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('professores', 'ProfessorController').apiOnly();
Route.resource('alunos', 'AlunoController').apiOnly();

Route.post('/professores/:id/salas', 'ProfessorController.createSala')
Route.put('/professores/:id/salas/:sala_id', 'ProfessorController.updateSala')
Route.delete('/professores/:id/salas/:sala_id', 'ProfessorController.deleteSala')
Route.get('/professores/:id/salas/:sala_id', 'ProfessorController.showSala')
Route.get('/professores/:id/salas/:sala_id/alunos', 'ProfessorController.listAlunosSala')

Route.post('/professores/:id/salas/:sala_id/allocate/alunos/:aluno_id', 'ProfessorController.allocateAluno')
Route.delete('/professores/:id/salas/:sala_id/remove/alunos/:aluno_id', 'ProfessorController.removeAluno')
Route.get('/alunos/:id/salas', 'AlunoController.listSalas')

Route.get('/alunos/:id/salas/comparecer', 'AlunoController.listSalasComparecer')
