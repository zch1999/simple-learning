import React, { useCallback, useEffect } from 'react'
import './index.css'

function ImgUpload() {
  useEffect(() => {
    document.addEventListener('drop', cancelEvent, true)
    document.addEventListener('dragover', cancelEvent, true)
    return () => {
      document.removeEventListener('drop', cancelEvent, true)
      document.removeEventListener('dragover', cancelEvent, true)
    }
  })

  const handleDragenter = useCallback(e => {
    console.log(e, e.dataTransfer.files, '拖动')
    // e.preventDefault()
  }, [])

  const handleSave = useCallback(e => {
    console.log(e, e.target.files)
  }, [])

  const cancelEvent = useCallback(e => {
    e.preventDefault()
  }, [])

  return (
    <div>
      <div className="img-box" onDrop={handleDragenter} onDragOver={cancelEvent}>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/gif,image/jpeg,image/jpg,image/png"
          style={{ display: 'none' }}
          onChange={handleSave}
        />
        <label htmlFor="file" className="upload-label">
          <div className="upload-label-content">
            <img src="https://p5.ssl.qhimg.com/t0132cd8e51c1ff5f4a.png" alt="" />
            <div>点击选择文件或拖拽文件至此</div>
          </div>
        </label>
      </div>
    </div>
  )
}

export default ImgUpload
