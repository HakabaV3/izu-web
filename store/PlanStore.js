import Store from 'store/Store'
import API from 'service/API'

self.PlanStore = null;
export default new class extends Store {
	constructor() {
		super();
		debugger
		this.state = {
			plans: new Map()
		};
	}

	/**
	 * 特定のユーザーのプランを取得する
	 * @param  {string} name ユーザー名
	 * @param {boolean} [flagForceUpdate=true] trueの場合、再度サーバーに問い合わせを行いデータを更新する
	 * @return {Promise} 指定されたユーザーのプランの配列
	 */
	pGetByUserName(name, flagForceUpdate = true) {
		let ps;
		if (flagForceUpdate) {
			ps = this.pFetchByUserName(name);
		} else {
			ps = Promise.resolve();
		}

		return ps
			.then(() => {
				return Array.from(this.state.plans.values())
					.filter((plan) => (plan.owner === name));
			});
	}

	/**
	 * 全ユーザーの全てのプランをサーバーにリクエストする
	 * @return {Promise} 全ユーザーのプランの配列
	 */
	pFetchAll() {
		return API.pGet('/plan')
			.then(data => {
				if (data.status !== 200) return Promise.reject(data.result);

				const plans = data.result.plans;
				plans.forEach(plan => {
					this.state.plans.set(plan.id, formatPlan(plan));
				});
				this.dispatch();

				return plans;
			});
	}

	/**
	 * 特定のユーザーのプランをサーバーにリクエストする
	 * @param  {string} name ユーザー名
	 * @return {Promise} 指定されたユーザーのプランの配列
	 */
	pFetchByUserName(name) {
		return API.pGet(`/plan/${name}`)
			.then(data => {
				if (data.status !== 200) return Promise.reject(data.result);

				const plans = data.result.plans;
				plans.forEach(plan => {
					this.state.plans.set(plan.id, formatPlan(plan));
				});
				this.dispatch();

				return plans;
			});
	}

	/**
	 * プランを作成する
	 * @param  {string} title タイトル
	 * @return {Promise} 作成されたプラン
	 */
	pCreate(title) {
		return API.pPost('/plan', {
				'title': title
			})
			.then((data) => {
				if (data.status !== 200) return Promise.reject(data.result);

				const plan = data.result.plan;
				this.state.plans.set(plan.id, formatPlan(plan));
				this.dispatch();

				return plan;
			});
	}

	/**
	 * プランを編集する
	 * @param  {string} planId プランID
	 * @param  {string} title プラン名
	 * @return {Promise} 更新されたプラン
	 */
	pPatch(planId, title) {
		const targetPlan = this.state.plans.get(planId);
		if (!targetPlan) return Promise.reject(new Error(`Plan ${planId} is not found.`));

		return API.pPatch(`/plan/${targetPlan.owner}/${targetPlan.id}`, {
				title: title
			})
			.then((data) => {
				if (data.status !== 200) return Promise.reject(data.result);

				targetPlan.title = title;
				this.dispatch();

				return targetPlan;
			});
	}

	/**
	 * プランを削除する
	 * @param  {string} planId プランID
	 * @return {Promise} 削除されたプラン
	 */
	pDelete(planId) {
		const targetPlan = this.state.plans.get(planId);
		if (!targetPlan) return Promise.reject(new Error(`Plan ${planId} is not found.`));

		return API.pDelete(`/plan/${targetPlan.owner}/${targetPlan.id}`)
			.then((data) => {
				if (data.status !== 201) return Promise.reject(data.result);

				this.state.plans.delete(targetPlan.id);
				this.dispatch();

				return targetPlan;
			});
	}
}

/**
 * APIのレスポンスを整形する
 * @param {Object} data APIのレスポンス
 * @return {Object} 整形後のオブジェクト
 */
function formatPlan(data) {
	return {
		id: data.id,
		title: data.title,
		userId: data.userId,
		owner: data.owner,
		description: data.description || '',
		created: (data.created || 0) * 1000,
		updated: (data.updated || 0) * 1000,
		photos: []
	};
}
