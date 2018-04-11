import { Component } from "@stencil/core";

@Component({
    tag : "abc-thanks"
})
export class ABCThanks {

    render() {
        return (
            <div>
                <h1>Thank your for submitting the test</h1>
                <p>You will receive the results soon!</p>
            </div>
        );
    }

}