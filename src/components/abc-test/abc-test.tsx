import { Component, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';

@Component({
    tag: 'abc-test' ,
    styleUrl: 'abc-test.css'
})
export class ABCTest {

    @Prop()
    match: MatchResults;

    @Prop()
    history:RouterHistory;

    @State()
    test;

    componentWillLoad() {
        let code = this.match.params.code;
        fetch('http://localhost/abc-app/tests/' + code)
            .then(response => {
                return response.json();
            }).then(json => {
                this.test = json;
            });
    }

    finalizeTest(e) {
        e.preventDefault();
        let test = {};
        
        for (let input of e.target) {
            if (input.type == "checkbox" && input.checked) {
                if (!test[input.name]) {
                    test[input.name] = [];
                }
                test[input.name].push(input.value);
            }
        }

        let code = this.match.params.code;
        fetch('http://localhost/test-app/tests/' + code, {
            method : 'PUT' ,
            body : JSON.stringify(test) ,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 200) {
                this.history.push('/thanks', {});
            }
        });
    }

    render() {
        if (this.test) {

            let questions = [];
            for (let questionObject of this.test.questions) {
                let answers = [];
                for (let answerObject of questionObject.answers) {
                    answers.push(<div>
                        <label>
                            <input name={ questionObject.question.id } value={ answerObject.id } type="checkbox" /> { answerObject.answer }
                        </label>
                    </div>);
                }

                let questionHtml = (
                    <fieldset>
                        <legend>{ questionObject.question.question }</legend>
                        { answers }
                    </fieldset>
                );
                questions.push(questionHtml);
            }

            return (
                <div>
                    <h1>Test Execution: { this.test.title }</h1>
                    <form onSubmit={ (e) => this.finalizeTest(e) }>
                        { questions }

                        <button type="submit">Finalize Test</button>
                    </form>
                </div>
            );
        } else {
            return (<p>Loading Test</p>);
        }        
    }
}