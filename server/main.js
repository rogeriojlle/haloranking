import { Meteor } from 'meteor/meteor';
import { collParticipantes } from '/imports/api/participantes';
import { collPartidas } from '/imports/api/partidas';
import { collTimes } from '/imports/api/times';

// for (let nome of []) {collParticipantes.insert({ nome });}

Meteor.methods({
  addPartida(p) {
    return collPartidas.insert(p);
  },
  addParticipante(nome) {
    if (collParticipantes.findOne({ nome })) {
      throw new Meteor.Error('nome já existe');
    }
    return collParticipantes.insert({ nome });
  },

  perfil(_id) {
    return collParticipantes.findOne({ _id });
  },

  minhasPartidas(nome) {
    return collPartidas
      .find({ $or: [{ vitorioso: nome }, { derrotado: nome }] })
      .fetch();
  },

  removerParticipante(_id) {
    const { nome } = collParticipantes.findOne({ _id });
    if (nome) {
      collPartidas.remove({ $or: [{ vitorioso: nome }, { derrotado: nome }] });
      collParticipantes.remove({ _id });
      return true;
    } else {
      throw new Meteor.Error('não encontrado');
    }
  },

  participantes() {
    return collParticipantes.find().fetch();
  },
});

Meteor.startup(() => {});
