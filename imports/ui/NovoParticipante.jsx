import React from 'react';

export const NovoParticipante = () => {
  const preparar = (evt) => {
    evt.preventDefault();
    const input_nome = document.querySelector('#input_nome');
    const nome = document.querySelector('#input_nome').value.trim();
    if (nome.length) {
      Meteor.call('addParticipante', nome, (err, res) => {
        if (err) {
          alert(err.error);
          return;
        }
        input_nome.value = '';
        alert('OK');
        return;
      });
    } else {
      alert('preencha algo no input nome');
      input_nome.focus();
      return;
    }
  };
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'end',
        gap: '.5rem',
      }}
    >
      <h2>Novo Participante</h2>
      <div>
        nome: <input id="input_nome" />
      </div>
      <div>
        <button onClick={preparar}>Preparar</button>
      </div>
    </div>
  );
};
