/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Events fired as a result of a marker move.
 * @author kozbial@google.com (Monica Kozbial)
 */
'use strict';

goog.provide('Blockly.Events.MarkerMove');

goog.require('Blockly.Events');
goog.require('Blockly.Events.UiBase');
goog.require('Blockly.registry');
goog.require('Blockly.utils.object');

/**
 * Class for a marker move event.
 * @param {?Blockly.Block=} opt_block The affected block. Null if current node
 *    is of type workspace. Undefined for a blank event.
 * @param {boolean=} isCursor Whether this is a cursor event. Undefined for a
 *    blank event.
 * @param {?Blockly.ASTNode=} opt_oldNode The old node the marker used to be on.
 *    Undefined for a blank event.
 * @param {!Blockly.ASTNode=} opt_curNode The new node the marker is now on.
 *    Undefined for a blank event.
 * @extends {Blockly.Events.UiBase}
 * @constructor
 */
Blockly.Events.MarkerMove = function(opt_block, isCursor, opt_oldNode,
    opt_curNode) {
  var workspaceId = opt_block ? opt_block.workspace.id : undefined;
  if (opt_curNode && opt_curNode.getType() == Blockly.ASTNode.types.WORKSPACE) {
    workspaceId =
        (/** @type {!Blockly.Workspace} */ (opt_curNode.getLocation())).id;
  }
  Blockly.Events.MarkerMove.superClass_.constructor.call(this, workspaceId);

  /**
   * The workspace identifier for this event.
   * @type {?string}
   */
  this.blockId = opt_block ? opt_block.id : null;

  /**
   * The old node the marker used to be on.
   * @type {?Blockly.ASTNode|undefined}
   */
  this.oldNode = opt_oldNode;

  /**
   * The new node the  marker is now on.
   * @type {Blockly.ASTNode|undefined}
   */
  this.curNode = opt_curNode;

  /**
   * Whether this is a cursor event.
   * @type {boolean|undefined}
   */
  this.isCursor = isCursor;
};
Blockly.utils.object.inherits(Blockly.Events.MarkerMove, Blockly.Events.UiBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.MarkerMove.prototype.type = Blockly.Events.MARKER_MOVE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.MarkerMove.prototype.toJson = function() {
  var json = Blockly.Events.MarkerMove.superClass_.toJson.call(this);
  json['isCursor'] = this.isCursor;
  json['blockId'] = this.blockId;
  json['oldNode'] = this.oldNode;
  json['curNode'] = this.curNode;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.MarkerMove.prototype.fromJson = function(json) {
  Blockly.Events.MarkerMove.superClass_.fromJson.call(this, json);
  this.isCursor = json['isCursor'];
  this.blockId = json['blockId'];
  this.oldNode = json['oldNode'];
  this.curNode = json['curNode'];
};

Blockly.registry.register(Blockly.registry.Type.EVENT,
    Blockly.Events.MARKER_MOVE, Blockly.Events.MarkerMove);
