'use strict'

const Model = use('Model')

class Sala extends Model {
  static get table () {
    return 'salas'
  }
  
  alunos () {
    return this.belongsToMany('App/Models/Aluno').pivotTable('aluno_sala')
  }

  professor () {
    return this.belongsTo('App/Models/Professor')
  }
}

module.exports = Sala
