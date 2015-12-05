/* global Polymer, kn */

'use strict';

Polymer({
	is: 'tl-Pager',
	behaviors: [kn.KNSelectorBehavior],
	listeners: {
		'change': '_onChange'
	},
	_onChange: function(ev, detail) {
		if (ev.target !== this) return;
		this.pChangePage(detail.oldVal, detail.newVal);
	},

	pChangePage: function(from, to) {
		return this.pHidePage(from)
			.then(function() {
				return this.pShowPage(to);
			}.bind(this));
	},

	pHidePage: function(page) {
		if (!page) return Promise.resolve();

		return page.onBeforeLeave()
			.then(function() {
				return page.onLeave();
			})
			.then(function() {
				page.style.display = '';
				return page.onAfterLeave();
			});
	},

	pShowPage: function(page) {
		if (!page) return Promise.resolve();

		var progressBar = this.$.progressBar;

		progressBar.open();
		return page.onBeforeEnter()
			.then(function() {
				progressBar.close();
				page.style.display = 'block';
				return page.onEnter();
			})
			.then(function() {
				return page.onAfterEnter();
			});
	}
});
