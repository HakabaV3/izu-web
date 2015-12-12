import './style/style.scss';
import AuthStore from './store/AuthStore';
import PlanStore from './store/PlanStore';
self.authStore = AuthStore.getStore();
self.planStore = PlanStore.getStore();
