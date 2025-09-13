import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'
import dropIcon from '../assets/drop.png'
import '../Styles/AddPost.css'
import { useNavigate } from 'react-router-dom'

const AddPost = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPublic, setIsPublic] = useState(true) // toggle state

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setImage(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }))
    }
  })

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("isPublic", isPublic)
    if (image) formData.append("image", image)

    console.log("Form submitted:", {
      title, content, isPublic, image
    })
    try{
        const res=await fetch('http://localhost:3001/posts/addPost',{
      method : 'POST',
      credentials :'include',
      body : formData
    })
    const data= await res.json();
    if(res.ok)
    {
      toast.success("Successfully Posted!");
      navigate(`/viewmypost/${data.post._id}`)
    }
    else{
      toast.error("failed to post!");
    }
    }
    catch(e)
    {
      toast.error(e.message);
    }
  }

  return (
    <div className="add-post-container">
      <form onSubmit={handleSubmit} className="post-form">
        {/* Image Upload Section */}
        <div {...getRootProps()} className="dropzone">
          {image ? (
            <img src={image.preview} alt="thumbnail" className="preview-img" />
          ) : (
            <img src={dropIcon} alt="dropIcon" className="drop-icon" />
          )}
          <input {...getInputProps()} />
          <p>Drag & Drop your image or click to select</p>
        </div>

        {/* Title */}
        <label htmlFor="title">Title</label>
        <input 
          type="text"
          id="title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content */}
        <label htmlFor="content">Blog Content</label>
        <textarea 
          id="content"
          placeholder="Write your blog..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Toggle */}
        <div className="toggle-container">
          <span>{isPublic ? "🌍 Public" : "🔒 Private"}</span>
          <label className="switch">
            <input 
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Post</button>
      </form>
    </div>
  )
}

export default AddPost
