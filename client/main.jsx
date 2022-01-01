import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Route, Link, Switch } from 'wouter';
import { NovaPartida } from '/imports/ui/NovaPartida';
import { Ranking } from '/imports/ui/Ranking';
import { Participantes } from '/imports/ui/Participantes';
import { Participante } from '/imports/ui/Participante';
import { NovoParticipante } from '/imports/ui/NovoParticipante';

import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';

const NoMatch = () => 'faiô';

const Layout = () => (
  <>
    <Switch>
      <Route path="/novapartida" component={NovaPartida} />
      <Route path="/novoparticipante" component={NovoParticipante} />
      <Route path="/participantes" component={Participantes} />
      <Route path="/participante/:_id" component={Participante} />
      <Route path="/" component={Ranking} />
      <Route component={NoMatch} />
    </Switch>
    <hr />
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}
    >
      <Link to="/">👑</Link>
      <Link to="/participantes">👥</Link>
    </div>
  </>
);

Meteor.startup(() => {
  render(<Layout />, document.getElementById('react-target'));
});
