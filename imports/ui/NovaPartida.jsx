import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { collParticipantes } from '/imports/api/participantes';
import { useTracker } from 'meteor/react-meteor-data';
import {
  Select,
  SelectOption,
  SelectGroup,
  SelectVariant,
} from '@patternfly/react-core';

let listaCompleta = [];

const SelecaoVitoriosos = (props) => {
  const onToggle = (...args) => {
    console.log(args);
  };

  return (
    <Select
      variant={SelectVariant.checkbox}
      placeholderText="Filter by status"
      onToggle={onToggle}
      isGrouped
      hasInlineFilter
    >
      <SelectOption value="Running" />
      <SelectOption value="Stopped" />
      <SelectOption value="Down" />
      <SelectOption value="Degraded" />
      <SelectOption value="Needs maintenance" />
    </Select>
  );
};

const SelecaoDerrotados = (props) => {
  const onToggle = (...args) => {
    console.log(args);
  };

  return (
    <Select
      variant={SelectVariant.checkbox}
      placeholderText="Filter by status"
      onToggle={onToggle}
      isGrouped
      hasInlineFilter
    >
      <SelectOption value="Running" />
      <SelectOption value="Stopped" />
      <SelectOption value="Down" />
      <SelectOption value="Degraded" />
      <SelectOption value="Needs maintenance" />
    </Select>
  );
};

const dividirTimes = (participantes) => {
  let ponteiro = true;
  const vitorioso = [];
  const derrotado = [];
  for (let j of participantes) {
    if (ponteiro) {
      vitorioso.push(j);
    } else {
      derrotado.push(j);
    }
    ponteiro = !ponteiro;
  }
  return { vitorioso, derrotado };
};

Meteor.call('participantes', (err, res) => {
  //false significa que ele não está selecionado
  listaCompleta = res.map((p) => [p, false]);
});

export const NovaPartida = () => {
  const participantes = useTracker(() => {
    return collParticipantes.find().fetch();
  });
  const preparar = (evt) => {
    evt.preventDefault();
    const form = document.querySelector('#form_participantes');
    const inputs = form.elements;
    let participantes = new Set(
      [...inputs]
        .filter((input) => input.value.length)
        .map(({ value }) => value)
    );
    if (participantes.size > 1) {
      if (participantes.size % 2 === 0) {
        const { derrotado, vitorioso } = dividirTimes(participantes);
        const tipo = vitorioso.length;
        Meteor.call(
          'addPartida',
          { derrotado, vitorioso },
          function (err, res) {
            if (!err) {
              alert('Ok');
              document.location.href = '/';
            }
            console.log({ err, res });
            return;
          }
        );
      } else {
        alert(`Erro:impar\n${[...participantes].join('\n')}`);
        return;
      }
    } else {
      alert('nada a fazer');
      return;
    }
  };

  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <h3>Nova Partida</h3>
        <form id="form_participantes">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '.5rem',
              }}
            >
              <div style={{ alignSelf: 'center', margin: '.5rem' }}>1x1</div>
              <div>
                <input
                  type="search"
                  list="datalist_participantes"
                  placeholder="ganhador"
                />
                <br />
                <input
                  type="search"
                  list="datalist_participantes"
                  placeholder="perdedor"
                />
                <br />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '.5rem',
              }}
            >
              <div style={{ alignSelf: 'center', margin: '.5rem' }}>2x2</div>
              <div>
                <input
                  type="search"
                  list="datalist_participantes"
                  placeholder="ganhador"
                />
                <br />
                <input
                  type="search"
                  list="datalist_participantes"
                  placeholder="perdedor"
                />
                <br />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '.5rem',
              }}
            >
              <div style={{ alignSelf: 'center', margin: '.5rem' }}>3x3</div>
              <div>
                <input
                  type="search"
                  list="datalist_participantes"
                  placeholder="ganhador"
                />
                <br />
                <input
                  type="search"
                  list="datalist_participantes"
                  placeholder="perdedor"
                />
                <br />
              </div>
            </div>
          </div>
        </form>
        <div style={{ textAlign: 'end', margin: '.5rem' }}>
          <button onClick={preparar}>Preparar</button>
        </div>
      </div>
      <datalist id="datalist_participantes">
        {participantes.map((p) => (
          <option key={p._id} value={`${p.nome}`}>
            {p.nome}
          </option>
        ))}
      </datalist>
    </>
  );
};
