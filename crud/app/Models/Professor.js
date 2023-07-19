'use strict'

const Model = use('Model')

class Professor extends Model {
  static get table () {
    return 'professors'
  }

  salas () {
    return this.hasMany('App/Models/Sala')
  }
}

module.exports = Professor
