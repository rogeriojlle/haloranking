import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectOption,
  SelectGroup,
  SelectVariant,
} from '@patternfly/react-core';

const estadoCompartilhado = {
  listaCompleta: [],
  listaDerrotados: [],
  listaVitoriosos: [],
  filtroVitoriosos() {
    return this.listaCompleta.filter(
      (p) => !this.listaDerrotados.includes(p.nome)
    );
  },
  filtroDerrotados() {
    return this.listaCompleta.filter(
      (p) => !this.listaVitoriosos.includes(p.nome)
    );
  },
  alternarDerrotado(nome) {
    let posicao = this.listaDerrotados.findIndex((d) => d === nome);
    posicao < 0
      ? this.listaDerrotados.push(nome)
      : this.listaDerrotados.splice(posicao, 1);
  },
  alternarVitorioso(nome) {
    let posicao = this.listaVitoriosos.findIndex((v) => v === nome);
    posicao < 0
      ? this.listaVitoriosos.push(nome)
      : this.listaVitoriosos.splice(posicao, 1);
  },
};

const SelecaoVitoriosos = (props) => {
  const [possiveisVitoriosos, setPossiveisVitoriosos] = useState(
    estadoCompartilhado.filtroVitoriosos()
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(estadoCompartilhado.listaVitoriosos);

  const onToggle = (...args) => {
    setPossiveisVitoriosos(estadoCompartilhado.filtroVitoriosos());
    setIsOpen(!isOpen);
  };

  const onSelect = (evt, nome) => {
    estadoCompartilhado.alternarVitorioso(nome);
    setPossiveisVitoriosos(estadoCompartilhado.filtroVitoriosos());
    setSelected(estadoCompartilhado.listaVitoriosos);
  };

  return (
    <Select
      variant={SelectVariant.checkbox}
      placeholderText="Quem ganhou?"
      onToggle={onToggle}
      hasInlineFilter
      selections={selected}
      isOpen={isOpen}
      onSelect={onSelect}
    >
      {possiveisVitoriosos.map((p) => (
        <SelectOption key={p._id} value={p.nome} />
      ))}
    </Select>
  );
};

const SelecaoDerrotados = (props) => {
  const [possiveisDerrotados, setPossiveisDerrotados] = useState(
    estadoCompartilhado.filtroDerrotados()
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(estadoCompartilhado.listaDerrotados);

  const onToggle = (...args) => {
    let derr = estadoCompartilhado.filtroDerrotados();
    setPossiveisDerrotados(derr);
    setIsOpen(!isOpen);
  };

  const onSelect = (evt, nome) => {
    estadoCompartilhado.alternarDerrotado(nome);
    setPossiveisDerrotados(estadoCompartilhado.filtroDerrotados());
    setSelected(estadoCompartilhado.listaDerrotados);
  };

  return (
    <Select
      variant={SelectVariant.checkbox}
      placeholderText="Quem perdeu?"
      onToggle={onToggle}
      hasInlineFilter
      selections={selected}
      isOpen={isOpen}
      onSelect={onSelect}
    >
      {possiveisDerrotados.map((p) => (
        <SelectOption key={p._id} value={p.nome} />
      ))}
    </Select>
  );
};

export const NovaPartida = () => {
  if (!estadoCompartilhado.listaCompleta.length) {
    Meteor.call('participantes', (err, res) => {
      estadoCompartilhado.listaCompleta = res;
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SelecaoVitoriosos style={{ flex: 1 }} />
      <SelecaoDerrotados style={{ flex: 1 }} />
    </div>
  );
};
