import moment from 'moment';
import fs from 'fs';
const mockDir = './mocks/byDay'
const maxNumberOfDay = 10
export function mocksDirectoryToday(directoryPath) {

    const date = (moment(new Date())).format('YYYY-MM-DD')
    let mocksDirectory = `${mockDir}/${date}/${directoryPath}`
    if (!fs.existsSync(mocksDirectory)) {
        fs.mkdirSync(mocksDirectory);
    }

    const existingDir = fs.readdirSync(mockDir)
    if (existingDir.length > maxNumberOfDay) {

        existingDir.sort()
        for (let i = 0; i < existingDir.length - maxNumberOfDay; i++) {
            fs.rmdirSync(mockDir + '/' + existingDir[i], { recursive: true });
        }
    }

    return mocksDirectory;
}