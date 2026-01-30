import api from './api'

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await api.post('/fileupload/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.url
  } catch (error) {
    console.error('File upload failed:', error)
    throw new Error(error.response?.data?.message || 'File upload failed')
  }
}

export const deleteFile = async (fileName) => {
  try {
    await api.delete(`/fileupload/delete?fileName=${fileName}`)
  } catch (error) {
    console.error('File delete failed:', error)
    throw new Error(error.response?.data?.message || 'File delete failed')
  }
}
