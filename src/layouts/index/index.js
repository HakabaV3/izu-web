/* global Polymer */

'use strict';

Polymer({
	is: 'tl-index-layout',
	ready: function() {
		this.$.appBar.appName = kn.i18n.getText('global.application.fullname');

		Flux.addStore('/Store/AuthStore.js', this.onUpdateAuthStore.bind(this));
		Flux.addStore('/Store/PageStore.js', this.onUpdatePageStore.bind(this));

		window.addEventListener('hashchange', this._onHashChange.bind(this));
		this._onHashChange();
	},


	onUpdateAuthStore: function(state) {
		if (state.isLogined) {
			this.$.sideNavToggler.style.display = '';
			this.$.sideNav.locked = false;
		} else {
			this.$.sideNavToggler.style.display = 'none';
			this.$.sideNav.locked = true;
		}
	},
	onUpdatePageStore: function(state) {
		if (state.redirect) {
			history.replaceState('', null, state.redirect);
			Flux.dispatchAction('hashchange', location.hash);

		} else if (state.selected) {
			if (this.$.pager.selected !== state.selected) {
				this.$.pager.selected = state.selected;
				this.$.appBar.subName = state.selected;

				this.$.sideNav.close();
			}

			this.updateSideMenu(state.selected);
		}
	},


	updateSideMenu: function(selected) {
		var oldItem = this.querySelector('.Menu__item.is-selected');
		if (oldItem) {
			oldItem.classList.remove('is-selected');
		}

		var newItem = this.querySelector('[data-sidemenu-item-id="' + selected + '"]');
		if (newItem) {
			newItem.classList.add('is-selected');
		}
	},
	toggleSideNav: function() {
		this.$.sideNav.toggle();
	},


	_onHashChange: function() {
		Flux.dispatchAction('hashchange', location.hash);
	}
});
