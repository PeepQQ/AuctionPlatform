import axios from "axios";



export const syncLot = async (lotId: number) => {
    try {
        return await axios.get('/api/lots/syncLot?lotId=' + lotId);
    }catch (err) {
        return err;
    }
}