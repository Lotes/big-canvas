#code is from http://web.mit.edu/~emin/www.old/source_code/cpp_trees/index.html

class Interval
  constructor: (@low, @high) ->
  toString: ->
    "["+@low.toString()+"; "+@high.toString()+"]"

class IntervalTreeNode
  constructor: (@interval) ->
    if(@interval)
      @key = @interval.low
      @high = @interval.high
      @maxHigh = @high
    @left = null
    @right = null
    @parent = null
    @red = false
    @name = null
  toString: (nil) ->
    if(this == nil)
      return "nil"
    result = "(" + @left.toString(nil) + ", [" + @name + "; " + @interval.toString() + "], " + @right.toString(nil) + ")"
    result

class RecursionNode
  constructor: (@node, @tryRightBranch, @parentIndex) ->

class IntervalTree
  constructor: (@less, @minimum, @maximum) ->
    @nil = new IntervalTreeNode()
    @nil.left = @nil
    @nil.right = @nil
    @nil.parent = @nil
    @nil.red = false
    @nil.key = @nil.high = @nil.maxHigh = @minimum
    @nil.interval = null
    @root = new IntervalTreeNode()
    @root.parent = @root.left = @root.right = @nil
    @root.key = @root.high = @root.maxHigh = @maximum
    @root.red = false
    @root.interval = null
    @nodesByKey = {}
  add: (key, interval) ->
    if(@nodesByKey[key]?)
      @remove(key)
    node = @_insertInterval(interval)
    node.name = key
    @nodesByKey[key] = node
  remove: (key) ->
    if(@nodesByKey[key]?)
      @_deleteNode(@nodesByKey[key])
      delete @nodesByKey[key]
  get: (key) ->
    if(@nodesByKey[key]?)
      @nodesByKey[key].interval
    else
      null
  getOverlappings: (low, high) ->
    enumResultStack = []
    recursionNodeStack = [new RecursionNode(null, false, -1)]
    currentParent = 0
    x = @root.left
    stuffToDo = x != @nil
    while(stuffToDo)
      if(@_overlap(low,high,x.key,x.high))
        enumResultStack.push(x.name)
        recursionNodeStack[currentParent].tryRightBranch = true
      if(x.left.maxHigh >= low) # implies x != nil
        recursionNode = new RecursionNode(x, false, currentParent)
        currentParent = recursionNodeStack.length
        recursionNodeStack.push(recursionNode)
        x = x.left
      else
        x = x.right
      stuffToDo = x != @nil
      while(!stuffToDo && recursionNodeStack.length > 1)
        recursionNode = recursionNodeStack.pop()
        if(recursionNode.tryRightBranch)
          x = recursionNode.node.right
          currentParent = recursionNode.parentIndex
          recursionNodeStack[currentParent].tryRightBranch = true
          stuffToDo = x != @nil
    return enumResultStack
  _overlap: (a1, a2, b1, b2) ->
    if(!@less(b1, a1))
      return !@less(a2, b1)
    else
      return !@less(b2, a1)
  _insertInterval: (newInterval) ->
    x = new IntervalTreeNode(newInterval)
    @_treeInsertHelp(x)
    @_fixUpMaxHigh(x.parent)
    newNode = x
    x.red = true
    while(x.parent.red)
      if (x.parent == x.parent.parent.left)
        y = x.parent.parent.right
        if (y.red)
          x.parent.red = false
          y.red=0;
          x.parent.parent.red=1;
          x=x.parent.parent;
        else
          if(x == x.parent.right)
            x = x.parent
            @_leftRotate(x)
          x.parent.red = false
          x.parent.parent.red = true
          @_rightRotate(x.parent.parent)
      else
        y = x.parent.parent.left
        if(y.red)
          x.parent.red = false
          y.red = false
          x.parent.parent.red = true
          x = x.parent.parent
        else
          if(x == x.parent.left)
            x = x.parent
            @_rightRotate(x)
          x.parent.red = false
          x.parent.parent.red = true
          @_leftRotate(x.parent.parent)
    @root.left.red = false
    return newNode
  _getPredecessorOf: (node) ->
    if(@nil != (y = node.left))
      while(y.right != @nil)
        y = y.right
      return y
    else
      y = node.parent
      while(node == y.left)
        if (y == @root)
          return @nil
        node = y
        y = y.parent
      return y
  _getSuccessorOf: (node) ->
    if(@nil != (y = node.right))
      while(y.left != @nil)
        y = y.left
      return y
    else
      y = node.parent
      while(node == y.right)
        node = y
        y = y.parent
      if(y == @root)
        return @nil
      return y
  _leftRotate: (node) ->
    y = node.right
    node.right = y.left
    if (y.left != @nil)
      y.left.parent = node
    y.parent = node.parent
    if(node == node.parent.left)
      node.parent.left = y
    else
      node.parent.right = y
    y.left = node
    node.parent = y
    node.maxHigh = @_getMaximum(node.left.maxHigh, @_getMaximum(node.right.maxHigh, node.high))
    y.maxHigh = @_getMaximum(node.maxHigh, @_getMaximum(y.right.maxHigh, y.high))
  _rightRotate: (node) ->
    x = node.left
    node.left = x.right
    if(x.right != @nil)
      x.right.parent = node
    x.parent = node.parent
    if(node == node.parent.left)
      node.parent.left = x
    else
      node.parent.right=x
    x.right = node
    node.parent = x
    node.maxHigh = @_getMaximum(node.left.maxHigh, @_getMaximum(node.right.maxHigh, node.high));
    x.maxHigh = @_getMaximum(x.left.maxHigh, @_getMaximum(node.maxHigh, x.high));
  _getMaximum: (lhs, rhs) ->
    if(@less(lhs, rhs))then rhs else lhs
  _treeInsertHelp: (node) ->
    node.left = node.right = @nil
    y = @root
    x = @root.left
    while(x != @nil)
      y = x
      if(@less(node.key, x.key))
        x = x.left
      else
        x = x.right
    node.parent = y
    if(y == @root || @less(node.key, y.key))
      y.left = node
    else
      y.right = node
  _fixUpMaxHigh: (node) ->
    while(node != @root)
      node.maxHigh = @_getMaximum(node.high, @_getMaximum(node.left.maxHigh, node.right.maxHigh))
      node = node.parent
  _deleteNode: (node) ->
    y = if(node.left == @nil || node.right == @nil) then node else @_getSuccessorOf(node)
    x = if(y.left == @nil) then y.right else y.left
    if (@root == (x.parent = y.parent)) #assignment of y->p to x->p is intentional
      @root.left = x
    else
      if(y == y.parent.left)
        y.parent.left = x
      else
        y.parent.right = x
    if(y != node)
      y.maxHigh = @minimum
      y.left = node.left
      y.right = node.right
      y.parent = node.parent
      node.left.parent = node.right.parent = y
      if(node == node.parent.left)
        node.parent.left = y
      else
        node.parent.right = y
      @_fixUpMaxHigh(x.parent)
      if(!y.red)
        y.red = node.red
        @_deleteFixUp(x)
      else
        y.red = node.red
    else
      @_fixUpMaxHigh(x.parent)
      if(!y.red)
        @_deleteFixUp(x)
  _deleteFixUp: (node) ->
    rootLeft = @root.left
    while(!node.red && rootLeft != node)
      if(node == node.parent.left)
        w = node.parent.right
        if(w.red)
          w.red = false
          node.parent.red = true
          @_leftRotate(node.parent)
          w = node.parent.right
        if(!w.right.red && !w.left.red)
          w.red = true
          node = node.parent
        else
          if(!w.right.red)
            w.left.red = false
            w.red = true
            @_rightRotate(w)
            w = node.parent.right
          w.red = node.parent.red
          node.parent.red = false
          w.right.red = false
          @_leftRotate(node.parent)
          node = rootLeft #this is to exit while loop
      else #the code below is has left and right switched from above
        w = node.parent.left
        if(w.red)
          w.red = false
          node.parent.red = true
          @_rightRotate(node.parent)
          w = node.parent.left
        if(!w.right.red && !w.left.red)
          w.red = true
          node = node.parent
        else
          if(!w.left.red)
            w.right.red = false
            w.red = true
            @_leftRotate(w)
            w = node.parent.left
          w.red = node.parent.red
          node.parent.red = false
          w.left.red = false
          @_rightRotate(node.parent)
          node = rootLeft #this is to exit while loop
    node.red= false
  toString: ->
    @root.left.toString(@nil)

module.exports = {
  Interval,
  IntervalTree
}