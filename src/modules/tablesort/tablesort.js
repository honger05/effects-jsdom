import './tablesort.scss'

window.sortTable = function (tableId, col, dataType) {
  let tableEl = document.getElementById(tableId)
  let tbodyEl = tableEl.tBodies[0]
  let rows = [].slice.call(tbodyEl.rows)

  // sortCol 标示表格当前的排序列
  let sortCol = tableEl.getAttribute('sortCol') || '-1'

  if (Number(sortCol) === col) {
    rows.reverse()
  } else {
    rows.sort(generateCompare(col, dataType))
  }

  let fragment = document.createDocumentFragment()
  rows.forEach(row => {
    fragment.appendChild(row)
  })
  tbodyEl.appendChild(fragment)

  tableEl.setAttribute('sortCol', col)
}

function generateCompare (col, dataType) {
  return function compare (tr1, tr2) {
    let v1 = convert(tr1.cells[col].innerText, dataType)
    let v2 = convert(tr2.cells[col].innerText, dataType)
    return v1 < v2 ? -1 : 1
  }
}

function convert (value, dataType) {
  switch (dataType) {
    case 'int':
      return parseInt(value)
    case 'float':
      return parseFloat(value)
    case 'date':
      return new Date(Date.parse(value))
    default:
      return value.toString()
  }
}
