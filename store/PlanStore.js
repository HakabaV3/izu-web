import Store from './Store';
import API from '../service/API';
import APIState from './structure/APIState';

export default class PlanStoere extends Store {
    constructor() {
        super();
        this.state = {
            getPlanState: APIState(),
            createPlanState: APIState(),
            plans: new Map()
        };
    }

    /**
     * 全ユーザーの全てのプランを取得する。
     */
    getPlanAll() {
        this.update({
            getPlanState: APIState({
                isActive: true
            })
        });

        API.pGet('/plan')
            .then((data) => {
                if (data.status === 200) {
                    data.result.plans.forEach(plan => {
                        this.state.plans.set(plan.id, plan);
                    });
                    this.update({
                        getPlanState: APIState()
                    });

                } else {
                    this.update({
                        getPlanState: APIState({
                            error: data.result,
                            errorMessage: data.result.error
                        })
                    });
                }
            })
            .catch((err) => {
                this.update({
                    getPlanState: APIState({
                        error: err,
                        errorMessage: err.message
                    })
                });
            });
    }

    /**
     * 特定のユーザーのプランを取得する
     * @param  {string} name ユーザー名
     */
    getPlanByUserId(name) {
        this.update({
            getPlanState: APIState({
                isActive: true
            })
        });

        API.pGet(`/plan/${name}`)
            .then((data) => {
                if (data.status === 200) {
                    data.result.plans.forEach(plan => {
                        this.state.plans.set(plan.id, plan);
                        plan.deleteState = APIState()
                        plan.updateState = APIState()
                    });
                    getPlanState: APIState()

                } else {
                    this.update({
                        getPlanState: APIState({
                            error: data.result,
                            errorMessage: data.result.message,
                        })
                    });
                }
            })
            .catch((err) => {
                this.update({
                    getPlanState: APIState({
                        error: err,
                        errorMessage: err.message
                    })
                });
            });
    }

    /**
     * プランを作成する
     * @param  {string} title タイトル
     */
    createPlan(title) {
        this.update({
            createPlanState: APIState({
                isActive: true
            })
        });

        API.pPost('/plan', {
                'title': title
            })
            .then((data) => {
                if (data.status === 200) {
                    this.state.plans.set(data.result.plan.id,  data.result.plan);
                    data.result.plan.deleteState = APIState()
                    data.result.plan.updateState = APIState()

                    this.update({
                        getPlanState: APIState()
                    });

                } else {
                    this.update({
                        getPlanState: APIState({
                            error: data.result,
                            errorMessage: data.result.message,
                        })
                    });
                }        })
            .catch((err) => {
                this.update({
                    createPlanState: APIState({
                        error: err,
                        errorMessage: err.message
                    })
                });
            })
    }

    /**
     * プランを編集する
     * @param  {string} planId プランID
     */
    updatePlan(planId, title) {
        const targetPlan = this.state.plans.get(planId)
        if (!targetPlan) throw new Error(`Plan ${planId} is not found.`);

        targetPlan.updateState = APIState({
            isActive: true
        });
        this.dispatch();

        API.pPatch(`/plan/${targetPlan.owner}/${targetPlan.id}`, {
                title: title
            })
            .then((data) => {
                if (data.status === 200) {
                    targetPlan.title = title;
                    targetPlan.updateState = APIState();
                    this.dispatch();

                } else {
                    targetPlan.updateState = APIState({
                        error: data.result,
                        errorMessage: data.result.message,
                    });
                    this.dispatch();
                }
            })
            .catch((err) => {
                targetPlan.updateState = APIState({
                    error: err,
                    errorMessage: err.message
                });
                this.dispatch();
            })
    }

    /**
     * プランを削除する
     * @param  {string} planId プランID
     */
    deletePlan(planId) {
        const targetPlan = this.state.plans.get(planId)
        if (!targetPlan) throw new Error(`Plan ${planId} is not found.`);

        targetPlan.deleteState = APIState({
            isActive: true
        });
        this.dispatch();

        API.pDelete(`/plan/${targetPlan.owner}/${targetPlan.id}`)
            .then((data) => {
                if (data.status === 201) {
                    this.state.plans.delete(targetPlan.id);
                    this.dispatch();

                } else {
                    targetPlan.deleteState = APIState({
                        error: data.result,
                        errorMessage: data.result.message,
                    });
                    this.dispatch();
                }
            })
            .catch((err) => {
                targetPlan.deleteState = APIState({
                    error: err,
                    errorMessage: err.message
                });
                this.dispatch();
            })
    }
}
