// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import React from 'react';
import ReactDOM from 'react-dom';
import { webFrame } from 'electron';
import { RootComponent } from './root-component';
import './app.css';
import './normalize.css';
import './blueprint.css';
import './blueprint-icons.css';

/**
 * Zooming resets
 */
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

/**
 * Drag and drop resets
 */
document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

// mount the root component
// console.log('RootComponent:', RootComponent);
ReactDOM.render(<RootComponent />, document.getElementById('root'));
