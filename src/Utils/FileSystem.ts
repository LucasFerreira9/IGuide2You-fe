import RNFS from 'react-native-fs';

async function renameFile(filePath: string, newName: string):Promise<string>{
    const splited = filePath.split('/');
    const path = splited.slice(0, -1).join("/");
    const new_path = `${path}/${newName}`;
    await RNFS.moveFile(filePath, new_path);
    return new_path;
}

async function getInfo(filePath:string):Promise<{name:string, size:number}>{
    const stats = await RNFS.stat(filePath)
    return {
        name: stats.name ? stats.name : filePath.split("/").slice(-1)[0],
        size: stats.size
    }
}

function formatPath(path:string):string{
    return `file://${path}`
}

export {renameFile, getInfo, formatPath}