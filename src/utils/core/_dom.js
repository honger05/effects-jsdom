
// dom 操作有关

/**
 * 查找两个节点的最近的一个共同父节点，可以包括节点自身
 *
 * @param  {[type]} oNode1 [description]
 * @param  {[type]} oNode2 [description]
 * @return {[type]}        [description]
 */
function commonParentNode(oNode1, oNode2) {
  if (oNode1.contains(oNode2)) {
    return oNode1
  } else if (oNode2.contains(oNode1)) {
    return oNode2
  }
  return commonParentNode(oNode1.parentNode, oNode2.parentNode)
}
