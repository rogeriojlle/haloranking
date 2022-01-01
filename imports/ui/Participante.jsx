import React, { useState, useEffect } from 'react';

export const Participante = ({ params }) => {
  const [perfil, setPerfil] = useState({ nome: null, _id: null, partidas: [] });

  const callPerfil = (_id) => {
    return new Promise((resolve, reject) => {
      Meteor.call('perfil', _id, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  };

  const minhasPartidas = (nome) => {
    return new Promise((resolve, reject) => {
      Meteor.call('minhasPartidas', nome, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  };

  const remover = () => {
    if (window.confirm('Confirma?')) {
      if (perfil._id) {
        Meteor.call('removerParticipante', perfil._id, (err, res) => {
          if (err) {
            alert(err.error);
            return;
          }
          alert(`apagou ${perfil.nome}`);
          document.location.href = '/participantes';
        });
      }
    }
  };
  useEffect(() => {
    (async () => {
      const { _id, nome } = await callPerfil(params._id);
      const partidas = await minhasPartidas(nome);
      setPerfil({ _id, nome, partidas });
    })();
  }, []);

  return (
    <>
      <h2>{perfil.nome}</h2>
      <h3 style={{ textAlign: 'center' }}>Partidas</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem',
        }}
      >
        <h4>id</h4>
        <h4>vitoria</h4>
        <h4>derrota</h4>
        {perfil.partidas
          .reduce((a, d) => {
            a.push(d._id, d.derrotado.join(', '), d.vitorioso.join(', '));
            return a;
          }, [])
          .map((celula) => {
            return <div key={`${Math.random()}`}>{celula}</div>;
          })}
      </div>
      <p>
        <button onClick={remover}>remover participante!</button>
        <br />
        AVISO - remover irá apagar também todas as partidas em que ele
        participou, alterando o ranking global
      </p>
    </>
  );
};
