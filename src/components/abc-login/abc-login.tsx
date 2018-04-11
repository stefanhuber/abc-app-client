import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
    tag: 'abc-login' ,
    styleUrl: 'abc-login.css'
})
export class ABCLogin {

    @Prop() history:RouterHistory;

    processForm(e) {
        e.preventDefault();

        let person = e.target[0].value;
        let code = e.target[1].value;

        fetch('http://localhost/abc-app/tests', {
            method : 'POST' ,
            body : JSON.stringify({
                person : person ,
                code : code
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.json());

            // this.history.push('/test/code', {});
        }).catch((error) => {
            console.log(error.json());
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>

                <form onSubmit={ (e) => this.processForm(e) }>

                    <label>
                        Person: 
                        <input name="person" />
                    </label><br />

                    <label>
                        Code:
                        <input name="code" />
                    </label><br />

                    <button type="submit">start</button>

                </form>
            </div>
        );
    }
}