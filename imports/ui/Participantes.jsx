import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { collParticipantes } from '../api/participantes';
import { Link } from 'wouter';

export const Participantes = () => {
  const participantes = useTracker(() => {
    return collParticipantes.find().fetch();
  });

  return (
    <>
      <h2>
        Participantes ( <Link to="/novoparticipante">+</Link> )
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {participantes
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((p) => (
            <div key={p._id}>
              <a href={`participante/${p._id}`}>{p.nome}</a>
            </div>
          ))}
      </div>
    </>
  );
};
