import { useState } from "react"
import './Tree.css'

function TreeView({ file, fetchChildren }) {
  // const files = file.files || []
  const iconClass = file.type === 'folder' ? 'icon-folder' : `icon-${file.filetype}`
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState(null);

  const onLineClicked = () => {
    if (file.type === 'folder') {
      if (!open && !files) {
        fetchChildren(file).then(childFiles => {
          setFiles(childFiles);
        });
      }
      setOpen(!open);
    }
  }


  return (
    <div>
      <div className="file-row" onClick={onLineClicked}>
        <span className={`${iconClass} file-icon`}> </span>
        {file.name}
      </div>
      {open &&
        <ul>
          {files.map(f =>
            <li>
              <TreeView file={f} fetchChildren={fetchChildren} />
            </li>)}
        </ul>
      }
    </div>
  )
}
export default TreeView