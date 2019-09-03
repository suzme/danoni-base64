'use strict'

// 初期化・イベントの設定
const main = () => {
  const droparea = document.getElementById('droparea')

  droparea.textContent = 'ここに曲ファイルをドロップ'
  document.getElementById('version').textContent = 'v0.1'

  droparea.addEventListener('dragover', event => {
    event.preventDefault()
    droparea.classList.remove('dragleave')
    droparea.classList.add('dragover')
  })

  droparea.addEventListener('dragleave', event => {
    event.preventDefault()
    droparea.classList.remove('dragover')
    droparea.classList.add('dragleave')
  })

  droparea.addEventListener('drop', event => {
    event.preventDefault()
    droparea.classList.remove('dragover')
    droparea.classList.add('dragleave')
    Array.prototype.forEach.call(event.dataTransfer.files, convert)
  })
}

// ファイルごとの変換処理
const convert = file => {
  const reader = new FileReader()

  // 拡張子の変更
  const filename = file.name.replace(/\..*?$/, '') + '.js'

  reader.onload = () => {
    // DataURLからBase64を抜き出し、ダンおに用jsにする
    const base64 = reader.result.replace(/^data:.*?;base64,/, '')
    const text = `function musicInit(){g_musicdata='${base64}'}`
    const blob = new Blob([text], { 'type' : 'text/javascript' })

    // 見えないダウンロードリンクを作る
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
    a.style.display = 'none'

    // DOMツリーに存在しないとFirefox等でダウンロードできない
    document.body.appendChild(a)

    // ダウンロード
    a.click()
  }

  reader.readAsDataURL(file)
}

document.addEventListener('DOMContentLoaded', main)
