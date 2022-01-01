import { Mongo } from 'meteor/mongo';

export const collTimes = new Mongo.Collection('times');

export const criarTime = (nome, participantes) => {
  // conferir se já não existe um time criado com os mesmos membros
  collTimes.insert({ nome, participantes });
};
