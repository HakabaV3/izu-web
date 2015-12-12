import Store from './Store';
import API from '../service/API';

export default class PlanStoere extends Store {
    constructor() {
        super();
        this.state = {
            isPlanFetching: false,
            lastError: null,
            lastErrorMessage: '',
            plans: new Map()
        };
    }

    getPlanAll() {
        this.update({
            isPlanFetching: true
        });

        API.pGet('/plan')
            .then((data) => {
                if (data.status === 200) {
                    data.result.plans.forEach(plan => {
                        this.state.plans.set(plan.id, plan);
                    });
                    this.dispatch();

                } else {
                    console.log(data);
                }
            })
            .catch(function(err){
                console.error(err);
            });
    }

    getPlanByUserId(userId) {
        this.update({
            isPlanFetching: true
        });

        API.pGet(`/plan/${userId}`)
            .then((data) => {
                if (data.status === 200) {
                    data.result.plans.forEach(plan => {
                        this.state.plans.set(plan.id, plan);
                    });
                    this.update({
                        isPlanFetching: false
                    });

                } else {
                    this.update({
                        lastError: data.result,
                        lastErrorMessage: data.result.message,
                        isPlanFetching: false
                    });
                }
            })
            .catch((err) => {
                this.update({
                    lastError: err,
                    lastErrorMessage: err.message,
                    isPlanFetching: false
                });
            });
    }
}
