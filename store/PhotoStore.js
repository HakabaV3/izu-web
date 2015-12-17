import Store from './Store';
import API from '../service/API';
import PlanStore from './PlanStore';

const planStore = PlanStore.getStore();

export default class PhotoStore extends Store {
	constructor() {
		super();
		this.state = {
			photos: new Map()
		};
	}

	/**
	 * 特定のプランのフォト一覧を取得する
	 * @param  {Object} プラン
	 * @param {boolean} [flagForceUpdate=true] trueの場合、再度サーバーに問い合わせを行いデータを更新する
	 * @return {Promise} 指定されたプランのフォトの配列
	 */
	pGetByPlan(plan, flagForceUpdate = true) {
		let ps;
		if (flagForceUpdate) {
			ps = this.pFetchByPlan(plan);
		} else {
			ps = Promise.resolve();
		}

		return ps
			.then(() => plan.photos);
	}

	/**
	 * 特定のプランのフォト一覧をサーバーにリクエストする
	 * @param  {Object} プラン
	 * @return {Promise} 指定されたプランのフォトの配列
	 */
	pFetchByPlan(plan) {
		return API.pGet(`/plan/${plan.owner}/${plan.id}/photo`)
			.then(data => {
				if (data.status !== 200) return Promise.reject(data.result);

				const photos = data.result.photos.map(formatPhoto);
				photos.forEach(photo => {
					this.state.photos.set(photo.id, photo);
				});
				plan.photos = photos;
				this.dispatch();

				return photos;
			});
	}

	/**
	 * プランにフォトを追加する
	 * @param {Obect} plan プラン
	 * @param {Object} detail 詳細
	 * @param {string} detail.description 詳細
	 * @param {number} detail.latitude 緯度
	 * @param {number} detail.longtitude 経度
	 * @param {number} detail.date 撮影日
	 * @return {Promise} 作成されたフォト
	 */
	pCreate(plan, detail, image) {
		let json = new File([JSON.stringify(detail)], 'detail.json', {
				type: 'application/json'
			}),
			// image = new File([''], 'image.jpg', {
			// 	type: 'image/jpg'
			// }),
			formData = new FormData();

		formData.append('detail', json);
		formData.append('photo', image)

		const url = API.wrapWithHost(`/plan/${plan.owner}/${plan.id}/photo`);

		return API.fetchWithToken(url, {
				method: 'POST',
				body: formData,
				// headers: {
				// 	'Content-Type': 'multipart/form-data'
				// }
			})
			.then(data => data.json())
			.then(data => {
				if (data.status !== 200) return Promise.reject(data.result);

				const photo = data.result.photo;
				this.state.plans.set(photo.id, formatPhoto(photo));

				return photo;
			});
	}

	/**
	 * フォトを編集する
	 * @param {Object} photo フォト
	 * @param {Object} detail 詳細
	 * @param {string} detail.description 詳細
	 * @param {number} detail.latitude 緯度
	 * @param {number} detail.longtitude 経度
	 * @param {number} detail.date 撮影日
	 * @return {Promise} 更新されたプラン
	 */
	pPatch(photo, detail) {
		return API.pPatch(`/plan/${photo.owner}/${photo.planId}/photo/${photo.id}`, detail)
			.then((data) => {
				if (data.status !== 200) return Promise.reject(data.result);

				Object.assign(photo, data.photo);
				this.dispatch();

				return photo;
			});
	}

	/**
	 * フォトを削除する
	 * @param  {Object} photo 削除するフォト
	 * @return {Promise} 削除されたプラン
	 */
	pDelete(photo) {
		return API.pDelete(`/plan/${photo.owner}/${photo.planId}/photo/${photo.id}`)
			.then((data) => {
				if (data.status !== 201) return Promise.reject(data.result);

				this.state.photos.delete(photo.id);
				this.dispatch();

				photoStore.pFetchByPlan(planStore.state.plans.get(photo.planId));

				return photo;
			});
	}
}

/**
 * APIのレスポンスを整形する
 * @param {Object} data APIのレスポンス
 * @return {Object} 整形後のオブジェクト
 */
function formatPhoto(photo) {
	return {
		id: photo.id,
		planId: photo.planId,
		userId: photo.userId,
		owner: photo.owner,
		latitude: photo.latitude,
		longitude: photo.longitude,
		date: (photo.date || 0) * 1000,
		description: photo.description,
		created: (photo.created || 0) * 1000,
		updated: (photo.updated || 0) * 1000,
		url: photo.url
	};
}
