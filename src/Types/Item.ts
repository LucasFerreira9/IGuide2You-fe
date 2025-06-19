import { File } from "./File"

export type UploadItem = {
    name: string,
    photoUri: string,
    videoFile: File
    trainVideoFile: File
}

export type UploadItemSet = UploadItem[]

export type Item = {
    owner: string;
    name: string;
    image: string;
    videos: Array<{guide:string, video_url:string}>;
}

export type ItemsSet = Item[]