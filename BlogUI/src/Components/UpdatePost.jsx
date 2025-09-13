import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'
import dropIcon from '../assets/drop.png'
import '../Styles/UpdatePost.css'
import { useParams, useNavigate } from 'react-router-dom'

const UpdatePost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPublic, setIsPublic] = useState(true)

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setImage(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }))
    }
  })

  // Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/posts/getmypost/${id}`, {
          method: 'GET',
          credentials: 'include'
        })
        if (res.ok) {
          const data = await res.json()
          setTitle(data.title)
          setContent(data.body)
          setIsPublic(data.public)

          // convert base64 back to preview
          if (data.thumbnail?.data) {
            setImage({
              preview: `data:${data.thumbnail.contentType};base64,${data.thumbnail.data}`
            })
          }
        } else {
          toast.error("Failed to fetch post details")
        }
      } catch (err) {
        toast.error("Error fetching post")
        console.error(err)
      }
    }
    fetchPost()
  }, [id])

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("body", content)
    formData.append("public", isPublic)

    // Only send image if user uploaded a new one
    if (image && image instanceof File) {
      formData.append("image", image)
    }

    try {
      const res = await fetch(`http://localhost:3001/posts/update/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
      })
      if (res.ok) {
        toast.success("Post updated successfully!")
        navigate(`/viewmypost/${id}`)
      } else {
        toast.error("Failed to update post!")
      }
    } catch (e) {
      toast.error(e.message)
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
        <button type="submit" className="submit-btn">Update Post</button>
      </form>
    </div>
  )
}

export default UpdatePost
