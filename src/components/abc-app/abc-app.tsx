import '@stencil/router';
import { Component } from '@stencil/core';

@Component({
    tag: 'abc-app',
    styleUrl: 'abc-app.css'
})
export class ABCApp {

  render() {
    return (
      <stencil-router>
        <stencil-route url='/' component='abc-login' exact={true}>
        </stencil-route>
        <stencil-route url='/test/:code' component='abc-test'>
        </stencil-route>
        <stencil-route url='/thanks' component='abc-thanks'>
        </stencil-route>
      </stencil-router>
    );
  }
}
