/* global Polymer, kn */

'use strict';

Polymer({
	is: 'tl-Page',
	properties: {
		entryTag: {
			type: String
		}
	},
	behaviors: [kn.KNPagerItemBehavior],
	onload: function(doc) {
		this.importNodesFromDocument(doc);
	},
	importNodesFromDocument: function(doc) {
		if (this.entryTag) {
			this.$.base.appendChild(document.createElement(this.entryTag));
		} else {
			this.$.base.appendChild(doc.body.firstElementChild);
		}
	},

	//@Override KNPagerItemBehavior.onEnter()
	onEnter: function() {
		if (this.$.base.firstElementChild) {
			this.$.base.firstElementChild.dispatchEvent(new Event('enterpagestart'));
		}

		this.$.base.classList.add('fadeIn');
		return pTransition(this.$.base)
			.then(function() {
				if (this.$.base.firstElementChild) {
					this.$.base.firstElementChild.dispatchEvent(new Event('enterpageend'));
				}
				this.$.base.classList.remove('fadeIn');
			}.bind(this));
	},

	//@Override KNPagerItemBehavior.onLeave()
	onLeave: function() {
		if (this.$.base.firstElementChild) {
			this.$.base.firstElementChild.dispatchEvent(new Event('leavepagestart'));
		}

		this.$.base.classList.add('fadeOut');
		return pTransition(this.$.base)
			.then(function() {
				if (this.$.base.firstElementChild) {
					this.$.base.firstElementChild.dispatchEvent(new Event('leavepageend'));
				}

				this.$.base.classList.remove('fadeOut');
			}.bind(this));
	}
});

function pTransition(node, timeout) {
	timeout = timeout || 2000;

	return new Promise(function(resolve) {
		var timerId,
			proxy = function() {
				clearTimeout(timerId);
				node.removeEventListener('animationend', proxy);
				node.removeEventListener('webkitAnimationEnd', proxy);
				resolve();
			};

		timerId = setTimeout(proxy, timeout);
		node.addEventListener('animationend', proxy);
		node.addEventListener('webkitAnimationEnd', proxy);
	});
}
