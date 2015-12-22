import './KNOverlayManager.scss'
import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

const State = {
    CLOSE: -1,
    OPENING: 0,
    OPEN: 1,
    CLOSING: 2
};

const layerMap = new Map();
let visibleCount = 0;
let lastInstance = null;

export default class KNOverlayManager extends Component {
    constructor() {
        super();
        lastInstance = this;
    }

    _onBaseClick(ev, layerId) {
        if (ev.target !== this.refs.base) return;
        KNOverlayManager.close(layerId);
    }

    render() {
        let children = [];
        for (let keyVal of layerMap.entries()) {
            let [layerId, layer] = keyVal;

            children.push(
                <div key={layerId}
                    ref="base"
                    className={classNames({
                        'KNOverlayManager__item': true,
                        'is-opening':layer.state === State.OPENING,
                        'is-open': layer.state === State.OPEN,
                        'is-closing': layer.state === State.CLOSING,
                        'is-close': layer.state === State.CLOSE,
                    })}
                    style={{
                        zIndex: layer.zIndex
                    }}
                    onClick={(ev) => this._onBaseClick(ev, layerId)}>
                    {layer.node}
                </div>
            );
        }

        return (
            <div className={classNames({
                'KNOverlayManager': true,
                'is-show': visibleCount > 0
            })}>
                {children}
            </div>
        )
    }
};
export default KNOverlayManager

KNOverlayManager.getLayer = function(layerId) {
    return layerMap.get(layerId);
};

KNOverlayManager.open = function(node, onClose) {
    const layerId = Date.now();
    let layer = {
        node: node,
        state: State.OPENING,
        zIndex: visibleCount,
        onClose: onClose,
    };

    layerMap.set(layerId, layer);

    visibleCount++;
    lastInstance.setState();

    setTimeout(() => {
        layer.state = State.OPEN;
        lastInstance.setState();
    }, 240);

    return layerId;
};

KNOverlayManager.update = function(layerId, node) {
    let layer = this.getLayer(layerId);
    if (!layer) return;

    layer.node = node;
    lastInstance.setState();
};

KNOverlayManager.close = function(layerId) {
    debugger
    let layer = this.getLayer(layerId);
    if (!layer || layer.state !== State.OPEN) return;

    layer.state = State.CLOSING;
    lastInstance.setState();

    setTimeout(() => {
        layerMap.delete(layerId);
        visibleCount--;
        lastInstance.setState();
        if (typeof layer.onClose === 'function') {
            layer.onClose();
            layer.onClose = null;
        }
    }, 240);
};

KNOverlayManager.isOpen = function(layerId) {
    let layer = this.getLayer(layerId);
    if (!layer) return;

    return layer.state !== State.CLOSE;
};

KNOverlayManager.propTypes = {};
