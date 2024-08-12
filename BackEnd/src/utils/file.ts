import { Request } from 'express'
import formidable from 'formidable'
import fs from 'fs'
import { UPLOAD_TEMP_DIR } from '~/constants/dir'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dkqyptupf',
  api_key: '923633263214567',
  api_secret: '40OayrQ4yqNIhxXtmKTJ47yulNo'
})

export const initFolder = () => {
  if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_TEMP_DIR, {
      recursive: true // mục đích là tạo folder
    })
  }
}

export const handleFileUpload = async (req: Request) => {
  const form = formidable({
    // uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 1,
    keepExtensions: true,
    // maxFileSize: 300 * 1024 //300kb

    filter: function ({ name, originalFilename, mimetype }) {
      return true
    }
  })

  return new Promise((resolve, reject) => {
    form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) {
        return reject(err)
      }
      const response = await cloudinary.uploader
        .upload(files.file[0].filepath, {
          folder: 'ELeaning',
          use_filename: true,
          unique_filename: false,
          resource_type: 'auto'
        })
        .catch((error) => {
          reject(error)
        })
      resolve({
        ...response,
        originalFilename: files.file[0].originalFilename
      })
    })
  })
}

export const getNameFormFullName = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('')
}
