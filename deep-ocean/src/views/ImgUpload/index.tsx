import React, { useCallback, useEffect, useState } from 'react'
import './index.css'

function ImgUpload() {
  const showBox = React.useRef(null)
  const [imgList, setImgList] = useState<string[]>([])

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

  const handleInputSave = useCallback(e => {
    console.log(e, e.target.files)
    let reader = new FileReader()

    reader.onload = function (event) {
      if (event.target!.result && typeof event.target?.result == 'string') {
        setImgList([...imgList, event.target.result])
      }
    }
    reader.readAsDataURL(e.target.files[0])
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
          onChange={handleInputSave}
        />
        <label htmlFor="file" className="upload-label">
          <div className="upload-label-content">
            <img src="https://p5.ssl.qhimg.com/t0132cd8e51c1ff5f4a.png" alt="" />
            <div>点击选择文件或拖拽文件至此</div>
          </div>
        </label>
      </div>
      <div className="showBox" ref={showBox}>
        {imgList.map((item, index) => (
          <img src={item} key={index} alt="" />
        ))}
      </div>
    </div>
  )
}

export default ImgUpload
