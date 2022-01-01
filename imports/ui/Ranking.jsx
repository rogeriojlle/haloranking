import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { collPartidas } from '../api/partidas';
import { Link } from 'wouter';

export const Ranking = () => {
  const fullObj = useTracker(() => {
    const partidas = collPartidas.find().fetch();
    const obj = partidas.reduce((a, d) => {
      const n = d.vitorioso.length;
      const modo = `${n} x ${n}`;
      if (!a[modo]) a[modo] = { partidas: [], ranking: {} };
      a[modo].partidas.push(d);
      for (let nome of d.vitorioso) {
        if (!a[modo].ranking[nome]) a[modo].ranking[nome] = [];
        a[modo].ranking[nome].push(1);
      }
      for (let nome of d.derrotado) {
        if (!a[modo].ranking[nome]) a[modo].ranking[nome] = [];
        a[modo].ranking[nome].push(-1);
      }
      return a;
    }, {});
    for (let [modo, { partidas, ranking }] of Object.entries(obj)) {
      for (let [nome, completo] of Object.entries(ranking)) {
        obj[modo]['ranking'][nome] = completo.slice(-10).reduce((a, d, i) => {
          ++i;
          a += i * d;
          if (a < 0) a = 0;
          return a;
        }, 0);
      }
      //ordenar do maior para o menor
      obj[modo]['ranking'] = Object.entries(obj[modo].ranking).sort(
        ([, a], [, b]) => b - a
      );
    }
    return obj;
  });

  return (
    <>
      <h2>
        Ranking ( <Link to="/novapartida">+</Link> )
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {Object.keys(fullObj)
          .sort()
          .map((modo) => {
            return (
              <div
                key={modo}
                style={{
                  margin: '0 1rem',
                }}
              >
                <h3
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {modo}
                </h3>
                <div>
                  {fullObj[modo].ranking.map(([nome, pontos]) => (
                    <div
                      key={nome}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          margin: '0 1rem',
                        }}
                      >
                        {nome}
                      </div>
                      <div>{pontos}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
