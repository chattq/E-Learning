import { Request } from 'express'
import { File } from 'formidable'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFormFullName, handleFileUpload } from '~/utils/file'
import fs from 'fs'
import { useGetTime } from '~/utils/useGetTime'

class MediasService {
  async handleUploadSingleImage(req: Request) {
    const { getTimeNow } = useGetTime()

    const file = (await handleFileUpload(req)) as File
    const newName = getNameFormFullName(file.newFilename)

    const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`)

    sharp.cache(false)
    await sharp(file.filepath).jpeg().toFile(newPath)
    fs.unlinkSync(file.filepath)

    return {
      TimeUpload: getTimeNow(),
      FileSize: file.size,
      FileName: file.originalFilename,
      FileType: file.mimetype,
      FileUrl: `http://localhost:4000/uploads/${newName}.jpg`
    }
  }
}

const mediasService = new MediasService()

export default mediasService
